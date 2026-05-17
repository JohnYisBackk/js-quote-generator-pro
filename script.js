"use strict";

// ======================================================
// SELECT ELEMENTS
// ======================================================

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const quoteContent = document.getElementById("quoteContent");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

// ======================================================
// API SETTINGS
// ======================================================

const apiUrl = "https://dummyjson.com/quotes/random";

// ======================================================
// GET QUOTE FUNCTION
// ======================================================

async function getQuote() {
  loading.classList.remove("hidden");
  errorMessage.classList.add("hidden");

  quoteContent.classList.add("hidden-animation");

  generateBtn.textContent = "Loading...";
  generateBtn.disabled = true;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch quote.");
    }

    const data = await response.json();

    const delay = Math.floor(Math.random() * 500) + 1000;

    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });

    loading.classList.add("hidden");

    quoteText.textContent = data.quote;
    quoteAuthor.textContent = `— ${data.author}`;

    requestAnimationFrame(() => {
      quoteContent.classList.remove("hidden-animation");
    });
  } catch (error) {
    loading.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    console.error(error);
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Quote";
  }
}

// ======================================================
// COPY QUOTE FUNCTION
// ======================================================

async function copyQuote() {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;

  await navigator.clipboard.writeText(text);

  copyBtn.textContent = "Copied ✓";

  setTimeout(() => {
    copyBtn.textContent = "Copy Quote";
  }, 1500);
}

// ======================================================
// BUTTON CLICK EVENT
// ======================================================

generateBtn.addEventListener("click", getQuote);

copyBtn.addEventListener("click", copyQuote);

// ======================================================
// INITIAL LOAD
// ======================================================

getQuote();
