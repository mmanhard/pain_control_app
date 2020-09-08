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

#### Test Account

There is a test account that has already entered a number of entries. If you
would like to use this account to play around with the app, feel free. The
credentials are as follows:

&nbsp;&nbsp;&nbsp;&nbsp;**Email:** paincontroltest@gmail.com
&nbsp;&nbsp;&nbsp;&nbsp;**Password:** password1234

## Tech Stack

Front-End: React.JS + Redux + React Router

Server: Express + Node.JS

Tools: Webpack + Babel

[Check here for the backend stack!](https://github.com/mmanhard/pain_control_backend#tech-stack)

## Installation and Usage

#### Requirements

* `yarn` >= v1.22.4 or `npm` >= v6.14.4
* `node` >= v12.13.1
* `heroku CLI` >= 7.42.11 (if deploying)

#### Install

With yarn:
```
$ yarn
```

With npm:
```
$ npm install
```

#### Configure the Back-End

To save and retrieve data, you'll need your app to connect to a version of the
backend. You have (3) options:

1. Use the live version of the back-end hosted on Heroku. Feel free to use this
as the app is hosted for demonstration purposes only. The URL for this option is
`https://api.mypaincontroller.com/`.
2. Run the back-end locally with [these steps](https://github.com/mmanhard/pain_control_backend#installation-and-usage).
If you used the default port, the URL will be `http://localhost:5000/`.
3. Host your own version of the back-end on Heroku using [these steps](https://github.com/mmanhard/pain_control_backend#deployment).
Heroku will let you know the URL of your back-end application.

Next, change the variable `HOST` in `src/common/AppConst.js` to
the URL of your back-end. This will let the front-end know where to make HTTP
requests. NOTE: You won't need to change this if using option (1).

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

##### 1. Login in to Heroku and create a new Heroku app using the Heroku CLI:

```
$ heroku login
$ heroku create <APP_NAME>
```

Where `<APP_NAME>` is the name you have selected for your application.

##### 2. Add all files, commit them, and push the commit to the Heroku git repo:

```
$ heroku git:remote -a <APP_NAME>
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