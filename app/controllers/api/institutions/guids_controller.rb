class Api::Institutions::GuidsController < ActionController::Base
  before_action :authenticate_request

  def index
    data = Institution.all.select(:slug, :guid, :name).as_json.each { |i| i.delete("id") }

    render json: data
  end

  private

  def authenticate_request
    token = extract_bearer_token
    if !token
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def extract_bearer_token
    auth_header = request.headers['Authorization']
    if auth_header && auth_header.start_with?('Bearer ')
      auth_header.split(' ').last
    else
      nil
    end
  end
end
