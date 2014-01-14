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

![helloworld](https://raw.github.com/mjhea0/meteor-in-action/master/images/helloworld.png)

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

Delete the "mymeteor.js" file. If you look at your browser, everything should look the same. Add one more folder called "tests", which as you probably guessed will include our unit tests along with a file called "index.js".

Your project structure should now look like this:

```shell
.
├── client
│   └── mainClient.js
├── mymeteor.css
├── mymeteor.html
├── server
│   └── mainServer.js
└── tests
    └── index.js

```

#### 3. Update HTML

Update "mymeteor.html":

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>One Question. Several Answers.</title>
  <link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootswatch/3.0.3/yeti/bootstrap.min.css">
</head>

<body>
  <div class="container">
    {{> hello}}
  </div>
</body>

<template name="hello">
  <h1>Hello World!</h1>
  {{greeting}}
  <input type="button" value="Click" />
</template>
```

Your app should now look like this:

![helloworld-redux](https://raw.github.com/mjhea0/meteor-in-action/master/images/helloworld-redux.png)

## Testing Framework

Since both client and server code are interconnected, we want to be able to write test cases that target both the client and server. [Laika](http://arunoda.github.io/laika/) is by far the best framework for this.

Before installing Laika, make sure you have [Node.js](http://nodejs.org/), [PhantomJS](http://phantomjs.org/download.html), and [MongoDB](http://docs.mongodb.org/manual/installation/) installed. Also, run [`mongod`](http://docs.mongodb.org/v2.2/reference/mongod/) in a seperate terminal window.  

Install Laika:

```shell
$ sudo npm install -g laika
```
All of our tests will reside in the "index.js" file within the "tests" folder.
 
Now let's start building.

## Users can submit answers

#### 1. Client JS

```javascript
Answers = new Meteor.Collection("answers");
  
Template.addAnswer.events({
  'click input.add-answer' : function(e){
    e.preventDefault();
    var answerText = document.getElementById("answerText").value;
    Meteor.call("addAnswer",answerText,function(error , answerId){
      console.log('Added answer with ID: '+answerId);
    });
    document.getElementById("answerText").value = "";
  }
});
```
##### What's going on?

First, we have a click event, which grabs the value from the input box. This value is then passed to the server side via the [`.call()`](http://docs.meteor.com/#meteor_call) - which is used to invoke a method. `answerId` is then the call back, which is then assigned to the console.log.

#### 1. Server JS

```javascript
Answers = new Meteor.Collection("answers");

Meteor.methods({
  addAnswer : function(answerText){
    console.log('Adding Answer ...');
    var answerId = Answers.insert({
      'answerText' : answerText,
      'submittedOn': new Date()
    });
    console.log(answerId)
    return answerId;
  }
});
```

##### What's going on?

On the client side we passed the `answerText` - inputted value - to the server side. This answer is the added to the MongoDB collection, then we return the answerID, which is handled on the client side.

Notice how we established the Mongo collection on both the client and server.

#### 3. HTML

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>One Question. Several Answers.</title>
  <link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootswatch/3.0.3/yeti/bootstrap.min.css">
</head>

<body>
  <div class="container">
    <h1>Add an answer. Or vote.</h1>
    <h3><em>Question</em>: Is the world getting warmer?</h3>
    <br>
    <div>
      <!-- if there is an answer, append it to the DOM -->
      {{> addAnswer}}
    </div>
  </div>
</body>

<template name="addAnswer">
  <textarea class="form-control" rows="3" name="answerText" id="answerText" placeholder="Add Your Answer .."></textarea>
  <br>
  <input type="button" class="btn-primary add-answer btn-md" value="Add Answer"/>
</template>
```

#### 4. Manually Test

First, your browser view should now look like this:

![part1](https://raw.github.com/mjhea0/meteor-in-action/master/images/part1.png)

Next, arrange your screen so that you can view both your terminal as well as your browser. Also, open up the JS bebug console:

![part1-2](https://raw.github.com/mjhea0/meteor-in-action/master/images/part1-2.png)

Then, just like in the screenshot above, add an answer. On the client side, you should see the MongoDB ID - i.e., `Added answer with ID: ECrTqRQha7vpXu78q`, which should match the ID on the server side:

```shell
I20140114-07:38:27.061(-7)? Adding Answer ...
I20140114-07:38:27.340(-7)? ECrTqRQha7vpXu78q
```

### 5. Automated Test

Now, add a Laika test by adding the following code to "index.js":

```javascript
'use strict'

var assert = require('assert');

suite('submitAnswers', function() {

  // ensure that -
  // (1) the "Answers" collection exists
  // (2) we can connect to the collection
  // (3) the collection is empty
  test('server initialization', function(done, server) {
    server.eval(function() {
      var collection = Answers.find().fetch();
      emit('collection', collection);
    }).once('collection', function(collection) {
      assert.equal(collection.length, 0);
      done();
    });
  });

  // essure that -
  // (1) we can add data to the collection
  // (2) after data is added, we can retreive it
  test('server insert : OK', function(done, server, client) {
    server.eval(function() {
      Answers.insert({answerText: "whee!"  });
      var collection = Answers.find().fetch();
      emit('collection', collection);
    }).once('collection', function(collection) {
      assert.equal(collection.length, 1);
      done();
    });

    client.once('collection', function(collection) {
      assert.equal(Answers.find().fetch().length, 1);
      done();
    });
  });

});
```

##### What's going on here?

Basically, we are just testing that the Answers collecton exists and is accesible. See the inline comments for more info.

##### Run the test

If all goes well, you should see this:

```shell
$ laika

  injecting laika...
  loading phantomjs...
  loading initial app pool...


  submitAnswers
    ✓ server initialization (1517ms)
    ✓ server insert : OK


  2 passing (2s)

  cleaning up injected code
```

Congrats! You just wrote your first test!

> If you have not initilizaed a Git repo yet, go ahead and do this now. Then commit the code.

## Users can see all submmitted answers

#### 1. Client JS

Add the following template to pull out the data from the collection and sort in descending order.

```javascript
return Answers.find({},{sort:{'submittedOn':-1}});
```
#### 2. HTML

Add the templates to the HTML file:

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>One Question. Several Answers.</title>
  <link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootswatch/3.0.3/yeti/bootstrap.min.css">
</head>

<body>
  <div class="container">
    <h1>Add an answer. Or vote.</h1>
    <h3><em>Question</em>: Is the world getting warmer?</h3>
    <br>
    <div>
      <!-- if there is an answer, append it to the DOM -->
      {{> addAnswer}}
      {{> answers}}
    </div>
  </div>
</body>

<template name="addAnswer">
  <textarea class="form-control" rows="3" name="answerText" id="answerText" placeholder="Add Your Answer .."></textarea>
  <br>
  <input type="button" class="btn-primary add-answer btn-md" value="Add Answer"/>
</template>

<template name="answers">
  <br>
  <br>
  <h2>All Questions</h2>
  {{#each items}}
    {{> answer}}
  {{/each}}
</template>

<template name="answer">
  <div>
    <p class="lead">
      {{answerText}}
      <br>
    </p>
  </div>
</template>
```

#### 3. Manually Test

You should see all of the submitted answers:

![part2](https://raw.github.com/mjhea0/meteor-in-action/master/images/part2.png)

Go ahead and add new answers. They should immediately appear.

As far as automated testing goes, we are already testing this with this code:

```javascript
client.once('collection', function(collection) {
  assert.equal(Answers.find().fetch().length, 1);
  done();
```

## Users can up or down vote answers

...


