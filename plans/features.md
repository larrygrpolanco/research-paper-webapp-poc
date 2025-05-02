# K-Pop Accent Web App: Feature Specifications with Research Connections

Below are detailed specifications for the core features of our web app, explicitly showing how each feature connects to elements of the research paper:

## 1. Video Analysis Hub

**Paper Connection**: Directly based on Table 1 (Metadata of the focal videos) and the methodology of analyzing comments on these specific videos.

**Functionality**:
- Embed the exact 4 YouTube videos analyzed in the study (with proper attribution)
- Display the metadata from Table 1 for each video (account name, subscribers, release date, views, comments)
- Show comment distribution statistics for each video

**Research Elements Displayed**:
- Show how many comments from each video were included in the study
- Highlight the specific idol accents featured in each video with time stamps

**UI Components**:
- Video player with timestamps marking accent examples
- Metadata panel showing exact figures from Table 1
- Comment count visualization showing the 602 total analyzed comments

**Data Requirements**:
- YouTube video IDs for the 4 videos: Doyouram (203,435 views), JTBC Voyage (4,143,521 views), Young Cret videos (1,887,408 views and 699,728 views)

**User Path**: Users can select any of the 4 videos to watch → see metadata → explore related comments → view accent analysis

## 2. Accent Sentiment Analyzer

**Paper Connection**: Based on Section 4.1 (Affect Toward Idols' English Accents) and Figure 2 showing the 88.1% positive, 10.6% neutral, and 1.3% negative distribution.

**Functionality**:
- Interactive pie chart replicating Figure 2 from the paper
- Ability to click on each segment to filter comments by sentiment
- Display examples of each sentiment type as defined in Table 4

**Research Elements Displayed**:
- The exact percentages and numbers from the paper: positive (88.1%, 357), neutral (10.6%, 43), negative (1.3%, 5)
- Example quotes from each category matching those in the paper

**UI Components**:
- Interactive pie chart with color coding (as specified in our UI guidelines)
- Comment examples panel showing direct quotes
- Toggle to view the chart as numbers or percentages

**Connections to Other Features**:
- Clicking a segment filters the Comment Explorer to show only that sentiment
- Links to specific Video timestamps where examples occur

## 3. Idol Profile Database

**Paper Connection**: Directly based on Table 2 (Idols and their accents described in the video).

**Functionality**:
- Individual profile pages for all 7 idols mentioned in the paper
- Present each idol's demographic background and accent type exactly as described in Table 2
- Display distribution of comments specifically about each idol

**Research Elements Displayed**:
- Each idol's demographic information (from Table 2)
- The specific accent type attributed to each idol in the videos
- Comment analysis specific to each idol

**UI Components**:
- Profile cards with standardized layout
- Accent type badges using consistent terminology from the paper
- Mini charts showing comment distribution for the specific idol

**Data Requirements**:
- Complete information on all 7 idols (Joshua, Mark, Wendy, Rosé, Jennie, RM, Felix)
- Categorization of which comments reference which idols

**Implementation Notes**:
- Maintain the exact categorization of accents used in the paper (e.g., "Valley girl accent" for Joshua)
- Include biographical details exactly as presented in Table 2

## 4. Comment Explorer

**Paper Connection**: Based on the 602 metalinguistic comments analyzed and the coding methodology described in Section 3.2 (Data Analysis).

**Functionality**:
- Searchable database of all comment types (both on-topic and off-topic)
- Filter system based on the exact categories from Table 5
- Ability to view original language comments (Korean and English)

**Research Elements Displayed**:
- The distribution between on-topic (67.3%) and off-topic (32.7%) comments
- The exact categorization scheme used in the research
- Representative examples from each category

**UI Components**:
- Advanced filter panel with research-based categories:
  * Social attractiveness (33.6%)
  * (Non-)nativeness (30.3%)
  * Phonetic features (4.7%)
  * Speech (3.7%)
  * Motivation (3.2%)
  * Proficiency (2.2%)
  * Comprehensibility (2.2%)
  * Metalinguistic (0.7%)
- Comment cards with categorization tags
- Language toggle for bilingual comments

**Data Structure**:
- Comment ID
- Original text
- Language (English/Korean)
- Source video
- Sentiment category
- Evaluation aspect(s)
- Referenced idol(s)

## 5. Theoretical Framework Guide

**Paper Connection**: Based on Section 2 (Review of Literature), particularly concepts of inner/outer/expanding circles and linguistic stereotyping.

**Functionality**:
- Educational content explaining key linguistic concepts from the paper
- Interactive world map showing Kachru's three circles of English
- Glossary of key terms used in the research

**Research Elements Displayed**:
- Definition of inner circle, outer circle, and expanding circle countries (Section 2.2)
- Explanation of linguistic stereotyping and reverse linguistic stereotyping (Section 2.1)
- The role of English in South Korea and in K-pop (Sections 2.2 and 2.3)

**UI Components**:
- Interactive world map color-coded by circle category
- Expandable definition cards for key terms
- Citation links to original research referenced in the paper

**Implementation Notes**:
- Use direct quotes from the paper for definitions
- Include proper academic citations for theoretical concepts

## 6. Multi-Dimensional Analysis Tool

**Paper Connection**: Based on Section 4.2 (Social Aspects Related to the Corresponding Affect) and Table 5.

**Functionality**:
- Interactive visualization showing the relationship between sentiment and evaluation aspects
- Ability to explore how different evaluation aspects correlate with specific idols
- Feature to compare native vs. non-native speaker reception

**Research Elements Displayed**:
- The breakdown of evaluation aspects from Table 5
- The connection between social attractiveness and positive sentiment (Section 4.2.1)
- The complex attitudes toward nativeness (Section 4.2.2)

**UI Components**:
- Interactive matrix visualization
- Correlation heat map
- Detailed examples from each intersection point
- Export functionality for educational purposes

**Connections to Other Features**:
- Selecting a cell in the matrix filters both the Comment Explorer and Idol Profiles
- Links to specific examples in the Video Analysis Hub

## Feature Interconnections Map

To ensure a cohesive user experience, here's how the features connect:

1. **Home Page** → Presents research overview and key findings → Links to all main features

2. **Video Analysis Hub** → User watches videos → Can click on:
   - Idol mentions → Opens Idol Profile
   - Comment references → Opens that comment in Comment Explorer
   - Accent examples → Opens Theoretical Framework at relevant section

3. **Accent Sentiment Analyzer** → User explores sentiment distribution → Can:
   - Click segments → Filters Comment Explorer
   - View examples → Links to Video timestamps
   - Compare idols → Links to Multi-Dimensional Analysis

4. **Idol Profiles** → User selects an idol → Can:
   - See videos featuring the idol → Links to Video Analysis Hub
   - View comments about the idol → Filtered view in Comment Explorer
   - Learn about their accent type → Opens Theoretical Framework

5. **Comment Explorer** → User browses comments → Can:
   - Filter by any criteria from the research
   - View source → Links to Video Analysis Hub
   - View related comments → Shows similar comments based on coding

6. **Theoretical Framework** → User learns concepts → Can:
   - See real examples → Links to Comment Explorer
   - Understand idol backgrounds → Links to Idol Profiles
   - Explore global context → Interactive elements