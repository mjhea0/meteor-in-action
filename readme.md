# Meteor.js in Action

Meteor is a next generation framework used for rapidly developing web apps, which seamlessly combines popular packages like MongoDB, Node.js, and jQuery, to name a few.

Check out the excellent Meteor [documentation](http://docs.meteor.com/) for more information. 

With that, let's start building …

> Please note: This tutorial uses Meteor version `0.6.0`

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
Navigate to [http://localhost:3000/
(http://localhost:3000/), and you should see:

![helloworld](https://raw.github.com/mjhea0/meteor-in-action/master/helloworld.png)

Leave the app running. The browser will automatically update as you save changes to your code.

...
