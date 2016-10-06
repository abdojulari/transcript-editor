class DefaultController < ApplicationController

  def index
    # Render the project set in environment.
    # If there's a different index file available
    # for the current Rails.env, use that instead.
    index_file = "public/#{ENV['PROJECT_ID']}/index.html"
    env_index_file = "public/#{ENV['PROJECT_ID']}/index.#{Rails.env.downcase}.html"
    index_file = env_index_file if File.exists?(env_index_file)
    render :file => index_file
  end

end
