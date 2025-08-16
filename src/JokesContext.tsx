import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

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
}

const JokesContext = createContext<JokesContextType | undefined>(undefined);

export const useJokes = () => {
  const ctx = useContext(JokesContext);
  if (!ctx) throw new Error('useJokes must be used within JokesProvider');
  return ctx;
};

// API 1: Official Joke API (atual)
async function fetchJokeFromOfficialAPI(): Promise<Joke> {
  const res = await fetch('https://official-joke-api.appspot.com/jokes/random');
  if (!res.ok) throw new Error('Error fetching joke from Official API');
  const data = await res.json();
  return {
    id: `official_${data.id?.toString() || Math.random().toString()}`,
    question: data.setup,
    answer: data.punchline,
  };
}

// API 2: JokeAPI (alternativa)
async function fetchJokeFromJokeAPI(): Promise<Joke> {
  const res = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode');
  if (!res.ok) throw new Error('Error fetching joke from JokeAPI');
  const data = await res.json();
  
  if (data.type === 'single') {
    return {
      id: `jokeapi_${data.id?.toString() || Math.random().toString()}`,
      question: data.joke,
      answer: '',
    };
  } else {
    return {
      id: `jokeapi_${data.id?.toString() || Math.random().toString()}`,
      question: data.setup,
      answer: data.delivery,
    };
  }
}

// API 3: Dad Jokes API
async function fetchJokeFromDadJokesAPI(): Promise<Joke> {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Piada de Tiozão App (https://github.com/seu-usuario/piada-de-tiozao)'
    }
  });
  if (!res.ok) throw new Error('Error fetching joke from Dad Jokes API');
  const data = await res.json();
  return {
    id: `dadjokes_${data.id?.toString() || Math.random().toString()}`,
    question: data.joke,
    answer: '',
  };
}

// // API 4: Chuck Norris Jokes (para variedade)
// async function fetchJokeFromChuckNorrisAPI(): Promise<Joke> {
//   const res = await fetch('https://api.chucknorris.io/jokes/random');
//   if (!res.ok) throw new Error('Error fetching joke from Chuck Norris API');
//   const data = await res.json();
//   return {
//     id: `chuck_${data.id?.toString() || Math.random().toString()}`,
//     question: data.value,
//     answer: '',
//   };
// }

// Função principal que tenta todas as APIs com fallback
async function fetchJokeEN(): Promise<{ joke: Joke; source: string }> {
  const apis = [
    { name: 'Official Joke API', fn: fetchJokeFromOfficialAPI },
    { name: 'JokeAPI', fn: fetchJokeFromJokeAPI },
    { name: 'Dad Jokes API', fn: fetchJokeFromDadJokesAPI },
    // { name: 'Chuck Norris API', fn: fetchJokeFromChuckNorrisAPI },
  ];

  // Embaralha a ordem das APIs para dar variedade
  const shuffledApis = [...apis].sort(() => Math.random() - 0.5);

  for (const api of shuffledApis) {
    try {
      console.log(`Tentando buscar piada de: ${api.name}`);
      const joke = await api.fn();
      
      // Valida se a piada tem conteúdo válido
      if (joke.question && joke.question.trim().length > 0) {
        console.log(`✅ Piada obtida com sucesso de: ${api.name}`);
        return { joke, source: api.name };
      }
      throw new Error('Piada vazia ou inválida');
    } catch (error) {
      console.warn(`❌ Falha ao buscar piada de ${api.name}:`, error);
      continue; // Tenta a próxima API
    }
  }

  // Se todas as APIs falharem, retorna uma piada padrão
  console.warn('Todas as APIs falharam, usando piada padrão');
  return {
    joke: {
      id: `fallback_${Date.now()}`,
      question: "Why don't scientists trust atoms?",
      answer: "Because they make up everything!",
    },
    source: 'Piada Padrão'
  };
}

