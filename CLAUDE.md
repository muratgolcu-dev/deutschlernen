# Project Guidelines

## Vercel Deployment Rules

- The Vercel free plan has a **maximum of 10 projects** limit.
- **NEVER create a new Vercel project.** Always deploy to the existing project `deutschlernen`.
- Use `vercel --prod --yes` for production deploys (skips project creation prompt).
- If `.vercel/project.json` exists, Vercel CLI will reuse the linked project automatically.
- If deploying for the first time on a new machine, run `vercel link` first to connect to the existing project, then commit `.vercel/project.json`.
- **Before deploying**, check project count with `vercel project ls`. If at 10, delete stale projects: `vercel project rm <project-name>` (confirm with user first).
- After deploying, verify with `vercel ls`.
