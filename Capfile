# # Load DSL and set up stages.
# require "capistrano/setup"

# # Include default deployment tasks.
# require "capistrano/deploy"

# require 'capistrano/bundler'
# require 'capistrano/rvm'
# require 'capistrano/rails/migrations'
# require 'capistrano/puma'

# Load DSL and set up stages
require "capistrano/setup"
 
# Include default deployment tasks
require "capistrano/deploy"
 
# Include capistrano-rails
require 'capistrano/rails'
require 'capistrano/rvm'
require 'capistrano/bundler'
require 'capistrano/rails/migrations'
require 'capistrano/rails/assets'
require 'capistrano/nginx'
require 'capistrano/puma'
require 'capistrano/puma/nginx'
require 'capistrano/upload-config'

# Load custom tasks from `lib/capistrano/tasks` if you have any defined.
Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
