source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.5.3"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 5.2.0"

# Use PostgreSQL as the database for Active Record
gem "pg"
gem "pg_search"
gem "will_paginate"

gem "puma"

# Caching
gem "dalli"

# Disabling assets; replaced with Gulp
gem "autoprefixer-rails", "~> 8.6", ">= 8.6.5"
gem "bootstrap", "~> 4.1.1"
gem "coffee-rails", "~> 4.2"
gem "font-awesome-rails"
gem "jquery-rails"
gem "sass-rails", "~> 5.0"
gem "summernote-rails"
gem "uglifier", ">= 1.3.0"

# gem 'turbolinks', '~> 5'

# Back-end App is treated mostly as a JSON API
gem "jbuilder", "~> 2.5" # Build JSON APIs with ease
# gem 'rails-api' # pare down rails to act like an API; disabling unnecessary middleware
gem "rack-cors", require: "rack/cors"

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.1.0", require: false

# Rails app configuration / ENV management
gem "figaro"

# User management / auth.
# We have to force the version of OAuth because omniauth-google-oauth2 v0.6
# requires jwt v2.0 or better.
# Facebook's gem is a bit behind.
gem "devise"
# gem 'devise-security'
gem "oauth2", github: "oauth-xx/oauth2", ref: "v1.4.1"
gem "omniauth-facebook"
gem "omniauth-google-oauth2", ">= 0.6.0"

# Beef up security.
gem "invisible_captcha"
gem "rack-attack"

# Niceties.
gem "exception_handler"

# Parsers for project asset precompilation
gem "ejs"
gem "execjs"
gem "redcarpet"

# For audio transcripts
gem "webvtt-ruby"

# For uploading of transcipts and image files
# load fog-aws first to reduce the number of imported classes
gem "carrierwave", "~> 1.1"
gem "fog"
gem "mini_magick", "~> 4.8"

# Error logging
gem "newrelic_rpm"
gem "rails_12factor"

# Installation script.
gem "highline"

# Use unicorn on linux only
platforms :ruby do # linux
  gem "unicorn"
end

group :development, :test do
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
  gem "factory_bot_rails"
  gem "faker"
  gem "pry"
  gem "rspec-rails", "~> 3.4"
end

group :development do
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "web-console", ">= 3.3.0"

  gem "capistrano"
  gem "capistrano-bundler", require: false
  gem "capistrano-rails", require: false
  gem "capistrano-rvm"
  gem "capistrano-sidekiq"
  gem "capistrano3-puma"
  gem "rubocop"

  gem "dotenv-rails"
  gem "letter_opener"
  gem "reinteractive-style"
end

group :test do
  gem "capybara", ">= 2.15", "< 4.0"
  gem "chromedriver-helper"
  gem "launchy", "~> 2.4.0"
  gem "pundit-matchers", "~> 1.6.0"
  gem "rails-controller-testing"
  gem "selenium-webdriver"
  gem "shoulda-matchers", "~> 3.1", require: false
  gem "simplecov"
end

group :staging, :production do
  gem "executable-hooks"
end

gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# tracking errors
gem "bugsnag"
gem "draper"
gem "sanitize"

gem "acts-as-taggable-on", "~> 6.0"
gem "acts_as_singleton"
gem "chartkick"
gem "formdata"
gem "friendly_id", "~> 5.2.0"
gem "httparty"
gem "pundit"
gem "rest-client"
gem "seed_migration"
gem "sidekiq"
gem "whenever", require: false

# Track object changes
gem "paper_trail"
