class DefaultController < ApplicationController
  include IndexTemplate

  def index
    @env = {
      facebook_app_id: ENV['FACEBOOK_APP_ID']
    }
    render file: environment_index_file, isErb: true
  end

end
