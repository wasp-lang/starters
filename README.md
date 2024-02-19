# Welcome to Wasp Starters 👋

In this repository you'll find some of the starters to speed up your initial project with [Wasp Lang](https://wasp-lang.dev/)

If you don't already have it, you can install Wasp by going [here](https://wasp-lang.dev/docs).

## Available starters

> **Note** After you create a new project, make sure to check the README.md to see any additional info

### Todo App w/ Typescript

A simple Todo App with Typescript and Fullstack Type Safety.

**Features:** Auth (username/password), Fullstack Type Safety

Use this template:
```
wasp new <project-name> -t todo-ts
```

### Vector Similarity Search Template

A template for generating embeddings and performing vector similarity search on your own text data!

**Features:** w/ Embeddings & vector similarity search, OpenAI Embeddings API, Vector DB (Pinecone), Tailwind, Fullstack Type Safety

Use this template:
```
wasp new <project-name> -t embeddings
```

### SaaS Template

A SaaS Template to get your profitable side-project started quickly and easily!

It used to be here, but now it became big enough to have its own repo: check it out at https://github.com/wasp-lang/open-saas .

## If you are looking to contribute a template

Adding a new template includes:
1. Create a new folder in the root of the repo and write the Wasp app code in it, for whatever you want your template to be.
2. Put the placeholders in `main.wasp` instead of the app name and `title`, if you wish (check how other templates do this).
3. Create a PR! In the PR, ask a core team do add template to the list of templates in the code of Wasp CLI, in https://github.com/wasp-lang/wasp/blob/main/waspc/cli/src/Wasp/Cli/Command/CreateNewProject/StarterTemplates.hs .
   You could also do this on your own, but it involves Haskell and setting it up might be quite time consuming if you never used it before, so we advise leaving it to the core team.

### Core team
We must not forget to update tags, since `wasp` pulls correct templates based on the tag they are marked with.
So if we update one or more templates, and we want them to still work for `wasp-v0.12-template` tag, then we should also update that tag.
Or, if newer version of `wasp` expects newer tag, then we should tag them with a new tag.
