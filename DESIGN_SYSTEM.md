# 🎨 Design System - Piada de Tiozão

## 📋 Visão Geral

Este documento descreve o sistema de design implementado no projeto "Piada de Tiozão", seguindo as melhores práticas de CSS moderno com variáveis customizadas (CSS Custom Properties).

## 🎯 Princípios do Design

- **Consistência**: Uso de tokens de design padronizados
- **Escalabilidade**: Sistema modular e reutilizável
- **Acessibilidade**: Suporte a preferências de usuário
- **Responsividade**: Design adaptável a diferentes telas
- **Performance**: CSS otimizado e eficiente

## 🎨 Paleta de Cores

### Cores Primárias
```css
--color-primary: #FFD36E;        /* Amarelo principal */
--color-primary-dark: #E6BE5F;   /* Amarelo escuro */
--color-primary-light: #FFE08C;  /* Amarelo claro */
```

### Cores Secundárias
```css
--color-secondary: #6B4F1D;      /* Marrom principal */
--color-secondary-dark: #5A4218; /* Marrom escuro */
--color-secondary-light: #8B6A2A; /* Marrom claro */
```

### Cores de Estado
```css
--color-success: #4CAF50;        /* Verde - sucesso */
--color-warning: #FF9800;        /* Laranja - aviso */
--color-error: #F44336;          /* Vermelho - erro */
--color-info: #2196F3;           /* Azul - informação */
```

### Cores Neutras
```css
--color-white: #FFFFFF;
--color-black: #000000;
--color-gray-50: #FAFAFA;
--color-gray-100: #F5F5F5;
--color-gray-200: #EEEEEE;
--color-gray-300: #E0E0E0;
--color-gray-400: #BDBDBD;
--color-gray-500: #9E9E9E;
--color-gray-600: #757575;
--color-gray-700: #616161;
--color-gray-800: #424242;
--color-gray-900: #212121;
```

## 📝 Tipografia

### Famílias de Fontes
```css
--font-family-primary: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-family-secondary: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Tamanhos de Fonte
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
```

### Pesos de Fonte
```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Altura da Linha
```css
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

## 📏 Espaçamento

### Sistema de Espaçamento
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
```

## 🔲 Bordas

### Raios de Borda
```css
--border-radius-sm: 0.25rem;   /* 4px */
--border-radius-md: 0.5rem;    /* 8px */
--border-radius-lg: 0.75rem;   /* 12px */
--border-radius-xl: 1rem;      /* 16px */
--border-radius-2xl: 1.5rem;   /* 24px */
--border-radius-full: 9999px;
```

### Espessuras de Borda
```css
--border-width-thin: 1px;
--border-width-normal: 2px;
--border-width-thick: 3px;
```

## 🌟 Sombras

### Sistema de Sombras
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

## ⚡ Transições

### Durações de Transição
```css
--transition-fast: 150ms ease-in-out;
--transition-normal: 250ms ease-in-out;
--transition-slow: 350ms ease-in-out;
```

## 📱 Breakpoints

### Pontos de Quebra
```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

## 🎭 Animações

### Animações Disponíveis
- `fade-in`: Aparecimento suave
- `slide-up`: Deslizar para cima
- `pulse`: Pulsação
- `spin`: Rotação

### Classes de Animação
```css
.animate-fade-in
.animate-slide-up
.animate-pulse
```

## 🧩 Componentes

### Cards
```css
.card                    /* Card básico */
.card--elevated         /* Card com sombra elevada */
.card--interactive      /* Card interativo */
```

### Layout
```css
.app-container          /* Container principal */
.app-content           /* Conteúdo do app */
.container             /* Container genérico */
.container--sm         /* Container pequeno */
.container--lg         /* Container grande */
```

### Grid System
```css
.grid                   /* Grid básico */
.grid--2               /* 2 colunas */
.grid--3               /* 3 colunas */
.grid--4               /* 4 colunas */
```

### Flexbox Utilitários
```css
.flex                   /* Display flex */
.flex--center          /* Centralizado */
.flex--between         /* Space between */
.flex--around          /* Space around */
.flex--column          /* Direção coluna */
.flex--wrap            /* Wrap */
```

## 📱 Responsividade

### Mobile First
O design segue a abordagem "mobile first", com breakpoints progressivos:

```css
/* Mobile (até 768px) */
@media (max-width: 768px) {
  /* Ajustes para mobile */
}

/* Tablet (até 480px) */
@media (max-width: 480px) {
  /* Ajustes para tablet */
}
```

## ♿ Acessibilidade

### Preferências do Usuário
```css
/* Redução de movimento */
@media (prefers-reduced-motion: reduce) {
  /* Remove animações */
}

/* Modo escuro (futuro) */
@media (prefers-color-scheme: dark) {
  /* Ajustes para modo escuro */
}
```

## 🎯 Como Usar

### 1. Variáveis CSS
```css
.my-component {
  background-color: var(--color-primary);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}
```

### 2. Classes Utilitárias
```html
<div class="card card--elevated animate-fade-in">
  <h2 class="text-center font-bold">Título</h2>
  <p class="text-gray-600">Conteúdo</p>
</div>
```

### 3. Layout Responsivo
```html
<div class="container">
  <div class="grid grid--2">
    <div class="card">Item 1</div>
    <div class="card">Item 2</div>
  </div>
</div>
```

## 🔧 Manutenção

### Adicionando Novas Variáveis
1. Defina a variável no `:root`
2. Documente no `DESIGN_SYSTEM.md`
3. Use em componentes existentes
4. Teste em diferentes dispositivos

### Boas Práticas
- ✅ Use sempre variáveis CSS
- ✅ Mantenha consistência nos nomes
- ✅ Teste acessibilidade
- ✅ Documente mudanças
- ❌ Evite valores hardcoded
- ❌ Não quebre a hierarquia

## 📚 Recursos

- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Design Tokens](https://www.designtokens.org/)
- [CSS Architecture](https://css-tricks.com/css-architecture/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) 