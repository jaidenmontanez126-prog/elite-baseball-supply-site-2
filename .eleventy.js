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