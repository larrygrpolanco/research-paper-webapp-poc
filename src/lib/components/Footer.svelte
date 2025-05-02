<script>
  // Import any necessary dependencies
  const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-heading">K-Pop Accent Research</h3>
        <p class="footer-description">
          An interactive visualization of research on K-pop idols' English accents and how they are perceived online.
        </p>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-heading">Navigation</h4>
        <ul class="footer-nav">
          <li><a href="/" class="footer-link">Home</a></li>
          <li><a href="/videos" class="footer-link">Videos</a></li>
          <li><a href="/idols" class="footer-link">Idols</a></li>
          <li><a href="/comments" class="footer-link">Comments</a></li>
          <li><a href="/learn" class="footer-link">Learn</a></li>
          <li><a href="/about" class="footer-link">About</a></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-heading">Research</h4>
        <p class="footer-text">
          Based on the paper "I Want to Be Born with That Pronunciation": Metalinguistic Comments About K-Pop Idols' Inner Circle Accents by Jihye Kim and Luoxiangyu Zhang.
        </p>
        <a href="/about" class="footer-link">Learn more about the research</a>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p class="copyright">© {currentYear} K-Pop Accent Research. All rights reserved.</p>
      <p class="attribution">
        This is a proof-of-concept project for visualizing academic research.
      </p>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    background-color: white;
    padding: var(--spacing-5) 0 var(--spacing-3);
    border-top: 1px solid var(--color-border);
    margin-top: var(--spacing-6);
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-4);
  }
  
  .footer-section {
    margin-bottom: var(--spacing-3);
  }
  
  .footer-heading {
    color: var(--color-text-primary);
    margin-top: 0;
    margin-bottom: var(--spacing-2);
  }
  
  .footer-description {
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-2);
  }
  
  .footer-nav {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-nav li {
    margin-bottom: var(--spacing-1);
  }
  
  .footer-link {
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .footer-link:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }
  
  .footer-text {
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-small);
    line-height: var(--line-height-small);
  }
  
  .footer-bottom {
    padding-top: var(--spacing-3);
    border-top: 1px solid var(--color-border);
    text-align: center;
  }
  
  .copyright, .attribution {
    color: var(--color-text-secondary);
    font-size: var(--font-size-small);
    margin: var(--spacing-1) 0;
  }
  
  /* Responsive styles */
  @media (min-width: 640px) {
    .footer-content {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .footer-content {
      grid-template-columns: 2fr 1fr 2fr;
    }
    
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      text-align: left;
    }
  }
</style>
