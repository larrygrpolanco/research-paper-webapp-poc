<script>
  import AccentBadge from '$lib/components/AccentBadge.svelte';
</script>

<div class="learn-page">
  <div class="page-header">
    <h1 class="page-title">Learn About Linguistics</h1>
    <p class="page-description">
      Understanding the linguistic concepts behind the research on K-pop idols' English accents
    </p>
  </div>
  
  <div class="content-section">
    <h2 class="section-title">World Englishes</h2>
    <p>
      The concept of "World Englishes" recognizes that English is used in different ways around the world, 
      with various regional and cultural variations. Rather than viewing non-native varieties as "incorrect" 
      or "imperfect," World Englishes acknowledges the legitimacy of different varieties of English.
    </p>
    
    <h3 class="subsection-title">Kachru's Three Circles Model</h3>
    <p>
      Linguist Braj Kachru developed a model to categorize different varieties of English around the world, 
      dividing them into three "circles":
    </p>
    
    <div class="circles-model">
      <div class="circle inner-circle">
        <h4 class="circle-title">Inner Circle</h4>
        <p class="circle-description">
          Countries where English is the primary language, such as the United States, United Kingdom, 
          Canada, Australia, and New Zealand.
        </p>
        <div class="circle-examples">
          <AccentBadge type="American" size="small" />
          <AccentBadge type="British" size="small" />
          <AccentBadge type="Australian" size="small" />
          <AccentBadge type="Canadian" size="small" />
        </div>
      </div>
      
      <div class="circle outer-circle">
        <h4 class="circle-title">Outer Circle</h4>
        <p class="circle-description">
          Countries where English is an official language but not the primary one, often due to 
          colonial history. Examples include India, Singapore, Nigeria, and the Philippines.
        </p>
        <div class="circle-examples">
          <AccentBadge type="Indian" size="small" outlined={true} />
          <AccentBadge type="Singaporean" size="small" outlined={true} />
          <AccentBadge type="Nigerian" size="small" outlined={true} />
        </div>
      </div>
      
      <div class="circle expanding-circle">
        <h4 class="circle-title">Expanding Circle</h4>
        <p class="circle-description">
          Countries where English is learned as a foreign language, such as China, Japan, Korea, 
          and most European countries.
        </p>
        <div class="circle-examples">
          <AccentBadge type="Korean" size="small" outlined={true} />
          <AccentBadge type="Japanese" size="small" outlined={true} />
          <AccentBadge type="Chinese" size="small" outlined={true} />
        </div>
      </div>
    </div>
    
    <p class="model-context">
      The research focuses on how K-pop fans perceive and evaluate the English accents of K-pop idols, 
      particularly those from "inner circle" countries. Many K-pop idols are from Korea (an expanding circle country), 
      but some have lived or studied in inner circle countries like the US, Canada, or Australia, giving them 
      accents associated with those countries.
    </p>
  </div>
  
  <div class="content-section">
    <h2 class="section-title">Accent Perception</h2>
    <p>
      How we perceive accents is influenced by many factors, including our own linguistic background, 
      cultural attitudes, and social stereotypes. The research examines how fans perceive and evaluate 
      the English accents of K-pop idols, particularly focusing on several key aspects:
    </p>
    
    <div class="aspect-cards">
      <div class="aspect-card">
        <h3 class="aspect-title">Social Attractiveness</h3>
        <p class="aspect-description">
          How "cool," "sexy," "elegant," or otherwise socially attractive an accent sounds. 
          The research found that 33.6% of comments focused on social attractiveness.
        </p>
        <div class="aspect-example">
          <blockquote>"Her English is so ELEGANT and MAJESTIC. its chef's kiss"</blockquote>
        </div>
      </div>
      
      <div class="aspect-card">
        <h3 class="aspect-title">Nativeness</h3>
        <p class="aspect-description">
          How "native-like" or authentic an accent sounds compared to inner circle accents. 
          The research found that 30.3% of comments discussed nativeness.
        </p>
        <div class="aspect-example">
          <blockquote>"She sounds really fluent in English. It comes out naturally."</blockquote>
        </div>
      </div>
      
      <div class="aspect-card">
        <h3 class="aspect-title">Phonetic Features</h3>
        <p class="aspect-description">
          Specific sound features of an accent, such as pronunciation of certain vowels or consonants. 
          The research found that 4.7% of comments mentioned specific phonetic features.
        </p>
        <div class="aspect-example">
          <blockquote>"I love the way she pronounces the s"</blockquote>
        </div>
      </div>
      
      <div class="aspect-card">
        <h3 class="aspect-title">Motivation</h3>
        <p class="aspect-description">
          How an idol's accent inspires fans to learn or improve their own English. 
          The research found that 3.2% of comments mentioned motivation.
        </p>
        <div class="aspect-example">
          <blockquote>"Wendy really motivates me to speak english more"</blockquote>
        </div>
      </div>
    </div>
  </div>
  
  <div class="content-section">
    <h2 class="section-title">Linguistic Concepts</h2>
    
    <div class="concept-cards">
      <div class="concept-card">
        <h3 class="concept-title">Linguistic Stereotyping</h3>
        <p class="concept-description">
          The process of associating certain linguistic features (like accents) with specific social 
          characteristics or personality traits. The research found that fans often associated inner 
          circle accents with positive social characteristics.
        </p>
      </div>
      
      <div class="concept-card">
        <h3 class="concept-title">Accent Prestige</h3>
        <p class="concept-description">
          The social status or value assigned to different accents. Inner circle accents often have 
          higher prestige in global contexts, which was reflected in fan comments praising idols with 
          these accents.
        </p>
      </div>
      
      <div class="concept-card">
        <h3 class="concept-title">Metalinguistic Awareness</h3>
        <p class="concept-description">
          The ability to think about and discuss language itself. The comments analyzed in the research 
          demonstrate metalinguistic awareness as fans explicitly discuss and evaluate idols' accents.
        </p>
      </div>
      
      <div class="concept-card">
        <h3 class="concept-title">Language Ideology</h3>
        <p class="concept-description">
          Beliefs and attitudes about language that reflect broader social and cultural values. 
          The research reveals language ideologies that privilege inner circle accents and associate 
          them with positive qualities.
        </p>
      </div>
    </div>
  </div>
  
  <div class="content-section">
    <h2 class="section-title">Accent Features</h2>
    <p>
      Different English accents have distinctive phonetic features that make them recognizable. 
      Here are some features of the inner circle accents discussed in the research:
    </p>
    
    <div class="accent-features">
      <div class="accent-feature">
        <h3 class="accent-name">American Accent</h3>
        <ul class="feature-list">
          <li>Rhotic pronunciation (pronouncing "r" sounds in words like "car" and "park")</li>
          <li>Flapped "t" sound in words like "butter" (sounds more like "budder")</li>
          <li>Vowel mergers (e.g., "cot" and "caught" sound the same in many American accents)</li>
        </ul>
      </div>
      
      <div class="accent-feature">
        <h3 class="accent-name">Australian Accent</h3>
        <ul class="feature-list">
          <li>Non-rhotic pronunciation (dropping "r" sounds in words like "car" and "park")</li>
          <li>Distinctive vowel shifts (e.g., "day" sounds more like "die")</li>
          <li>Rising intonation at the end of statements (sometimes called "uptalk")</li>
        </ul>
      </div>
      
      <div class="accent-feature">
        <h3 class="accent-name">Valley Girl Accent</h3>
        <ul class="feature-list">
          <li>Uptalk (rising intonation at the end of statements)</li>
          <li>Vocal fry (creaky voice quality, especially at the ends of phrases)</li>
          <li>Use of "like" as a discourse marker</li>
        </ul>
      </div>
      
      <div class="accent-feature">
        <h3 class="accent-name">Canadian Accent</h3>
        <ul class="feature-list">
          <li>Canadian raising (pronouncing "ou" and "ow" with a raised first element)</li>
          <li>Pronouncing "about" closer to "aboot"</li>
          <li>Similar to American accent but with some distinctive features</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="content-section">
    <h2 class="section-title">Research Implications</h2>
    <p>
      The research on K-pop idols' English accents has several important implications:
    </p>
    
    <div class="implications">
      <div class="implication">
        <h3 class="implication-title">Language Attitudes</h3>
        <p class="implication-description">
          The overwhelmingly positive response to inner circle accents reflects broader language 
          attitudes that privilege these varieties of English, potentially reinforcing linguistic 
          hierarchies.
        </p>
      </div>
      
      <div class="implication">
        <h3 class="implication-title">Cultural Influence</h3>
        <p class="implication-description">
          K-pop idols with inner circle accents may influence fans' language learning motivations 
          and goals, potentially shaping which varieties of English they aspire to learn.
        </p>
      </div>
      
      <div class="implication">
        <h3 class="implication-title">Linguistic Diversity</h3>
        <p class="implication-description">
          While the research focuses on inner circle accents, it raises questions about how other 
          varieties of English are perceived and valued in global contexts.
        </p>
      </div>
    </div>
  </div>
  
  <div class="navigation-section">
    <h2 class="section-title">Explore the Research</h2>
    <div class="navigation-links">
      <a href="/videos" class="nav-link">
        <div class="nav-icon">🎬</div>
        <span class="nav-text">Watch Videos</span>
      </a>
      
      <a href="/idols" class="nav-link">
        <div class="nav-icon">🎤</div>
        <span class="nav-text">Explore Idol Profiles</span>
      </a>
      
      <a href="/comments" class="nav-link">
        <div class="nav-icon">💬</div>
        <span class="nav-text">Browse Comments</span>
      </a>
      
      <a href="/about" class="nav-link">
        <div class="nav-icon">ℹ️</div>
        <span class="nav-text">About This Project</span>
      </a>
    </div>
  </div>
