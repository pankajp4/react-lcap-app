# React LCAP - Low-Code Application Platform

<div align="center">

![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646cff?logo=vite&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.9.0-764abc?logo=redux&logoColor=white)
![Material-UI](https://img.shields.io/badge/MUI-7.3.2-007FFF?logo=mui&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

**A powerful visual UI builder for rapid application development**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Development](#-development)
- [Testing](#-testing)
- [Building](#-building)
- [Configuration](#-configuration)
- [Architecture](#-architecture)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🚀 Overview

**React LCAP** (Low-Code Application Platform) is a modern, visual drag-and-drop UI builder that empowers developers and non-technical users to create dynamic user interfaces rapidly. Built with cutting-edge technologies, it provides an intuitive interface for designing, customizing, and exporting production-ready React components.

### Why React LCAP?

- ⚡ **Fast Development**: Build UIs 10x faster with visual tools
- 🎨 **No Design Skills Needed**: Pre-built Material-UI components
- 💻 **Export Clean Code**: Generate production-ready TypeScript/React code
- 🔄 **Reusable Templates**: Save and share component templates
- 🎯 **Type-Safe**: Full TypeScript support throughout
- 📱 **Responsive**: Built-in responsive design support

---

## ✨ Features

### Core Features

- **🎨 Visual Drag & Drop Builder**

  - Intuitive component palette
  - Real-time canvas updates
  - Component nesting and positioning
  - Snap-to-grid alignment

- **🔧 Property Customization**

  - Dynamic property panels
  - Live property editing
  - Visual property editors (color picker, etc.)
  - Type-safe property validation

- **📦 Template Management**

  - Save custom component templates
  - Template versioning
  - Import/export templates (JSON)
  - Template categorization and search

- **💾 Code Export**

  - Generate React functional components
  - TypeScript interfaces
  - Material-UI integration
  - Styled components support

- **↩️ Undo/Redo**

  - Unlimited history
  - Keyboard shortcuts (Ctrl+Z, Ctrl+Y)
  - State persistence

- **👁️ Live Preview**
  - Real-time component preview
  - Responsive preview modes
  - Interactive testing

### Component Library

- **Layout**: Container, Grid, Box, Stack
- **Inputs**: TextField, Select, Checkbox, Radio, Switch
- **Display**: Typography, Card, Paper, Divider
- **Feedback**: Alert, Snackbar, Dialog, Progress
- **Navigation**: AppBar, Tabs, Menu, Breadcrumbs
- **Data Display**: Table, List, Avatar, Badge

---

## 🛠 Tech Stack

### Frontend Core

- **React 19.1.1** - UI framework
- **TypeScript 5.8.3** - Type safety
- **Vite 7.1.2** - Build tool & dev server

### State Management

- **Redux Toolkit 2.9.0** - State management
- **React Redux 9.2.0** - React bindings

### UI Framework

- **Material-UI 7.3.2** - Component library
- **Emotion 11.14.0** - CSS-in-JS styling

### Drag & Drop

- **@dnd-kit 6.3.1** - Drag and drop functionality

### Form Handling

- **React Hook Form 7.62.0** - Form management
- **Yup 1.7.0** - Schema validation

### Development Tools

- **Vitest 3.2.4** - Unit testing
- **ESLint 8.57.1** - Code linting
- **TypeDoc 0.28.12** - Documentation generation

---

## 🚦 Quick Start

### Prerequisites

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0 or **yarn**: >= 1.22.0
- **Git**: >= 2.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/pankajp4/react-lcap-app.git

# Navigate to project directory
cd react-lcap-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open automatically at `http://localhost:5173`

### Docker Setup (Optional)

```bash
# Build Docker image
docker build -t react-lcap .

# Run container
docker run -p 5173:5173 react-lcap
```

---

## 📁 Project Structure

```
react-lcap-app/
├── src/
│   ├── components/          # UI Components (Atomic Design)
│   │   ├── atoms/          # Basic building blocks
│   │   ├── molecules/      # Simple component groups
│   │   ├── organisms/      # Complex sections
│   │   └── templates/      # Page-level layouts
│   │
│   ├── pages/              # Application pages
│   │   └── ui-builder/     # UI Builder feature
│   │
│   ├── store/              # Redux store
│   │   ├── builder/        # Builder state
│   │   ├── form/           # Form state
│   │   ├── history/        # Undo/redo state
│   │   ├── loading/        # Loading state
│   │   └── notification/   # Notification state
│   │
│   ├── services/           # API service layer
│   ├── utils/              # Utility functions
│   ├── config/             # Configuration files
│   ├── types/              # TypeScript types
│   ├── styles/             # Global styles
│   └── test/               # Test utilities
│
├── public/                 # Static assets
├── coverage/               # Test coverage reports
└── docs/                   # Documentation
```

### Path Aliases

The project uses TypeScript path aliases for clean imports:

```typescript
import { Button } from "@atoms/button";
import { ComponentSidebar } from "@organisms/component-sidebar";
import { builderSlice } from "@store/builder";
import { ComponentType } from "@/types/builder";
```

**Available aliases**: `@components`, `@atoms`, `@molecules`, `@organisms`, `@templates`, `@pages`, `@store`, `@/types`, `@utils`, `@config`, `@services`, `@styles`, `@assets`, `@test`

---

## 📜 Available Scripts

### Development

```bash
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix auto-fixable ESLint issues
npm run type-check   # Run TypeScript compiler check
```

### Testing

```bash
npm run test              # Run unit tests
npm run test:ui           # Run tests with UI
npm run test:coverage     # Generate coverage report
npm run test:watch        # Run tests in watch mode
```

### Documentation

```bash
npm run typedoc      # Generate API documentation
```

### Maintenance

```bash
npm run clean        # Clean build artifacts
npm outdated         # Check for outdated packages
npm audit            # Security audit
```

---

## 💻 Development

### Setting Up Your IDE

**VS Code** (Recommended)

Install the following extensions:

- ESLint
- TypeScript + JavaScript
- Prettier - Code formatter
- vscode-styled-components
- Path Intellisense

**Recommended settings** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### Coding Standards

- **Code Style**: Follow ESLint rules
- **Naming Conventions**:

  - Components: `PascalCase`
  - Files: `PascalCase` for components, `camelCase` for utilities
  - Functions: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Types/Interfaces: `PascalCase`

- **Component Structure**:

  ```typescript
  // Imports
  import React from "react";

  // Types
  interface ComponentProps {
    // ...
  }

  // Component
  export const Component: React.FC<ComponentProps> = (props) => {
    // Hooks
    // Event handlers
    // Render
  };
  ```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature"

# Push to remote
git push origin feature/your-feature-name

# Create Pull Request
```

**Commit Message Format**:

```
type(scope): subject

body

footer
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Run specific test file
npm run test src/components/atoms/button/Button.test.tsx

# Run in watch mode
npm run test:watch
```

### Writing Tests

```typescript
import { render, screen } from "@testing-library/react";
import { Button } from "@atoms";

describe("Button", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

### Coverage Goals

- **Statements**: >= 80%
- **Branches**: >= 75%
- **Functions**: >= 80%
- **Lines**: >= 80%

---

## 🏗 Building

### Production Build

```bash
npm run build
```

Outputs to `dist/` directory.

### Build Optimization

- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Dead code elimination
- **Minification**: Terser for JS, cssnano for CSS
- **Compression**: Gzip compression enabled

### Build Analysis

```bash
npm run build -- --mode analyze
```

---

## ⚙️ Configuration

### Environment Variables

Create `.env` file in root:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=React LCAP
VITE_APP_VERSION=1.0.0
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

### TypeScript Configuration

- **tsconfig.json**: Base configuration
- **tsconfig.app.json**: Application code configuration
- **tsconfig.node.json**: Node.js scripts configuration

### Vite Configuration

Key configurations in `vite.config.ts`:

- Path aliases
- Plugin setup (React, Emotion)
- Build options
- Dev server settings
- Test configuration

---

## 🏛 Architecture

### Design Patterns

1. **Atomic Design**: Component organization
2. **Redux Pattern**: Centralized state management
3. **Repository Pattern**: Data access abstraction
4. **Factory Pattern**: Component creation
5. **Observer Pattern**: State subscriptions
6. **Composition Pattern**: Component composition

### State Management Flow

```
Component → Dispatch Action → Reducer → Update Store → Re-render Components
```

### Component Hierarchy

```
App
├── BuilderLayout
│   ├── TopNavbar
│   ├── ComponentSidebar
│   ├── BuilderCanvas
│   │   └── ComponentRenderer (recursive)
│   └── PropertiesSidebar
└── NotificationSystem
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. **Fork** the repository
2. **Clone** your fork
3. **Create** a feature branch
4. **Make** your changes
5. **Test** your changes
6. **Commit** with conventional commits
7. **Push** to your fork
8. **Submit** a Pull Request

### Development Setup for Contributors

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/react-lcap-app.git
cd react-lcap-app

# Add upstream remote
git remote add upstream https://github.com/pankajp4/react-lcap-app.git

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/your-feature

# Start development
npm run dev
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Project Maintainer**: Pankaj P

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - The foundation
- [Material-UI](https://mui.com/) - Beautiful components
- [Redux Toolkit](https://redux-toolkit.js.org/) - Simplified Redux
- [Vite](https://vitejs.dev/) - Lightning-fast build tool
- [dnd kit](https://dndkit.com/) - Drag and drop utilities

---

## 📚 Documentation

- **[Technical Requirements Document](TECHNICAL_REQUIREMENTS.md)** - Comprehensive technical documentation
- **[API Documentation](docs/api/)** - Generated API docs (run `npm run typedoc`)

---

## 🗺️ Roadmap

### Version 1.0 (Current)

- ✅ Visual UI Builder
- ✅ Component Library
- ✅ Template Management
- ✅ Code Export
- ✅ Undo/Redo

### Version 2.0

- [ ] Advanced Components
- [ ] Collaboration Features
- [ ] Backend Integration
- [ ] Theme Customization

### Version 3.0

- [ ] One-click Deployment
- [ ] Testing Tools
- [ ] Component Marketplace
- [ ] Plugin System

See [TECHNICAL_REQUIREMENTS.md](TECHNICAL_REQUIREMENTS.md#future-scope) for detailed roadmap.

---
