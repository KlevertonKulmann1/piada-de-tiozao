import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Tipos e interfaces
export type Joke = {
  id: string;
  question: string;
  answer: string;
  pergunta?: string;
  resposta?: string;
};

type Language = 'pt' | 'en';

interface JokesContextType {
  currentJoke: Joke | null;
  translatedJoke: Joke | null;
  showAnswer: boolean;
  favorites: Joke[];
  language: Language;
  setLanguage: (lang: Language) => void;
  nextJoke: () => Promise<void>;
  toggleFavorite: (joke: Joke) => void;
  setShowAnswer: (show: boolean) => void;
  loadingTranslation: boolean;
  currentApiSource: string | null;
  isLoading: boolean;
}

// Contexto
const JokesContext = createContext<JokesContextType | undefined>(undefined);

// Cache de traduções
const translationCache = new Map<string, string>();

// Helper functions
async function fetchWithTimeout(url: string, options = {}, timeout = 3000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(url, {
    ...options,
    signal: controller.signal
  });
  
  clearTimeout(timeoutId);
  return response;
}

// APIs de piadas
async function fetchJokeFromOfficialAPI(): Promise<Joke> {
  try {
    const res = await fetchWithTimeout('https://official-joke-api.appspot.com/jokes/random');
    if (!res.ok) throw new Error('Error fetching joke');
    const data = await res.json();
    return {
      id: `official_${data.id || Math.random().toString()}`,
      question: data.setup,
      answer: data.punchline,
    };
  } catch (error) {
    console.error('Official Joke API error:', error);
    throw error;
  }
}

async function fetchJokeFromJokeAPI(): Promise<Joke> {
  try {
    const res = await fetchWithTimeout('https://v2.jokeapi.dev/joke/Any?safe-mode');
    if (!res.ok) throw new Error('Error fetching joke');
    const data = await res.json();
    
    return data.type === 'single' 
      ? {
          id: `jokeapi_${data.id || Math.random().toString()}`,
          question: data.joke,
          answer: '',
        }
      : {
          id: `jokeapi_${data.id || Math.random().toString()}`,
          question: data.setup,
          answer: data.delivery,
        };
  } catch (error) {
    console.error('JokeAPI error:', error);
    throw error;
  }
}

async function fetchJokeFromDadJokesAPI(): Promise<Joke> {
  try {
    const res = await fetchWithTimeout('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Piada de Tiozão App'
      }
    });
    if (!res.ok) throw new Error('Error fetching joke');
    const data = await res.json();
    return {
      id: `dadjokes_${data.id || Math.random().toString()}`,
      question: data.joke,
      answer: '',
    };
  } catch (error) {
    console.error('Dad Jokes API error:', error);
    throw error;
  }
}

async function fetchJokeEN(): Promise<{ joke: Joke; source: string }> {
  const apis = [
    { name: 'Official Joke API', fn: fetchJokeFromOfficialAPI },
    { name: 'JokeAPI', fn: fetchJokeFromJokeAPI },
    { name: 'Dad Jokes API', fn: fetchJokeFromDadJokesAPI },
  ];

  for (const api of apis.sort(() => Math.random() - 0.5)) {
    try {
      const joke = await api.fn();
      if (joke.question?.trim()) {
        return { joke, source: api.name };
      }
    } catch (error) {
      console.warn(`Failed ${api.name}:`, error);
    }
  }

  return {
    joke: {
      id: `fallback_${Date.now()}`,
      question: "Why don't scientists trust atoms?",
      answer: "Because they make up everything!",
    },
    source: 'Fallback'
  };
}