// Traduz texto usando Google Translate API (alternativa gratuita)
async function translateText(text: string, target: string): Promise<string> {
  try {
    // Primeira tentativa: Google Translate
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${target}&dt=t&q=${encodeURIComponent(text)}`);
    
    if (!res.ok) throw new Error('Erro ao traduzir');
    
    const data = await res.json();
    // A resposta vem em formato aninhado, pegamos o primeiro elemento
    
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      if (data && data[0] && data[0][1] && data[0][1][0]) {
        return `${data[0][0][0]} ${data[0][1][0]}`;
      }
      return data[0][0][0];
    }
    throw new Error('Formato de resposta inválido');
  } catch (error) {
    console.error('Erro na tradução Google:', error);
    return text; // Retorna o texto original em caso de erro
  }
}

export const JokesProvider = ({ children }: { children: ReactNode }) => {
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

  // Salva favoritos no localStorage sempre que mudar
  React.useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Busca uma nova piada da API
  const nextJoke = async () => {
    setLoadingTranslation(false);
    setTranslatedJoke(null);
    let jokeData: { joke: Joke; source: string } | null = null;
    let attempts = 0;
    do {
      jokeData = await fetchJokeEN();
      attempts++;
    } while (jokeData && currentJoke && jokeData.joke.id === currentJoke.id && attempts < 5);
    
    if (jokeData) {
      setCurrentJoke(jokeData.joke);
      setCurrentApiSource(jokeData.source);
      
      // Se idioma não for inglês, traduz automaticamente
      if (language === 'pt' && jokeData.joke) {
        setLoadingTranslation(true);
        try {
          const question = await translateText(jokeData.joke.question, 'pt');
          const answer = await translateText(jokeData.joke.answer, 'pt');
          
          // Verifica se a tradução realmente funcionou (não retornou o texto original)
          if (question !== jokeData.joke.question || answer !== jokeData.joke.answer) {
            setTranslatedJoke({ ...jokeData.joke, question, answer });
          } else {
            setTranslatedJoke(null);
          }
        } catch {
          setTranslatedJoke(null);
        }
        setLoadingTranslation(false);
      }
    }
  };

  // Traduz a piada atual ao trocar idioma
  React.useEffect(() => {
      setLoadingTranslation(true);

    if (!currentJoke) return;
    if (language === 'en') {
      setTranslatedJoke(null);
      setLoadingTranslation(false);
    } else {
      setLoadingTranslation(true);
      Promise.all([
        translateText(currentJoke.question, 'pt'),
        translateText(currentJoke.answer, 'pt')
      ]).then(([question, answer]) => {
        // Verifica se a tradução realmente funcionou (não retornou o texto original)
        if (question !== currentJoke.question || answer !== currentJoke.answer) {
          setTranslatedJoke({ ...currentJoke, question, answer });
        } else {
          setTranslatedJoke(null);
        }
        setLoadingTranslation(false);
      }).catch(() => {
        setTranslatedJoke(null);
        setLoadingTranslation(false);
      });
    }
    // eslint-disable-next-line
  }, [language]);

  // Inicializa com uma piada ao carregar
  React.useEffect(() => {
    if (!currentJoke) {
      nextJoke();
    }
    // eslint-disable-next-line
  }, []);

  const toggleFavorite = (joke: Joke) => {
    Promise.all([
      translateText(joke.question, 'pt'),
      translateText(joke.answer, 'pt')
    ]).then(([question, answer]) => {
      console.log(joke)
      joke.pergunta = question;
      joke.resposta = answer;
      setFavorites((prev) =>
        prev.some((f) => f.id === joke.id)
          ? prev.filter((f) => f.id !== joke.id)
          : [...prev, joke]
      );
    }).catch(() => {
      setTranslatedJoke(null);
      setLoadingTranslation(false);
    });
    
  };

  return (
    <JokesContext.Provider value={{ currentJoke, translatedJoke, showAnswer, favorites, language, setLanguage, nextJoke, toggleFavorite, setShowAnswer, loadingTranslation, currentApiSource }}>
      {children}
    </JokesContext.Provider>
  );
}; 