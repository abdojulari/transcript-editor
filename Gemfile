source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.7.2"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.0.4", ">= 7.0.4.3"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
gem "sprockets-rails"

# Use sqlite3 as the database for Active Record
gem "sqlite3", "~> 1.4"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", "~> 5.0"
gem "puma-daemon", require: false

# Use JavaScript with ESM import maps [https://github.com/rails/importmap-rails]
gem "importmap-rails"

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails"

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Use Redis adapter to run Action Cable in production
# gem "redis", "~> 4.0"

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Sass to process CSS
# gem "sassc-rails"

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

gem "marcel", "~> 1.0.2"

# Use PostgreSQL as the database for Active Record
gem "pg", "~> 1.1.4"
gem "pg_search", "~> 2.1.4"
gem "will_paginate", "~> 3.1.6"

# Caching
gem "dalli", "~> 2.7.9"

# Disabling assets; replaced with Gulp
gem "autoprefixer-rails", "~> 8.6", ">= 8.6.5"
gem "bootstrap", "~> 4.1.1"
gem "coffee-rails", "~> 4.2"
gem "font-awesome-rails", "~> 4.7.0"
gem "jquery-rails", "~> 4.3.3"
gem "sass-rails", "~> 5.0"
gem "select2-rails", "~> 4.0.13"
gem "summernote-rails", "0.8.10"
gem "uglifier", ">= 1.3.0"

# gem 'rails-api' # pare down rails to act like an API; disabling unnecessary middleware
gem "rack-cors", "~> 1.0.2", require: "rack/cors"

# Rails app configuration / ENV management
gem "figaro"

# User management / auth.
# We have to force the version of OAuth because omniauth-google-oauth2 v0.6
# requires jwt v2.0 or better.
# Facebook's gem is a bit behind.
gem "devise", "~> 4.9.0"
# gem 'devise-security'
gem "oauth2", github: "oauth-xx/oauth2", ref: "v1.4.1"
gem "omniauth-facebook", "~> 5.0.0"
gem "omniauth-google-oauth2", "< 1.0"

# Beef up security.
gem "invisible_captcha", "~> 0.12.0"
gem "rack-attack", "~> 6.0.0"

# Niceties.
gem "exception_handler", "~> 0.8.0"

# Parsers for project asset precompilation
gem "ejs", "~> 1.1.1"
gem "execjs", "~> 2.7.0"
gem "redcarpet", "~> 3.4.0"

# For audio transcripts
gem "webvtt-ruby", "~> 0.3.2"

# For uploading of transcipts and image files
# load fog-aws first to reduce the number of imported classes
gem "carrierwave", "~> 1.1"
# require installation of the following
# sudo apt-get install build-essential libcurl4-openssl-dev
# this is to allow fog get installed with ovirt-engine-sdk
gem "fog", "~> 2.1.0"
gem "mini_magick", "~> 4.8"

# Error logging
gem "newrelic_rpm"
gem "rails_12factor", "~> 0.0.3"

# Installation script.
gem "highline", "~> 2.0.1"

# Use unicorn on linux only
platforms :ruby do # linux
  gem "unicorn", "~> 5.6.0"
end

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri mingw x64_mingw ]

  gem "byebug", "~> 11.0.0", platforms: [:mri, :mingw, :x64_mingw]
  gem "factory_bot_rails", "~> 5.0.2"
  gem "faker", "~> 1.9.3"
  gem "pry", "~> 0.12.2"
  gem 'rspec-rails', '~> 6.0.0'
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "web-console"

  # Add speed badges [https://github.com/MiniProfiler/rack-mini-profiler]
  # gem "rack-mini-profiler"

  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"

  gem "foreman"
  gem "listen", ">= 3.0.5", "< 3.2"
  gem 'spring'
  gem 'spring-commands-rspec'

  gem "capistrano", "~> 3.11.0"
  gem "capistrano3-puma", "~> 5.2.0"
  gem "capistrano-bundler", "~> 1.6.0", require: false
  gem "capistrano-npm", "~>1.0.3"
  gem "capistrano-rails", "~> 1.4.0", require: false
  gem "capistrano-rvm", "~> 0.1.2"
  gem "capistrano-sidekiq", "~> 1.0.2"
  gem "rubocop", "~> 0.65.0"

  gem "bcrypt_pbkdf", "~> 1.1"
  gem "ed25519", "~> 1.2"

  gem "dotenv-rails", "~> 2.7.1"
  gem "letter_opener", "~> 1.7.0"
  gem "reinteractive-style", "~> 0.2.8"
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"

  gem "launchy", "~> 2.4.0"
  gem "pundit-matchers", "~> 1.6.0"
  gem "rails-controller-testing", "~> 1.0.4"
  gem "shoulda-matchers", "~> 3.1", require: false
  gem "simplecov", "~> 0.16.1"
end

group :staging, :production do
  gem "executable-hooks", "~> 1.6.0"
end

# tracking errors
gem "bugsnag", "~> 6.11.1"
gem "draper", "~> 3.1.0"
gem 'nokogiri', '1.12.5'
gem "sanitize", "~> 5.2.0"

gem "acts_as_singleton", "~> 0.0.8"
gem "acts-as-taggable-on", "~> 9.0.1"
gem "chartkick", "~> 3.0.2"
gem "formdata", "~> 0.1.2"
gem "friendly_id", "~> 5.2.0"
gem "httparty", "~> 0.16.4"
gem "pundit", "~> 2.0.1"
gem "rest-client", "~> 2.0.2"
gem "seed_migration", "~> 1.2.3"
gem "sidekiq", "< 6"
gem "sidekiq-cron", "~> 1.2.0"

# Track object changes
gem "paper_trail", "~> 10.3.1"
