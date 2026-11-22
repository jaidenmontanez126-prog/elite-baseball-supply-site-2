const MarkdownIt = require("markdown-it");
function preserveBlankLines(markdown) {
  return markdown.replace(/\n{3,}/g, (match) => {
    const extraBlankLines = match.length - 2;
    const spacers = '<div class="blank-line"></div>\n'.repeat(extraBlankLines);
    return `\n\n${spacers}\n`;
  });
}
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("style.css");
    eleventyConfig.addPassthroughCopy("robots.txt");
    eleventyConfig.ignores.add("test-post.html");
    eleventyConfig.addFilter("categoryPosts", (posts, category) => posts.filter(post => {
      const postCategory = post.data.category === "Gloves" ? "Fielding Gloves" : post.data.category;
      if (category === "Fan") return !["Bats", "Fielding Gloves", "Batting Gloves"].includes(postCategory);
      return postCategory === category;
    }));
    eleventyConfig.addFilter("isoDate", date => new Date(date).toISOString());
    eleventyConfig.addTransform("affiliateLinks", function(content) {
      if (this.page.outputPath && this.page.outputPath.endsWith(".html")) return content.replace(/<a\b([^>]*href="https?:\/\/[^"]*(?:93n6tx|kqzyfj|dpbolvw|anrdoezrs|jdoqocy|tkqlhce)[^"]*"[^>]*)>/gi, (match, attrs) => /\brel=/.test(attrs) ? match : `<a${attrs} rel="sponsored noopener">`);
      return content;
    });
    eleventyConfig.addPassthroughCopy("script.js");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("logo.png");
    eleventyConfig.addPassthroughCopy("_redirects");
    eleventyConfig.addFilter("absoluteUrl", function (url) {
      if (!url) return "";
      return new URL(url, "https://elitebaseballsupply.com").href;
    });
    eleventyConfig.addCollection("posts", function (collectionApi) {
      return collectionApi.getFilteredByGlob("pages/blog/*.md");
    });
    eleventyConfig.addFilter("dateDisplay", (date) => {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
      }).format(new Date(date));
    });
    return {
      dir: {
        input: ".",
        output: "_site"
      },
      htmlTemplateEngine: "njk",
      markdownTemplateEngine: "njk"
    };
  };