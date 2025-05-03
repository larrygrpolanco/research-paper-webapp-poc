<script>
  // Props
  export let name = '';
  export let image = ''; // URL to idol's image
  export let birthplace = '';
  export let background = '';
  export let accentType = '';
  export let accentDescription = '';
  export let commentCount = 0;
  export let positivePercentage = 0;
  export let neutralPercentage = 0;
  export let negativePercentage = 0;
  export let videos = []; // Array of {id: 'video-id', title: 'Video Title'}
  
  // Computed values
  $: hasVideos = videos && videos.length > 0;
  
  // Format percentage for display
  function formatPercentage(value) {
    return `${value.toFixed(1)}%`;
  }
</script>

<div class="idol-profile-card">
  <div class="idol-header">
    {#if image}
      <div class="idol-image-container">
        <img src={image} alt={name} class="idol-image" />
      </div>
    {:else}
      <div class="idol-image-placeholder">
        <span class="idol-initials">{name.split(' ').map(n => n[0]).join('')}</span>
      </div>
    {/if}
    
    <div class="idol-title">
      <h3 class="idol-name">{name}</h3>
      {#if accentType}
        <div class="accent-badge">
          <span class="accent-type">{accentType}</span>
        </div>
      {/if}
    </div>
  </div>
  
  <div class="idol-details">
    {#if birthplace}
      <div class="detail-item">
        <span class="detail-label">Birthplace:</span>
        <span class="detail-value">{birthplace}</span>
      </div>
    {/if}
    
    {#if background}
      <div class="detail-item">
        <span class="detail-label">Background:</span>
        <span class="detail-value">{background}</span>
      </div>
    {/if}
    
    {#if accentDescription}
      <div class="detail-item">
        <span class="detail-label">Accent:</span>
        <span class="detail-value">{accentDescription}</span>
      </div>
    {/if}
  </div>
  
  {#if commentCount > 0}
    <div class="comment-stats">
      <h4 class="stats-heading">Comment Analysis</h4>
      <div class="stats-value">{commentCount} comments</div>
      
      <div class="sentiment-bars">
        <div class="sentiment-bar-item">
          <div class="sentiment-label">
            <span class="sentiment-indicator positive"></span>
            <span>Positive</span>
          </div>
          <div class="sentiment-bar-container">
            <div class="sentiment-bar positive" style="width: {positivePercentage}%"></div>
          </div>
          <div class="sentiment-percentage">{formatPercentage(positivePercentage)}</div>
        </div>
        
        <div class="sentiment-bar-item">
          <div class="sentiment-label">
            <span class="sentiment-indicator neutral"></span>
            <span>Neutral</span>
          </div>
          <div class="sentiment-bar-container">
            <div class="sentiment-bar neutral" style="width: {neutralPercentage}%"></div>
          </div>
          <div class="sentiment-percentage">{formatPercentage(neutralPercentage)}</div>
        </div>
        
        <div class="sentiment-bar-item">
          <div class="sentiment-label">
            <span class="sentiment-indicator negative"></span>
            <span>Negative</span>
          </div>
          <div class="sentiment-bar-container">
            <div class="sentiment-bar negative" style="width: {negativePercentage}%"></div>
          </div>
          <div class="sentiment-percentage">{formatPercentage(negativePercentage)}</div>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- {#if hasVideos}
    <div class="idol-videos">
      <h4 class="videos-heading">Featured In</h4>
      <ul class="videos-list">
        {#each videos as video}
          <li class="video-item">
            <a href="/videos/{video.id}" class="video-link">{video.title}</a>
          </li>
        {/each}
      </ul>
    </div>
  {/if} -->
  
  <div class="idol-actions">
    <a href="/idols" class="btn-secondary">
      View Full Profile
    </a>
  </div>
</div>

<style>
  .idol-profile-card {
    background-color: white;
    padding: var(--spacing-3);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    margin-bottom: var(--spacing-3);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .idol-profile-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  .idol-header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-3);
  }
  
  .idol-image-container {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: var(--spacing-2);
    flex-shrink: 0;
  }
  
  .idol-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .idol-image-placeholder {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: var(--color-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: var(--spacing-2);
    flex-shrink: 0;
  }
  
  .idol-initials {
    color: white;
    font-size: var(--font-size-h3);
    font-weight: var(--font-weight-bold);
  }
  
  .idol-title {
    flex-grow: 1;
  }
  
  .idol-name {
    margin: 0 0 var(--spacing-1);
    font-size: var(--font-size-h3);
    line-height: var(--line-height-h3);
  }
  
  .accent-badge {
    display: inline-block;
    background-color: rgba(255, 62, 118, 0.1);
    color: var(--color-primary);
    padding: 4px 8px;
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
  }
  
  .idol-details {
    margin-bottom: var(--spacing-3);
  }
  
  .detail-item {
    margin-bottom: var(--spacing-1);
  }
  
  .detail-label {
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    margin-right: var(--spacing-1);
  }
  
  .detail-value {
    color: var(--color-text-primary);
  }
  
  .comment-stats {
    margin-bottom: var(--spacing-3);
    padding: var(--spacing-2);
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: var(--border-radius-md);
  }
  
  .stats-heading {
    margin: 0 0 var(--spacing-1);
    font-size: var(--font-size-h4);
    line-height: var(--line-height-h4);
  }
  
  .stats-value {
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--spacing-2);
  }
  
  .sentiment-bars {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
  }
  
  .sentiment-bar-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
  }
  
  .sentiment-label {
    display: flex;
    align-items: center;
    width: 80px;
    font-size: var(--font-size-small);
  }
  
  .sentiment-bar-container {
    flex-grow: 1;
    height: 8px;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    overflow: hidden;
  }
  
  .sentiment-bar {
    height: 100%;
    border-radius: 4px;
  }
  
  .sentiment-bar.positive {
    background-color: var(--color-positive);
  }
  
  .sentiment-bar.neutral {
    background-color: var(--color-neutral);
  }
  
  .sentiment-bar.negative {
    background-color: var(--color-negative);
  }
  
  .sentiment-percentage {
    width: 40px;
    text-align: right;
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
  }
  
  .idol-videos {
    margin-bottom: var(--spacing-3);
  }
  
  .videos-heading {
    margin: 0 0 var(--spacing-1);
    font-size: var(--font-size-h4);
    line-height: var(--line-height-h4);
  }
  
  .videos-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .video-item {
    margin-bottom: var(--spacing-1);
  }
  
  .video-link {
    color: var(--color-secondary);
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .video-link:hover {
    text-decoration: underline;
  }
  
  .idol-actions {
    display: flex;
    justify-content: center;
  }
  
  /* Responsive styles */
  @media (min-width: 640px) {
    .idol-header {
      margin-bottom: var(--spacing-3);
    }
    
    .idol-image-container,
    .idol-image-placeholder {
      width: 100px;
      height: 100px;
    }
  }
</style>
