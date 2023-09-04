require 'csv'

class Admin::ReportsController < AdminController
  before_action :authenticate_admin!
  before_action :get_date_params

  def index
  end

  # GET /reports/edits.json
  # def edits
  #   @edits = TranscriptEdit.getReport(@start_date, @end_date)
  # end

  # GET /reports/transcripts.json
  # def transcripts
  #   @transcripts = Transcript.getReport()
  # end

  # GET /reports/users.json
  def users
    params[:page] ||= 1
    @users = User.getReport(page: params[:page], per_page: 20)

    respond_to do |wants|
      wants.html
      wants.csv do
        render_csv("users-#{Time.now.strftime("%Y%m%d-%H%M%S")}")
      end
    end
  end

  private

    def get_date_params
      # default to all time
      @start_date = 10.years.ago
      @end_date = DateTime.now

      # look for parameters
      @start_date = params[:start].to_datetime unless params[:start].blank?
      @end_date = params[:end].to_datetime unless params[:end].blank?
    end

    def render_csv(filename = nil)
      filename ||= params[:action]
      filename += '.csv'
    
      if request.env['HTTP_USER_AGENT'] =~ /msie/i
        headers['Pragma'] = 'public'
        headers["Content-type"] = "text/plain" 
        headers['Cache-Control'] = 'no-cache, must-revalidate, post-check=0, pre-check=0'
        headers['Content-Disposition'] = "attachment; filename=\"#{filename}\"" 
        headers['Expires'] = "0" 
      else
        headers["Content-Type"] ||= 'text/csv'
        headers["Content-Disposition"] = "attachment; filename=\"#{filename}\"" 
      end
    
      render :layout => false
    end

end
