Angular Todo App
================

Simple todo app with angularjs.

Release: 0.0.1

## Deployment

http://richistron.github.io/todo-angular

## Status

[![Build Status](https://travis-ci.org/richistron/todo-angular.png?branch=master)](https://travis-ci.org/richistron/todo-angular)

Install
=======

```
npm install
bower install
```

Run development server

```
grunt server
```

Deployment, testing and build

```
grunt
```

Unit testing

```
grunt test
```

Install yeoman ubuntu 12.04
===========================

Yeoman requires nodejs and ruby to run, if you have installed this two already, go ahead to step 3.

### Step 1 (installing ruby)

```
sudo apt-get update

sudo apt-get install curl

\curl -L https://get.rvm.io | bash -s stable

source ~/.rvm/scripts/rvm

rvm requirements

rvm install ruby

rvm use ruby --default

rvm rubygems current
 
```

Source: [digitalocean](https://www.digitalocean.com/community/articles/how-to-install-ruby-on-rails-on-ubuntu-12-04-lts-precise-pangolin-with-rvm)

### Step 2 (installing nodejs)

```
sudo apt-get update

sudo apt-get install build-essential openssl libssl-dev pkg-config 

cd ~/

wget http://nodejs.org/dist/node-latest.tar.gz


tar -xzf node-latest.tar.gz

cd node-v*

sudo make install 
```

### Step 3 (installing yo)

```
npm install -g yo
```