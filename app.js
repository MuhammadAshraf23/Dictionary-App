let form = document.querySelector("form");
let result = document.querySelector("#result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await getWord(form.elements[0].value);
});

let getWord = async (words) => {
  let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${words}`);
  let data = await response.json();
  
  const antonyms = data[0].meanings[0].definitions[0].antonyms;
  const antonymsList = antonyms && antonyms.length > 0 ? antonyms.map(antonym => `<li>${antonym}</li>`).join("") : "Not Found";
  
  result.innerHTML = `
    <h2><strong>Word:</strong> ${data[0].word}</h2>
    <p>${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning:</strong> ${data[0].meanings[0].definitions[0].definition || "Not Found"}</p>
    <p><strong>Example:</strong> ${data[0].meanings[0].definitions[0].example || "Not Found"}</p>
    <p><strong>Antonyms:</strong></p>
    <ul>
      ${antonymsList !== "Not Found" ? antonymsList : "Not Found"}
    </ul>
  `;
};

