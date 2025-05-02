<script>
  // Props
  export let text = '';
  export let language = 'English'; // 'English' or 'Korean'
  export let sentiment = 'positive'; // 'positive', 'neutral', or 'negative'
  export let tags = []; // Array of {id: 'tag-id', label: 'Tag Label'}
  export let idolName = '';
  export let videoSource = '';
  
  // State
  let expanded = false;
  let isLongComment = false;
  
  // Check if comment is long and should be truncated
  $: {
    isLongComment = text.length > 150;
  }
  
  // Toggle expanded state
  function toggleExpanded() {
    expanded = !expanded;
  }
  
  // Get display text based on expanded state
  $: displayText = isLongComment && !expanded ? text.slice(0, 150) + '...' : text;
</script>

<div class="comment-card">
  <div class="comment-header">
    <span class="sentiment-indicator {sentiment}"></span>
    <span class="comment-language">{language}</span>
  </div>
  
  <p class="comment-text">"{displayText}"</p>
  
  {#if isLongComment}
    <button class="read-more-button" on:click={toggleExpanded}>
      {expanded ? 'Show less' : 'Read more'}
    </button>
  {/if}
  
  {#if tags && tags.length > 0}
    <div class="comment-tags">
      {#each tags as tag}
        <span class="tag {tag.id}">{tag.label}</span>
      {/each}
    </div>
  {/if}
  
  <div class="comment-footer">
    {#if idolName}
      <span class="idol-name">{idolName}</span>
    {/if}
    
    {#if videoSource}
      <span class="video-source">{videoSource}</span>
    {/if}
  </div>
</div>

<style>
  .comment-card {
    background-color: white;
    padding: var(--spacing-2);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-border);
    margin-bottom: var(--spacing-2);
    transition: box-shadow 0.2s;
  }
  
  .comment-card:hover {
    box-shadow: var(--shadow-md);
  }
  
  .comment-header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-1);
  }
  
  .sentiment-indicator {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: var(--spacing-1);
  }
  
  .sentiment-indicator.positive {
    background-color: var(--color-positive);
  }
  
  .sentiment-indicator.neutral {
    background-color: var(--color-neutral);
  }
  
  .sentiment-indicator.negative {
    background-color: var(--color-negative);
  }
  
  .comment-language {
    font-size: var(--font-size-small);
    color: var(--color-text-secondary);
    background-color: rgba(0, 0, 0, 0.05);
    padding: 2px 6px;
    border-radius: var(--border-radius-sm);
  }
  
  .comment-text {
    font-size: var(--font-size-comment);
    line-height: var(--line-height-comment);
    margin: var(--spacing-1) 0;
    font-style: italic;
  }
  
  .read-more-button {
    background: none;
    border: none;
    color: var(--color-secondary);
    font-size: var(--font-size-small);
    padding: 0;
    cursor: pointer;
    margin-bottom: var(--spacing-1);
  }
  
  .read-more-button:hover {
    text-decoration: underline;
  }
  
  .comment-tags {
    display: flex;
    flex-wrap: wrap;
    margin: var(--spacing-1) 0;
  }
  
  .tag {
    display: inline-block;
    padding: 4px 8px;
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
    margin-right: var(--spacing-1);
    margin-bottom: var(--spacing-1);
  }
  
  .tag.social-attractiveness {
    background-color: rgba(98, 54, 255, 0.1);
    color: var(--color-secondary);
  }
  
  .tag.nativeness {
    background-color: rgba(255, 62, 118, 0.1);
    color: var(--color-primary);
  }
  
  .tag.phonetic-features {
    background-color: rgba(54, 215, 183, 0.1);
    color: var(--color-positive);
  }
  
  .tag.speech {
    background-color: rgba(241, 196, 15, 0.1);
    color: var(--color-neutral);
  }
  
  .tag.motivation {
    background-color: rgba(231, 76, 60, 0.1);
    color: var(--color-negative);
  }
  
  .tag.proficiency {
    background-color: rgba(52, 152, 219, 0.1);
    color: #3498db;
  }
  
  .tag.comprehensibility {
    background-color: rgba(155, 89, 182, 0.1);
    color: #9b59b6;
  }
  
  .tag.metalinguistic {
    background-color: rgba(46, 204, 113, 0.1);
    color: #2ecc71;
  }
  
  .comment-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--spacing-1);
    font-size: var(--font-size-small);
    color: var(--color-text-secondary);
  }
  
  .idol-name {
    font-weight: var(--font-weight-medium);
  }
  
  .video-source {
    font-style: italic;
  }
</style>
