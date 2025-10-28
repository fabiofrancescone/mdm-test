document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const resultsList = document.getElementById("search-results");

  fetch("/data/search_data.json")
    .then(res => res.json())
    .then(pages => {
      const idx = lunr(function () {
        this.ref("url");
        this.field("title");
        this.field("content");

        pages.forEach(page => this.add(page));
      });

      searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim();
        resultsList.innerHTML = "";
        if (query === "") return;

        const results = idx.search(query);
        results.forEach(r => {
          const page = pages.find(p => p.url === r.ref);
          const li = document.createElement("li");
          li.innerHTML = `<a href="${page.url}">${page.title}</a>`;
          resultsList.appendChild(li);
        });
      });
    });
});
