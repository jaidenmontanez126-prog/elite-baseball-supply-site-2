document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("reviews-container");
  
    if (!container) return;
  
    try {
      const response = await fetch("/pages/blog/index.json");
      const posts = await response.json();
  
      container.innerHTML = "";
  
      posts.forEach(post => {
        const card = document.createElement("a");
        card.href = post.url;
        card.className = "review-card";
  
        card.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.excerpt || ""}</p>
        `;
  
        container.appendChild(card);
      });
    } catch (err) {
      console.error(err);
      container.innerHTML = "<p>No reviews available.</p>";
    }
  });