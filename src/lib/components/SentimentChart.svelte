<script>
  import { onMount } from 'svelte';
  
  // Props
  export let positive = 88.1; // Default from the paper: 88.1%
  export let neutral = 10.6; // Default from the paper: 10.6%
  export let negative = 1.3; // Default from the paper: 1.3%
  export let showNumbers = true; // Whether to show actual numbers or just percentages
  export let positiveCount = 357; // Default from the paper: 357 comments
  export let neutralCount = 43; // Default from the paper: 43 comments
  export let negativeCount = 5; // Default from the paper: 5 comments
  export let title = 'Sentiment Analysis';
  export let description = 'Distribution of sentiment in comments about K-pop idols\' English accents';
  
  // State
  let chartCanvas;
  let chart;
  let selectedSegment = null;
  
  // Total count for calculations
  $: totalCount = positiveCount + neutralCount + negativeCount;
  
  // Format percentage for display
  function formatPercentage(value) {
    return `${value.toFixed(1)}%`;
  }
  
  // Handle segment click
  function handleSegmentClick(segment) {
    if (selectedSegment === segment) {
      selectedSegment = null;
    } else {
      selectedSegment = segment;
    }
    
    // Dispatch event for parent components
    const event = new CustomEvent('segmentselect', {
      detail: { segment: selectedSegment }
    });
    chartCanvas.dispatchEvent(event);
  }
  
  // Initialize chart on mount
  onMount(() => {
    if (typeof window !== 'undefined' && chartCanvas) {
      // Check if Chart.js is available
      if (window.Chart) {
        createChart();
      } else {
        // Load Chart.js dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = createChart;
        document.head.appendChild(script);
      }
    }
    
    return () => {
      // Cleanup on destroy
      if (chart) {
        chart.destroy();
      }
    };
  });
  
  // Create the chart
  function createChart() {
    const ctx = chartCanvas.getContext('2d');
    
    chart = new window.Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [{
          data: [positive, neutral, negative],
          backgroundColor: [
            getComputedStyle(document.documentElement).getPropertyValue('--color-positive').trim(),
            getComputedStyle(document.documentElement).getPropertyValue('--color-neutral').trim(),
            getComputedStyle(document.documentElement).getPropertyValue('--color-negative').trim()
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              font: {
                family: getComputedStyle(document.documentElement).getPropertyValue('--font-family').trim(),
                size: 14
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const count = [positiveCount, neutralCount, negativeCount][context.dataIndex];
                return `${label}: ${formatPercentage(value)} (${count} comments)`;
              }
            }
          }
        },
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const index = elements[0].index;
            const segment = ['positive', 'neutral', 'negative'][index];
            handleSegmentClick(segment);
          }
        }
      }
    });
  }
</script>

<div class="sentiment-chart-container">
  <h3 class="chart-title">{title}</h3>
  
  {#if description}
    <p class="chart-description">{description}</p>
  {/if}
  
  <div class="chart-wrapper">
    <canvas bind:this={chartCanvas}></canvas>
  </div>
  
  <div class="sentiment-stats">
    <div class="stat-item {selectedSegment === 'positive' ? 'selected' : ''}" 
         on:click={() => handleSegmentClick('positive')}>
      <div class="stat-color positive"></div>
      <div class="stat-label">Positive</div>
      <div class="stat-value">{formatPercentage(positive)}</div>
      {#if showNumbers}
        <div class="stat-count">{positiveCount} comments</div>
      {/if}
    </div>
    
    <div class="stat-item {selectedSegment === 'neutral' ? 'selected' : ''}"
         on:click={() => handleSegmentClick('neutral')}>
      <div class="stat-color neutral"></div>
      <div class="stat-label">Neutral</div>
      <div class="stat-value">{formatPercentage(neutral)}</div>
      {#if showNumbers}
        <div class="stat-count">{neutralCount} comments</div>
      {/if}
    </div>
    
    <div class="stat-item {selectedSegment === 'negative' ? 'selected' : ''}"
         on:click={() => handleSegmentClick('negative')}>
      <div class="stat-color negative"></div>
      <div class="stat-label">Negative</div>
      <div class="stat-value">{formatPercentage(negative)}</div>
      {#if showNumbers}
        <div class="stat-count">{negativeCount} comments</div>
      {/if}
    </div>
  </div>
  
  {#if selectedSegment}
    <div class="segment-info">
      <h4 class="segment-title">
        {selectedSegment.charAt(0).toUpperCase() + selectedSegment.slice(1)} Comments
      </h4>
      <p class="segment-description">
        {#if selectedSegment === 'positive'}
          These comments express approval or admiration for the idol's English accent.
        {:else if selectedSegment === 'neutral'}
          These comments describe the idol's English accent without expressing a clear positive or negative evaluation.
        {:else if selectedSegment === 'negative'}
          These comments express criticism or disapproval of the idol's English accent.
        {/if}
      </p>
      <button class="clear-selection" on:click={() => handleSegmentClick(selectedSegment)}>
        Clear Selection
      </button>
    </div>
  {/if}
</div>

<style>
  .sentiment-chart-container {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-3);
    margin-bottom: var(--spacing-4);
  }
  
  .chart-title {
    text-align: center;
    margin-top: 0;
    margin-bottom: var(--spacing-1);
    font-size: var(--font-size-h3);
    line-height: var(--line-height-h3);
  }
  
  .chart-description {
    text-align: center;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-3);
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
  }
  
  .chart-wrapper {
    height: 300px;
    position: relative;
    margin-bottom: var(--spacing-3);
  }
  
  .sentiment-stats {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-3);
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--border-radius-md);
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .stat-item:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .stat-item.selected {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  .stat-color {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: var(--spacing-2);
  }
  
  .stat-color.positive {
    background-color: var(--color-positive);
  }
  
  .stat-color.neutral {
    background-color: var(--color-neutral);
  }
  
  .stat-color.negative {
    background-color: var(--color-negative);
  }
  
  .stat-label {
    flex-grow: 1;
    font-weight: var(--font-weight-medium);
  }
  
  .stat-value {
    font-weight: var(--font-weight-bold);
    margin-right: var(--spacing-2);
  }
  
  .stat-count {
    color: var(--color-text-secondary);
    font-size: var(--font-size-small);
  }
  
  .segment-info {
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-2);
    margin-top: var(--spacing-2);
  }
  
  .segment-title {
    margin-top: 0;
    margin-bottom: var(--spacing-1);
    font-size: var(--font-size-h4);
    line-height: var(--line-height-h4);
  }
  
  .segment-description {
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
  }
  
  .clear-selection {
    background: none;
    border: none;
    color: var(--color-secondary);
    font-size: var(--font-size-small);
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
  }
  
  /* Responsive styles */
  @media (min-width: 640px) {
    .sentiment-stats {
      flex-direction: row;
      justify-content: space-between;
    }
    
    .stat-item {
      flex: 1;
    }
  }
</style>
