const tabs = [...document.querySelectorAll('[role="tab"]')];

function activateTab(nextTab) {
  for (const tab of tabs) {
    const selected = tab === nextTab;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
  }
}

for (const tab of tabs) {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(tabs.indexOf(tab) + direction + tabs.length) % tabs.length];
    activateTab(next);
    next.focus();
  });
}

document.querySelector('.menu-button').addEventListener('click', (event) => {
  const button = event.currentTarget;
  closeHeaderPanels(null);
  const open = button.getAttribute('aria-expanded') === 'true';
  document.getElementById(button.getAttribute('aria-controls')).hidden = open;
  button.setAttribute('aria-expanded', String(!open));
  button.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
});

document.querySelectorAll('.menu-panel a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('.menu-panel').hidden = true;
    const button = document.querySelector('.menu-button');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open menu');
  });
});

const searchButton = document.querySelector('.search-button');
const languageButton = document.querySelector('.language-button');
const searchPanel = document.querySelector('#header-search');
const languagePanel = document.querySelector('#language-menu');
const menuButton = document.querySelector('.menu-button');

function closeHeaderPanels(except) {
  if (except !== 'search') {
    searchPanel.hidden = true;
    searchButton.setAttribute('aria-expanded', 'false');
  }
  if (except !== 'language') {
    languagePanel.hidden = true;
    languageButton.setAttribute('aria-expanded', 'false');
  }
}

menuButton.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  if (willOpen) closeHeaderPanels(null);
});

searchButton.addEventListener('click', () => {
  const open = searchButton.getAttribute('aria-expanded') === 'true';
  if (!open) document.querySelector('.menu-panel').hidden = true;
  closeHeaderPanels(open ? null : 'search');
  searchPanel.hidden = open;
  searchButton.setAttribute('aria-expanded', String(!open));
  if (!open) searchPanel.querySelector('input').focus();
});

languageButton.addEventListener('click', () => {
  const open = languageButton.getAttribute('aria-expanded') === 'true';
  if (!open) document.querySelector('.menu-panel').hidden = true;
  closeHeaderPanels(open ? null : 'language');
  languagePanel.hidden = open;
  languageButton.setAttribute('aria-expanded', String(!open));
});

languagePanel.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', () => {
    languagePanel.hidden = true;
    languageButton.setAttribute('aria-expanded', 'false');
    languageButton.setAttribute('aria-label', `Language selected: ${button.textContent}`);
  });
});
searchPanel.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchPanel.querySelector('input').value.trim().toLowerCase();
  const match = [...document.querySelectorAll('main h1, main h2, main h3, main a')].find((item) => item.textContent.toLowerCase().includes(query));
  if (match && query) {
    searchPanel.hidden = true;
    searchButton.setAttribute('aria-expanded', 'false');
    match.scrollIntoView({behavior: 'smooth', block: 'center'});
  }
});

const mapMarker = document.querySelector('.map-marker');
const mapMarkerControl = document.querySelector('.map-marker-control');
mapMarker.addEventListener('click', () => {
  const active = mapMarker.getAttribute('aria-expanded') === 'true';
  mapMarker.setAttribute('aria-expanded', String(!active));
  mapMarker.setAttribute('aria-label', active ? 'Show dealer location actions' : 'Hide dealer location actions');
  mapMarkerControl.classList.toggle('is-active', !active);
});
