(function () {
  // browser.storage.local.clear();
  // browser.storage.local.set({
  //   vocab: [
  //     { src: "umbrella", dst: "ombrello", src_lang: "en", dst_lang: "it" },
  //     { src: "pizza", dst: "pizza", src_lang: "en", dst_lang: "it" },
  //     { src: "cake", dst: "torta", src_lang: "en", dst_lang: "it" },
  //     { src: "mobile", dst: "cellulare", src_lang: "en", dst_lang: "it" },
  //   ],
  // });

  const onError = (e) => {
    console.log(`Error: ${e}`);
  };

  const get_flag_url_from_lang = (lang) => {
    let country = lang == "en" ? "gb" : lang;
    return `https://www.countryflags.io/${country}/flat/32.png`;
  };

  const create_list_row = (entry_idx, vocab) => {
    let entry = vocab[entry_idx];
    var row = document.createElement("DIV");

    row.innerHTML = `
    <div class="flex-row">
      <div class="flex-small">
        <p>
        <span>
        <img src="${get_flag_url_from_lang(entry.src_lang)}">
        </span>
        <b>${entry.src}</b>
        </p>
      </div>
      <div class="flex-small">
        <p>
        <span>
        <img src="${get_flag_url_from_lang(entry.dst_lang)}">
        </span>${entry.dst}
        </p>
      </div>
      <div class="flex-small">
        <button class="round-button" style="border-color: #f44336; background-color: red">Delete</button>
      </div>
    </div>
    `;

    let del_button = row.getElementsByTagName("button")[0];
    del_callback = () => {
      console.log(vocab);
      vocab.splice(entry_idx, 1);
      browser.storage.local.set({ vocab: vocab });
      console.log(vocab);
      row.remove();
    };
    del_button.onclick = del_callback;

    return row;
  };

  const build_list = (storage) => {
    let vocab = storage.vocab;
    let words_div = document.getElementById("words_div");

    for (i = 0; i < vocab.length; ++i) {
      let row = create_list_row(i, vocab);
      words_div.appendChild(row);
    }
  };

  browser.storage.local.get(null).then(build_list, onError);
})();
