(() => {
  const STORAGE_KEY = 'llyric-theme-preference';
  const root = document.documentElement;
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const originalThemeColor = themeMeta?.getAttribute('content') || '';
  const parseColor = (value) => {
    if (!value) return null;
    const rgb = value.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/i);
    if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
    const hex = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (!hex) return null;
    let raw = hex[1];
    if (raw.length === 3) raw = raw.split('').map((c) => c + c).join('');
    return [parseInt(raw.slice(0, 2), 16), parseInt(raw.slice(2, 4), 16), parseInt(raw.slice(4, 6), 16)];
  };
  const isDark = (rgb) => rgb && ((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 < 128);
  const siteStartsDark = isDark(parseColor(getComputedStyle(document.body).backgroundColor) || parseColor(getComputedStyle(root).backgroundColor) || parseColor(originalThemeColor));
  const style = document.createElement('style');
  style.textContent = `#siteThemeToggle{position:fixed;right:14px;bottom:14px;z-index:2147483647;min-width:78px;height:40px;padding:0 13px;border:1px solid rgba(127,127,127,.35);border-radius:999px;background:rgba(24,24,28,.94);color:#fff;font:600 13px/1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 6px 20px rgba(0,0,0,.18);cursor:pointer;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}#siteThemeToggle:hover{transform:translateY(-1px)}#siteThemeToggle:focus-visible{outline:2px solid currentColor;outline-offset:2px}html.theme-inverted{filter:invert(1) hue-rotate(180deg)}html.theme-inverted img,html.theme-inverted picture,html.theme-inverted video,html.theme-inverted canvas,html.theme-inverted iframe,html.theme-inverted #siteThemeToggle{filter:invert(1) hue-rotate(180deg)}@media(max-width:600px){#siteThemeToggle{right:10px;bottom:10px;min-width:72px;height:38px;padding:0 11px}}`;
  document.head.appendChild(style);
  const button = document.createElement('button');
  button.id = 'siteThemeToggle'; button.type = 'button'; document.body.appendChild(button);
  let currentTheme = localStorage.getItem(STORAGE_KEY) || (siteStartsDark ? 'dark' : 'light');
  const applyTheme = (theme) => {
    currentTheme = theme === 'dark' ? 'dark' : 'light';
    root.classList.toggle('theme-inverted', (currentTheme === 'dark') !== siteStartsDark);
    root.style.colorScheme = currentTheme;
    button.textContent = currentTheme === 'dark' ? '☀ Light' : '☾ Dark';
    button.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    button.title = button.getAttribute('aria-label');
    if (themeMeta) themeMeta.setAttribute('content', currentTheme === 'dark' ? '#121318' : (originalThemeColor || '#f5f5f5'));
  };
  button.addEventListener('click', () => { const next = currentTheme === 'dark' ? 'light' : 'dark'; localStorage.setItem(STORAGE_KEY, next); applyTheme(next); });
  applyTheme(currentTheme);
})();