</div>

<style>
  .learn-page {
    padding-bottom: var(--spacing-6);
  }
  
  .page-header {
    text-align: center;
    margin-bottom: var(--spacing-5);
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
    font-size: var(--font-size-h3);
  }
  
  .content-section {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-4);
    margin-bottom: var(--spacing-4);
  }
  
  .section-title {
    font-size: var(--font-size-h2);
    line-height: var(--line-height-h2);
    margin: 0 0 var(--spacing-3);
    color: var(--color-primary);
    position: relative;
    padding-bottom: var(--spacing-1);
  }
  
  .section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: var(--color-primary);
  }
  
  .subsection-title {
    font-size: var(--font-size-h3);
    line-height: var(--line-height-h3);
    margin: var(--spacing-4) 0 var(--spacing-2);
    color: var(--color-secondary);
  }
  
  .circles-model {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-3);
    margin: var(--spacing-4) 0;
  }
  
  .circle {
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-3);
  }
  
  .inner-circle {
    background-color: rgba(52, 152, 219, 0.1);
    border: 2px solid rgba(52, 152, 219, 0.3);
  }
  
  .outer-circle {
    background-color: rgba(46, 204, 113, 0.1);
    border: 2px solid rgba(46, 204, 113, 0.3);
  }
  
  .expanding-circle {
    background-color: rgba(155, 89, 182, 0.1);
    border: 2px solid rgba(155, 89, 182, 0.3);
  }
  
  .circle-title {
    font-size: var(--font-size-h3);
    margin: 0 0 var(--spacing-1);
  }
  
  .circle-description {
    margin: 0 0 var(--spacing-2);
  }
  
  .circle-examples {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-1);
  }
  
  .model-context {
    margin-top: var(--spacing-3);
    padding: var(--spacing-3);
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: var(--border-radius-md);
  }
  
  .aspect-cards, .concept-cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-3);
    margin-top: var(--spacing-3);
  }
  
  .aspect-card, .concept-card {
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-3);
  }
  
  .aspect-title, .concept-title, .accent-name, .implication-title {
    font-size: var(--font-size-h4);
    margin: 0 0 var(--spacing-1);
    color: var(--color-secondary);
  }
  
  .aspect-description, .concept-description, .implication-description {
    margin: 0 0 var(--spacing-2);
  }
  
  .aspect-example {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: var(--border-radius-sm);
    padding: var(--spacing-2);
  }
  
  .aspect-example blockquote {
    margin: 0;
    font-style: italic;
    color: var(--color-text-secondary);
  }
  
  .accent-features {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-3);
    margin-top: var(--spacing-3);
  }
  
  .accent-feature {
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-3);
  }
  
  .feature-list {
    margin: var(--spacing-1) 0 0;
    padding-left: var(--spacing-3);
  }
  
  .feature-list li {
    margin-bottom: var(--spacing-1);
  }
  
  .implications {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-3);
    margin-top: var(--spacing-3);
  }
  
  .implication {
    background-color: rgba(0, 0, 0, 0.02);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-3);
  }
  
  .navigation-section {
    background-color: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-4);
    text-align: center;
  }
  
  .navigation-links {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-3);
    margin-top: var(--spacing-3);
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    background-color: rgba(255, 62, 118, 0.05);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-3);
    text-decoration: none;
    color: var(--color-text-primary);
    transition: background-color 0.2s, transform 0.2s;
  }
  
  .nav-link:hover {
    background-color: rgba(255, 62, 118, 0.1);
    transform: translateY(-2px);
  }
  
  .nav-icon {
    font-size: 24px;
    margin-right: var(--spacing-2);
  }
  
  .nav-text {
    font-weight: var(--font-weight-medium);
  }
  
  /* Responsive styles */
  @media (min-width: 768px) {
    .aspect-cards, .concept-cards, .implications {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .navigation-links {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .circles-model {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .accent-features {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .navigation-links {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
