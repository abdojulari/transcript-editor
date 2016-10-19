class DefaultController < ApplicationController
  include IndexTemplate

  def index
    render file: environment_index_file, fb_id: ENV['FACEBOOK_APP_ID']
  end

end
