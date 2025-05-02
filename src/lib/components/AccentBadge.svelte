<script>
  // Props
  export let type = ''; // Accent type (e.g., 'American', 'Australian', 'Valley Girl', etc.)
  export let color = ''; // Optional custom color
  export let size = 'medium'; // 'small', 'medium', or 'large'
  export let outlined = false; // Whether to use an outlined style
  
  // Map accent types to colors if no custom color is provided
  const accentColors = {
    'American': '#3498db', // Blue
    'Australian': '#2ecc71', // Green
    'British': '#9b59b6', // Purple
    'Canadian': '#e74c3c', // Red
    'Valley Girl': '#f1c40f', // Yellow
    'Inner Circle': '#1abc9c', // Teal
    'Outer Circle': '#e67e22', // Orange
    'Expanding Circle': '#34495e', // Dark Blue
    'default': 'var(--color-primary)' // Default to primary color
  };
  
  // Compute the color to use
  $: badgeColor = color || accentColors[type] || accentColors.default;
  
  // Compute size classes
  $: sizeClass = `badge-${size}`;
  
  // Compute style classes
  $: styleClass = outlined ? 'badge-outlined' : 'badge-filled';
  
  // Compute background and text colors based on style
  $: backgroundColor = outlined ? 'transparent' : badgeColor;
  $: textColor = outlined ? badgeColor : getContrastColor(badgeColor);
  $: borderColor = badgeColor;
  
  // Helper function to determine if text should be light or dark based on background
  function getContrastColor(hexColor) {
    // If it's a CSS variable, return white as default contrast
    if (hexColor.startsWith('var(')) {
      return 'white';
    }
    
    // Convert hex to RGB
    let r, g, b;
    if (hexColor.startsWith('#')) {
      const hex = hexColor.substring(1);
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else {
      // Default to white text for non-hex colors
      return 'white';
    }
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black for light backgrounds, white for dark
    return luminance > 0.5 ? 'black' : 'white';
  }
</script>

<span 
  class="accent-badge {sizeClass} {styleClass}"
  style="
    --badge-bg-color: {backgroundColor}; 
    --badge-text-color: {textColor}; 
    --badge-border-color: {borderColor};
  "
>
  {type}
</span>

<style>
  .accent-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius-sm);
    font-weight: var(--font-weight-medium);
    background-color: var(--badge-bg-color);
    color: var(--badge-text-color);
    border: 1px solid var(--badge-border-color);
    white-space: nowrap;
  }
  
  .badge-small {
    font-size: var(--font-size-caption);
    padding: 2px 6px;
  }
  
  .badge-medium {
    font-size: var(--font-size-small);
    padding: 4px 8px;
  }
  
  .badge-large {
    font-size: var(--font-size-regular);
    padding: 6px 12px;
  }
  
  .badge-filled {
    /* Styles are set via inline style */
  }
  
  .badge-outlined {
    /* Styles are set via inline style */
  }
</style>
