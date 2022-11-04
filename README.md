# App

The app is deployed [here](booking-pi.vercel.app) using Vercel.

## Getting Started

In order to run this project, follow these steps:

- Install dependencies

```bash
npm i
```

- Run the project

```bash
npm run dev
```

## Stack

I choose to use [NextJS](https://nextjs.org/), Sass and TypeScript for the solution.

I decided to use [Recoil](https://recoiljs.org/) as a state management library. The data are persisted through [Recoil Persist](https://www.npmjs.com/package/recoil-persist), which uses `localStorage`.

[ReactQuery](https://react-query-v3.tanstack.com/) is used for API calls.

The deployment is automated through [Vercel](https://www.vercel.com/). Each new commit pushed to the `main` branch would trigger a new deployment. Vercel also offers preview branches for my branches.

If you use VSCode, you will have a list of recommended extensions, used for the project.
