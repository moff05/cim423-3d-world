# VR Projects blog

Jekyll site on Vercel (https://cim423-3d-world.vercel.app). Home page lists every project as a card; each project is its own blog page with its own theme.

## Add a new project

1. Copy `_projects/music-world.md` to `_projects/<name>.md` and edit the front matter:
   `order`, `title`, `slug_label` (e.g. Project 3), `eyebrow`, `tagline`, `meta`, `theme`, `links`, `sections` (anchor ids for the sticky nav). Optional: `thumb` (card image), `video` + `poster` (hero video at top of page), `font_url`.
2. Write the body in Markdown. Give each nav section an id (`<h2 id="idea">`, or a `##` heading, which gets an auto id).
3. Theme: set `theme: space` or `theme: music` to reuse one, or create `assets/css/<theme>.css` (style `.site-header`, `.chapter-nav`, `main`, `footer`) and set `theme: <theme>`. Add a `.card.theme-<theme>` rule in `assets/css/home.css` for the home card.
4. Images and videos go in `assets/images/` and `assets/videos/`.
5. Deploy: `vercel --prod` from this directory.
