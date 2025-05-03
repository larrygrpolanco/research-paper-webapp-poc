<script>
  import { onMount } from 'svelte';
  import CommentCard from '$lib/components/CommentCard.svelte';
  import FilterBar from '$lib/components/FilterBar.svelte';
  import SentimentChart from '$lib/components/SentimentChart.svelte';
  import AccentBadge from '$lib/components/AccentBadge.svelte';
  
  // Import data
  import commentsData from '$lib/data/comments.json';
  import idolsData from '$lib/data/idols.json';
  import videosData from '$lib/data/videos.json';
  import findingsData from '$lib/data/findings.json';
  
  // State
  let comments = [];
  let filteredComments = [];
  let selectedFilters = {
    sentiment: [],
    aspect: [],
    idol: [],
    language: []
  };
  let searchQuery = '';
  let isLoading = true;
  let showChart = true;
  let currentPage = 1;
  let commentsPerPage = 10;
  
  // Prepare idol and video lookup maps for easier reference
  const idolMap = {};
  const videoMap = {};
  
  // Initialize data
  onMount(() => {
    // Create lookup maps
    idolsData.idols.forEach(idol => {
      idolMap[idol.id] = idol;
    });
    
    videosData.videos.forEach(video => {
      videoMap[video.id] = video;
    });
    
    // Process comments
    comments = commentsData.comments.map(comment => {
      // Skip comments with empty text
      if (!comment.text.trim()) return null;
      
      // Create tags from evaluation aspects
      const tags = comment.evaluationAspects.map(aspect => {
        const label = findingsData.aspectCodingKey[aspect] || aspect;
        return {
          id: aspect.toLowerCase().replace(/\s+/g, '-'),
          label: label
        };
      });
      
      // Get video title if available
      let videoSource = '';
      if (comment.videoId && videoMap[comment.videoId]) {
        videoSource = `Video #${comment.videoId}: ${videoMap[comment.videoId].titleEnglish.substring(0, 30)}...`;
      }
      
      // Get idol name if available
      let idolName = '';
      if (comment.mentionedIdols && comment.mentionedIdols.length > 0) {
        const idol = idolMap[comment.mentionedIdols[0]];
        if (idol) {
          idolName = idol.name;
        }
      }
      
      return {
        ...comment,
        tags,
        videoSource,
        idolName
      };
    }).filter(Boolean); // Remove null entries
    
    // Initialize filtered comments
    applyFilters();
    isLoading = false;
  });
  
  // Filter configuration
  const filterConfig = [
    {
      id: 'sentiment',
      label: 'Sentiment',
      options: [
        { id: 'positive', label: 'Positive', count: 0 },
        { id: 'neutral', label: 'Neutral', count: 0 },
        { id: 'negative', label: 'Negative', count: 0 }
      ],
      multiSelect: true
    },
    {
      id: 'aspect',
      label: 'What They Talk About',
      options: [
        { id: 'social-attractiveness', label: 'Social Attractiveness', count: 0 },
        { id: 'nativeness', label: 'Nativeness', count: 0 },
        { id: 'phonetic-features', label: 'Phonetic Features', count: 0 },
        { id: 'speech', label: 'Speech', count: 0 },
        { id: 'motivation', label: 'Motivation', count: 0 },
        { id: 'proficiency', label: 'Proficiency', count: 0 },
        { id: 'comprehensibility', label: 'Comprehensibility', count: 0 }
      ],
      multiSelect: true
    },
    {
      id: 'idol',
      label: 'Idol',
      options: [
        { id: 'wendy', label: 'Wendy', count: 0 },
        { id: 'rose', label: 'Rosé', count: 0 },
        { id: 'felix', label: 'Felix', count: 0 },
        { id: 'rm', label: 'RM', count: 0 },
        { id: 'jennie', label: 'Jennie', count: 0 },
        { id: 'joshua', label: 'Joshua', count: 0 },
        { id: 'mark', label: 'Mark', count: 0 }
      ],
      multiSelect: true
    },
    {
      id: 'language',
      label: 'Language',
      options: [
        { id: 'english', label: 'English', count: 0 },
        { id: 'korean', label: 'Korean', count: 0 }
      ],
      multiSelect: false
    }
  ];
  
  // Update filter counts
  $: {
    if (comments.length > 0) {
      // Count sentiments
      const sentimentCounts = {};
      comments.forEach(comment => {
        if (!sentimentCounts[comment.sentiment]) {
          sentimentCounts[comment.sentiment] = 0;
        }
        sentimentCounts[comment.sentiment]++;
      });
      
      filterConfig[0].options.forEach(option => {
        option.count = sentimentCounts[option.id] || 0;
      });
      
      // Count aspects
      const aspectCounts = {};
      comments.forEach(comment => {
        comment.evaluationAspects.forEach(aspect => {
          const normalizedAspect = aspect.toLowerCase().replace(/\s+/g, '-');
          if (!aspectCounts[normalizedAspect]) {
            aspectCounts[normalizedAspect] = 0;
          }
          aspectCounts[normalizedAspect]++;
        });
      });
      
      filterConfig[1].options.forEach(option => {
        option.count = aspectCounts[option.id] || 0;
      });
      
      // Count idols
      const idolCounts = {};
      comments.forEach(comment => {
        if (comment.mentionedIdols) {
          comment.mentionedIdols.forEach(idol => {
            if (!idolCounts[idol]) {
              idolCounts[idol] = 0;
            }
            idolCounts[idol]++;
          });
        }
      });
      
      filterConfig[2].options.forEach(option => {
        option.count = idolCounts[option.id] || 0;
      });
      
      // Count languages
      const languageCounts = {
        english: comments.filter(c => c.language === 'English').length,
        korean: comments.filter(c => c.language === 'Korean').length
      };
      
      filterConfig[3].options.forEach(option => {
        option.count = languageCounts[option.id] || 0;
      });
    }
  }
  
  // Apply filters to comments
  function applyFilters() {
    filteredComments = comments.filter(comment => {
      // Filter by sentiment
      if (selectedFilters.sentiment.length > 0 && !selectedFilters.sentiment.includes(comment.sentiment)) {
        return false;
      }
      
      // Filter by aspect
      if (selectedFilters.aspect.length > 0) {
        const commentAspects = comment.tags.map(tag => tag.id);
        if (!selectedFilters.aspect.some(aspect => commentAspects.includes(aspect))) {
          return false;
        }
      }
      
      // Filter by idol
      if (selectedFilters.idol.length > 0) {
        if (!comment.mentionedIdols || !comment.mentionedIdols.some(idol => selectedFilters.idol.includes(idol))) {
          return false;
        }
      }
      
      // Filter by language
      if (selectedFilters.language.length > 0) {
        const languageId = comment.language.toLowerCase();
        if (!selectedFilters.language.includes(languageId)) {
          return false;
        }
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const text = comment.text.toLowerCase();
        const translation = comment.translation ? comment.translation.toLowerCase() : '';
        
        if (!text.includes(query) && !translation.includes(query)) {
          return false;
        }
      }
      
      return true;
    });
    
    // Reset to first page when filters change
    currentPage = 1;
  }
  
  // Handle filter changes
  function handleFilterChange(event) {
    selectedFilters = event.detail.selectedFilters;
    applyFilters();
  }
  
  // Handle search input
  function handleSearch() {
    applyFilters();
  }
  
  // Pagination
  $: totalPages = Math.ceil(filteredComments.length / commentsPerPage);
  $: paginatedComments = filteredComments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );
  
  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      window.scrollTo(0, 0);
    }
  }
  
  // Get sentiment distribution for chart
  $: {
    const relevantComments = comments.filter(c => c.sentiment !== 'off-topic' && c.sentiment !== 'unknown');
    const total = relevantComments.length;
    
    if (total > 0) {
      const positive = relevantComments.filter(c => c.sentiment === 'positive').length;
      const neutral = relevantComments.filter(c => c.sentiment === 'neutral').length;
      const negative = relevantComments.filter(c => c.sentiment === 'negative').length;
      
      sentimentData = {
        positive: (positive / total) * 100,
        neutral: (neutral / total) * 100,
        negative: (negative / total) * 100,
        positiveCount: positive,
        neutralCount: neutral,
        negativeCount: negative
      };
    }
  }
  
  let sentimentData = {
    positive: findingsData.sentimentDistribution.positive,
    neutral: findingsData.sentimentDistribution.neutral,
    negative: findingsData.sentimentDistribution.negative,
    positiveCount: 357,
    neutralCount: 43,
    negativeCount: 5
  };
  
  // Toggle chart visibility
  function toggleChart() {
    showChart = !showChart;
  }
