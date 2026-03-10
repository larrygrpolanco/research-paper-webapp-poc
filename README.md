# K-Pop Accents: Research Paper Web App (POC)

A proof of concept for turning academic research into something people can actually explore on the web.

This app is built around the paper *"I Want to Be Born with That Pronunciation": Metalinguistic Comments About K-Pop Idols' Inner Circle Accents* by Jihye Kim and Luoxiangyu Zhang. The paper looks at how K-pop fans talk about and evaluate the English accents of K-pop idols — and there's genuinely interesting data in there that gets buried in a PDF.

The idea was to take that data and build something interactive with it: browse the fan comments, explore idol profiles, watch the source videos, and learn a bit about the linguistics concepts behind it all. The web has affordances that a static paper doesn't — filtering, searching, linking things together — and this is an experiment in using those.

**This is not a polished product.** It's a POC, and there are rough edges: some filter counts are off, some content placeholders are still in, and a few things just need more time and domain knowledge to get right. But the core idea works and I thought it was worth sharing.

---

## What's Inside

- **Comments Explorer** — Browse, filter, and search fan comments from the research dataset
- **Idol Profiles** — Info on the K-pop idols featured in the study and how their English is perceived
- **Video Hub** — The YouTube videos analyzed in the research, with related comments
- **Learn** — A plain-language intro to the linguistic concepts in the paper (Kachru's Three Circles, accent attitudes, etc.)
- **About** — Research context and paper citation

---

## The Bigger Idea

Academic research often sits behind paywalls and jargon. Even when it's publicly available, it's not always easy to engage with. Web development has tools — interactivity, data visualization, search, linking — that can make research findings more accessible without dumbing them down.

This is one attempt at that. If you're a researcher with a paper that might translate well to a web experience, or you're just curious about this approach, I'd love to hear from you. Reach out at [ChaOneLabs.com](https://chaonelabs.com).

---

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/) + [Tailwind CSS](https://tailwindcss.com/)
- Deployed on Vercel

---

## Running Locally

```bash
npm install
npm run dev
```

---

## Known Issues / What's Left

- Some filter counts show zero due to data processing inconsistencies
- A few idol profiles are missing associated comments
- Some UI copy could use revision by someone closer to the research
- Accessibility improvements still needed

---

## Credit

Research paper: Kim, J. & Zhang, L. *"I Want to Be Born with That Pronunciation": Metalinguistic Comments About K-Pop Idols' Inner Circle Accents.*
