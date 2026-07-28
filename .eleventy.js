module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("style.css");
    eleventyConfig.addPassthroughCopy("script.js");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("logo.png");
    eleventyConfig.addPassthroughCopy("_redirects");
  
    eleventyConfig.addCollection("posts", function (collectionApi) {
      return collectionApi.getFilteredByGlob("pages/blog/*.md");
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