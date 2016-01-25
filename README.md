# Transcript Editor

Notice: This codebase is currently in deep and rapid development and won't have a stable version until about March 2016. Please check back for updates and documentation.

## Requirements

- Ruby
- Rails
- PostgreSQL Database 
- Node.js (only required for front-end development)
- Google account (for auth via google)
- [Pop-up Archive](https://popuparchive.com/) account (for transcript generation)

## Configure

1. Create `config/database.yml` based on [config/database.yml.sample](config/database.yml.sample)
2. Create `config/application.yml` based on [config/application.yml.sample](config/application.yml.sample) - contains config variables for Google, Pop-up Archive, etc. Run `rake secret` to generate new secret tokens
   - For Google, to-do...
   - For Pop-up Archive, to-do...

## Setup

1. In the project's directory, run `bundle`
2. Run `rake db:create db:migrate` to setup the database based on `config/database.yml`

## Development

1. In the project's directory, run `npm install`
2. Run `gulp`
3. Run `rails s` and go to http://localhost:3000 to view the app
