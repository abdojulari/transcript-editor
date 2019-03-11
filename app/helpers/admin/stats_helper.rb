require 'filesize'

module Admin::StatsHelper

  def display_name(key)
    key.to_s.humanize
  end

  def number_to_read(number)
    number_to_human(number, :format => '%n%u', :units => { :thousand => 'K+'  })
  end

  def link_to_line(line, transcript)
    time = time_display(line.start_time)
    content_tag :a, href: "#{transcript.path}?t=#{time}" do
      time
    end
  end

  def as_filesize(number)
    Filesize.from(number).pretty
  rescue ArgumentError
    '0'
  end

end
