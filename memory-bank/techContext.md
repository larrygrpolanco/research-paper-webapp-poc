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
   - Custom CSS classes for component styling
   - Tailwind CSS as a fallback for utility classes

### Data Visualization

1. **Chart.js**: For creating interactive data visualizations
   - Responsive charts that work across devices
   - Animation capabilities for engaging visualizations
   - Customizable appearance to match design system
   - Dynamic loading for performance optimization

### Media Integration

1. **YouTube Embed API**: For integrating the research videos
   - Control over playback
   - Event handling for user interactions
   - Customizable appearance
   - Timestamp navigation for specific accent examples

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
│   ├── app.css             # Global CSS including design tokens
│   ├── app.html            # HTML template
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Header.svelte
│   │   │   ├── Footer.svelte
│   │   │   ├── VideoPlayer.svelte
│   │   │   ├── CommentCard.svelte
│   │   │   ├── IdolProfile.svelte
│   │   │   ├── SentimentChart.svelte
│   │   │   ├── FilterBar.svelte
│   │   │   ├── AccentBadge.svelte
│   │   ├── utils/
│   │   │   ├── helpers.js         # General utility functions
│   │   ├── data/
│   │   │   ├── idols.json         # Data from Table 2 in the paper
│   │   │   ├── videos.json        # Data from Table 1 in the paper
│   │   │   ├── findings.json      # Key statistics from the paper
│   ├── routes/
│   │   ├── +page.svelte           # Home page with research summary
│   │   ├── +layout.svelte         # Main app layout
│   │   ├── videos/+page.svelte    # Video showcase
│   │   ├── idols/+page.svelte     # Idol profiles 
│   │   ├── comments/+page.svelte  # Comment explorer (placeholder for later)
│   │   ├── learn/+page.svelte     # Educational content
│   │   ├── about/+page.svelte     # About the research & credits
├── static/
│   ├── images/
│   ├── favicon.png
├── memory-bank/            # Project documentation
├── plans/                  # Planning documents
├── tests/                  # Test files
├── package.json            # Dependencies and scripts
├── svelte.config.js        # Svelte configuration
├── jsconfig.json           # JavaScript configuration
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
| tailwindcss | Utility CSS framework | Latest |
| @tailwindcss/forms | Form styling utilities | Latest |
| @tailwindcss/typography | Typography utilities | Latest |

### Development Dependencies

| Dependency | Purpose | Version |
|------------|---------|---------|
| vite | Build tool | Latest |
| eslint | Code linting | Latest |
| prettier | Code formatting | Latest |

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
- **Focus Management**: Visible focus indicators for keyboard users
- **Semantic HTML**: Using appropriate HTML elements for their intended purpose

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

3. **Accessibility Implementation**:
   - Use semantic HTML elements
   - Add appropriate ARIA attributes
   - Ensure keyboard navigation
   - Provide visible focus indicators
   - Test with screen readers

### Data Management

1. **Data Transformation**:
   - Transform raw research data into component-friendly formats
   - Create utility functions for common data operations @src/lib/utils/helpers.js
   - Cache processed data where appropriate

2. **State Management**:
   - Use Svelte stores for shared state
   - Keep state as close to components as possible
   - Derive computed values from base state

### CSS Implementation

1. **Design System**:
   - Define global CSS variables for design tokens
   - Implement consistent spacing, typography, and color systems
   - Create reusable component styles

2. **Responsive Design**:
   - Use mobile-first approach
   - Define breakpoints for different screen sizes
   - Implement flexible layouts that adapt to different viewport sizes

3. **Accessibility Considerations**:
   - Ensure sufficient color contrast
   - Provide visible focus indicators
   - Use appropriate font sizes and line heights
   - Implement proper spacing for touch targets

## Implemented Components

1. **Header.svelte**:
   - Responsive navigation with mobile menu support
   - Active page indication
   - Accessible navigation

2. **Footer.svelte**:
   - Three-column layout with research information and navigation
   - Responsive design that adapts to different screen sizes
   - Copyright and attribution information

3. **VideoPlayer.svelte**:
   - YouTube integration with metadata display
   - Timestamp navigation for specific accent examples
   - Responsive video container with 16:9 aspect ratio
   - Metadata display for video information

4. **CommentCard.svelte**:
   - Interactive cards with sentiment indicators
   - Tag support for categorization
   - Expandable content for long comments
   - Language indication for bilingual content

5. **IdolProfile.svelte**:
   - Detailed profile cards with sentiment analysis visualization
   - Demographic information display
   - Accent type visualization
   - Video reference links

6. **SentimentChart.svelte**:
   - Interactive pie chart with Chart.js
   - Accessible controls with keyboard navigation
   - Segment selection with visual feedback
   - Detailed information display for selected segments

7. **FilterBar.svelte**:
   - Collapsible filter system with multi-select capabilities
   - Category grouping for organized filtering
   - Count indicators for filter options
   - Clear selection functionality

8. **AccentBadge.svelte**:
   - Flexible badge component with color mapping for accent types
   - Size variants for different contexts
   - Outlined and filled style options
   - Automatic contrast calculation for text color

## Future Technical Considerations

While out of scope for the proof of concept, these technical considerations are documented for future reference:

1. **LLM Integration**: Allow users to input their own comments about accents and have an LLM analyze them in real-time
2. **Expanded Dataset**: Add functionality to analyze comments from newer videos
3. **User Contribution**: Let users submit additional examples of K-pop idols' English speech
4. **Accent Quiz**: Create an interactive game where users try to identify different English accents
5. **Performance Optimization**: Implement code splitting, lazy loading, and other performance optimizations
6. **Advanced Visualizations**: Add more complex data visualizations for deeper analysis
7. **Internationalization**: Add support for multiple languages beyond English and Korean
