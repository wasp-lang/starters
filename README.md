![Wasp Starters](https://github.com/wasp-lang/SaaS-Template-GPT/blob/master/src/client/static/gptsaastemplate.png)

# Welcome to Wasp Starters 👋

In this repository you'll find some starters to speed up your initial project with [Wasp Lang](https://wasp-lang.dev/)

If you don't already have it, you can install Wasp by going [here](https://wasp-lang.dev/docs).

## Available starters

> **Note** After you create a new project, make sure to check the README.md to see any additional info

### Todo App w/ Typescript

A simple Todo App with Typescript and Fullstack Type Saftey.

**Features:** Auth (username/password), Fullstack Type Safety

Use this template:
```
wasp new <project-name> -t todo-ts
```

### SaaS Template 

A SaaS Template to get your profitable side-project started quickly and easily!

**Features:** w/ Stripe Payments, OpenAI GPT API, Google Auth, SendGrid, Tailwind, & Cron Jobs

Use this template:
```
wasp new <project-name> -t saas
```


## If you are looking to contribute a template

This repository is used to store the starter templates. Wasp uses [giget](https://github.com/unjs/giget) in the background to download folders from this repository.

Users call the Wasp CLI with `wasp new <project-name> -t <template-name>` and then Wasp does the following:
1. Downloads the template folder
2. Replaces some placeholders in the `main.wasp`
  - Replaces `__waspProjectName__` and `__waspAppName__` with user provided `<project-name>`
  - Replaces `__waspVersion__` with the current Wasp CLI version
  
Adding new templates requires just creating a new folder in this repo, and putting the placeholders instead of the app name, `title` and `version`.
