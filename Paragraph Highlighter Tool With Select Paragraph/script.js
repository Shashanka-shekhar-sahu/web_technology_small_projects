
  const wordPool = [
    "javascript", "html", "css", "web", "design", "frontend", "backend", "server", "client", "database",
    "code", "function", "variable", "loop", "array", "object", "node", "react", "vue", "angular",
    "developer", "debug", "syntax", "framework", "style", "logic", "event", "listener", "api", "json",
    "data", "component", "dynamic", "static", "element", "tag", "attribute", "value", "condition", "boolean"
  ];

  function getRandomWords(count) {
    let result = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * wordPool.length);
      result.push(wordPool[randomIndex]);
    }
    return result.join(" ") + ".";
  }

  function addParagraph() {
    let text = document.getElementById("paraInput").value.trim();
    if (text === "") return;

    createParagraph(text);
    document.getElementById("paraInput").value = "";
    highlightText();
  }

  function addRandomParagraph() {
    const randomParagraph = getRandomWords(20);
    createParagraph(randomParagraph);
    highlightText();
  }

  function createParagraph(text) {
    const container = document.getElementById("paragraphContainer");
    const p = document.createElement("p");
    p.className = "paragraph";
    p.innerText = text;

    // Add click to select/deselect paragraph
    p.addEventListener("click", function () {
      this.classList.toggle("selected");
      highlightText(); // Update highlight based on selection
    });

    container.appendChild(p);
  }

  function highlightText() {
    const input = document.getElementById("searchInput").value.trim();
    const allParagraphs = document.querySelectorAll(".paragraph");
    const selectedParagraphs = document.querySelectorAll(".paragraph.selected");

    const targetParagraphs = selectedParagraphs.length > 0 ? selectedParagraphs : allParagraphs;

    allParagraphs.forEach(p => {
      // Reset to plain text
      p.innerHTML = p.innerText;
    });

    if (input === "") return;

    const regex = new RegExp(`(${input})`, "gi");

    targetParagraphs.forEach(p => {
      const originalText = p.innerText;
      const highlighted = originalText.replace(regex, '<span class="highlight">$1</span>');
      p.innerHTML = highlighted;
    });
  }

