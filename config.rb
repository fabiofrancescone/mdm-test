set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true

# Generate search JSON from all pages
ready do
  search_data = sitemap.resources.select { |p|
    p.path.end_with?(".html") && !p.path.start_with?("404")
  }.map { |p|
    {
      title: p.data.title || p.path,
      url: "/" + p.path,
      content: p.render(layout: false).gsub(/<[^>]*>/, '') # strip HTML tags
    }
  }

  File.open("source/data/search_data.json", "w") do |f|
    f.write(JSON.pretty_generate(search_data))
  end
end


