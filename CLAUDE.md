# Project Guidelines

## Vercel Deployment Rules

- The Vercel free plan has a **maximum of 10 projects** limit.
- **Before creating a new Vercel project**, always check the existing project count with `vercel project ls`.
- If there are **10 or more projects**, delete the oldest project(s) to make room: `vercel project rm <project-name>`.
- Always confirm deletion with the user before removing a project.
- After deploying, verify the deployment is live with `vercel ls`.
