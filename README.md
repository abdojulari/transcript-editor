# Open Transcript Editor

**Notice: This codebase is currently in deep and rapid development and won't have a stable version until about April 2016. Please check back for updates and documentation.**

This is an open-source, self-hosted, web-based tool for correcting transcripts that were automatically generated using speech-to-text software via auto-transcription services such as [Pop Up Archive](https://popuparchive.com/). It is being developed by [NYPL Labs](http://www.nypl.org/collections/labs) in partnership with [The Moth](http://themoth.org/) and [Pop Up Archive](https://popuparchive.com/) with generous support from the [Knight Foundation](http://www.knightfoundation.org/grants/201551666/).

### You are in the right place if...

- You have a collection of audio that you would like to produce quality transcripts for
- You **do not** have a budget for human transcription services (~$60-$100 per hour of audio)
- You either (1) have a budget for auto-transcription services (~$15 per hour of audio) such as [Pop Up Archive](https://popuparchive.com/), or (2) you are able to produce time-coded transcripts on your own using speech-to-text software
- Automatically generated transcripts do not meet your standard of quality and needs to be corrected by humans
- You and your team do not have the capacity to correct the transcripts yourselves
- You or a member of your team has basic web development experience, specifically with creating a [Ruby on Rails](http://rubyonrails.org/) web application
- **Bonus:** You have an audience of users who would be interested in helping fix transcripts (this app is uniquely designed to enable multiple users working on transcripts at the same time)

## Setting Up Your Own Project

### Requirements

You will need to have the following installed to run this project on your machine.

- [Git](https://git-scm.com/)
- [Ruby](https://www.ruby-lang.org/en/) - this app has been developed using 2.3.0. Older versions may not work
- [PostgreSQL](http://www.postgresql.org/)

Once everything is installed, clone this repository

```
cd /my/projects/folder
git clone https://github.com/NYPL/transcript-editor.git
cd transcript-editor
```

### Configure Your Project

1. Create `config/database.yml` based on [config/database.sample.yml](config/database.sample.yml) - update this file with your own database credentials
2. Create `config/application.yml` based on [config/application.sample.yml](config/application.sample.yml) - this file contains all your private config credentials such as Pop Up Archive or Google accounts. The only required configuration to start is:
  - **SECRET_KEY_BASE**. You can generate this value by running `rake secret`
  - **PROJECT_ID**. A project id that will be used to identify this project (e.g. my-project). Must be alphanumeric, no spaces, underscores and dashes okay
3. Copy the folder `project/sample-project` and rename it to the **PROJECT_ID** from the previous step (e.g. `project/my-project`).  This folder will contain all the configuration, content, and language for your project.

#### Configure Your Project Details

Your project folder has the following structure:

```
 my-project/
 +-- assets/
 |  +-- css/
 |  +-- img/
 |  +-- js/
 +-- data/
 +-- layouts/
 +-- pages/
 +-- transcripts/
 +-- project.json
 ```

The primary place for project configuration the file `project.json`. For now, we can keep everything as defaults. We will cover the details of this folder in later steps.

### Setup and run the app

1. Run `bundle` - this will install all the necessary gems for this app
2. Run `rake db:setup` to setup the database based on `config/database.yml`
3. Run `rake project:load['my-project']` to load your project folder (replace *my-project* with your project name)
4. Run `rails s` to start your server. Go to [http://localhost:3000/](http://localhost:3000/) to view your project

Your project should load, but since there's no transcripts, all you'll see is a header and blank screen! The next step is to seed the app with some transcripts

## Generating your transcripts

This section will assume that you do not have transcripts yet, just audio files that need transcripts. We will be using Pop Up Archive to automatically produce the transcripts that will need to be corrected. Other vendors and services may be documented in the future based on demand.

### Requirements

- A [Pop Up Archive](https://www.popuparchive.com/) account
- Your audio files must be uploaded to the web so it is accessible via a public URL (e.g. http://website.com/my-audio.mp3)
  - Here are [some examples](https://en.wikipedia.org/wiki/Comparison_of_file_hosting_services) of file hosting services
  - The following file formats are supported: *'aac', 'aif', 'aiff', 'alac', 'flac', 'm4a', 'm4p', 'mp2', 'mp3', 'mp4', 'ogg', 'raw', 'spx', 'wav', 'wma'*

### Update your credentials

If you are using Pop Up Archive, you must update your account credentials in the `config/application.yml` file. There are two values (**PUA_CLIENT_ID** and **PUA_CLIENT_SECRET**) which refer to your Pop Up Archive Client ID and Client Secret respectively. You can find these values by logging into you Pop Up Archive account and visiting [https://www.popuparchive.com/oauth/applications](https://www.popuparchive.com/oauth/applications)

### Creating a manifest file

New audio files and transcripts can be added to this app by creating manifest files in .csv format. These manifest files will contain basic information about your audio, e.g. an internal id, title, description, url to audio file, etc. These files will be read by a number of scripts that perform a number of tasks such as uploading new audio for transcription, download processed transcripts, and updating information about your audio.

In your project folder, you should find an empty .csv file: [project/my-project/data/transcripts_seeds.csv](project/sample-project/data/transcripts_seeds.csv). It contains the following columns:

| Column | Description | Required? | Example |
| ------ | ----------- | --------- | ------- |
| uid | a unique identifier for your audio file. Must be alphanumeric, no spaces, underscores and dashes okay. Case sensitive. | Yes | *podcast-123*, *podcast_123*, *123* |
| title | the title that will be displayed for this audio file | Yes | *Podcast About Cats* |
| description | a description that will be displayed for this audio file | No | *This is basically teh best podcast about cats; no dogs allowed* |
| url | a URL that will link back to where the audio is being presented on your website | No | *http://mywebsite.com/podcast-123* |
| audio_url | a public URL to your audio file | Yes, unless you already uploaded audio to Pop Up Archive or already have transcripts | *http://mywebsite.com/podcast-123.mp3* |
| image_url | a public URL to an image representing your audio; square and ~400px is preferred | No | *http://mywebsite/podcast-123.jpg* |
| collection | the unique identifier for the collection this audio belongs to (see below for more on this) | No | *cat-collection* |
| vendor | the vendor that will be doing the transcription | Yes, unless you already produced transcripts yourself | *pop_up_archive* |
| vendor_identifier | if already uploaded the audio to Pop Up Archive, put the item id here | Only if you already uploaded audio to Pop Up Archive | *41326* |
| notes | any extra notes that will only be used internally (not public) | No | *this audio contains explicit material* |

Populate at least the required fields of this file. You can load them into the app with this command:

```
rake transcripts:load['my-project','transcripts_seeds.csv']
```

Replace `my-project` with your project id and `transcripts_seeds.csv` if you are using a different file. You can run this command any number of times after editing the manifest file or with new manifest files. The script will check if the transcript already exists using the `uid` column value.

### Making Collections/Groups

Sometimes you may want to group your audio in different ways for the user. If you are using Pop Up Archive, this step is required since they requires all your audio files to belong to a *collection*. You can create collections similar to how you create transcripts--with a manifest file.

In your project folder, you should find an empty .csv file: [project/my-project/data/collections_seeds.csv](project/sample-project/data/collections_seeds.csv). It contains almost the same columns as the transcript manifest file. If you are using Pop Up Archive, you must fill out the last two columns (*vendor*, *vendor_identifier*) as *pop_up_archive* and the Pop Up Archive collection id respectively. The collection id can be found by clicking on a collection in your Pop Up Archive dashboard and look at the URL (e.g. https://www.popuparchive.com/collections/1234), in which case the collection id is *1234*

Once you fill out the manifest file, you can load them into the app with this command:

```
rake collections:load['my-project','collections_seeds.csv']
```

Similarly with transcripts, you can always re-run this script with new data and manifest files.

### Uploading your files to Pop Up Archive

If you are using Pop Up Archive and have not yet uploaded your audio, run this command:

```
rake pua:upload['my-project']
```

This will look for any audio items (that were previously defined in your transcript manifest files) that have *pop_up_archive* as *vendor* but do not have a *vendor_identifier* (i.e. has not been uploaded to Pop Up Archive), and for each of those items, create a Pop Up Archive item and uploads submit your audio file for processing. It will populate the *vendor_identifier* in the app's database with the Pop Up Archive item id upon submission, so you may run this script any number of times if you add additional audio items.

### Download processed transcripts from Pop Up Archive

Transcripts can generally take up to 24 hours to process. When you think they may be ready, you can run this script to downloaded finished transcripts to the app:

```
rake pua:download['my-project']
```

This will look for any audio items that have been submitted to Pop Up Archive, but not yet have a transcript downloaded.  If an item's transcript is ready, it will download and save it to the app's database, and will become visible in the app. You can run this script any number of times until all transcripts have been downloaded.

## Customizing your project

Coming soon... this section will walk through how you can customize the interface, content, users, and rules for consensus for your project.

## Deploying your project to production

This example will use [Heroku](https://www.heroku.com/) to deploy the app to production, though the process would be similar for other hosting solutions. The commands assume you have [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

1. Create a new [Heroku](https://heroku.com) app:

   ```
   heroku apps:create my-app-name
   heroku git:remote -a my-app-name
   ```

   (Only run the 2nd command if you already have an app setup)

2. Provision a PostgreSQL database:

   ```
   heroku addons:create heroku-postgresql:hobby-dev
   heroku pg:wait
   heroku config -s | grep HEROKU_POSTGRESQL
   ```

   Replace `hobby-dev` with your [database plan of choice](https://devcenter.heroku.com/articles/heroku-postgres-plans). This example uses the free "Hobby Dev" plan. Note that you should choose a higher plan (e.g. `standard-0`) for production; Hobby Dev has a row limit of 10,000 and a maximum of 20 connections. You can always [upgrade](https://devcenter.heroku.com/articles/upgrading-heroku-postgres-databases) an existing database.

3. Update your environment variables

   ```
   figaro heroku:set -e production
   ```

   This sets environment variables from `config/application.yml` in your production environment

4. Deploy the code and run rake tasks

   ```
   git push heroku master
   heroku run rake db:migrate
   heroku run rake db:seed
   ```

   And run the scripts to seed your database with your collections/transcripts

   ```
   heroku run rake collections:load['my-project','collections_seeds.csv']
   heroku run rake transcripts:load['my-project','transcripts_seeds.csv']
   heroku run rake pua:download['my-project']
   ```

## Managing your project

Coming soon... this section will walk through admin and moderator functionality

## Retrieving your finished transcripts

Coming soon... this section will walk through how you can download all your completed transcripts in a variety of formats for use elsewhere
