# CIM 423 - 3D World Build Log

One plain, single-page build log for the CIM 423 semester project at the University of Miami, hosted on Vercel.

- Plain Jekyll, no theme, no plugins, no RSS feed — just `index.md` through a minimal custom layout (`_layouts/default.html`)
- Everything lives on one page: each assignment is a `##` section appended to `index.md` as it's finished, in order. Nothing to click into, nothing to navigate.
- The asset-tracking table (for the Assignment 2 text submission) is the last section on the same page, not a separate page
- Screenshots go in `assets/images/` and are committed directly
- Videos are NOT committed — recorded, uploaded to YouTube as unlisted, and linked/embedded in the relevant section
- Deploy with `vercel --prod` from this directory (project: `nicholas-projects12/cim423-3d-world`)

Live at: https://cim423-3d-world.vercel.app

Previously hosted on GitHub Pages, which nested it under the personal portfolio domain (`nmoffett.com/cim423-3d-world/`) because that domain is set as the custom domain for the `moff05.github.io` user-page repo — GitHub Pages automatically applies a user/org custom domain to every project-page repo on the account. Moved to its own Vercel project to get a clean, unrelated URL; GitHub Pages is disabled on this repo.
