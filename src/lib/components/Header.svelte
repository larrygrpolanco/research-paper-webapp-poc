<script>
  // Import any necessary dependencies
  import { page } from '$app/stores';
  
  // State for mobile menu
  let isMenuOpen = false;
  
  // Toggle mobile menu
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  // Close menu when a link is clicked
  function closeMenu() {
    isMenuOpen = false;
  }
  
  // Close menu when Escape key is pressed
  function handleKeydown(event) {
    if (event.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<header class="site-header">
  <div class="container">
    <div class="header-content">
      <a href="/" class="logo">
        <span class="logo-text">K-Pop Accent Research</span>
      </a>
      
      <nav class="main-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <a 
              href="/" 
              class="nav-link" 
              class:active={$page.url.pathname === '/'}
            >
              Home
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="/videos" 
              class="nav-link" 
              class:active={$page.url.pathname === '/videos'}
            >
              Videos
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="/idols" 
              class="nav-link" 
              class:active={$page.url.pathname === '/idols'}
            >
              Idols
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="/comments" 
              class="nav-link" 
              class:active={$page.url.pathname === '/comments'}
            >
              Comments
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="/learn" 
              class="nav-link" 
              class:active={$page.url.pathname === '/learn'}
            >
              Learn
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="/about" 
              class="nav-link" 
              class:active={$page.url.pathname === '/about'}
            >
              About
            </a>
          </li>
        </ul>
      </nav>
      
      <button 
        class="mobile-menu-button" 
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        on:click={toggleMenu}
      >
        <span class="menu-icon" class:open={isMenuOpen}></span>
      </button>
    </div>
  </div>
  <!-- Mobile Menu Overlay -->
  {#if isMenuOpen}
    <div id="mobile-menu" class="mobile-menu" role="navigation" aria-label="Mobile navigation">
      <div class="mobile-menu-content">
        <ul class="mobile-nav-list">
          <li class="mobile-nav-item">
            <a 
              href="/" 
              class="mobile-nav-link" 
              class:active={$page.url.pathname === '/'}
              on:click={closeMenu}
            >
              Home
            </a>
          </li>
          <li class="mobile-nav-item">
            <a 
              href="/videos" 
              class="mobile-nav-link" 
              class:active={$page.url.pathname === '/videos'}
              on:click={closeMenu}
            >
              Videos
            </a>
          </li>
          <li class="mobile-nav-item">
            <a 
              href="/idols" 
              class="mobile-nav-link" 
              class:active={$page.url.pathname === '/idols'}
              on:click={closeMenu}
            >
              Idols
            </a>
          </li>
          <li class="mobile-nav-item">
            <a 
              href="/comments" 
              class="mobile-nav-link" 
              class:active={$page.url.pathname === '/comments'}
              on:click={closeMenu}
            >
              Comments
            </a>
          </li>
          <li class="mobile-nav-item">
            <a 
              href="/learn" 
              class="mobile-nav-link" 
              class:active={$page.url.pathname === '/learn'}
              on:click={closeMenu}
            >
              Learn
            </a>
          </li>
          <li class="mobile-nav-item">
            <a 
              href="/about" 
              class="mobile-nav-link" 
              class:active={$page.url.pathname === '/about'}
              on:click={closeMenu}
            >
              About
            </a>
          </li>
        </ul>
      </div>
    </div>
  {/if}
</header>

<style>
  .site-header {
    height: 64px;
    background-color: white;
    box-shadow: var(--shadow-sm);
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  
  .logo {
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  .logo-text {
    font-size: var(--font-size-h4);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
  }
  
  .main-nav {
    display: none;
  }
  
  .nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-item {
    margin: 0 var(--spacing-2);
  }
  
  .nav-link {
    text-decoration: none;
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
    padding: var(--spacing-1) 0;
    position: relative;
    transition: color 0.2s;
  }
  
  .nav-link:hover {
    color: var(--color-primary);
  }
  
  .nav-link.active {
    color: var(--color-primary);
  }
  
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--color-primary);
  }
  
  .mobile-menu-button {
    display: block;
    background: none;
    border: none;
    padding: var(--spacing-1);
    cursor: pointer;
  }
  
  .menu-icon {
    display: flex;
    width: 24px;
    height: 2px;
    background-color: var(--color-text-primary);
    position: relative;
  }
  
  .menu-icon::before,
  .menu-icon::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: var(--color-text-primary);
    transition: transform 0.2s;
  }
  
  .menu-icon::before {
    top: -6px;
  }
  
  .menu-icon::after {
    bottom: -6px;
  }
  
  /* Menu icon animation */
  .menu-icon.open {
    background-color: transparent;
  }
  
  .menu-icon.open::before {
    transform: rotate(45deg);
    top: 0;
  }
  
  .menu-icon.open::after {
    transform: rotate(-45deg);
    bottom: 0;
  }
  
  /* Mobile Menu Styles */
  .mobile-menu {
    position: fixed;
    top: 64px; /* Height of the header */
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    z-index: 99;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    animation: slideIn 0.3s ease-in-out;
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  .mobile-menu-content {
    padding: var(--spacing-4);
  }
  
  .mobile-nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .mobile-nav-item {
    margin-bottom: var(--spacing-3);
  }
  
  .mobile-nav-link {
    display: block;
    font-size: var(--font-size-h3);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    text-decoration: none;
    padding: var(--spacing-2) 0;
    transition: color 0.2s;
  }
  
  .mobile-nav-link:hover,
  .mobile-nav-link.active {
    color: var(--color-primary);
  }
  
  .mobile-nav-link.active {
    font-weight: var(--font-weight-bold);
  }
  
  /* Responsive styles */
  @media (min-width: 1024px) {
    .main-nav {
      display: block;
    }
    
    .mobile-menu-button {
      display: none;
    }
  }
</style>
