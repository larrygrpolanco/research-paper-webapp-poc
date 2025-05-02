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

### Data Structure Implementation

- Created structured JSON files based on the research paper:
  - **videos.json** - Contains metadata for the 4 YouTube videos analyzed in the study:
    - Video ID, account name, subscribers, title (Korean and English)
    - Release date, views, comment count, YouTube ID
    - List of idols appearing in each video
  
  - **idols.json** - Contains information about the 7 idols featured in the study:
    - Idol ID, name, gender, demographic background
    - Accent type as described in the research
    - List of videos the idol appears in
  
  - **findings.json** - Contains key statistics from the paper and aspect coding key:
    - Sentiment distribution (positive: 88.1%, neutral: 10.6%, negative: 1.3%)
    - Evaluation aspects distribution (socialAttractiveness: 33.6%, nativeness: 30.3%, etc.)
    - Aspect coding key mapping between codes (a, b, c, etc.) and their meanings
  
  - **comments.json** - Processed comment data from the CSV files:
    - Unique ID, video ID, original text, language (English/Korean)
    - Sentiment (positive, neutral, negative, off-topic)
    - Evaluation aspects (general, nativeness, motivation, etc.)
    - Mentioned idols, quotes, translations for Korean comments
    - Metadata including total comment count, source file, and last updated timestamp

- Implemented comprehensive data processing utilities in `src/lib/utils/dataProcessing.js`:
  - **parseCommentsCSV** - Converts raw CSV data to structured JSON
    - Handles commas within quoted fields
    - Extracts translations from Korean comments
    - Identifies mentioned idols in text
    - Maps sentiment codes to descriptive strings
    - Parses aspect codes into standardized names
  
  - **Filtering Functions**:
    - **getCommentsByIdol** - Filters comments by mentioned idol
    - **getCommentsByVideo** - Filters comments by video source
  
  - **Analysis Functions**:
    - **calculateSentimentDistribution** - Analyzes sentiment distribution with percentages
    - **calculateAspectDistribution** - Analyzes evaluation aspect distribution with percentages
    - **createSentimentAspectMatrix** - Creates cross-tabulation of sentiment vs. aspect
  
  - **Extraction Functions**:
    - **getKoreanCommentsWithTranslations** - Extracts Korean comments with translations
    - **getAspectExamples** - Gets example comments for each evaluation aspect
    - **getSentimentExamples** - Gets example comments for each sentiment
  
  - **Visualization Functions**:
    - **formatSentimentChartData** - Formats data for SentimentChart component with proper colors
    - **formatAspectChartData** - Formats data for AspectChart component with proper colors

- Created data processing scripts:
  - **processRawData.js** - Processes the truncated dataset for testing
  - **processFullData.js** - Processes the full dataset for production
  - Added npm scripts: `npm run process-data` and `npm run process-full-data`

- Created example usage code in `src/lib/utils/dataExample.js` to demonstrate how to use the data processing utilities

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

## Next Steps

### Immediate Priorities

1. **Process Raw Data**
   - Use the utility functions to process the raw CSV data
   - Generate the comments.json file with structured data
   - Validate the processed data against the paper's findings
   - Create additional derived data files if needed

2. **Integrate Data with Components**
   - Connect the processed data to the UI components
   - Implement data visualization components
   - Create interactive filtering and search functionality
   - Ensure proper handling of Korean text and translations

3. **Implement Video Hub**
   - Integrate YouTube embed functionality
   - Display video metadata from research
   - Create navigation between videos
   - Implement responsive video layout

4. **Develop Idol Profiles**
   - Create detailed profile templates
   - Implement accent type visualization
   - Add demographic information display
   - Create placeholder for comment data integration

5. **Build Educational Framework**
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

### Data Structure Decisions

1. **Aspect Coding System**
   - Created a mapping between the original codes and standardized aspect names
   - Added an aspectCodingKey to findings.json for future reference and updates
   - Normalized aspect names for consistency across the application
   - Handled potential inconsistencies in the coding system

2. **Comment Processing**
   - Implemented robust CSV parsing that handles commas within quoted fields
   - Added logic to extract translations from Korean comments
   - Created functions to identify mentioned idols in comments
   - Designed flexible filtering and aggregation functions

3. **Data Visualization Preparation**
   - Created functions to format data specifically for Chart.js
   - Implemented consistent color schemes based on the design system
   - Added support for sorting and filtering data for visualization
   - Ensured data is properly structured for different chart types

### Technical Considerations

1. **Performance Optimization**
   - Designed data processing to handle the full dataset efficiently
   - Implemented functions that can work with subsets of data
   - Created utility functions that can be used client-side or server-side
   - Ensured data structures are optimized for quick access

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

1. **Data Processing Challenges**
   - Handling inconsistencies in the coding system
   - Extracting translations from Korean comments
   - Identifying mentioned idols in text
   - Creating flexible aggregation functions

2. **Data Visualization Considerations**
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
