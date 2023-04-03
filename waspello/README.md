Waspello
=========

**Waspello** is a Trello clone app made with Wasp.


## How to run it

Start a development database by running:

```
wasp start db
```

Then, start the server in a separate terminal:

```
wasp start
```

## Deploying to Fly.io

To deploy to Fly.io, you need to have a Fly account and have the Fly CLI installed.

Deploy to Fly by running:

```
wasp deploy fly launch <app-name> <region>
```

where `<app-name>` is the name of your app and `<region>` is the region you want to deploy to (e.g. `mia`).