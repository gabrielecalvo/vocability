(function () {
  const get_translations = async (from_lang, to_lang, word) => {
    const response = await fetch(
      `https://www.wordreference.com/${from_lang}${to_lang}/${word}`
    );
    let text = await response.text();
    const regex = /<td class="ToWrd">(.*)<em/;
    let translations = text.match(regex);
    console.log("text", text);
    console.log("inside", translations);
    return translations;
  };

  const wordseach_input = document.getElementById("wordseach_input");
  console.log(wordseach_input);

  wordseach_input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      console.log("The term searched for was " + wordseach_input.value);
      translations = get_translations("en", "it", "umbrella");
      console.log("outside", translations);
    }
  });
})();
