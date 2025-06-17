# 🤣 APP PIADA DE TIOZÃO
## 🚀 Como rodar o projeto
### 1️⃣ Instalar as dependências
Primeiro, certifique-se de ter o Yarn instalado globalmente:
```
npm install -g yarn
```

Depois, instale as dependências do projeto:
```
yarn
```
### 2️⃣ Rodar o servidor local
```
  yarn dev
```
## 🧠 Boas práticas do projeto
### 👉 Seguimos as boas práticas de desenvolvimento React com componentização na seguinte estrutura:

```
📦 src
├── 📁 assets            # Imagens e ícones
│   └── 📄 react.svg     
├── 📁 components        # Componentes reutilizáveis (Ex: Card de piada, Navigation...)
│   └── 📄 Navigation.tsx
├── 📁 pages             # Páginas do app
│   ├── 📄 About.tsx
│   ├── 📄 Favorites.tsx
│   ├── 📄 Home.tsx
│   └── 📄 Jokes.tsx
├── 📄 App.css
├── 📄 App.tsx
├── 📄 index.css
└── 📄 main.tsx
```
🔥 Padrão: Mantemos os arquivos organizados em pages para telas completas e components para pedaços reutilizáveis da interface.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
