function openMyPage() {
  console.log("injecting");
  browser.tabs.create({
    url: "/extension_pages/word_db.html",
  });
}

browser.browserAction.onClicked.addListener(openMyPage);
