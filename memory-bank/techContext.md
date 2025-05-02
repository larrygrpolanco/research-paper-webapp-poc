# K-Pop Accent Web App: Technical Context

## Technologies Used

### Core Framework

**SvelteKit**: The project uses SvelteKit as its core framework, providing several advantages for this type of application:

- **Component-based architecture**: Enables modular development and reusability
- **Built-in routing**: Simplifies navigation between different sections of the app
- **Static site generation**: Improves performance and SEO
- **Small bundle size**: Results in faster load times
- **Reactive by default**: Simplifies state management and UI updates

### Frontend Technologies

1. **Svelte**: The underlying component framework
   - Compile-time framework with minimal runtime
   - True reactivity without virtual DOM
   - Scoped CSS with component-level styling


2. **CSS**: Using a combination of approaches
   - Global CSS variables for design tokens
   - Component-scoped CSS for specific styling
   - Minimal use of CSS frameworks to keep bundle size small

### Data Visualization

1. **Chart.js**: For creating interactive data visualizations
   - Responsive charts that work across devices
   - Animation capabilities for engaging visualizations
   - Customizable appearance to match design system


### Media Integration

1. **YouTube Embed API**: For integrating the research videos
   - Control over playback
   - Event handling for user interactions
   - Customizable appearance

### Development Tools

1. **Vite**: Fast development server and build tool
   - Hot module replacement for quick development
   - Optimized builds for production
   - Plugin ecosystem for extending functionality

2. **ESLint & Prettier**: Code quality and formatting
   - Consistent code style
   - Automated formatting
   - Static analysis to catch common issues


## Development Setup

### Local Development Environment

```
research-paper-webapp-poc/
├── .vscode/                # VS Code configuration
├── node_modules/           # Dependencies
├── src/
├── lib/
│   ├── components/
│   │   ├── Header.svelte
│   │   ├── Footer.svelte
│   │   ├── VideoPlayer.svelte
│   │   ├── CommentCard.svelte
│   │   ├── IdolProfile.svelte
│   │   ├── SentimentChart.svelte
│   │   ├── FilterBar.svelte
│   │   ├── AccentBadge.svelte
│   ├── styles/
│   │   ├── global.css         // Global styles including design system variables 
│   ├── utils/
│   │   ├── helpers.js         // General utility functions
│   ├── data/
│   │   ├── idols.json         // Data from Table 2 in the paper
│   │   ├── videos.json        // Data from Table 1 in the paper
│   │   ├── findings.json      // Key statistics from the paper
├── routes/
│   ├── +page.svelte           // Home page with research summary
│   ├── +layout.svelte         // Main app layout
│   ├── videos/+page.svelte    // Video showcase
│   ├── idols/+page.svelte     // Idol profiles 
│   ├── comments/+page.svelte  // Comment explorer (placeholder for later)
│   ├── learn/+page.svelte     // Educational content
│   ├── about/+page.svelte     // About the research & credits
├── static/
│   ├── images/
│   ├── favicon.png
│   └── app.html            # HTML template
├── static/                 # Static assets
├── tests/                  # Test files
├── package.json            # Dependencies and scripts
├── svelte.config.js        # Svelte configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.js          # Vite configuration
```

### Development Workflow

1. **Setup**: Clone repository and install dependencies
   ```bash
   git clone <repository-url>
   cd research-paper-webapp-poc
   npm install
   ```

2. **Development Server**: Run local development server
   ```bash
   npm run dev
   ```

3. **Building**: Create production build
   ```bash
   npm run build
   ```

4. **Testing**: Run automated tests
   ```bash
   npm run test
   ```

5. **Linting**: Check code quality
   ```bash
   npm run lint
   ```

6. **Formatting**: Format code
   ```bash
   npm run format
   ```

### Version Control

- **Git**: For source code management
- **GitHub**: For repository hosting and collaboration
- **Conventional Commits**: For structured commit messages

## Dependencies

### Production Dependencies

| Dependency | Purpose | Version |
|------------|---------|---------|
| @sveltejs/kit | Core framework | Latest |
| svelte | Component framework | Latest |
| chart.js | Data visualization | Latest |
| d3 (optional) | Advanced visualizations | Latest |

### Development Dependencies

| Dependency | Purpose | Version |
|------------|---------|---------|
| vite | Build tool | Latest |
| eslint | Code linting | Latest |
| prettier | Code formatting | Latest |
| playwright | Testing | Latest |

## Technical Constraints

### Browser Compatibility

- **Modern Browsers**: Focus on supporting modern browsers (last 2 versions)
- **Responsive Design**: Support for mobile, tablet, and desktop viewports

### Performance Targets

- **Lighthouse Score**: Aim for 90+ in all categories
- **Initial Load**: Under 2 seconds on average connections
- **Time to Interactive**: Under 3 seconds
- **Bundle Size**: Main bundle under 100KB (compressed)

### Accessibility Requirements

- **WCAG 2.1 AA**: Compliance with accessibility standards
- **Keyboard Navigation**: Full functionality without mouse
- **Screen Reader Support**: Proper ARIA attributes and semantic HTML


### Deployment Considerations

- **Static Hosting**: Deployed as static files on Vercel
- **CDN Integration**: Content delivery network for assets
- **No Backend**: All functionality client-side or pre-rendered

## Tool Usage Patterns

### Component Development

1. **Atomic Design Methodology**:
   - Start with small, atomic components
   - Compose into larger, more complex components
   - Ensure each component has a single responsibility

2. **Component Documentation**:
   - Document props, events, and usage examples
   - Include accessibility considerations

### Data Management

1. **Data Transformation**:
   - Transform raw research data into component-friendly formats
   - Create utility functions for common data operations @src/lib/utils/helpers.js
   - Cache processed data where appropriate

2. **State Management**:
   - Use Svelte stores for shared state
   - Keep state as close to components as possible
   - Derive computed values from base state


## Future Technical Considerations

While out of scope for the proof of concept, these technical considerations are documented for future reference:

1. **LLM Integration**: Allow users to input their own comments about accents and have an LLM analyze them in real-time
2. **Expanded Dataset**: Add functionality to analyze comments from newer videos
3. **User Contribution**: Let users submit additional examples of K-pop idols' English speech
4. **Accent Quiz**: Create an interactive game where users try to identify different English accents





