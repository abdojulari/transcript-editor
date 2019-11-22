require 'restclient'
require 'pry'

TX_HOST = 'localhost:3000'

puts 'Oh wow!'
puts "Lemme get this straight - you want to release some transcripts?"
right_now = DateTime.now
puts "Right now, at #{right_now}?"

puts "Alright, first we're going to have to ask #{TX_HOST} which ones are ready to release..."
response = RestClient.get(TX_HOST + '/release_count.json')
raise 'Didnt get a response for release_count...' unless response.body
release_needin_ids = JSON.parse(response.body)['data']

# write guids to file
puts "Now we're going to write those release guids (#{ release_needin_ids.count }) to a file..."
File.open("ready_for_release_guids_#{ right_now }.txt", "w+") do |f|
  release_needin_ids.each do |guid|
    f << guid
  end
end

quips = ['Wow, neat. We ', 'Great news - we ','You are not going to believe this! We ']
filename = nil
release_needin_ids.each do |guid|
  transcript_json = RestClient.get(TX_HOST + "/transcripts/aapb/#{ guid }.json")
  # filename = "transcript-#{ right_now }-#{guid}.json"
  filename = "#{guid.gsub('_','-')}-transcript.json"
  File.open(%(./transcript-json/#{filename}), 'w+') do |f|
    f << transcript_json
    puts quips.sample + " wrote #{guid} data to #{filename}."
  end
end

puts "Well, that was fun. Now we've got all the files we need."

puts `./shellScriptToDuplicateAndPushNewFilesToS3.sh #{__dir__}/transcript-json/#{filename}`

puts 'Ah... That is the stuff.'
