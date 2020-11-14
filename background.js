browser.menus.create({
  id: "save-to-vocability",
  title: "Save Word Translation",
  // contexts: ["link"],
});

browser.menus.onClicked.addListener((info, tab) => {
  if (
    info.menuItemId === "save-to-vocability" &&
    info.pageUrl.match(".wordreference.com")
  ) {
    console.log(info);
    console.log(tab);

    const update_vocab = (vocab_storage) => {
      let vocab = vocab_storage.vocab;
      let url_parts = info.pageUrl.split("/");

      let new_langs = url_parts.slice(-2)[0];
      let src_lang = new_langs.slice(0, 2);
      let dst_lang = new_langs.slice(2);

      let new_src = url_parts.slice(-1)[0];
      let new_dst = info.selectionText;

      vocab.push({
        src: new_src,
        dst: new_dst,
        src_lang: src_lang,
        dst_lang: dst_lang,
      });
      browser.storage.local.set({ vocab: vocab });
    };

    browser.storage.local.get("vocab").then(update_vocab, (e) => {
      alert(e);
    });
  }
});
