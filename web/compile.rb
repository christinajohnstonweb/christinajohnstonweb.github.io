require 'rubygems'

if ARGV[0].nil?
  puts "Please provide a Git commit comment."
else
  puts "Retrieving latest from repository..."
  `cd ../christinajohnstonweb.github.io/ && git pull`
  
  puts "Compiling the application..."
  `jekyll build`
  
  puts "Adding changes to the repository..."
  `cd ../christinajohnstonweb.github.io/ && git add -A`
  
  puts "Committing changes..."
  `cd ../christinajohnstonweb.github.io/ && git commit -m "#{ARGV[0]}"`

  
  puts "Pushing changes to the server..."
  `cd ../christinajohnstonweb.github.io/ && git push`
  
  puts "Updates pushed to production."  
end