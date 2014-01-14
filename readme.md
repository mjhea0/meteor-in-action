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

In this example, we'll be creating an app, which -

1. Displays a question
2. Users can submit an answer
3. Users can see all answers
4. Users can upvote or downvote answers
5. Users must be logged in to answer or vote
6. Users can view questions and submitted answer without logging in
7. Users login via Twitter



...
