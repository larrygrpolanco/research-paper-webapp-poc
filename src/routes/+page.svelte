<script>
  import SentimentChart from '$lib/components/SentimentChart.svelte';
  import IdolProfile from '$lib/components/IdolProfile.svelte';
  import CommentCard from '$lib/components/CommentCard.svelte';
  import AccentBadge from '$lib/components/AccentBadge.svelte';
</script>

<div class="hero-section">
  <h1 class="hero-title">K-Pop Accent Research</h1>
  <p class="hero-subtitle">
    An interactive visualization of research on K-pop idols' English accents and how they are perceived online
  </p>
  
  <div class="hero-actions">
    <a href="/videos" class="btn btn-primary">Explore Videos</a>
    <a href="/idols" class="btn btn-secondary">View Idol Profiles</a>
  </div>
</div>

<div class="research-overview">
  <h2 class="section-title">Research Overview</h2>
  <p class="section-description">
    Based on the paper "I Want to Be Born with That Pronunciation": Metalinguistic Comments About K-Pop Idols' Inner Circle Accents by Jihye Kim and Luoxiangyu Zhang.
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
  <div class="sentiment-container">
    <SentimentChart />
  </div>
</div>

<div class="features-section">
  <h2 class="section-title">Explore the Research</h2>
  
  <div class="features-grid">
    <div class="feature-card">
      <h3 class="feature-title">Video Analysis Hub</h3>
      <p class="feature-description">
        Watch the four YouTube videos analyzed in the study and explore the comments about idols' English accents.
      </p>
      <a href="/videos" class="feature-link">Explore Videos</a>
    </div>
    
    <div class="feature-card">
      <h3 class="feature-title">Idol Profiles</h3>
      <p class="feature-description">
        Learn about the seven K-pop idols featured in the study and their English accent characteristics.
      </p>
      <a href="/idols" class="feature-link">View Profiles</a>
    </div>
    
    <div class="feature-card">
      <h3 class="feature-title">Comment Explorer</h3>
      <p class="feature-description">
        Browse and filter the 602 metalinguistic comments analyzed in the research paper.
      </p>
      <a href="/comments" class="feature-link">Explore Comments</a>
    </div>
    
    <div class="feature-card">
      <h3 class="feature-title">Learn About Linguistics</h3>
      <p class="feature-description">
        Understand key linguistic concepts like inner circle accents and linguistic stereotyping.
      </p>
      <a href="/learn" class="feature-link">Learn More</a>
    </div>
  </div>
</div>

<div class="accent-types-section">
  <h2 class="section-title">Accent Types</h2>
  <div class="accent-badges">
    <AccentBadge type="American" />
    <AccentBadge type="Australian" />
    <AccentBadge type="British" />
    <AccentBadge type="Valley Girl" />
    <AccentBadge type="Inner Circle" />
    <AccentBadge type="Outer Circle" />
    <AccentBadge type="Expanding Circle" />
  </div>
  <p class="accent-description">
    The research examines how fans perceive different English accent types used by K-pop idols.
  </p>
</div>

<div class="sample-section">
  <div class="sample-idols">
    <h2 class="section-title">Featured Idols</h2>
    <div class="idol-preview">
      <IdolProfile 
        name="Rosé"
        accentType="Australian"
        birthplace="Auckland, New Zealand"
        background="Raised in Melbourne, Australia"
        accentDescription="Australian accent with some Korean influence"
        commentCount={120}
        positivePercentage={92.5}
        neutralPercentage={6.7}
        negativePercentage={0.8}
      />
    </div>
  </div>
  
  <div class="sample-comments">
    <h2 class="section-title">Sample Comments</h2>
    <CommentCard 
      text="ROSIE's accent is so ELEGANT and MAGESTIC. its chef's kiss"
      sentiment="positive"
      tags={[
        {id: 'social-attractiveness', label: 'Social Attractiveness'},
        {id: 'nativeness', label: 'Nativeness'}
      ]}
      idolName="Rosé"
      videoSource="Video #3"
    />
    
    <CommentCard 
      text="I love how Wendy speaks English with a slight Korean accent. It's so cute and shows her cultural background."
      sentiment="positive"
      tags={[
        {id: 'social-attractiveness', label: 'Social Attractiveness'}
      ]}
      idolName="Wendy"
      videoSource="Video #2"
    />
  </div>
</div>

<style>
  .hero-section {
    text-align: center;
    padding: var(--spacing-5) 0 var(--spacing-6);
    margin-bottom: var(--spacing-5);
    background-color: rgba(255, 62, 118, 0.05);
    border-radius: var(--border-radius-lg);
  }
  
  .hero-title {
    font-size: 40px;
    line-height: 1.2;
    margin-bottom: var(--spacing-2);
    color: var(--color-primary);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-h3);
    line-height: var(--line-height-h3);
    color: var(--color-text-secondary);
    max-width: 800px;
    margin: 0 auto var(--spacing-4);
  }
  
  .hero-actions {
    display: flex;
    gap: var(--spacing-2);
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .section-title {
    text-align: center;
    margin-bottom: var(--spacing-4);
    position: relative;
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
  }
  
  .feature-title {
    color: var(--color-secondary);
    margin-top: 0;
    margin-bottom: var(--spacing-2);
  }
  
  .feature-description {
    margin-bottom: var(--spacing-2);
  }
  
  .feature-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
  }
  
  .feature-link:hover {
    text-decoration: underline;
  }
  
  .accent-types-section {
    margin-bottom: var(--spacing-5);
    text-align: center;
  }
  
  .accent-badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    justify-content: center;
    margin-bottom: var(--spacing-3);
  }
  
  .accent-description {
    max-width: 600px;
    margin: 0 auto;
    color: var(--color-text-secondary);
  }
  
  .sample-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
  
  .idol-preview, .sample-comments {
    margin-bottom: var(--spacing-4);
  }
  
  /* Responsive styles */
  @media (min-width: 1024px) {
    .sample-section {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
