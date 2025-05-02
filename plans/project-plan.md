# K-Pop Accent Research Visualization: Project Plan

## Project Overview

This web application aims to transform academic research on K-pop idols' English accents into an accessible, engaging interactive experience. The project will visualize findings from "I Want to Be Born with That Pronunciation": Metalinguistic Comments About K-Pop Idols' Inner Circle Accents by Jihye Kim and Luoxiangyu Zhang.

**Core Purpose:**
- Make linguistic research accessible to non-academic audiences
- Create an engaging way to explore language perception in online spaces
- Demonstrate how academic research can be presented in interactive digital formats
- Provide a proof of concept for researchers looking to share findings with wider communities

## Phase 1: Foundation (Independent of Comment Data)

### 1. Project Setup
- Initialize SvelteKit application with TypeScript
- Implement design system based on UI/UX guidelines
- Set up project architecture and reusable components
- Create responsive page layouts

### 2. Video Integration Hub
- Build interface for the four YouTube videos from the study
- Implement video player with metadata display
- Create UI elements for video selection and navigation
- Display research context for each video (based on Table 1 in the paper)

### 3. Idol Profile Section
- Develop profile templates for the seven idols in the study
- Implement the exact demographic data from Table 2
- Create accent type badges and visualization components
- Build place-holders for comment data integration later

### 4. Educational Framework
- Create interactive explanations of key linguistic concepts:
  - Inner/outer/expanding circle countries with visual map
  - Linguistic stereotyping and reverse linguistic stereotyping
  - The role of English in South Korea and in K-pop
- Develop glossary of academic terms with accessible definitions

### 5. Research Overview
- Create visualizations of key findings from the paper
- Implement interactive charts for the sentiment distribution (88.1% positive, etc.)
- Build placeholder interfaces for the evaluation aspect categories
- Implement research methodology explanation section

## Phase 2: Data Integration (When Comment Data Available)

### 1. Data Structure Assessment
- Analyze comment data format when available
- Design data models and schemas for the application
- Create data processing utilities if needed
- Implement data store and state management

### 2. Comment Explorer Implementation
- Build searchable interface for browsing the 602 comments
- Implement filtering system based on research categories
- Create language toggle for Korean/English comments
- Connect comments to corresponding videos and idols

### 3. Multi-Dimensional Analysis
- Develop visualizations showing relationships between:
  - Sentiment and evaluation aspects
  - Idols and comment types
  - Accent features and social perceptions

### 4. Integration Completion
- Connect all independent components with the comment data
- Implement cross-navigation between features
- Add data-driven insights throughout the application

## Technical Architecture

### Frontend
- **Framework**: SvelteKit
- **Styling**: Custom design system with CSS variables
- **Charts**: Chart.js for visualizations
- **Typography**: Inter font family
- **Responsiveness**: Mobile-first approach with flexible layouts

### Data Management
- Initial placeholder data from paper tables
- Flexible data model to accommodate comment data when available
- Simple JSON data storage to start
- Component-based state management

### Deployment
- Static site generation for optimal performance
- Vercel
- GitHub for version control
- CI/CD pipeline for automated deployments

## Key Considerations

1. **Accessibility**: Ensure the app is usable by all audiences, including:
   - Proper contrast ratios and text sizes
   - Screen reader compatibility
   - Keyboard navigation
   - Alternative text for visual elements

2. **Academic Integrity**: Maintain the integrity of the research by:
   - Accurately representing data and findings
   - Including proper citations and references
   - Providing context for simplified explanations
   - Linking to the original publication

3. **User Experience**: Create an engaging, intuitive experience through:
   - Clear navigation pathways
   - Consistent interaction patterns
   - Progressive disclosure of complex information
   - Engaging visualizations and animations

4. **Extensibility**: Design the system to be easily expanded with:
   - Modular component architecture
   - Well-documented code
   - Separation of data and presentation layers
   - Configuration-driven features where possible

## Project Values

1. **Educational Value**: Making complex linguistic concepts accessible
2. **Visual Appeal**: Creating an aesthetically pleasing representation of academic work
3. **Interactivity**: Encouraging exploration and engagement with research
4. **Research Integrity**: Maintaining accuracy while increasing accessibility