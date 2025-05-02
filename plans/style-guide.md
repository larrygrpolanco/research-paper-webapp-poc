## 1. Design System

### Color Palette
- **Primary**: `#FF3E76` (bright pink - inspired by K-pop aesthetics)
- **Secondary**: `#6236FF` (purple)
- **Background**: `#FAFAFA` (off-white)
- **Text Primary**: `#121212` (near black)
- **Text Secondary**: `#5F5F5F` (medium gray)
- **Accent Colors**:
  - Positive sentiment: `#36D7B7` (teal)
  - Neutral sentiment: `#F1C40F` (amber)
  - Negative sentiment: `#E74C3C` (red)
- **Borders/Dividers**: `#E0E0E0` (light gray)

### Typography
- **Primary Font**: Inter (sans-serif)
- **Heading Sizes**:
  - H1: 32px/40px, Bold, letter-spacing: -0.5px
  - H2: 24px/32px, Bold, letter-spacing: -0.25px
  - H3: 20px/28px, Semibold
  - H4: 18px/24px, Semibold
- **Body Text**:
  - Regular: 16px/24px
  - Small: 14px/20px
  - Caption: 12px/16px
- **Comment Text**: 15px/22px, with 16px padding

### Spacing System
- Base unit: 8px
- Margins/Padding: 8px, 16px, 24px, 32px, 48px, 64px
- Page container: max-width 1200px, centered with 24px padding on mobile, 48px on desktop

### Component Specifications

#### Buttons
- **Primary**: #FF3E76 background, white text, 16px padding horizontal, 12px padding vertical, 8px border radius
- **Secondary**: White background, #FF3E76 border, #FF3E76 text, same padding
- **Tertiary/Text**: No background, #5F5F5F text, underline on hover
- **Hover states**: 10% darker shade of the button color

#### Cards
- **Comment Cards**: White background, 16px padding, 8px border radius, 1px #E0E0E0 border
- **Idol Profile Cards**: White background, 24px padding, 12px border radius, subtle box shadow: `0 2px 8px rgba(0,0,0,0.05)`
- **Video Cards**: 16:9 aspect ratio, 12px border radius, hover effect with slight scale (1.02)

#### Navigation
- **Primary Nav**: 64px height, fixed position, white background with subtle shadow
- **Mobile Nav**: Bottom tab bar on mobile (height: 56px)
- **Active States**: Bottom border 3px solid primary color for desktop, filled icon for mobile

## 2. Layout Guidelines

### Homepage
- Hero section: 80vh height with research summary and key statistics
- 3-column grid of feature cards on desktop, single column on mobile
- Section padding: 64px top/bottom on desktop, 40px on mobile

### Video Showcase
- Grid layout: 2x2 on desktop, 1 column on mobile
- Video player: 16:9 aspect ratio, 100% width of container
- Comment preview: 3 highlighted comments below each video, expandable

### Comment Explorer
- Left sidebar: 320px width with filter controls (collapsible on mobile)
- Main content: Grid of comment cards, 3 columns on desktop, 1 on mobile
- Pagination: 20 comments per page with load more button

### Idol Profiles
- Horizontal scrolling cards on desktop, vertical stack on mobile
- Profile card: 360px width, auto height, 24px padding
- Profile image: 120px diameter circular image
- Accent info: Horizontal badge list with color coding

### Data Visualization Section
- Chart container: 600px max-width, center aligned
- Chart padding: 32px
- Legend: Right side on desktop, bottom on mobile with 16px spacing

## 3. Interaction Patterns

### Animations
- **Page Transitions**: Subtle fade in/out (150ms)
- **Card Hover**: Slight elevation increase with shadow change
- **Data Transitions**: 300ms easing for chart animations
- **Video Thumbnails**: Scale 1.05 on hover

### User Interactions
- **Filtering**: Apply filters immediately without page reload
- **Sentiment Selection**: Radio buttons with visual color indicators
- **Comment Expansion**: Click to expand longer comments with "Read more" button
- **Video Selection**: Large click targets, video starts on thumbnail click
- **Mobile Interactions**: Support for swipe gestures on idol profiles

### State Indicators
- **Loading**: Subtle progress bar at top of page (3px height)
- **Selected Filters**: Filled background state with checkmark icon
- **Active Page**: Clear visual indicator in navigation
- **Error States**: Inline error messages with red text and warning icon

## 4. Responsive Breakpoints
- **Mobile**: 0-639px
- **Tablet**: 640px-1023px
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 5. Accessibility Guidelines
- Minimum contrast ratio: 4.5:1 for all text
- Interactive elements: Minimum size 44px×44px
- Focus states: High visibility focus rings (2px solid #6236FF)
- Screen reader support: Proper ARIA labels and roles
- Keyboard navigation: Logical tab order and visible focus states

## 6. Component Examples

```
// Comment Card Component
<div class="comment-card">
  <div class="comment-header">
    <span class="sentiment-indicator positive"></span>
    <span class="comment-language">English</span>
  </div>
  <p class="comment-text">"ROSIE's accent is so ELEGANT and MAGESTIC. its chef's kiss"</p>
  <div class="comment-tags">
    <span class="tag social-attractiveness">Social Attractiveness</span>
    <span class="tag nativeness">Nativeness</span>
  </div>
  <div class="comment-footer">
    <span class="idol-name">Rosé</span>
    <span class="video-source">Video #3</span>
  </div>
</div>
```