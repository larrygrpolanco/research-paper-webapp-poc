# K-Pop Accent Web App: Active Context

## Current Work Focus

The project is currently in **Phase 1: Foundation**, focusing on establishing the core architecture and implementing the basic structure of the application. This phase is designed to be independent of the complete comment data, allowing for progress while maintaining flexibility for future data integration.

### Active Development Areas

1. **Project Setup and Architecture**
   - SvelteKit project initialization
   - Folder structure implementation
   - Core configuration files
   - Design system foundation

2. **Component Development**
   - Creating reusable UI components
   - Implementing responsive layouts
   - Building interactive elements
   - Establishing component patterns

3. **Data Structure Design**
   - Defining JSON schemas for research data
   - Creating placeholder data for development
   - Establishing data transformation utilities
   - Planning for future data integration

4. **Content Development**
   - Extracting key information from the research paper
   - Simplifying academic concepts for broader audience
   - Creating educational content about linguistic concepts
   - Developing engaging descriptions of research findings

## Recent Changes

### Project Initialization

- Created SvelteKit project with TypeScript configuration
- Set up ESLint and Prettier for code quality
- Established initial folder structure
- Added basic configuration files

### Design System Implementation

- Completed implementation of global CSS variables for design tokens
- Implemented color palette from style guide
- Set up typography scales and spacing system
- Created comprehensive component styling patterns
- Maintained Tailwind as a fallback while implementing custom CSS classes

### Component Development

- Completed implementation of core UI components:
  - Header.svelte - Responsive navigation with mobile menu support
  - Footer.svelte - Three-column layout with research information and navigation
  - VideoPlayer.svelte - YouTube integration with metadata display and timestamp navigation
  - CommentCard.svelte - Interactive cards with sentiment indicators and tag support
  - IdolProfile.svelte - Detailed profile cards with sentiment analysis visualization
  - SentimentChart.svelte - Interactive pie chart with accessible controls
  - FilterBar.svelte - Collapsible filter system with multi-select capabilities
  - AccentBadge.svelte - Flexible badge component with color mapping for accent types

### Layout & Homepage

- Updated the main layout to include Header and Footer components
- Created an engaging homepage that showcases the research and components
- Implemented responsive design that works across device sizes

### Accessibility Improvements

- Fixed accessibility issues in interactive components
- Added proper ARIA attributes and keyboard navigation
- Ensured all interactive elements are properly accessible

### Data Structure

- Working on creating initial JSON data files:
  - idols.json (based on Table 2 from the paper)
  - videos.json (based on Table 1 from the paper)
  - findings.json (key statistics from the paper)

### Route Structure

- Implemented basic routing with SvelteKit
- Created initial page components:
  - Home page
  - Video showcase
  - Idol profiles
  - Comment explorer (placeholder)
  - Educational content
  - About page

## Next Steps

### Immediate Priorities

1. **Implement Video Hub**
   - Integrate YouTube embed functionality
   - Display video metadata from research
   - Create navigation between videos
   - Implement responsive video layout

2. **Develop Idol Profiles**
   - Create detailed profile templates
   - Implement accent type visualization
   - Add demographic information display
   - Create placeholder for comment data integration

3. **Build Educational Framework**
   - Develop interactive explanations of key concepts
   - Create visual representation of Kachru's circles
   - Implement glossary of linguistic terms
   - Connect theoretical concepts to examples

### Medium-Term Goals

1. **Implement Basic Visualizations**
   - Create sentiment distribution chart
   - Implement evaluation aspect visualization
   - Develop placeholder for multi-dimensional analysis
   - Add interactive filtering capabilities

2. **Enhance User Experience**
   - Improve navigation between features
   - Add animations and transitions
   - Implement progressive disclosure patterns
   - Enhance mobile experience

3. **Prepare for Data Integration**
   - Finalize data schemas for comments
   - Create data processing utilities
   - Implement search and filter functionality
   - Design comment display components

## Active Decisions and Considerations

### Design Decisions

1. **Mobile-First Approach**
   - Designing for mobile first, then expanding to larger screens
   - Using flexible layouts that adapt to different viewport sizes
   - Ensuring touch-friendly interaction targets
   - Considering limited bandwidth and processing power

2. **Progressive Disclosure**
   - Starting with simplified information
   - Providing deeper details through user interaction
   - Using expandable sections for complex content
   - Balancing information density with clarity

