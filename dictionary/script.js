const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  const word = form.elements[0].value;
  await getWordInfo(word);
});

const getWordInfo = async (word) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();

    let definitions = data[0].meanings[0].definitions[0];
    resultDiv.innerHTML = `<h2><strong>Word:</strong>${data[0].word}</h2><p>${
      data[0].meanings[0].partOfSpeech
    }</p>
    <p><strong>Meaning:</strong>${
      definitions.definition
    }</p><p><strong>Use Case:</strong>${
      definitions.example == undefined ? "not found" : definitions.example
    }</p>`;
    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target ="_blank">READ MORE</a></div>`;
  } catch (error) {
    resultDiv.innerHTML = `<p>Sorry, the word you searched could not be found</p>`;
    console.error(error);
  }
};
