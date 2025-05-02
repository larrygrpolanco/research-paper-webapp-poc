<script>
  // Import any necessary dependencies
  import { page } from '$app/stores';
</script>

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
      
      <button class="mobile-menu-button" aria-label="Toggle menu">
        <span class="menu-icon"></span>
      </button>
    </div>
  </div>
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
    display: block;
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
