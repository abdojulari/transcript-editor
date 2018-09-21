# check and download the voicebase trasncripts
set :output, "log/cron_log.log"
env :PATH, ENV['PATH']

# Get current Rails environment.
current_env = ENV['RAILS_ENV'] || 'development'
deployed = ['staging', 'production'].include?(current_env)

# Alter cron job execution method depending on rails env.
set :bundle_command, deployed ? '/home/deploy/.rvm/wrappers/ruby-2.5.0@rails5/bundle exec' : 'bundle exec'
job_type :runner,  "cd :path && :bundle_command rails runner -e :environment ':task' :output"

every 5.minutes do
  runner "VoiceBaseProcessingJob.perform_now"
end
