source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.5'

# Use PostgreSQL as the database for Active Record
gem 'pg'
gem 'pg_search'

# Disabling assets; replaced with Gulp
# gem 'sass-rails', '~> 5.0'
# gem 'uglifier', '>= 1.3.0'
# gem 'coffee-rails', '~> 4.1.0'
# gem 'jquery-rails'

# Back-end App is treated mostly as a JSON API
gem 'jbuilder', '~> 2.0' # Build JSON APIs with ease
gem 'rails-api' # pare down rails to act like an API; disabling unnecessary middleware
gem 'active_model_serializers' # To serialize ActiveModel/ActiveRecord objects into JSON.

# Rails app configuration / ENV management
gem 'figaro'

# User management / auth
gem 'devise_token_auth'
gem 'omniauth-google-oauth2'

# Parsers
gem 'redcarpet'
gem 'ejs'
gem 'execjs'

# Use unicorn on linux only
platforms :ruby do # linux
  gem 'unicorn'
end