</script>

<div class="comments-page">
  <div class="page-header">
    <h1 class="page-title">Comment Explorer</h1>
    <p class="page-description">
      Explore {comments.length} comments about K-pop idols' English accents from YouTube videos.
      See how fans perceive different accent types and what aspects they focus on.
    </p>
  </div>
  
  <div class="sentiment-overview">
    <div class="sentiment-header">
      <h2 class="section-title">Sentiment Overview</h2>
      <button class="toggle-button" on:click={toggleChart}>
        {showChart ? 'Hide Chart' : 'Show Chart'}
      </button>
    </div>
    
    {#if showChart}
      <div class="chart-container">
        <SentimentChart 
          positive={sentimentData.positive}
          neutral={sentimentData.neutral}
          negative={sentimentData.negative}
          positiveCount={sentimentData.positiveCount}
          neutralCount={sentimentData.neutralCount}
          negativeCount={sentimentData.negativeCount}
          title="How Fans Feel About K-pop Idols' English Accents"
          description="The vast majority of comments express positive sentiment toward idols' English accents"
        />
      </div>
    {/if}
    
    <div class="key-findings">
      <div class="finding-card">
        <h3 class="finding-title">88.1%</h3>
        <p class="finding-description">Comments express positive sentiment about idols' English accents</p>
      </div>
      
      <div class="finding-card">
        <h3 class="finding-title">33.6%</h3>
        <p class="finding-description">Comments focus on social attractiveness (how the accent sounds "cool" or "sexy")</p>
      </div>
      
      <div class="finding-card">
        <h3 class="finding-title">30.3%</h3>
        <p class="finding-description">Comments discuss how "native-like" the idol's accent sounds</p>
      </div>
    </div>
  </div>
  
  <div class="explorer-container">
    <div class="sidebar">
      <div class="search-container">
        <input 
          type="text" 
          placeholder="Search comments..." 
          bind:value={searchQuery}
          on:input={handleSearch}
          class="search-input"
        />
      </div>
      
      <FilterBar 
        filters={filterConfig}
        bind:selectedFilters={selectedFilters}
        on:filterchange={handleFilterChange}
        showCounts={true}
        collapsible={true}
        initiallyExpanded={false}
      />
      
      <div class="accent-types">
        <h3 class="sidebar-title">Accent Types</h3>
        <div class="accent-badges">
          <AccentBadge type="American" size="small" />
          <AccentBadge type="Australian" size="small" />
          <AccentBadge type="British" size="small" />
          <AccentBadge type="Valley Girl" size="small" />
        </div>
      </div>
    </div>
    
    <div class="comments-container">
      <div class="results-header">
        <h2 class="section-title">
          {filteredComments.length} 
          {filteredComments.length === 1 ? 'Comment' : 'Comments'} Found
        </h2>
        
        {#if filteredComments.length > 0}
          <div class="sort-controls">
            <label for="comments-per-page">Show:</label>
            <select id="comments-per-page" bind:value={commentsPerPage}>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        {/if}
      </div>
      
      {#if isLoading}
        <div class="loading-indicator">
          <p>Loading comments...</p>
        </div>
      {:else if filteredComments.length === 0}
        <div class="no-results">
          <p>No comments match your filters. Try adjusting your search criteria.</p>
          <button class="btn-secondary" on:click={() => {
            selectedFilters = { sentiment: [], aspect: [], idol: [], language: [] };
            searchQuery = '';
            applyFilters();
          }}>
            Clear All Filters
          </button>
        </div>
      {:else}
        <div class="comments-grid">
          {#each paginatedComments as comment (comment.id)}
            <CommentCard 
              text={comment.language === 'Korean' && comment.translation ? comment.translation : comment.text}
              language={comment.language}
              sentiment={comment.sentiment}
              tags={comment.tags}
              idolName={comment.idolName}
              videoSource={comment.videoSource}
            />
          {/each}
        </div>
        
        {#if totalPages > 1}
          <div class="pagination">
            <button 
              class="pagination-button" 
              disabled={currentPage === 1}
              on:click={() => goToPage(currentPage - 1)}
            >
              Previous
            </button>
            
            <div class="page-numbers">
              {#each Array(totalPages) as _, i}
                {#if i + 1 === currentPage || i + 1 === 1 || i + 1 === totalPages || (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)}
                  <button 
                    class="page-number {i + 1 === currentPage ? 'active' : ''}"
                    on:click={() => goToPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                {:else if i + 1 === currentPage - 2 || i + 1 === currentPage + 2}
                  <span class="ellipsis">...</span>
                {/if}
              {/each}
            </div>
            
            <button 
              class="pagination-button" 
              disabled={currentPage === totalPages}
              on:click={() => goToPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        {/if}
      {/if}
    </div>
  </div>
  
  <div class="research-context">
    <h2 class="section-title">About This Research</h2>
    <p>
      These comments were collected from YouTube videos featuring K-pop idols speaking English.
      Researchers analyzed how fans perceive different English accents, particularly those from
      "inner circle" countries like the US, UK, Canada, and Australia.
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
  .comments-page {
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
  
  .sentiment-overview {
    margin-bottom: var(--spacing-4);
  }
  
  .sentiment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-2);
  }
  
  .section-title {
    font-size: var(--font-size-h2);
    line-height: var(--line-height-h2);
    margin: 0;
  }
  
  .toggle-button {
    background: none;
    border: none;
    color: var(--color-secondary);
    font-size: var(--font-size-small);
    cursor: pointer;
    text-decoration: underline;
  }
  
  .chart-container {
    margin-bottom: var(--spacing-3);
  }
  
  .key-findings {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-4);
  }
  
  .finding-card {
    background-color: white;
    padding: var(--spacing-3);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-md);
    text-align: center;
  }
  
  .finding-title {
    font-size: 32px;
    color: var(--color-primary);
    margin: 0 0 var(--spacing-1);
  }
  
  .finding-description {
    margin: 0;
    color: var(--color-text-secondary);
  }
  
  .explorer-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-5);
  }
  
  .sidebar {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-3);
  }
  
  .search-container {
    margin-bottom: var(--spacing-3);
  }
  
  .search-input {
    width: 100%;
    padding: var(--spacing-2);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-regular);
  }
  
  .accent-types {
    margin-top: var(--spacing-3);
  }
  
  .sidebar-title {
    font-size: var(--font-size-h4);
    margin: 0 0 var(--spacing-2);
  }
  
  .accent-badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-1);
  }
  
  .comments-container {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-3);
  }
  
  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-3);
  }
  
  .sort-controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-1);
  }
  
  .sort-controls select {
    padding: 4px 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
  }
  
  .loading-indicator, .no-results {
    text-align: center;
    padding: var(--spacing-4);
    color: var(--color-text-secondary);
  }
  
  .comments-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-3);
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-1);
    margin-top: var(--spacing-3);
  }
  
  .pagination-button {
    background-color: white;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    padding: 4px 12px;
    cursor: pointer;
  }
  
  .pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .page-numbers {
    display: flex;
    gap: var(--spacing-1);
  }
  
  .page-number {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-border);
    background-color: white;
    cursor: pointer;
  }
  
  .page-number.active {
    background-color: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }
  
  .ellipsis {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
  }
  
  .research-context {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-4);
    margin-top: var(--spacing-4);
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
    .explorer-container {
      grid-template-columns: 300px 1fr;
    }
    
    .comments-grid {
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }
  }
</style>
