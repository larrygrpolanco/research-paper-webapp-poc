# K-Pop Accent Web App: Interactive Research Visualization

Based on the paper, I'd like to create an interactive web app that allows users to explore how K-pop idols' English accents are perceived in online spaces. Here's a comprehensive breakdown of how we can translate this academic research into an engaging SvelteKit application:

## Core Concept

The web app will showcase the research findings through interactive visualizations, allowing users to:
1. Watch the four YouTube videos analyzed in the study
2. Explore the 602 metalinguistic comments categorized by sentiment and evaluation aspects
3. Learn about different English accents and language ideologies
4. Understand the connections between accents and social perceptions

## Key App Features

### 1. Video Showcase
- **Feature**: Interactive video player section featuring the four analyzed YouTube videos
- **Implementation**: Embed the videos from the study, including:
  - "Idol English pronunciation characteristics" by Doyouram
  - "Red Velvet WENDY who boasted her fluent English skills" by JTBC Voyage
  - "BLACKPINK Jennie's English vs Rosé's Australian pronunciation" by Young Cret
  - The BLACKPINK Rose vs Stray Kids FELIX comparison

### 2. Idol Profiles
- **Feature**: Interactive cards for each of the 7 idols featured in the study
- **Implementation**: Create profile pages with:
  - Demographic background (where they were born/raised)
  - Details about their accent types
  - Video timestamps where their English is featured
  - Visual representation of comments about their accent

### 3. Comment Explorer
- **Feature**: Searchable database of all 602 metalinguistic comments
- **Implementation**:
  - Filter system by sentiment (positive/negative/neutral)
  - Filter by evaluation aspect (social attractiveness, nativeness, etc.)
  - Search functionality for specific terms
  - Visual highlighting of comment themes

### 4. Data Visualizations
- **Feature**: Interactive charts representing the research findings
- **Implementation**:
  - Pie chart showing 88.1% positive, 10.6% neutral, 1.3% negative evaluation distribution
  - Bar charts showing different evaluation aspects (33.6% social attractiveness, 30.3% nativeness)
  - Interactive elements showing connections between idols' backgrounds and comment types

### 5. Educational Section
- **Feature**: Explanatory content about key linguistics concepts
- **Implementation**:
  - Definitions of inner circle vs. expanding circle countries
  - Explanations of linguistic stereotyping
  - Information about accent perception and social implications
  - The role of English in K-pop globally

## Technical Implementation

### SvelteKit Structure
```
src/
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
```


### Data Structure
For the comments database:
```json
TO BE DETERMINED
```

### UI Design Guidelines
- Use a clean, accessible design with K-pop inspired color accents
- Create intuitive navigation between research findings
- Implement responsive design for mobile and desktop users
- Use animations sparingly to highlight key research findings
- Include proper academic citations and references to the original research

Color Palette: Primary (#FF3E76), Secondary (#6236FF), Background (#FAFAFA), Text (#121212/#5F5F5F)
Sentiment Colors: Positive (#36D7B7), Neutral (#F1C40F), Negative (#E74C3C)
Typography: Inter font family with specified heading and body text sizes
Component Styling: Standardized cards, buttons, and interactive elements
Spacing System: 8px base unit for consistent margins and padding
Responsive Breakpoints: Mobile (0-639px), Tablet (640-1023px), Desktop (1024px+)

## User Journey

1. **Homepage**: Users are introduced to the research with key statistics (88.1% positive evaluations) and a brief explanation of the study
2. **Videos Section**: Users can watch the analyzed videos and see comment highlights directly
3. **Idol Profiles**: Users explore each idol's background and accent characteristics
4. **Comment Explorer**: Users can search, filter, and analyze the 602 metalinguistic comments
5. **Learn Section**: Users gain deeper understanding of linguistic concepts and accent perception

## Research Connections

Add explicit connections to the research paper for each feature:

- **Video Showcase**: Based on Table 1 (Metadata of focal videos)
- **Idol Profiles**: Directly corresponds to Table 2 (Idols and their accents)
- **Comment Explorer**: Implements the categorization from Section 3.2 (Data Analysis)
- **Data Visualizations**: Replicates Figure 2 (88.1% positive evaluations) and Table 5 (evaluation aspects)
- **Educational Section**: Based on Section 2 (Review of Literature) with focus on inner/outer/expanding circles

## Research Connections

Add explicit connections to the research paper for each feature:

- **Video Showcase**: Based on Table 1 (Metadata of focal videos)
- **Idol Profiles**: Directly corresponds to Table 2 (Idols and their accents)
- **Comment Explorer**: Implements the categorization from Section 3.2 (Data Analysis)
- **Data Visualizations**: Replicates Figure 2 (88.1% positive evaluations) and Table 5 (evaluation aspects)
- **Educational Section**: Based on Section 2 (Review of Literature) with focus on inner/outer/expanding circles

## Revised Development Approach

Update the roadmap to match our two-phase strategy:

### Phase 1: Foundation (Independent of Comment Data)
1. Project setup and design system implementation
2. Video hub with metadata from the paper
3. Idol profiles based on Table 2
4. Educational content on linguistic concepts
5. Research overview with placeholder visualizations

### Phase 2: Data Integration (When Comment Data Available)
1. Data structure assessment and processing
2. Comment explorer implementation
3. Multi-dimensional analysis completion
4. Feature integration and cross-navigation

## Implementation Notes

- Maintain all placeholder sections for comment data
- Focus on building robust, flexible components that can accommodate data later
- Ensure all academic information is accurately represented
- Prioritize accessibility and user experience throughout development

## Future Extensions

1. **LLM Integration**: Allow users to input their own comments about accents and have an LLM analyze them in real-time
2. **Expanded Dataset**: Add functionality to analyze comments from newer videos
3. **User Contribution**: Let users submit additional examples of K-pop idols' English speech
4. **Accent Quiz**: Create an interactive game where users try to identify different English accents