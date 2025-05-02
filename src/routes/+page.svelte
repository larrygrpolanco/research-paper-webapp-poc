<script>
  import { onMount } from 'svelte';
  import SentimentChart from '$lib/components/SentimentChart.svelte';
  import IdolProfile from '$lib/components/IdolProfile.svelte';
  import CommentCard from '$lib/components/CommentCard.svelte';
  import AccentBadge from '$lib/components/AccentBadge.svelte';
  
  // Import data
  import idolsData from '$lib/data/idols.json';
  import commentsData from '$lib/data/comments.json';
  import findingsData from '$lib/data/findings.json';
  
  // State
  let featuredIdol = null;
  let featuredComments = [];
  let isLoading = true;
  
  // Process data on mount
  onMount(() => {
    // Get Rosé as featured idol (or any other idol with sufficient data)
    const rose = idolsData.idols.find(idol => idol.id === 'rose');
    
    if (rose) {
      // Get comments for this idol
      const idolComments = commentsData.comments.filter(comment => 
        comment.mentionedIdols && comment.mentionedIdols.includes(rose.id)
      );
      
      // Calculate sentiment distribution
      const relevantComments = idolComments.filter(c => 
        c.sentiment !== 'off-topic' && c.sentiment !== 'unknown'
      );
      
      const total = relevantComments.length;
      const positive = relevantComments.filter(c => c.sentiment === 'positive').length;
      const neutral = relevantComments.filter(c => c.sentiment === 'neutral').length;
      const negative = relevantComments.filter(c => c.sentiment === 'negative').length;
      
      const positivePercentage = total > 0 ? (positive / total) * 100 : 0;
      const neutralPercentage = total > 0 ? (neutral / total) * 100 : 0;
      const negativePercentage = total > 0 ? (negative / total) * 100 : 0;
      
      // Get videos this idol appears in
      const videos = rose.appearsInVideos.map(videoId => {
        return {
          id: videoId,
          title: `Video #${videoId}`
        };
      });
      
      featuredIdol = {
        ...rose,
        commentCount: idolComments.length,
        positivePercentage,
        neutralPercentage,
        negativePercentage,
        positiveCount: positive,
        neutralCount: neutral,
        negativeCount: negative,
        videos
      };
    }
    
    // Get featured comments (positive ones with interesting content)
    const interestingComments = commentsData.comments
      .filter(comment => 
        comment.sentiment === 'positive' && 
        comment.text.trim() !== '' &&
        comment.evaluationAspects.length > 0
      )
      .sort(() => 0.5 - Math.random()) // Shuffle
      .slice(0, 2); // Take 2 random comments
    
    featuredComments = interestingComments.map(comment => {
      // Create tags from evaluation aspects
      const tags = comment.evaluationAspects.map(aspect => {
        const aspectMap = {
          'general': 'General Evaluation',
          'nativeness': 'Nativeness',
          'phoneticFeatures': 'Phonetic Features',
          'speech': 'Speech',
          'motivation': 'Motivation',
          'proficiency': 'Proficiency',
          'comprehensibility': 'Comprehensibility',
          'metalinguistic': 'Metalinguistic'
        };
        
        return {
          id: aspect.toLowerCase().replace(/\s+/g, '-'),
          label: aspectMap[aspect] || aspect
        };
      });
      
      // Get idol name if available
      let idolName = '';
      if (comment.mentionedIdols && comment.mentionedIdols.length > 0) {
        const idol = idolsData.idols.find(i => i.id === comment.mentionedIdols[0]);
        if (idol) {
          idolName = idol.name;
        }
      }
      
      // Get video source if available
      let videoSource = '';
      if (comment.videoId) {
        videoSource = `Video #${comment.videoId}`;
      }
      
      return {
        ...comment,
        tags,
        idolName,
        videoSource
      };
    });
    
    isLoading = false;
  });
</script>

