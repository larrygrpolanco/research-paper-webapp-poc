# Project Brief: K-Pop Accent Web App

## Project Overview
The K-Pop Accent Web App is an interactive visualization of academic research on K-pop idols' English accents and how they are perceived by fans. The project transforms findings from the research paper "I Want to Be Born with That Pronunciation": Metalinguistic Comments About K-Pop Idols' Inner Circle Accents by Jihye Kim and Luoxiangyu Zhang into an accessible, engaging digital experience.

## Core Objectives
1. Make academic research accessible to a broader audience
2. Create an engaging, interactive way to explore research findings
3. Visualize data about K-pop idols' English accents and fan perceptions
4. Provide educational content about linguistic concepts
5. Demonstrate how web technologies can bridge academia and public interest

## Target Audience
- **General Public**: People interested in K-pop, linguistics, or language learning
- **K-Pop Fans**: Fans interested in how idols' English accents are perceived
- **Academics**: Researchers and educators in linguistics and related fields
- **Students**: Those studying linguistics, Korean studies, or media studies

## Key Features
1. **Comment Explorer**: Browse, filter, and search comments about idols' English accents
2. **Idol Profiles**: Explore information about K-pop idols and their accent types
3. **Video Hub**: Watch YouTube videos analyzed in the research with related comments
4. **Educational Content**: Learn about linguistic concepts related to accent perception
5. **Research Context**: Understand the background and methodology of the original research

## Technical Requirements
- **Frontend Framework**: SvelteKit for component-based architecture
- **Styling**: CSS Variables for consistent design system
- **Data Visualization**: Interactive charts for sentiment analysis
- **Responsive Design**: Works on devices of all sizes
- **Accessibility**: Follows accessibility best practices

## Design Guidelines
- **Color Palette**: Primary (#FF3E76), Secondary (#6236FF), Background (#FAFAFA)
- **Typography**: Inter font family with clear hierarchy
- **Layout**: Card-based UI with consistent spacing
- **Visual Style**: Clean, modern, and engaging

## Project Scope
### In Scope
- Interactive visualization of research data
- Comment browsing and filtering
- Idol profiles with accent information
- Video playback with related comments
- Educational content about linguistic concepts

### Out of Scope
- User authentication and accounts
- User-generated content
- Real-time data updates
- Advanced data analysis tools
- Integration with external APIs (beyond YouTube embeds)

## Current Status
The application has been implemented with the core functionality to explore the research findings:

- **Home Page**: Provides an overview of the research and navigation to other sections.
- **Comments Explorer**: Allows users to browse, filter, and search comments.
- **Idol Profiles**: Displays information about K-pop idols and their accent types.
- **Videos Page**: Shows YouTube videos analyzed in the research with related comments.
- **Learn Page**: Provides educational content about linguistic concepts.
- **About Page**: Offers information about the project and research.

However, there are several issues that need to be addressed:

1. **Data Integration Issues**: Some filter counts show zero, and some idols don't have comments associated with their profiles.
2. **UI/Layout Issues**: There are spacing issues and text overlap in various components.
3. **Content Quality**: Some text needs to be rewritten by someone with deeper project knowledge.
4. **Visualization Enhancements**: Additional charts and visualizations would improve the understanding of the data.
5. **Accessibility Issues**: There are several accessibility warnings that need to be addressed.

## Next Steps
1. **Fix Data Integration Issues**:
   - Debug the filter count issue to ensure accurate representation of data
   - Improve the comment-idol association to include comments that mention idols in Korean

2. **Enhance Visualizations**:
   - Add a chart for evaluation aspects distribution
   - Improve the sentiment chart with more context and interactivity

3. **Improve UI/UX**:
   - Fix spacing and layout issues
   - Consider removing emojis (user preference)
   - Enhance responsive design for better mobile experience

4. **Address Accessibility Issues**:
   - Add keyboard event handlers to clickable elements
   - Add proper ARIA roles to interactive elements

5. **Content Refinement**:
   - Work with someone who has deeper project knowledge to refine the text
   - Ensure accuracy of research descriptions

## Success Criteria
1. Users can easily navigate and explore the research findings
2. The application accurately represents the original research
3. The design is visually appealing and consistent
4. The application is accessible to users with different abilities
5. The content is engaging and educational

## Timeline
- **Phase 1** (Completed): Initial implementation of core pages and components
- **Phase 2** (Current): Fixing issues and enhancing the application
- **Phase 3** (Future): User testing and refinement
- **Phase 4** (Future): Public launch and promotion

## Team
- **Project Lead**: Responsible for overall direction and coordination
- **Frontend Developer**: Implements the user interface and interactions
- **Data Analyst**: Processes and analyzes the research data
- **UX Designer**: Creates the visual design and user experience
- **Content Writer**: Develops educational content and descriptions

## Resources
- **Research Paper**: "I Want to Be Born with That Pronunciation": Metalinguistic Comments About K-Pop Idols' Inner Circle Accents
- **Data**: Comments from YouTube videos featuring K-pop idols speaking English
- **Style Guide**: Detailed design specifications in plans/style-guide.md
- **Memory Bank**: Project documentation and context in memory-bank/
