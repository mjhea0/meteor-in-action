# Meteor.js in Action

Meteor is a next generation framework used for rapidly developing web apps, which seamlessly combines popular packages like MongoDB, Node.js, and jQuery, to name a few.

Check out the excellent Meteor [documentation](http://docs.meteor.com/) for more information. 

With that, let's start building …

> Please note: This tutorial uses Meteor version `0.7.0.1` - which, as of writing, is the latest version

## Setup a Project

#### 1. Install Meteor and the Meteor Package Manager, Meteorite:
```shell
$ npm install -g meteor
$ meteor update
$ npm install -g meteorite
```

#### 2. Create a Meteor project:

```shell
$ meteor create mymeteor
```

Look! It tells you exactly what to do:

```shell
To run your new app:
   cd mymeteor
   meteor
```

Go ahead and run it:

```shell
$ cd mymeteor
$ meteor
[[[[[ ~/Desktop/mymeteor ]]]]]

=> Meteor server running on: http://localhost:3000/
```

We just initialized the Meteor server. Navigate to [http://localhost:3000/]
(http://localhost:3000/), and you should see:

![helloworld](https://raw.github.com/mjhea0/meteor-in-action/master/helloworld.png)

If port 3000 is unavailable, you can use `–port` as an option:

```shell
$ meteor --port 1337
```

Leave the app running. The browser will automatically update as you save changes to your code.

##### What's going on here?

Look at your basic project structure:

```shell
.
├── mymeteor.css
├── mymeteor.html
└── mymeteor.js
```

Your JS file contains both cient and server code:
  ```javascript
  // client!
  if (Meteor.isClient) {
    Template.hello.greeting = function () {
      return "Welcome to mymeteor.";
    };

    Template.hello.events({
      'click input' : function () {
        // template data, if any, is available in 'this'
        if (typeof console !== 'undefined')
          console.log("You pressed the button");
      }
    });
  }

  // server!
  if (Meteor.isServer) {
    Meteor.startup(function () {
      // code to run on server at startup
    });
  }
  ```

The behavior of `{{greeting}}` in the HTML file is controlled by `Template` within the client-side code in the JS file, as well as the handling of events.

## Create a Basic App

In this example, we'll be creating an app, which displays a quesion with a list of answers. Users can -

1. Submit answers
2. See all submmitted answers
3. Up or down vote answers
4. Only answer or vote if they are logged in
5. View questions and submitted answers without logging in
6. Login via Twitter

Before we start adding this functionaly, let's first restructure the project.

## Restructure

#### 1. Add Packages

```shell
$ meteor add accounts-ui
accounts-ui: Simple templates to add login widgets to an app
$ meteor add accounts-twitter
accounts-twitter: Login service for Twitter accounts
$ meteor add bootstrap-3
bootstrap-3: Provides bootstrap 3.
```

Watch your browser as you add these. You should see the styles update almost immediately.

You can read more about these packages [here](http://docs.meteor.com/#accountsui), [here](http://docs.meteor.com/#accounts_api), [here](https://github.com/mangasocial/meteor-bootstrap-3).

#### 2. Add client and server folders

Add two new folders - "client" and "server". Essentially, if Meteor detects a client folder, all the JavaScript within the folder will be run on the client-side, while JavaScript code found within the server folder will run only on the server-side.

Within the client folder, create a file called "mainClient.js" and add the following code:

```javascript
if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to mymeteor.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}
```

Then within the server folder, and a file called "mainServer.js" and add the following code:

```javascript
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
```

Delete the "mymeteor.js" file. If you look at your browser, everything should look the same. Your project structure should now look like this:

```shell
.
├── client
│   └── mainClient.js
├── mymeteor.css
├── mymeteor.html
└── server
    └── mainServer.js
```

## Testing Framework

Since both client and server code are interconnected, we want to be able to write test cases that target both the client and server. [Laika](http://arunoda.github.io/laika/) is by far the best framework for this.

Before installing Laika, make sure you have [Node.js](http://nodejs.org/), [PhantomJS](http://phantomjs.org/download.html), and [MongoDB](http://docs.mongodb.org/manual/installation/) installed. Also, run [`mongod`](http://docs.mongodb.org/v2.2/reference/mongod/) in a seperate terminal window.  

Install Laika:

```shell
$ sudo npm install -g laika
```
