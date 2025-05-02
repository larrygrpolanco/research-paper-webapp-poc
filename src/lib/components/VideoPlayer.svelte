<script>
  // Props
  export let videoId = '';
  export let title = '';
  export let accountName = '';
  export let subscribers = '';
  export let releaseDate = '';
  export let views = '';
  export let comments = '';
  export let timestamps = []; // Array of {time: '1:23', label: 'Description'}
  
  // State
  let player;
  let playerReady = false;
  
  // Load YouTube API
  function loadYouTubeAPI() {
    if (typeof window !== 'undefined') {
      // Create script element
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      
      // Insert script before first script tag
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      // Setup callback for when API is ready
      window.onYouTubeIframeAPIReady = initPlayer;
    }
  }
  
  // Initialize player when API is ready
  function initPlayer() {
    if (typeof window !== 'undefined' && videoId) {
      player = new window.YT.Player('youtube-player', {
        height: '360',
        width: '640',
        videoId: videoId,
        playerVars: {
          'playsinline': 1,
          'rel': 0,
          'modestbranding': 1
        },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }
  }
  
  // Player event handlers
  function onPlayerReady() {
    playerReady = true;
  }
  
  function onPlayerStateChange(event) {
    // Handle player state changes if needed
  }
  
  // Jump to specific timestamp
  function jumpToTimestamp(time) {
    if (playerReady && player) {
      // Convert timestamp (e.g. "1:23") to seconds
      const parts = time.split(':');
      let seconds = 0;
      
      if (parts.length === 2) {
        // Minutes and seconds
        seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
      } else if (parts.length === 3) {
        // Hours, minutes, and seconds
        seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
      }
      
      player.seekTo(seconds, true);
      player.playVideo();
    }
  }
  
  // Initialize on mount
  import { onMount } from 'svelte';
  
  onMount(() => {
    loadYouTubeAPI();
    
    // Cleanup on destroy
    return () => {
      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
    };
  });
</script>

<div class="video-player-container">
  <div class="video-wrapper">
    <div id="youtube-player"></div>
  </div>
  
  <div class="video-info">
    <h2 class="video-title">{title}</h2>
    
    <div class="video-metadata">
      <div class="metadata-item">
        <span class="metadata-label">Channel:</span>
        <span class="metadata-value">{accountName}</span>
      </div>
      
      <div class="metadata-item">
        <span class="metadata-label">Subscribers:</span>
        <span class="metadata-value">{subscribers}</span>
      </div>
      
      <div class="metadata-item">
        <span class="metadata-label">Release Date:</span>
        <span class="metadata-value">{releaseDate}</span>
      </div>
      
      <div class="metadata-item">
        <span class="metadata-label">Views:</span>
        <span class="metadata-value">{views}</span>
      </div>
      
      <div class="metadata-item">
        <span class="metadata-label">Comments:</span>
        <span class="metadata-value">{comments}</span>
      </div>
    </div>
  </div>
  
  {#if timestamps && timestamps.length > 0}
    <div class="timestamps">
      <h3 class="timestamps-title">Key Moments</h3>
      <ul class="timestamps-list">
        {#each timestamps as { time, label }}
          <li class="timestamp-item">
            <button 
              class="timestamp-button" 
              on:click={() => jumpToTimestamp(time)}
            >
              <span class="timestamp-time">{time}</span>
              <span class="timestamp-label">{label}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .video-player-container {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    margin-bottom: var(--spacing-4);
  }
  
  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
  }
  
  .video-wrapper :global(iframe) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  
  .video-info {
    padding: var(--spacing-3);
  }
  
  .video-title {
    margin-top: 0;
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-h3);
    line-height: var(--line-height-h3);
  }
  
  .video-metadata {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-1);
    margin-bottom: var(--spacing-3);
  }
  
  .metadata-item {
    display: flex;
    align-items: baseline;
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
  }
  
  .metadata-label {
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    margin-right: var(--spacing-1);
    min-width: 100px;
  }
  
  .metadata-value {
    color: var(--color-text-primary);
  }
  
  .timestamps {
    padding: 0 var(--spacing-3) var(--spacing-3);
  }
  
  .timestamps-title {
    font-size: var(--font-size-h4);
    margin-top: 0;
    margin-bottom: var(--spacing-2);
  }
  
  .timestamps-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-1);
  }
  
  .timestamp-item {
    margin-bottom: var(--spacing-1);
  }
  
  .timestamp-button {
    display: inline-flex;
    align-items: center;
    background-color: rgba(98, 54, 255, 0.1);
    border: none;
    border-radius: var(--border-radius-sm);
    padding: var(--spacing-1) var(--spacing-2);
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .timestamp-button:hover {
    background-color: rgba(98, 54, 255, 0.2);
  }
  
  .timestamp-time {
    font-weight: var(--font-weight-bold);
    color: var(--color-secondary);
    margin-right: var(--spacing-1);
  }
  
  .timestamp-label {
    color: var(--color-text-primary);
  }
  
  /* Responsive styles */
  @media (min-width: 640px) {
    .video-metadata {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .video-metadata {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
