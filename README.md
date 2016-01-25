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
2. Run `rake db:setup` to setup the database based on `config/database.yml`

## Load A Project

1. Load a project: `rake project:load['oral-history']` - Loads the project config and assets
2. Load a project's collections from csv file: `rake collections:load['oral-history','collections_seeds.csv']` - Seeds a project's collections
3. Load a project's transcripts from csv file: `rake transcripts:load['oral-history','transcripts_seeds.csv']` - Seeds a project's transcripts
4. Upload audio files to Pop Up Archive: `rake transcripts:upload_pua` - Creates a Pop Up Archive item and uploads a remote audio file for each transcript
5. Download transcripts from Pop Up Archive or project folder: `rake transcripts:download_pua['oral-history']` - Downloads transcripts that are ready

## Development

1. In the project's directory, run `npm install`
2. Run `gulp`
3. Run `rails s` and go to http://localhost:3000 to view the app
