# 🚀 Re1stx Tech - Portfólio Corporativo

![Re1stx Tech](assets/images/logo.png)

> Portfólio profissional e moderno desenvolvido para a Re1st Tech, empresa especializada em desenvolvimento front-end.

## 📋 Sobre o Projeto

Este é o site institucional da **Re1stx Tech**, uma empresa focada em oferecer soluções digitais acessíveis e de qualidade para pequenos empreendedores. O site apresenta os serviços, projetos, habilidades técnicas e informações de contato da empresa de forma elegante e profissional.

## ✨ Características Principais

### Design & UX
- **Interface Minimalista**: Design clean e profissional com foco na experiência do usuário
- **Animação Matrix**: Efeito de "chuva de código binário" exclusivo no hero e footer
- **Glassmorphism**: Efeitos de vidro fosco e transparências modernas
- **Navegação Inteligente**: Header que esconde ao rolar para baixo e aparece ao rolar para cima
- **Smooth Scroll**: Navegação suave entre seções com destaque visual do link ativo
- **Animações de Texto**: Efeito de digitação (typing) no hero e footer

### Responsividade
- **Mobile-First**: Totalmente responsivo em todos os dispositivos
- **Menu Mobile**: Drawer lateral com overlay escurecido
- **Breakpoints Otimizados**: 
  - 1200px (Tablets grandes)
  - 1000px (Tablets)
  - 768px (Tablets pequenos)
  - 600px (Mobile)
  - 400px (Mobile pequeno)
  - Landscape mobile

### Performance & Acessibilidade
- **Sem Dependências**: JavaScript vanilla puro, sem frameworks
- **Otimização de Animações**: 
  - FPS limitado (48fps) para economia de recursos
  - RequestAnimationFrame para animações suaves
  - Pause automático quando a página não está visível
- **Respeito ao Usuário**: Suporte a `prefers-reduced-motion` (desabilita animações se solicitado)
- **SEO Friendly**: Estrutura semântica HTML5
- **Acessibilidade**: Labels ARIA e navegação por teclado

## 🎨 Tecnologias Utilizadas

### Front-End
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: 
  - Custom Properties (variáveis CSS)
  - Flexbox & CSS Grid
  - Animações e transições
  - Backdrop-filter para efeitos glassmorphism
  - Media queries responsivas
- **JavaScript Vanilla**: 
  - Canvas API para animação Matrix
  - IntersectionObserver para animações em scroll
  - Event delegation e otimização de performance

### Recursos Visuais
- **Ícones SVG**: React, HTML5, CSS3, JavaScript, Git, NPM
- **Tipografia**: Inter (Google Fonts fallback)
- **Esquema de Cores**:
  - Primária: `#7c4dff` (Roxo vibrante)
  - Background: `#0b0b0c` (Preto profundo)
  - Texto: `#eaeaea` (Branco suave)
  - Muted: `#a6a6a6` (Cinza médio)

## 🏗️ Estrutura do Projeto

```
portifolio/
├── assets/
│   └── images/          # Logos, imagens de projetos, ícones
├── css/
│   └── styles.css       # Estilos principais (946 linhas)
├── js/
│   ├── matrix.js        # Animação Matrix (multi-canvas)
│   ├── decode.js        # Animação de digitação
│   └── scripts.js       # Navegação e interações
├── index.html           # Página principal
└── README.md            # Este arquivo
```

## 🎯 Funcionalidades Detalhadas

### 1. Animação Matrix
- **Multi-Canvas**: Suporte para múltiplos canvases independentes
- **Customização via CSS**:
  ```css
  --matrix-color: #7c4dff;
  --matrix-intensity: 1;
  --matrix-speed: 0.35;
  --matrix-alpha: 0.45;
  ```
- **Otimizações**:
  - Device Pixel Ratio (DPR) para telas Retina
  - Colunas ativas baseadas em intensidade
  - Velocidade variável por coluna
  - Fade suave para criar rastros

### 2. Navegação Responsiva
- **Desktop**: Menu horizontal com hover effects e indicador de seção ativa
- **Mobile**: 
  - Hamburger menu animado
  - Drawer lateral com backdrop blur
  - Fechamento automático ao clicar fora ou em um link
  - Smooth scroll integrado

### 3. Seções do Site

#### 🏠 Hero
- Logo centralizado com shadow effect
- Título com animação de digitação
- Subtítulo animado
- Animação Matrix de fundo

#### 📖 Sobre a Empresa
- Grid responsivo imagem + texto
- Descrição dos valores e diferenciais
- Layout adaptável para mobile

#### 👔 CEO
- Foto profissional com bordas estilizadas
- Biografia e links sociais
- Hover effects sutis

#### 💼 Projetos em Destaque
- Cards com preview de imagem
- Tags de tecnologias utilizadas
- Links para demo e código-fonte
- Hover com elevação e glow effect

#### 🛠️ Habilidades & Tecnologias
- Grid de skills com ícones SVG
- Descrições concisas
- Hover interativo

#### 📞 Contato
- Cards minimalistas para WhatsApp e E-mail
- Ícones grandes e claros
- Hover com feedback visual

#### 🦶 Footer
- Logo centralizado
- Texto animado (typing effect)
- Links sociais (GitHub, LinkedIn)
- Copyright dinâmico
- Animação Matrix de fundo


## 📱 Compatibilidade

- ✅ Chrome / Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Opera (v76+)
- ✅ Navegadores mobile modernos


## 📄 Licença

© 2025 Re1stx Tech. Todos os direitos reservados.

## 👨‍💻 Desenvolvido por

**Pedro Reis** - CEO & Front-End Developer  
- [LinkedIn](https://www.linkedin.com/in/re1stx/)
- [GitHub](https://github.com/Re1st-01)

---

<p align="center">
  <strong>Re1stx Tech</strong> - Soluções em Front-end modernas e acessíveis
</p>
