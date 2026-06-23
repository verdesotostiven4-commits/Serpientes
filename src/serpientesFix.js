const hiddenFamilies = new Set(['Tropidophiidae', 'Typhlopidae', 'Leptotyphlopidae', 'Anomalepididae']);

const familyImages = {
  Elapidae: 'https://multimedia20stg.blob.core.windows.net/especiesreduced/16962013_01_31_32253.jpg',
  Colubridae: 'https://multimedia20stg.blob.core.windows.net/especiesreduced/img_2920.jpg',
  Boidae: 'https://multimedia20stg.blob.core.windows.net/especiesreduced/boa-imperator_1_dq.jpg',
  Viperidae: 'https://multimedia20stg.blob.core.windows.net/especiesreduced/rub__n-d_-jarr__n-e__dsc1595-copia.jpg',
  Aniliidae: 'https://multimedia20stg.blob.core.windows.net/especiesreduced/3098Anilius_scytale_principal.jpg'
};

function titleOfCard(card) {
  return card.querySelector('.cardTop strong')?.textContent?.trim();
}

function titleOfModal(modal) {
  return modal.querySelector('h2')?.textContent?.trim();
}

function makeImage(family, modal = false) {
  const src = familyImages[family];
  if (!src) return null;
  const box = document.createElement('div');
  box.className = modal ? 'familyImage familyImageModal' : 'familyImage';
  const img = document.createElement('img');
  img.src = src;
  img.alt = `Imagen representativa de ${family}`;
  img.loading = 'lazy';
  img.referrerPolicy = 'no-referrer';
  box.appendChild(img);
  return box;
}

function applyFixes() {
  document.querySelectorAll('.familyCard').forEach(card => {
    const family = titleOfCard(card);
    if (hiddenFamilies.has(family)) {
      card.remove();
      return;
    }
    if (!card.querySelector('.familyImage')) {
      const img = makeImage(family);
      const small = card.querySelector('small');
      if (img && small) small.insertAdjacentElement('beforebegin', img);
    }
  });

  const modal = document.querySelector('.modal');
  if (modal && !modal.querySelector('.familyImageModal')) {
    const family = titleOfModal(modal);
    if (hiddenFamilies.has(family)) {
      document.querySelector('.close')?.click();
      return;
    }
    const img = makeImage(family, true);
    const common = modal.querySelector('.familyCommon');
    if (img && common) common.insertAdjacentElement('afterend', img);
  }

  const stat = document.querySelector('.stats div:first-child b');
  if (stat) stat.textContent = '5';
}

const observer = new MutationObserver(applyFixes);
window.addEventListener('DOMContentLoaded', () => {
  applyFixes();
  observer.observe(document.body, { childList: true, subtree: true });
});
setTimeout(applyFixes, 300);
setTimeout(applyFixes, 1200);
