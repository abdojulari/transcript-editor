module TranscriptConverter
  class TranscriptFiles
    attr_reader :path

    def initialize(path)
      raise 'TranscriptFile requires a valid path to create' unless File.exists?(path.to_s)
      @path = path
    end

    def files
      @files ||= single_file
      @files ||= files_from_dir
      @files ||= []
    end

    private

    # return an array containing the one and only file pointed to by #path
    def single_file
      [ File.new(path) ] if File.file?(path)
    end

    def files_from_dir
      Dir.glob("#{path}/**/*").select { |entry| File.file? entry }.map{ |entry| File.new(entry) } if File.directory?(path)
    end

  end
end
