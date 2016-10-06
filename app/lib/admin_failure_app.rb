class AdminFailureApp < Devise::FailureApp
  def respond
    if request.format == :json
      json_failure
    else
      redirect_to root_url(show_alert: 'Authorized users only.')
    end
  end

  def json_failure
    self.status = 401
    self.content_type = 'application/json'
    self.response_body = "{'error' : 'Authorized users only.'}"
  end
end
