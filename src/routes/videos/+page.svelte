<script>
  import { onMount } from 'svelte';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
  import CommentCard from '$lib/components/CommentCard.svelte';
  import AccentBadge from '$lib/components/AccentBadge.svelte';
  
  // Import data
  import videosData from '$lib/data/videos.json';
  import commentsData from '$lib/data/comments.json';
  import idolsData from '$lib/data/idols.json';
  
  // State
  let videos = [];
  let selectedVideo = null;
  let isLoading = true;
  let displayedComments = [];
  let commentPage = 1;
  const commentsPerPage = 5;
  
  // Idol map for easier reference
  const idolMap = {};
  
  // Process data on mount
  onMount(() => {
    // Create idol map
    idolsData.idols.forEach(idol => {
      idolMap[idol.id] = idol;
    });
    
    // Process videos data
    videos = videosData.videos.map(video => {
      // Get comments for this video
      const videoComments = commentsData.comments.filter(comment => 
        comment.videoId === video.id && comment.text.trim() !== ''
      );
      
      // Get idols appearing in this video with their accent types
      const idolsAppearing = video.idolsAppearing.map(idolName => {
        const idol = idolsData.idols.find(i => i.name.toLowerCase() === idolName.toLowerCase());
        return idol ? {
          id: idol.id,
          name: idol.name,
          accentType: idol.accentType
        } : {
          id: idolName.toLowerCase().replace(/\s+/g, '-'),
          name: idolName,
          accentType: 'Unknown'
        };
      });
      
      return {
        ...video,
        commentCount: videoComments.length,
        comments: videoComments,
        idolsAppearing
      };
    });
    
    isLoading = false;
  });
  
  // Handle video selection
  function selectVideo(video) {
    selectedVideo = video;
    displayedComments = [];
    commentPage = 1;
    loadComments();
    
    // Scroll to video player
    setTimeout(() => {
      const videoDetail = document.getElementById('video-detail');
      if (videoDetail) {
        window.scrollTo({
          top: videoDetail.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
  
  // Load comments for selected video
  function loadComments() {
    if (!selectedVideo) return;
    
    // Get interesting comments (non-empty, with sentiment or evaluation aspects)
    const interestingComments = selectedVideo.comments
      .filter(comment => 
        comment.text.trim() !== '' && 
        (comment.sentiment !== 'unknown' || comment.evaluationAspects.length > 0)
      )
      .sort((a, b) => {
        // Prioritize comments with sentiment and evaluation aspects
        const aScore = (a.sentiment !== 'unknown' ? 1 : 0) + (a.evaluationAspects.length > 0 ? 2 : 0);
        const bScore = (b.sentiment !== 'unknown' ? 1 : 0) + (b.evaluationAspects.length > 0 ? 2 : 0);
        return bScore - aScore;
      });
    
    // Get paginated comments
    const startIndex = (commentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const newComments = interestingComments.slice(startIndex, endIndex);
    
    // Process comments for display
    const processedComments = newComments.map(comment => {
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
        const idol = idolMap[comment.mentionedIdols[0]];
        if (idol) {
          idolName = idol.name;
        }
      }
      
      return {
        ...comment,
        tags,
        idolName,
        videoSource: `Video #${selectedVideo.id}`
      };
    });
    
    displayedComments = [...displayedComments, ...processedComments];
  }
  
  // Load more comments
  function loadMoreComments() {
    commentPage++;
    loadComments();
  }
  
  // Format date for display
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // Format number with commas
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  // Get YouTube thumbnail URL
  function getYouTubeThumbnail(youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }
  
  // Get accent examples for a video
  function getAccentExamples(video) {
    const examples = [];
    
    if (video.id === 1) {
      examples.push({
        time: '0:45',
        label: 'Wendy\'s American accent'
      });
      examples.push({
        time: '1:23',
        label: 'RM\'s self-taught English'
      });
      examples.push({
        time: '2:10',
        label: 'Joshua\'s Valley Girl accent'
      });
    } else if (video.id === 2) {
      examples.push({
        time: '0:30',
        label: 'Wendy\'s natural English flow'
      });
      examples.push({
        time: '1:15',
        label: 'Pronunciation of difficult words'
      });
    } else if (video.id === 3) {
      examples.push({
        time: '0:20',
        label: 'Jennie\'s New Zealand accent'
      });
      examples.push({
        time: '1:05',
        label: 'Rosé\'s Australian accent'
      });
      examples.push({
        time: '1:45',
        label: 'Accent comparison'
      });
    } else if (video.id === 4) {
      examples.push({
        time: '0:15',
        label: 'Rosé\'s Australian pronunciation'
      });
      examples.push({
        time: '0:45',
        label: 'Felix\'s deep Australian accent'
      });
      examples.push({
        time: '1:30',
        label: 'Accent features comparison'
      });
    }
    
    return examples;
  }
</script>

<div class="videos-page">
  <div class="page-header">
    <h1 class="page-title">K-pop English Accent Videos</h1>
    <p class="page-description">
      Watch the YouTube videos analyzed in the research and explore comments about K-pop idols' English accents.
    </p>
  </div>
  
  {#if isLoading}
    <div class="loading-indicator">
      <p>Loading videos...</p>
    </div>
  {:else}
    <div class="videos-grid">
      {#each videos as video}
        <div class="video-card" on:click={() => selectVideo(video)}>
          <div class="video-thumbnail">
            <img 
              src={getYouTubeThumbnail(video.youtubeId)} 
              alt={video.titleEnglish}
              class="thumbnail-image"
            />
            <div class="video-overlay">
              <span class="play-icon">▶</span>
            </div>
          </div>
          
          <div class="video-info">
            <h3 class="video-title">{video.titleEnglish}</h3>
            
            <div class="video-meta">
              <div class="meta-item">
                <span class="meta-label">Channel:</span>
                <span class="meta-value">{video.accountName}</span>
              </div>
              
              <div class="meta-item">
                <span class="meta-label">Released:</span>
                <span class="meta-value">{formatDate(video.releaseDate)}</span>
              </div>
              
              <div class="meta-item">
                <span class="meta-label">Views:</span>
                <span class="meta-value">{formatNumber(video.views)}</span>
              </div>
            </div>
            
            <div class="video-idols">
              <span class="idols-label">Featuring:</span>
              <div class="idols-list">
                {#each video.idolsAppearing as idol}
                  <a href="/idols?idol={idol.id}" class="idol-link">
                    {idol.name}
                  </a>
                {/each}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    {#if selectedVideo}
      <div id="video-detail" class="video-detail">
        <div class="video-player-container">
          <VideoPlayer 
            videoId={selectedVideo.youtubeId}
            title={selectedVideo.titleEnglish}
            accountName={selectedVideo.accountName}
            subscribers={selectedVideo.subscribers}
            releaseDate={formatDate(selectedVideo.releaseDate)}
            views={formatNumber(selectedVideo.views)}
            comments={formatNumber(selectedVideo.commentCount)}
            timestamps={getAccentExamples(selectedVideo)}
          />
        </div>
        
        <div class="video-accent-info">
          <h2 class="section-title">Accent Types in This Video</h2>
          
          <div class="accent-cards">
            {#each selectedVideo.idolsAppearing as idol}
              <div class="accent-card">
                <div class="accent-card-header">
                  <h3 class="accent-name">{idol.name}</h3>
                  <AccentBadge type={idol.accentType.split(' ')[0]} size="small" />
                </div>
                
                <a href="/idols?idol={idol.id}" class="accent-link">
                  View {idol.name}'s Profile
                </a>
              </div>
            {/each}
          </div>
        </div>
        
        <div class="video-comments">
          <h2 class="section-title">Fan Comments</h2>
          <p class="section-description">
            These comments were analyzed in the research to understand how fans perceive
            the English accents of K-pop idols in this video.
          </p>
          
          {#if displayedComments.length === 0}
            <div class="no-comments">
              <p>No comments available for this video.</p>
            </div>
          {:else}
            <div class="comments-list">
              {#each displayedComments as comment}
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
            
            {#if displayedComments.length < selectedVideo.comments.length}
              <div class="load-more">
                <button class="load-more-button" on:click={loadMoreComments}>
                  Load More Comments
                </button>
              </div>
            {/if}
          {/if}
        </div>
      </div>
    {/if}
  {/if}
  
  <div class="research-context">
    <h2 class="section-title">About This Research</h2>
    <p>
      These videos were analyzed in the research paper "I Want to Be Born with That Pronunciation":
      Metalinguistic Comments About K-Pop Idols' Inner Circle Accents by Jihye Kim and Luoxiangyu Zhang.
    </p>
    <p>
      The researchers collected and analyzed 602 comments from these videos to understand how fans
      perceive and evaluate the English accents of K-pop idols, particularly those from "inner circle"
      countries like the US, UK, Canada, and Australia.
    </p>
    <a href="/learn" class="learn-more-link">Learn more about the research</a>
  </div>
</div>

<style>
  .videos-page {
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
    margin: 0 0 var(--spacing-3);
    color: var(--color-text-secondary);
  }
  
  .loading-indicator {
    text-align: center;
    padding: var(--spacing-4);
    color: var(--color-text-secondary);
  }
  
  .videos-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-5);
  }
  
  .video-card {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .video-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .video-thumbnail {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 aspect ratio */
    overflow: hidden;
  }
  
  .thumbnail-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  .video-card:hover .video-overlay {
    opacity: 1;
  }
  
  .play-icon {
    color: white;
    font-size: 48px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  }
  
  .video-info {
    padding: var(--spacing-3);
  }
  
  .video-title {
    font-size: var(--font-size-h3);
    margin: 0 0 var(--spacing-2);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .video-meta {
    margin-bottom: var(--spacing-2);
  }
  
  .meta-item {
    margin-bottom: var(--spacing-1);
    font-size: var(--font-size-small);
  }
  
  .meta-label {
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    margin-right: var(--spacing-1);
  }
  
  .meta-value {
    color: var(--color-text-primary);
  }
  
  .video-idols {
    font-size: var(--font-size-small);
  }
  
  .idols-label {
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    margin-right: var(--spacing-1);
  }
  
  .idols-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-1);
  }
  
  .idol-link {
    color: var(--color-primary);
    text-decoration: none;
  }
  
  .idol-link:hover {
    text-decoration: underline;
  }
  
  .video-detail {
    margin-bottom: var(--spacing-5);
  }
  
  .video-player-container {
    margin-bottom: var(--spacing-4);
  }
  
  .video-accent-info {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-3);
    margin-bottom: var(--spacing-4);
  }
  
  .accent-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--spacing-3);
    margin-top: var(--spacing-3);
  }
  
  .accent-card {
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-2);
  }
  
  .accent-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-2);
  }
  
  .accent-name {
    font-size: var(--font-size-h4);
    margin: 0;
  }
  
  .accent-link {
    color: var(--color-primary);
    text-decoration: none;
    font-size: var(--font-size-small);
  }
  
  .accent-link:hover {
    text-decoration: underline;
  }
  
  .video-comments {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-3);
  }
  
  .no-comments {
    text-align: center;
    padding: var(--spacing-4);
    color: var(--color-text-secondary);
  }
  
  .comments-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-3);
  }
  
  .load-more {
    text-align: center;
    margin-top: var(--spacing-3);
  }
  
  .load-more-button {
    background-color: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-1) var(--spacing-3);
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
  }
  
  .load-more-button:hover {
    background-color: var(--color-primary);
    color: white;
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
  @media (min-width: 768px) {
    .videos-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .comments-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .videos-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
