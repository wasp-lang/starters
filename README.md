> [!IMPORTANT]  
> This branch was made read-only in order to keep starter templates working for versions of Wasp CLI older than v0.12 .
> These older versions of Wasp CLI directly read starter templates info from the `main` branch, and we can't change that behaviour for them.
> Once the number of people using these older versions becomes very low, we can freely delete this branch.
> For more context, check this PR https://github.com/wasp-lang/wasp/pull/1619 .



![Wasp Starters](https://github.com/wasp-lang/SaaS-Template-GPT/blob/master/src/client/static/gptsaastemplate.png)

# Welcome to Wasp Starters 👋

In this repository you'll find some starters to speed up your initial project with [Wasp Lang](https://wasp-lang.dev/)

If you don't already have it, you can install Wasp by going [here](https://wasp-lang.dev/docs).

## Available starters

> **Note** After you create a new project, make sure to check the README.md to see any additional info

### Vector Similarity Search Template 

A template for generating embeddings and performing vector similarity search on your own text data!

**Features:** w/ Embeddings & vector similarity search, OpenAI Embeddings API, Vector DB (Pinecone), Tailwind, Fullstack Type Safety

Use this template:
```
wasp new <project-name> -t embeddings
```

### SaaS Template 

A SaaS Template to get your profitable side-project started quickly and easily!

**Features:** w/ Stripe Payments, OpenAI GPT API, Google Auth, SendGrid, Tailwind, & Cron Jobs

Use this template:
```
wasp new <project-name> -t saas
```

### Todo App w/ Typescript

A simple Todo App with Typescript and Fullstack Type Safety.

**Features:** Auth (username/password), Fullstack Type Safety

Use this template:
```
wasp new <project-name> -t todo-ts
```

## If you are looking to contribute a template

This repository is used to store the starter templates. Wasp downloads template folders from this repository.

Users call the Wasp CLI with `wasp new` or `wasp new <project-name> -t <template-name>` and then Wasp does the following:
1. Downloads the template folder
2. Replaces some placeholders in the `main.wasp`
  - Replaces `__waspProjectName__` and `__waspAppName__` with user provided `<project-name>`
  - Replaces `__waspVersion__` with the current Wasp CLI version

Adding a new template includes:
1. Create a new folder in the root of the repo
2. Put the placeholders in `main.wasp` instead of the app name, `title` and `version`
3. Add the template in the [`templates.json`](https://github.com/wasp-lang/starters/blob/main/templates.json) file
  ```json5
  {
    "name": "saas", // name shown to the user
    "description": "Includes GPT API, Google auth, Tailwind, & Stripe payments", // description shown to the user
    "path": "saas" // your template folder 
  },
  ```
