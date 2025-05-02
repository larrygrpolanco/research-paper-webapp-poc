<script>
  import { onMount } from 'svelte';
  import IdolProfile from '$lib/components/IdolProfile.svelte';
  import AccentBadge from '$lib/components/AccentBadge.svelte';
  import SentimentChart from '$lib/components/SentimentChart.svelte';
  
  // Import data
  import idolsData from '$lib/data/idols.json';
  import commentsData from '$lib/data/comments.json';
  
  // State
  let idols = [];
  let selectedIdol = null;
  let isLoading = true;
  
  // Process data on mount
  onMount(() => {
    // Process idols data
    idols = idolsData.idols.map(idol => {
      // Get comments for this idol
      const idolComments = commentsData.comments.filter(comment => 
        comment.mentionedIdols && comment.mentionedIdols.includes(idol.id)
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
      const videos = idol.appearsInVideos.map(videoId => {
        const video = commentsData.videos?.find(v => v.id === videoId);
        return {
          id: videoId,
          title: video ? video.title : `Video #${videoId}`
        };
      });
      
      return {
        ...idol,
        commentCount: idolComments.length,
        positivePercentage,
        neutralPercentage,
        negativePercentage,
        positiveCount: positive,
        neutralCount: neutral,
        negativeCount: negative,
        videos
      };
    });
    
    isLoading = false;
  });
  
  // Handle idol selection
  function selectIdol(idol) {
    selectedIdol = idol;
    window.scrollTo({
      top: document.getElementById('idol-detail').offsetTop - 100,
      behavior: 'smooth'
    });
  }
  
  // Get accent description
  function getAccentDescription(accentType) {
    const descriptions = {
      'American accent': 'General American English accent, characterized by rhotic pronunciation and neutral vowels.',
      'Australian accent': 'Australian English accent, characterized by non-rhotic pronunciation and distinctive vowel shifts.',
      'Valley girl accent': 'Sociolect of American English associated with Southern California, characterized by uptalk and vocal fry.',
      'New York accent': 'Dialect of American English spoken in New York City, characterized by non-rhotic pronunciation and distinctive vowel shifts.',
      'New Zealand accent': 'New Zealand English accent, similar to Australian but with distinctive vowel shifts and intonation patterns.',
      'Undefined': 'No specific accent type identified in the research.',
      'Canadian accent': 'Canadian English accent, similar to General American but with distinctive features like Canadian raising.'
    };
    
    return descriptions[accentType] || accentType;
  }
  
  // Get accent examples
  function getAccentExamples(accentType) {
    const examples = {
      'American accent': [
        'pronouncing "r" sounds clearly in words like "car" and "park"',
        'using a flat "a" sound in words like "bath" and "path"',
        'pronouncing "t" as a tap or flap in words like "butter"'
      ],
      'Australian accent': [
        'rising intonation at the end of statements',
        'pronouncing "a" as "ai" in words like "day" and "make"',
        'dropping the "r" sound in words like "car" and "park"'
      ],
      'Valley girl accent': [
        'uptalk (rising intonation at the end of statements)',
        'vocal fry (creaky voice quality)',
        'using "like" as a discourse marker'
      ],
      'New York accent': [
        'dropping the "r" sound in words like "car" and "park"',
        'pronouncing "aw" sounds distinctively in words like "coffee" and "dog"',
        'pronouncing "th" as "d" or "t" in words like "these" and "those"'
      ],
      'New Zealand accent': [
        'pronouncing "i" as a central vowel in words like "fish"',
        'merging "ear" and "air" sounds',
        'raising short "e" vowels in words like "dress"'
      ],
      'Canadian accent': [
        'Canadian raising (pronouncing "ou" and "ow" with a raised first element)',
        'pronouncing "about" closer to "aboot"',
        'merging "cot" and "caught" vowels'
      ]
    };
    
    return examples[accentType] || [];
  }
  
  // Get background description
  function getBackgroundDescription(idol) {
    if (idol.id === 'wendy') {
      return `Born in Korea, Wendy moved to Canada when she was 11 years old. She spent her formative years in Canada, which significantly influenced her English accent. Her American accent is often described as clear and natural by fans.`;
    } else if (idol.id === 'rose') {
      return `Born in New Zealand and raised in Australia from age 7, Rosé grew up in an English-speaking environment. Her Australian accent is distinctive and often commented on by fans who find it elegant and attractive.`;
    } else if (idol.id === 'felix') {
      return `Born and raised in Australia, Felix has a strong Australian accent that fans find distinctive and charming. His deep voice combined with his accent is frequently mentioned in comments.`;
    } else if (idol.id === 'rm') {
      return `Born and raised in Korea, RM learned English primarily through self-study and media. Despite not living in an English-speaking country, his English proficiency is highly regarded by fans.`;
    } else if (idol.id === 'jennie') {
      return `Born in Korea, Jennie studied in New Zealand for five years during her childhood. Her New Zealand accent influences her English pronunciation, which fans often describe as cute and distinctive.`;
    } else if (idol.id === 'joshua') {
      return `Born and raised in the US, Joshua is a native English speaker with an American accent. Fans often comment on his natural English pronunciation and Valley girl accent features.`;
    } else if (idol.id === 'mark') {
      return `Born and raised in Canada, Mark is a native English speaker with a North American accent. His English is often described as having New York accent features despite his Canadian background.`;
    }
    
    return idol.background;
  }
</script>

<div class="idols-page">
  <div class="page-header">
    <h1 class="page-title">K-pop Idol Accent Profiles</h1>
    <p class="page-description">
      Explore the English accents of 7 K-pop idols featured in the research and how fans perceive them.
    </p>
  </div>
  
  <div class="accent-overview">
    <h2 class="section-title">Accent Types in K-pop</h2>
    <p class="section-description">
      The research examines how fans perceive different English accent types used by K-pop idols,
      particularly those from "inner circle" countries like the US, UK, Canada, and Australia.
    </p>
    
    <div class="accent-badges">
      <div class="accent-badge-item">
        <AccentBadge type="American" />
        <span class="accent-label">American</span>
      </div>
      
      <div class="accent-badge-item">
        <AccentBadge type="Australian" />
        <span class="accent-label">Australian</span>
      </div>
      
      <div class="accent-badge-item">
        <AccentBadge type="Valley Girl" />
        <span class="accent-label">Valley Girl</span>
      </div>
      
      <div class="accent-badge-item">
        <AccentBadge type="British" />
        <span class="accent-label">British</span>
      </div>
      
      <div class="accent-badge-item">
        <AccentBadge type="Canadian" />
        <span class="accent-label">Canadian</span>
      </div>
    </div>
  </div>
  
  {#if isLoading}
    <div class="loading-indicator">
      <p>Loading idol profiles...</p>
    </div>
  {:else}
    <div class="idols-grid">
      {#each idols as idol}
        <div class="idol-card" on:click={() => selectIdol(idol)}>
          <div class="idol-card-header">
            <h3 class="idol-name">{idol.name}</h3>
            <AccentBadge type={idol.accentType.split(' ')[0]} size="small" />
          </div>
          
          <div class="idol-card-content">
            <p class="idol-background">{idol.background}</p>
            <div class="idol-stats">
              <span class="comment-count">{idol.commentCount} comments</span>
              {#if idol.commentCount > 0}
                <div class="sentiment-bar">
                  <div 
                    class="sentiment-segment positive" 
                    style="width: {idol.positivePercentage}%"
                    title="Positive: {idol.positivePercentage.toFixed(1)}%"
                  ></div>
                  <div 
                    class="sentiment-segment neutral" 
                    style="width: {idol.neutralPercentage}%"
                    title="Neutral: {idol.neutralPercentage.toFixed(1)}%"
                  ></div>
                  <div 
                    class="sentiment-segment negative" 
                    style="width: {idol.negativePercentage}%"
                    title="Negative: {idol.negativePercentage.toFixed(1)}%"
                  ></div>
                </div>
              {/if}
            </div>
          </div>
          
          <button class="view-profile-button">View Profile</button>
        </div>
      {/each}
    </div>
    
    {#if selectedIdol}
      <div id="idol-detail" class="idol-detail">
        <div class="idol-detail-header">
          <h2 class="idol-detail-name">{selectedIdol.name}</h2>
          <AccentBadge type={selectedIdol.accentType.split(' ')[0]} />
        </div>
        
        <div class="idol-detail-content">
          <div class="idol-info">
            <div class="info-section">
              <h3 class="info-title">Background</h3>
              <p class="info-text">{getBackgroundDescription(selectedIdol)}</p>
            </div>
            
            <div class="info-section">
              <h3 class="info-title">Accent Type</h3>
              <p class="info-text">{getAccentDescription(selectedIdol.accentType)}</p>
              
              {#if getAccentExamples(selectedIdol.accentType).length > 0}
                <h4 class="info-subtitle">Accent Features</h4>
                <ul class="accent-features">
                  {#each getAccentExamples(selectedIdol.accentType) as feature}
                    <li>{feature}</li>
                  {/each}
                </ul>
              {/if}
            </div>
            
            <div class="info-section">
              <h3 class="info-title">Featured In</h3>
              <ul class="videos-list">
                {#each selectedIdol.appearsInVideos as videoId}
                  <li>
                    <a href="/videos/{videoId}" class="video-link">Video #{videoId}</a>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
          
          <div class="idol-sentiment">
            <h3 class="info-title">Fan Sentiment</h3>
            
            {#if selectedIdol.commentCount > 0}
              <SentimentChart 
                positive={selectedIdol.positivePercentage}
                neutral={selectedIdol.neutralPercentage}
                negative={selectedIdol.negativePercentage}
                positiveCount={selectedIdol.positiveCount}
                neutralCount={selectedIdol.neutralCount}
                negativeCount={selectedIdol.negativeCount}
                title={`How Fans Feel About ${selectedIdol.name}'s English`}
                description="Distribution of sentiment in comments about this idol's English accent"
              />
            {:else}
              <p class="no-data">No sentiment data available for this idol.</p>
            {/if}
            
            <div class="action-buttons">
              <a href="/comments?idol={selectedIdol.id}" class="btn-primary">
                View Comments About {selectedIdol.name}
              </a>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/if}
  
  <div class="research-context">
    <h2 class="section-title">About This Research</h2>
    <p>
      This research examines how K-pop fans perceive and evaluate the English accents of K-pop idols,
      particularly those from "inner circle" countries like the US, UK, Canada, and Australia.
    </p>
    <p>
      The study found that fans overwhelmingly express positive sentiment toward idols' English accents,
      often focusing on how "native-like" they sound and associating certain accent features with
      positive social characteristics like being "cool," "sexy," or "elegant."
    </p>
    <a href="/learn" class="learn-more-link">Learn more about the research</a>
  </div>
</div>

<style>
  .idols-page {
    padding-bottom: var(--spacing-6);
  }
  
  .page-header {
    text-align: center;
    margin-bottom: var(--spacing-4);
  }
  
  .page-title {
    font-size: var(--font-size-h1);
    line-height: var(--line-height-h1);
    margin-bottom: var(--spacing-2);
    color: var(--color-text-primary);
  }
  
  .page-description {
    max-width: 800px;
    margin: 0 auto;
    color: var(--color-text-secondary);
  }
  
  .section-title {
    font-size: var(--font-size-h2);
    line-height: var(--line-height-h2);
    margin: 0 0 var(--spacing-2);
  }
  
  .section-description {
    max-width: 800px;
    margin: 0 0 var(--spacing-3);
    color: var(--color-text-secondary);
  }
  
  .accent-overview {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-4);
    margin-bottom: var(--spacing-4);
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
    color: var(--color-text-secondary);
  }
  
  .loading-indicator {
    text-align: center;
    padding: var(--spacing-4);
    color: var(--color-text-secondary);
  }
  
  .idols-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-5);
  }
  
  .idol-card {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-3);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .idol-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .idol-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-2);
  }
  
  .idol-name {
    font-size: var(--font-size-h3);
    margin: 0;
  }
  
  .idol-card-content {
    margin-bottom: var(--spacing-2);
  }
  
  .idol-background {
    margin: 0 0 var(--spacing-2);
    color: var(--color-text-secondary);
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .idol-stats {
    margin-top: var(--spacing-2);
  }
  
  .comment-count {
    display: block;
    font-size: var(--font-size-small);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-1);
  }
  
  .sentiment-bar {
    height: 8px;
    display: flex;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .sentiment-segment {
    height: 100%;
  }
  
  .sentiment-segment.positive {
    background-color: var(--color-positive);
  }
  
  .sentiment-segment.neutral {
    background-color: var(--color-neutral);
  }
  
  .sentiment-segment.negative {
    background-color: var(--color-negative);
  }
  
  .view-profile-button {
    background-color: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-1) var(--spacing-2);
    font-size: var(--font-size-small);
    cursor: pointer;
    width: 100%;
    transition: background-color 0.2s, color 0.2s;
  }
  
  .view-profile-button:hover {
    background-color: var(--color-primary);
    color: white;
  }
  
  .idol-detail {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-4);
    margin-bottom: var(--spacing-5);
  }
  
  .idol-detail-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-3);
    padding-bottom: var(--spacing-2);
    border-bottom: 1px solid var(--color-border);
  }
  
  .idol-detail-name {
    font-size: var(--font-size-h2);
    margin: 0;
  }
  
  .idol-detail-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
  
  .info-section {
    margin-bottom: var(--spacing-3);
  }
  
  .info-title {
    font-size: var(--font-size-h3);
    margin: 0 0 var(--spacing-1);
    color: var(--color-secondary);
  }
  
  .info-subtitle {
    font-size: var(--font-size-h4);
    margin: var(--spacing-2) 0 var(--spacing-1);
  }
  
  .info-text {
    margin: 0 0 var(--spacing-2);
    line-height: 1.6;
  }
  
  .accent-features {
    margin: 0;
    padding-left: var(--spacing-3);
  }
  
  .accent-features li {
    margin-bottom: var(--spacing-1);
  }
  
  .videos-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .videos-list li {
    margin-bottom: var(--spacing-1);
  }
  
  .video-link {
    color: var(--color-primary);
    text-decoration: none;
  }
  
  .video-link:hover {
    text-decoration: underline;
  }
  
  .no-data {
    text-align: center;
    padding: var(--spacing-4);
    color: var(--color-text-secondary);
  }
  
  .action-buttons {
    display: flex;
    justify-content: center;
    margin-top: var(--spacing-3);
  }
  
  .research-context {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-4);
  }
  
  .research-context p {
    margin-bottom: var(--spacing-2);
  }
  
  .learn-more-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: var(--font-weight-medium);
  }
  
  .learn-more-link:hover {
    text-decoration: underline;
  }
  
  /* Responsive styles */
  @media (min-width: 1024px) {
    .idol-detail-content {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
