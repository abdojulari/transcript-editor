class TranscriptLineStatus < ApplicationRecord

  def self.allCached
    Rails.cache.fetch("transcript_line_statuses", expires_in: 1.day) do
      TranscriptLineStatus.all
    end
  end

end