// Sistema de tradução
async function translateText(text: string, target: string): Promise<string> {
  if (!text?.trim()) return text;
  
  const cacheKey = `${text}-${target}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  // Tentativa com Google Translate
  try {
    const res = await fetchWithTimeout(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`
    );
    
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data[0]?.[0]?.[0]) {
        const translated = data[0][0][0];
        translationCache.set(cacheKey, translated);
        return translated;
      }
    }
  } catch (error) {
    console.warn('Google Translate failed:', error);
  }

  // Fallback para MyMemory
  try {
    const res = await fetchWithTimeout(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${target}`
    );
    
    if (res.ok) {
      const data = await res.json();
      if (data?.responseData?.translatedText) {
        const translated = data.responseData.translatedText;
        translationCache.set(cacheKey, translated);
        return translated;
      }
    }
  } catch (error) {
    console.warn('MyMemory failed:', error);
  }

  // Fallback local
  const basicTranslations: Record<string, Record<string, string>> = {
    "Why don't scientists trust atoms?": {
      "pt": "Por que os cientistas não confiam em átomos?"
    },
    "Because they make up everything!": {
      "pt": "Porque eles compõem tudo!"
    }
  };

  return basicTranslations[text]?.[target] || text;
}

// Provider principal
export const JokesProvider = ({ children }: { children: ReactNode }) => {
  // Estados
  const [isLoading, setIsLoading] = useState(false);
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [translatedJoke, setTranslatedJoke] = useState<Joke | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [favorites, setFavorites] = useState<Joke[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });
  const [language, setLanguage] = useState<Language>('en');
  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const [currentApiSource, setCurrentApiSource] = useState<string | null>(null);

  // Helpers
  const safeTranslate = async (text: string, lang: string): Promise<string> => {
    try {
      return await translateText(text, lang);
    } catch (error) {
      console.warn('Translation failed:', error);
      return text;
    }
  };

  // Lógica principal
  const nextJoke = async () => {
    setIsLoading(true);
    setLoadingTranslation(false);
    setTranslatedJoke(null);
    
    try {
      let jokeData: { joke: Joke; source: string } | null = null;
      let attempts = 0;
      
      do {
        jokeData = await fetchJokeEN();
        attempts++;
      } while (jokeData && currentJoke && jokeData.joke.id === currentJoke.id && attempts < 5);
  
      if (jokeData) {
        setCurrentJoke(jokeData.joke);
        setCurrentApiSource(jokeData.source);
        
        if (language === 'pt') {
          setLoadingTranslation(true);
          try {
            const [question, answer] = await Promise.all([
              safeTranslate(jokeData.joke.question, 'pt'),
              jokeData.joke.answer ? safeTranslate(jokeData.joke.answer, 'pt') : Promise.resolve('')
            ]);
            
            if (question !== jokeData.joke.question) {
              setTranslatedJoke({ 
                ...jokeData.joke, 
                question,
                answer: answer || jokeData.joke.answer
              });
            }
          } finally {
            setLoadingTranslation(false);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch joke:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (joke: Joke) => {
    try {
      const [pergunta, resposta] = await Promise.all([
        safeTranslate(joke.question, 'pt'),
        joke.answer ? safeTranslate(joke.answer, 'pt') : Promise.resolve('')
      ]);
      
      setFavorites(prev => {
        const exists = prev.some(f => f.id === joke.id);
        const updatedJoke = { ...joke, pergunta, resposta };
        return exists 
          ? prev.filter(f => f.id !== joke.id) 
          : [...prev, updatedJoke];
      });
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  // Effects
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (!currentJoke || language === 'en') {
      setTranslatedJoke(null);
      setLoadingTranslation(false);
      return;
    }

    const translateCurrentJoke = async () => {
      setLoadingTranslation(true);
      try {
        const [question, answer] = await Promise.all([
          safeTranslate(currentJoke.question, 'pt'),
          currentJoke.answer ? safeTranslate(currentJoke.answer, 'pt') : Promise.resolve('')
        ]);
        
        if (question !== currentJoke.question || answer !== currentJoke.answer) {
          setTranslatedJoke({ ...currentJoke, question, answer });
        }
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedJoke(null);
      } finally {
        setLoadingTranslation(false);
      }
    };

    translateCurrentJoke();
  }, [language, currentJoke]);

  useEffect(() => {
    let mounted = true;
    
    const fetchInitialJoke = async () => {
      if (!currentJoke) {
        try {
          await nextJoke();
        } catch (error) {
          if (mounted) console.error("Initial joke error:", error);
        }
      }
    };

    fetchInitialJoke();

    return () => {
      mounted = false;
    };
  }, []);

  // Provider
  return (
    <JokesContext.Provider value={{ 
      currentJoke, 
      translatedJoke, 
      showAnswer, 
      favorites, 
      language, 
      setLanguage, 
      nextJoke, 
      toggleFavorite, 
      setShowAnswer, 
      loadingTranslation, 
      currentApiSource,
      isLoading
    }}>
      {children}
    </JokesContext.Provider>
  );
};

// Hook customizado
export const useJokes = () => {
  const ctx = useContext(JokesContext);
  if (!ctx) throw new Error('useJokes must be used within JokesProvider');
  return ctx;
};