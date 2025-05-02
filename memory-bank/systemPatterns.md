# K-Pop Accent Web App: System Patterns

## System Architecture

The K-Pop Accent Web App follows a component-based architecture using SvelteKit, with a focus on modularity, reusability, and clear separation of concerns. As a proof of concept, the architecture prioritizes simplicity and maintainability while establishing patterns that could scale for future expansion.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      SvelteKit App                       │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │    Routes   │  │ Components  │  │  Data Stores    │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
│         │               │                  │            │
│         ▼               ▼                  ▼            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │    Pages    │  │   Shared    │  │  Static Data    │  │
│  │             │  │  Components │  │                 │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Static Site Generation**: The application uses SvelteKit's static site generation capabilities to pre-render pages at build time, improving performance and SEO.

2. **Client-Side Interactivity**: While pages are pre-rendered, interactive elements use client-side JavaScript for dynamic features like filtering, sorting, and visualizations.

3. **JSON Data Sources**: Research data is stored in structured JSON files, making it easy to update and maintain without a database.

4. **Component Composition**: Features are built by composing smaller, reusable components that can be combined in different ways.

5. **Progressive Enhancement**: Core content is accessible without JavaScript, with enhanced interactivity added when available.

## Component Relationships

### Core Components and Their Relationships

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Header.svelte │     │ Footer.svelte   │     │ Layout.svelte   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │                       │
         └──────────────────────┼───────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Page Components                          │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────┤
│  Home Page  │Video Hub    │Idol Profiles│ Comment     │ Learn   │
│             │             │             │ Explorer    │ Section │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────┘
         │             │             │             │          │
         └─────────────┴─────────────┴─────────────┴──────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Shared UI Components                        │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────┤
│VideoPlayer  │IdolProfile  │CommentCard  │SentimentChart│FilterBar│
└─────────────┴─────────────┴─────────────┴─────────────┴─────────┘
```

### Data Flow Patterns

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  JSON Data  │────▶│  Data Store │────▶│  Components │
└─────────────┘     └─────────────┘     └─────────────┘
                          │                    │
                          │                    │
                          ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │User Actions │◀────│   UI Events │
                    └─────────────┘     └─────────────┘
                          │
                          │
                          ▼
                    ┌─────────────┐
                    │State Updates│
                    └─────────────┘
```

## Design Patterns

### Component Design Patterns

1. **Container/Presentational Pattern**:
   - Container components manage data and state
   - Presentational components focus on rendering UI
   - Example: CommentExplorer (container) uses CommentCard (presentational)

2. **Composition Pattern**:
   - Complex components built from simpler ones
   - Shared functionality extracted to reusable components
   - Example: IdolProfile composed of AccentBadge, ProfileImage, etc.

3. **Props Down, Events Up**:
   - Data flows down through props
   - Events bubble up through custom event dispatchers
   - Maintains predictable data flow and component independence

### State Management Patterns

1. **Local Component State**:
   - Simple components manage their own state
   - Used for UI-specific state like toggle status, form inputs

2. **Stores for Shared State**:
   - Svelte stores for state shared across components
   - Used for filter selections, active items, and global settings

3. **Derived Stores**:
   - Computed values based on other stores
   - Used for filtered data sets and aggregated statistics

### Routing Patterns

1. **Feature-Based Routes**:
   - Each major feature has its own route
   - Nested routes for sub-features where appropriate

2. **Shared Layout**:
   - Common layout elements across all routes
   - Consistent navigation and branding

3. **Dynamic Parameters**:
   - Routes with parameters for specific items
   - Example: /idols/[name] for individual idol profiles

## Implementation Patterns

### Data Handling

1. **Static Data Files**:
   - JSON files for research data
   - Imported and processed at build time

2. **Data Transformation**:
   - Helper functions to transform raw data into component-friendly formats
   - Centralized in utility modules

3. **Lazy Loading**:
   - Large data sets loaded only when needed
   - Improves initial load performance

### UI Patterns

1. **Responsive Design**:
   - Mobile-first approach
   - Breakpoints defined in global CSS variables
   - Flexible layouts that adapt to different screen sizes

2. **Consistent Visual Language**:
   - Design tokens for colors, spacing, typography
   - Component-specific styles that inherit from global tokens

3. **Progressive Disclosure**:
   - Show essential information first
   - Details available through user interaction
   - Prevents overwhelming users with too much information

### Accessibility Patterns

1. **Semantic HTML**:
   - Proper use of HTML elements
   - ARIA attributes where needed

2. **Keyboard Navigation**:
   - All interactive elements accessible via keyboard
   - Focus management for complex components

3. **Screen Reader Support**:
   - Alternative text for visual elements
   - Appropriate ARIA roles and labels

## Critical Implementation Paths

### Phase 1: Foundation

1. **Design System Implementation**
   - Global styles and design tokens
   - Core UI components
   - Responsive layout framework

2. **Video Hub**
   - YouTube video embedding
   - Video metadata display
   - Basic navigation

3. **Idol Profiles**
   - Profile templates
   - Data structure for idol information
   - Accent type visualization

4. **Educational Framework**
   - Content structure for linguistic concepts
   - Interactive elements for key terms
   - Visual explanations of research context

### Phase 2: Data Integration

1. **Comment Data Structure**
   - Schema design for comments
   - Processing and normalization
   - Indexing for search and filtering

2. **Interactive Visualizations**
   - Chart components for research findings
   - Filter and selection mechanisms
   - Data-driven insights

3. **Cross-Feature Navigation**
   - Connecting related content across features
   - Contextual links between components
   - Unified user journey

## Scalability Considerations

While this is a proof of concept with a simplified scope, the architecture includes considerations for future scalability:

1. **Modular Component Design**: Components are designed to be reusable and composable, allowing for extension without refactoring.

2. **Data Abstraction**: Data access is abstracted through stores and utility functions, making it possible to replace static JSON with API calls in the future.

3. **Feature Isolation**: Features are isolated in their own routes and component hierarchies, allowing for independent development and testing.

4. **Performance Patterns**: Lazy loading, code splitting, and efficient rendering patterns are established from the beginning to support growth.

5. **Documentation**: Component APIs and data structures are documented to facilitate future development.
