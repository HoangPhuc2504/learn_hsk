function loadSharedHeader() {
  const placeholder = document.getElementById('shared-header');
  if (!placeholder) return;

  const rootPath = placeholder.dataset.root || './';
  const headerUrl = `${rootPath}header.html`;

  fetch(headerUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Unable to load shared header from ${headerUrl}`);
      }
      return response.text();
    })
    .then((html) => {
      const replaced = html.replace(/\[\[ROOT\]\]/g, rootPath);
      placeholder.innerHTML = replaced;
    })
    .catch((error) => {
      console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', loadSharedHeader);