<div class="home-page">
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">K-Pop Accent Research</h1>
      <p class="hero-subtitle">
        An interactive visualization of research on K-pop idols' English accents and how they are perceived by fans
      </p>
      
      <div class="hero-actions">
        <a href="/videos" class="btn btn-primary">Watch Videos</a>
        <a href="/idols" class="btn btn-secondary">Explore Idol Profiles</a>
      </div>
    </div>
  </div>
  
  <div class="research-overview">
    <h2 class="section-title">Research Overview</h2>
    <p class="section-description">
      This interactive web app visualizes findings from the research paper "I Want to Be Born with That Pronunciation": 
      Metalinguistic Comments About K-Pop Idols' Inner Circle Accents by Jihye Kim and Luoxiangyu Zhang.
    </p>
    
    <div class="research-highlights">
      <div class="highlight-card">
        <h3 class="highlight-title">602</h3>
        <p class="highlight-description">Comments analyzed from YouTube videos</p>
      </div>
      
      <div class="highlight-card">
        <h3 class="highlight-title">7</h3>
        <p class="highlight-description">K-pop idols featured in the study</p>
      </div>
      
      <div class="highlight-card">
        <h3 class="highlight-title">88.1%</h3>
        <p class="highlight-description">Positive sentiment in comments</p>
      </div>
    </div>
  </div>
  
  <div class="sentiment-section">
    <h2 class="section-title">Sentiment Analysis</h2>
    <p class="section-description">
      The research found that fans overwhelmingly express positive sentiment toward K-pop idols' English accents.
    </p>
    
    <div class="sentiment-container">
      <SentimentChart 
        positive={findingsData.sentimentDistribution.positive}
        neutral={findingsData.sentimentDistribution.neutral}
        negative={findingsData.sentimentDistribution.negative}
        title="How Fans Feel About K-pop Idols' English Accents"
        description="Distribution of sentiment in comments about K-pop idols' English accents"
      />
    </div>
  </div>
  
  <div class="accent-types-section">
    <h2 class="section-title">Accent Types</h2>
    <p class="section-description">
      The research examines how fans perceive different English accent types used by K-pop idols,
      particularly those from "inner circle" countries like the US, UK, Canada, and Australia.
    </p>
    
    <div class="accent-badges">
      <div class="accent-badge-item">
        <AccentBadge type="American" />
        <span class="accent-label">American</span>
        <span class="accent-example">Wendy, Joshua</span>
      </div>
      
      <div class="accent-badge-item">
        <AccentBadge type="Australian" />
        <span class="accent-label">Australian</span>
        <span class="accent-example">Rosé, Felix</span>
      </div>
      
      <div class="accent-badge-item">
        <AccentBadge type="Valley Girl" />
        <span class="accent-label">Valley Girl</span>
        <span class="accent-example">Joshua</span>
      </div>
      
      <div class="accent-badge-item">
        <AccentBadge type="Canadian" />
        <span class="accent-label">Canadian</span>
        <span class="accent-example">Mark</span>
      </div>
      
      <div class="accent-badge-item">
        <AccentBadge type="British" />
        <span class="accent-label">New Zealand</span>
        <span class="accent-example">Jennie</span>
      </div>
    </div>
  </div>
  
  <div class="features-section">
    <h2 class="section-title">Explore the Research</h2>
    
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🎬</div>
        <h3 class="feature-title">Video Analysis Hub</h3>
        <p class="feature-description">
          Watch the four YouTube videos analyzed in the study and explore the comments about idols' English accents.
        </p>
        <a href="/videos" class="feature-link">Explore Videos</a>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🎤</div>
        <h3 class="feature-title">Idol Profiles</h3>
        <p class="feature-description">
          Learn about the seven K-pop idols featured in the study and their English accent characteristics.
        </p>
        <a href="/idols" class="feature-link">View Profiles</a>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">💬</div>
        <h3 class="feature-title">Comment Explorer</h3>
        <p class="feature-description">
          Browse and filter the comments analyzed in the research paper to discover patterns and insights.
        </p>
        <a href="/comments" class="feature-link">Explore Comments</a>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🔍</div>
        <h3 class="feature-title">Learn About Linguistics</h3>
        <p class="feature-description">
          Understand key linguistic concepts like inner circle accents and linguistic stereotyping.
        </p>
        <a href="/learn" class="feature-link">Learn More</a>
      </div>
    </div>
  </div>
  
  {#if !isLoading}
    <div class="sample-section">
      <div class="sample-idols">
        <h2 class="section-title">Featured Idol</h2>
        {#if featuredIdol}
          <div class="idol-preview">
            <IdolProfile 
              name={featuredIdol.name}
              accentType={featuredIdol.accentType}
              birthplace={featuredIdol.background.split(',')[0]}
              background={featuredIdol.background}
              accentDescription={featuredIdol.accentType}
              commentCount={featuredIdol.commentCount}
              positivePercentage={featuredIdol.positivePercentage}
              neutralPercentage={featuredIdol.neutralPercentage}
              negativePercentage={featuredIdol.negativePercentage}
              videos={featuredIdol.videos}
            />
          </div>
        {/if}
      </div>
      
      <div class="sample-comments">
        <h2 class="section-title">Sample Comments</h2>
        {#each featuredComments as comment}
          <CommentCard 
            text={comment.language === 'Korean' && comment.translation ? comment.translation : comment.text}
            language={comment.language}
            sentiment={comment.sentiment}
            tags={comment.tags}
            idolName={comment.idolName}
            videoSource={comment.videoSource}
          />
        {/each}
        
        <div class="view-more">
          <a href="/comments" class="btn-secondary">View More Comments</a>
        </div>
      </div>
    </div>
  {/if}
  
  <div class="about-section">
    <h2 class="section-title">About This Project</h2>
    <p class="about-text">
      This interactive web application was created as a proof of concept for making academic research
      more accessible, engaging, and interactive. It transforms the findings from a linguistics research
      paper into a visual, explorable format that helps users understand how K-pop fans perceive and
      evaluate the English accents of K-pop idols.
    </p>
    <p class="about-text">
      The goal is to bridge the gap between academic research and public engagement by presenting
      complex findings in an intuitive, visually appealing way that doesn't require specialized knowledge
      of research methods or academic conventions.
    </p>
    <a href="/about" class="learn-more-link">Learn more about the project</a>
  </div>
</div>

<style>
  .home-page {
    padding-bottom: var(--spacing-6);
  }
  
  .hero-section {
    background-color: rgba(255, 62, 118, 0.05);
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-5) var(--spacing-3);
    margin-bottom: var(--spacing-5);
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
  }
  
  .hero-title {
    font-size: 40px;
    line-height: 1.2;
    margin-bottom: var(--spacing-2);
    color: var(--color-primary);
    animation: fadeInUp 0.8s ease-out;
  }
  
  .hero-subtitle {
    font-size: var(--font-size-h3);
    line-height: var(--line-height-h3);
    color: var(--color-text-secondary);
    max-width: 800px;
    margin: 0 auto var(--spacing-4);
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }
  
  .hero-actions {
    display: flex;
    gap: var(--spacing-2);
    justify-content: center;
    flex-wrap: wrap;
    animation: fadeInUp 0.8s ease-out 0.4s both;
  }
  
  .section-title {
    text-align: center;
    margin-bottom: var(--spacing-3);
    position: relative;
    font-size: var(--font-size-h2);
    line-height: var(--line-height-h2);
  }
  
  .section-title::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: var(--color-primary);
    margin: var(--spacing-1) auto 0;
  }
  
  .section-description {
    text-align: center;
    max-width: 800px;
    margin: 0 auto var(--spacing-4);
    color: var(--color-text-secondary);
  }
  
  .research-overview {
    margin-bottom: var(--spacing-5);
  }
  
  .research-highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-3);
    margin-top: var(--spacing-4);
  }
  
  .highlight-card {
    background-color: white;
    padding: var(--spacing-3);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-md);
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .highlight-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .highlight-title {
    font-size: 36px;
    color: var(--color-primary);
    margin: 0 0 var(--spacing-1);
  }
  
  .highlight-description {
    color: var(--color-text-secondary);
    margin: 0;
  }
  
  .sentiment-section {
    margin-bottom: var(--spacing-5);
  }
  
  .sentiment-container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .accent-types-section {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-4);
    margin-bottom: var(--spacing-5);
    text-align: center;
  }
  
  .accent-badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-3);
    margin-top: var(--spacing-3);
  }
  
  .accent-badge-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-1);
  }
  
  .accent-label {
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
  }
  
  .accent-example {
    font-size: var(--font-size-caption);
    color: var(--color-text-secondary);
  }
  
  .features-section {
    margin-bottom: var(--spacing-5);
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-3);
  }
  
  .feature-card {
    background-color: white;
    padding: var(--spacing-3);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-md);
    transition: transform 0.2s, box-shadow 0.2s;
    text-align: center;
  }
  
  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .feature-icon {
    font-size: 32px;
    margin-bottom: var(--spacing-2);
  }
  
  .feature-title {
    color: var(--color-secondary);
    margin-top: 0;
    margin-bottom: var(--spacing-2);
  }
  
  .feature-description {
    margin-bottom: var(--spacing-2);
    color: var(--color-text-secondary);
  }
  
  .feature-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
  }
  
  .feature-link:hover {
    text-decoration: underline;
  }
  
  .sample-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-5);
  }
  
  .idol-preview, .sample-comments {
    margin-bottom: var(--spacing-4);
  }
  
  .view-more {
    text-align: center;
    margin-top: var(--spacing-3);
  }
  
  .about-section {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-4);
    margin-bottom: var(--spacing-5);
  }
  
  .about-text {
    margin-bottom: var(--spacing-2);
    line-height: 1.6;
  }
  
  .learn-more-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
  }
  
  .learn-more-link:hover {
    text-decoration: underline;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Responsive styles */
  @media (min-width: 768px) {
    .hero-section {
      padding: var(--spacing-6) var(--spacing-4);
    }
    
    .hero-title {
      font-size: 48px;
    }
  }
  
  @media (min-width: 1024px) {
    .sample-section {
      grid-template-columns: 1fr 1fr;
    }
    
    .hero-section {
      padding: var(--spacing-6) var(--spacing-5);
    }
    
    .hero-title {
      font-size: 56px;
    }
  }
</style>
