module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("style.css");
    eleventyConfig.addPassthroughCopy("script.js");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("_redirects");
  
    return {
      dir: {
        input: ".",
        output: "_site"
      }
    };
  };