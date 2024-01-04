# New zetkin.org website (Wordpress)
This repository contains the Wordpress theme and other assets for the new Zetkin
Foundation website.

## Development instructions
This repository uses [`wp-env`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/),
which requires Docker to work.

### 1. Install
First [install Docker](https://docs.docker.com/engine/install/) (if you haven't already).

To install `wp-env` in this project, just use npm:

```
npm install
```

### 2. Start environment
Use the `wp start` script to run the development environment:

```
npm run wp start
```

### 3. Log in and activate theme
A URL was printed when you started the environment, usually http://localhost:8888
(port may vary). Go to that URL to verify that the site is running.

The first time you run it, the Zetkin theme will not have been activated. Append
/wp-admin to the URL above, and log in using username `admin` and the password
`password`. Go to Appearance > Themes to activate the "Zetkin Theme".

### Other scripts
The `wp` script is just a short hand for `wp-env`, so it's also possible to run
other commands, e.g. `npm run wp stop` or `npm run wp help`.