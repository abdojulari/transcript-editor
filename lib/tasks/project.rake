require 'ejs'
require 'execjs'
require 'fileutils'
require 'json'
require 'redcarpet'

namespace :project do

  desc "Load project by key: Builds main index.html and project.js which contains all project data (metadata, pages, templates)"
  task :load, [:project_key, :scope] => :environment do |task, args|
    args.with_defaults project_key: 'sample'
    args.with_defaults scope: 'all'

    # Validate project
    project_path = Rails.root.join('project', args[:project_key], '/')
    if !File.directory?(project_path)
      puts "No project directory found for: #{args[:project_key]}"
      exit
    end

    # Get project
    project = get_project(args[:project_key])

    # Add pages (parse markdown -> html)
    pages = get_pages(args[:project_key])
    project['pages'] = pages

    # Write project data to file
    save_project(project)

    if args[:scope] == "all"

      # Copy assets
      copy_assets(args[:project_key])

      # Write layouts
      load_layouts(project, args[:project_key])

    end
  end

  def copy_assets(project_key)
    src_dir = Rails.root.join('project', project_key, 'assets/')
    dest_dir = Rails.root.join('public', 'project', 'assets/')

    # empty the destination dir
    FileUtils.rm_rf("#{dest_dir}.", secure: true)

    # copy file tree over
    FileUtils.copy_entry src_dir, dest_dir
    FileUtils.touch("#{dest_dir}.keep")
  end

  def get_pages(project_key)
    page_files = Rails.root.join('project', project_key, 'pages', '**/*.md')
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
    pages = {}

    Dir.glob(page_files).each do |page_file|
      content = File.read(page_file)
      html = markdown.render(content)
      pages[File.basename(page_file)] = html
    end

    return pages
  end

  def get_project(project_key)
    # Validate project file
    project_file = Rails.root.join('project', project_key, 'project.json')
    if !File.exist? project_file
      puts "Project json file is required: #{project_file}"
      exit
    end

    # Read project file
    project_file = File.read(project_file)

    # Parse project file
    JSON.parse(project_file)
  end

  def load_layouts(project, project_key)
    layout_files = Rails.root.join('project', project_key, 'layouts', '*.html')

    Dir.glob(layout_files).each do |layout_file|
      content = File.read(layout_file)
      compiled = EJS.evaluate(content, :project => project)
      target_file = Rails.root.join('public', File.basename(layout_file))
      File.open(target_file, 'w') { |file| file.write(compiled) }
    end

  end

  def save_project(project)
    json_string = project.to_json
    js_string = "window.PROJECT = #{json_string};"
    project_js_file = Rails.root.join('public', 'assets', 'js', 'project.js')
    File.open(project_js_file, 'w') { |file| file.write(js_string) }
  end

end
