document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("reviews-container");
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    
    if (menuToggle && mainNav) {
      menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");
        document.body.classList.toggle("menu-open", mainNav.classList.contains("open"));
        menuToggle.textContent = mainNav.classList.contains("open") ? "✕" : "☰";
      });
      document.addEventListener("click", (e) => {
        if (
          mainNav.classList.contains("open") &&
          !mainNav.contains(e.target) &&
          !menuToggle.contains(e.target)
        ) {
          mainNav.classList.remove("open");
          document.body.classList.remove("menu-open");
          menuToggle.textContent = "☰";
        }
      });
    }
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