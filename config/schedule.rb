# check and download the voicebase trasncripts
set :output, "log/cron_log.log"
env :PATH, ENV['PATH']

# Get current Rails environment.
current_env = ENV['RAILS_ENV'] || 'development'
deployed = ['staging', 'production'].include?(current_env)

path_to_bundle = '/home/deploy/.rvm/wrappers/ruby-2.5.3@rails5/bundle'
if current_env == 'production'
  path_to_bundle = '/home/deploy/.rvm/wrappers/ruby-2.5.3@nsl-rails5/bundle'
end

# Alter cron job execution method depending on rails env.
set :bundle_command, deployed ? "#{path_to_bundle} exec" : 'bundle exec'
job_type :runner,  "cd :path && :bundle_command rails runner -e :environment ':task' :output"

every 3.minutes do
  runner "VoiceBaseProcessingJob.perform_now"
end
