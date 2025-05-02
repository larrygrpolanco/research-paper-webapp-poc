# Technical Context

## Technologies Used

### Frontend Framework
- **SvelteKit**: A framework for building web applications with Svelte, providing server-side rendering, routing, and other features.
- **Svelte**: A component-based JavaScript framework that compiles at build time, resulting in highly optimized vanilla JavaScript.

### Styling
- **CSS Variables**: Used for implementing a consistent design system.
- **CSS Grid and Flexbox**: Used for layout and responsive design.
- **Media Queries**: Used for responsive breakpoints.

### Data Visualization
- **Chart.js** (implied): Used for creating interactive charts for sentiment analysis.

### Data Processing
- **JavaScript**: Used for data transformation, filtering, and analysis.
- **JSON**: Used for storing structured data.

## Development Setup

### Project Structure
```
research-paper-webapp-poc/
├── memory-bank/         # Project documentation and context
├── plans/               # Planning documents and style guide
├── src/                 # Source code
│   ├── app.css          # Global styles and design system
│   ├── app.html         # HTML template
│   ├── lib/             # Library code
│   │   ├── components/  # Reusable UI components
│   │   ├── data/        # JSON data files
│   │   └── utils/       # Utility functions
│   └── routes/          # Page components and routing
└── static/              # Static assets
```

### Key Files
- **src/app.css**: Contains the design system with CSS variables for colors, typography, spacing, etc.
- **src/lib/data/**: Contains JSON files with the research data.
- **src/lib/components/**: Contains reusable UI components.
- **src/routes/**: Contains page components for each route.

## Technical Constraints

### Data Structure
- The data is stored in JSON files, which limits the ability to perform complex queries.
- Some data relationships are implicit (e.g., comments mentioning idols) rather than explicit.
- Korean text handling requires special consideration for proper display and search.

### Browser Compatibility
- The application uses modern CSS features like CSS Grid and CSS Variables, which may not be fully supported in older browsers.
- The application is designed to be responsive, but may have issues on very small or very large screens.

### Performance Considerations
- The application loads all data at once, which may cause performance issues with larger datasets.
- Client-side filtering and processing may become slow with a large number of comments.

## Dependencies

### Core Dependencies
- **SvelteKit**: Framework for building the application.
- **Vite**: Build tool and development server.

### Development Dependencies
- **ESLint**: For code linting.
- **Prettier**: For code formatting.

## Technical Decisions

### Why SvelteKit?
- SvelteKit provides a good balance of developer experience and end-user performance.
- The component-based architecture of Svelte makes it easy to create reusable UI components.
- SvelteKit's built-in routing and server-side rendering capabilities are well-suited for this type of application.

### Why JSON for Data?
- JSON is a simple, human-readable format that works well for the relatively small dataset used in this application.
- JSON can be easily imported and used in JavaScript without additional processing.
- The data structure is relatively simple and doesn't require a more complex database solution.

### Why CSS Variables for Styling?
- CSS Variables provide a consistent design system that can be easily updated.
- They allow for theming and responsive adjustments without duplicating code.
- They are well-supported in modern browsers and integrate well with component-based frameworks.

## Tool Usage Patterns

### Component Development
1. Create a new Svelte component in `src/lib/components/`.
2. Import and use the component in page components.
3. Style the component using CSS variables from `src/app.css`.

### Data Processing
1. Import JSON data from `src/lib/data/`.
2. Transform and filter the data as needed.
3. Pass the processed data to components for display.

### Page Development
1. Create a new Svelte component in `src/routes/`.
2. Import and use components from `src/lib/components/`.
3. Import and process data from `src/lib/data/`.
4. Implement page-specific logic and state management.

## Current Technical Issues

### Data Integration
- Filter counts showing zero (disconnect with the data).
- Some idols don't have comments associated with their profiles (possibly due to translation issues).
- Search functionality should check for Korean names too.

### Accessibility
- Several accessibility warnings in the console about click handlers without keyboard event handlers.
- Need to add proper ARIA roles to interactive elements.

### Performance
- The application loads all data at once, which may cause performance issues with larger datasets.
- Client-side filtering and processing may become slow with a large number of comments.

## Future Technical Considerations

### Enhanced Data Processing
- Implement more robust data processing utilities to handle complex filtering and analysis.
- Consider using a more structured data format or a lightweight database for better querying capabilities.

### Improved Accessibility
- Address the current accessibility issues and implement more robust accessibility patterns.
- Ensure all interactive elements are keyboard accessible and have proper ARIA roles.

### Performance Optimization
- Implement lazy loading for comments and other data to improve initial load time.
- Consider pagination or virtualization for large lists of comments.

### Internationalization
- Add support for multiple languages, particularly Korean.
- Implement proper handling of Korean text for display and search.
