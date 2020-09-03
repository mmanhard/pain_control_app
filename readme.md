# Pain Control - Front-End

Pain control is a web application that gives users the ability to track their
pain levels over time in an effort to better understand how they feel on a
regular basis.

Throughout the day, users enter the pain levels they're feeling in different
parts of their body, called pain points. Later on, Pain Control maps out how
each of the user's pain points have changed throughout the day as well as
over time. This information empowers the user by helping them make insights about
their pain and giving them an effective tool to communicate their pain history to
doctors.

Please note: this is the source code for the **front-end**. [Back-end source code can be found here!](https://github.com/mmanhard/pain_control_backend)

## Live Version

[Live version can be found here!](https://www.mypaincontroller.com/)

## Tech Stack

Front-End: React.JS + Redux + React Router

Server: Express + Node.JS

Tools: Webpack + Babel

[Check here for the backend stack!](https://github.com/mmanhard/pain_control_backend#tech-stack)

## Installation and Usage

#### Requirements

* `yarn` >= v1.22.4 or `npm` >= v6.14.4
* `node` >= v12.13.1

#### Install

With yarn:
```
$ yarn
```

With npm:
```
$ npm install
```
#### Build and Run - Development

With yarn:
```
$ yarn dev-server
```

With npm:
```
$ npm run dev-server
```

By default, webpack's development server will listen on port **8080**. If you need
to use a different one, append `--port PORT_NUM`, where `PORT_NUM` is the
desired port number, to the commands above.

#### Build and Run - Production

With yarn:
```
$ yarn build:prod
$ yarn start
```

With npm:
```
$ npm run build:prod
$ npm start
```

By default, express will start listening on port **3000**. If you need to use a
different one, enter `export PORT=PORT_NUM`, where `PORT_NUM` is the
desired port number, prior to starting up the server.

#### Deployment

The [live version](https://www.mypaincontroller.com/) is hosted on Heroku.

You can host your own forked version by following the steps below from the
directory where your local repo is located:

1) Login in to Heroku and create a new Heroku app using the Heroku CLI:
```
$ heroku login
$ heroku create
```

2) Add all files, commit them, and push the commit to the Heroku git repo:

```
$ git add .
$ git commit -am "Enter a nice commit message here!"
$ git push heroku master
```

After pushing changes, Heroku will automatically build the production version
of the app and run it using the steps detailed earlier. Heroku will let you know
the URL where you can visit your deployed version of the app.

Note: If you ran `npm install` with the flag `--save` prior to deployment, you'll
need to delete either `package-lock.json` or `yarn.lock` before the steps
indicated above.