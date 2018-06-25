class AdminController < ApplicationController
  include Pundit
  after_action :verify_authorized


  layout 'cms'

end