3. **Visual Hierarchy**
   - Emphasizing key research findings visually
   - Using color and typography to guide attention
   - Creating clear distinction between different types of content
   - Maintaining consistent visual language across features

### Technical Considerations

1. **Performance Optimization**
   - Lazy loading components and data
   - Optimizing assets for fast loading
   - Minimizing JavaScript bundle size
   - Implementing efficient rendering patterns

2. **Accessibility Implementation**
   - Using semantic HTML elements
   - Adding appropriate ARIA attributes
   - Ensuring keyboard navigation
   - Testing with screen readers

3. **Data Management**
   - Balancing between static and dynamic data
   - Planning for future data updates
   - Creating flexible data transformation utilities
   - Implementing efficient filtering and search

### Content Considerations

1. **Academic Integrity vs. Accessibility**
   - Simplifying concepts without losing accuracy
   - Providing links to original research
   - Using visualizations to explain complex ideas
   - Including both simplified and detailed explanations

2. **Bilingual Content Presentation**
   - Handling both English and Korean content
   - Providing translations where appropriate
   - Maintaining original language for authenticity
   - Considering language toggle functionality

## Important Patterns and Preferences

### Development Patterns

1. **Component-First Development**
   - Building and testing components in isolation
   - Composing larger features from proven components
   - Maintaining consistent component APIs
   - Documenting component usage patterns

2. **Iterative Implementation**
   - Starting with minimal viable implementations
   - Refining based on testing and feedback
   - Adding features incrementally
   - Maintaining working state throughout development

3. **Consistent Coding Style**
   - Following established Svelte patterns
   - Using TypeScript for type safety
   - Maintaining consistent naming conventions
   - Documenting complex logic

### Design Preferences

1. **Clean, Minimal Aesthetic**
   - Focusing on content rather than decoration
   - Using whitespace effectively
   - Implementing subtle animations and transitions
   - Maintaining high contrast for readability

2. **Consistent Color Usage**
   - Primary: #FF3E76 (bright pink - inspired by K-pop aesthetics)
   - Secondary: #6236FF (purple)
   - Background: #FAFAFA (off-white)
   - Text: #121212 (near black) and #5F5F5F (medium gray)
   - Sentiment indicators: #36D7B7 (positive), #F1C40F (neutral), #E74C3C (negative)

3. **Typography Hierarchy**
   - Using Inter font family throughout
   - Clear distinction between heading levels
   - Consistent text sizes and line heights
   - Appropriate font weights for emphasis

## Learnings and Project Insights

### Technical Insights

1. **SvelteKit Advantages**
   - Efficient component model reduces boilerplate
   - Built-in routing simplifies navigation implementation
   - Reactive statements make state management clearer
   - Static site generation improves performance

2. **Data Visualization Challenges**
   - Balancing between simplicity and accuracy
   - Making visualizations responsive across devices
   - Ensuring accessibility of interactive charts
   - Communicating complex relationships clearly

3. **Component Architecture Lessons**
   - Benefits of clear component boundaries
   - Importance of consistent props and events
   - Value of reusable utility functions
   - Need for documentation as complexity increases

4. **Accessibility Implementation**
   - Importance of using semantic HTML elements
   - Converting div elements with click handlers to button elements
   - Adding keyboard event handlers for interactive elements
   - Adding appropriate ARIA attributes for screen readers

### Content Insights

1. **Research Simplification**
   - Identifying core concepts that resonate with non-experts
   - Finding visual metaphors for abstract ideas
   - Balancing detail with accessibility
   - Maintaining academic integrity while simplifying

2. **User Engagement Patterns**
   - Entry points that connect with different user interests
   - Progression from simple to complex information
   - Balance between guided and exploratory experiences
   - Importance of clear connections between concepts

3. **Cross-Cultural Considerations**
   - Presenting Korean content to international audiences
   - Explaining cultural context without oversimplification
   - Addressing linguistic concepts across languages
   - Respecting original research while making it accessible

### Project Management Insights

1. **Phased Approach Benefits**
   - Ability to make progress without complete data
   - Clear milestones for evaluation and feedback
   - Flexibility to adjust based on early learnings
   - Manageable scope for proof of concept

2. **Documentation Importance**
   - Value of clear component documentation
   - Benefits of documented design decisions
   - Usefulness of code comments for complex logic
   - Importance of maintaining the memory bank
