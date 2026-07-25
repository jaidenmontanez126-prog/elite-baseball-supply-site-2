const fs = require("fs");
const path = require("path");

const postsFolder = path.join(__dirname, "pages", "blog");
const outputFile = path.join(postsFolder, "index.json");

if (!fs.existsSync(postsFolder)) {
  fs.mkdirSync(postsFolder, { recursive: true });
}

const files = fs
  .readdirSync(postsFolder)
  .filter((file) => file.endsWith(".md"));

const posts = files.map((file) => {
  const content = fs.readFileSync(path.join(postsFolder, file), "utf8");

  const getField = (field) => {
    const match = content.match(new RegExp(`^${field}:\\s*["']?(.*?)["']?$`, "m"));
    return match ? match[1].trim() : "";
  };

  return {
    title: getField("title"),
    excerpt: getField("excerpt"),
    url: `/pages/blog/${file}`
  };
});

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));

console.log("Created pages/blog/index.json");