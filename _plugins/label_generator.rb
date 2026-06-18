module Jekyll
  class LabelPage < Page
    def initialize(site, base, label)
      @site = site
      @base = base
      @dir  = File.join("label", Jekyll::Utils.slugify(label))
      @name = "index.html"

      process(@name)
      read_yaml(File.join(base, "_layouts"), "label.html")

      @data["label"] = label
      @data["title"] = "Posts labeled: #{label}"
      @data["posts"] = site.posts.docs.select { |p|
        Array(p.data["labels"]).include?(label)
      }.sort_by { |p| -p.date.to_i }
    end
  end

  class LabelPageGenerator < Generator
    safe true

    def generate(site)
      labels = site.posts.docs
        .flat_map { |p| Array(p.data["labels"]) }
        .uniq
        .reject(&:nil?)

      labels.each do |label|
        site.pages << LabelPage.new(site, site.source, label)
      end
    end
  end
end
