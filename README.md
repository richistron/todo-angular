Angular Todo App
================

Release: 0.0.0

Try http://richistron.github.io/richistron-frontend/

Simple todo app with angularjs.

To run this app you need to command installed, if you don't have it you'll need to follow the installation instructions

Usage
=====

Install nodejs dependencies

```
npm install
```

Install bower depencies

```
bower install
```

Run development server

```
grunt server
```

Deployment

```
grunt
```

Run development server

```
grunt server
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
 
gem install rails
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