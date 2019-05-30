module VoiceBase
  class VoicebaseApiService
    attr_accessor :transcript

    def self.upload_media(transcript_id)
      transcript = Transcript.find(transcript_id)

      #NOTE: this code is to test the functionality locally
      #      otherwise, since the file is not uploading to aws
      #      VoiceBase upload will not work as it cannot access
      #      the image url
      if Rails.env.development?
        res = Voicebase::Client.new.upload_media("https://slnsw-amplify.s3.amazonaws.com/collections_v2/snowymountain_bushfires/audio/mloh307-0001-0004-s002-m.mp3")
      else
        res = Voicebase::Client.new.upload_media(transcript.audio_url)
      end
      res = Voicebase::Client.new.upload_media(transcript.audio_url)
      status = JSON.parse res.body
      if status["errors"]
        Bugsnag.notify("Voicebase errors for transcript #{transcript_id} :  #{status["errors"]}")
      else
        transcript.update_column("voicebase_media_id", status["mediaId"])
      end
    end

    def self.check_progress(transcript_id)
      transcript = Transcript.find(transcript_id)
      # mark the record as processing, so that other processors will not
      # pick it up
      transcript.update_column("pickedup_for_voicebase_processing_at", Time.zone.now)
      res = Voicebase::Client.new.check_progress(transcript.voicebase_media_id)
      status = JSON.parse res.body
      if status["errors"]
        Bugsnag.notify("Voicebase errors for transcript #{transcript_id} :  #{status["errors"]}")
      else
        transcript.update_column("voicebase_status", status["progress"]["status"])
      end
    end

    def self.process_transcript(transcript_id)
      transcript = Transcript.find(transcript_id)

      if transcript.voicebase_status == "completed"
        str = get_transcript(transcript_id)
        imp = VoiceBase::ImportSrtTranscripts.new(project_id: ENV["PROJECT_ID"])
        imp.update_from_voicebase(transcript, str)
        transcript.update_column("voicebase_processing_completed_at", Time.zone.now)
      else
        # reset back for next time
        transcript.update_column("pickedup_for_voicebase_processing_at", nil)
      end
    end

    def self.get_transcript(transcript_id)
      transcript = Transcript.find(transcript_id)
      unless transcript.voicebase_media_id
        transcript.voicebase_upload
        return nil
      end

      res = Voicebase::Client.new.get_transcript(transcript.voicebase_media_id)

      if res.code == "200"
        res.body
      else
        Bugsnag.notify("Voicebase errors when reading transcript #{transcript_id}")
      end
    end
  end
end

