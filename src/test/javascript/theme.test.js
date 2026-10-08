const { loadApp } = require('./setup/loadApp');

function theme(document) {
  return document.documentElement.getAttribute('data-theme');
}

function toggle(document) {
  return document.getElementById('theme-toggle');
}

beforeEach(() => {
  window.localStorage.clear();
});

describe('theme toggle', () => {
  test('AC-4: dark by default when nothing is stored, and the button offers the light theme', async () => {
    const { document } = await loadApp();
    expect(theme(document)).toBe('dark');
    expect(toggle(document).textContent).toBe('Light theme');
  });

  test('AC-1/AC-2: clicking switches between dark and light, and the label follows', async () => {
    const { document } = await loadApp();
    toggle(document).click();
    expect(theme(document)).toBe('light');
    expect(toggle(document).textContent).toBe('Dark theme');
    toggle(document).click();
    expect(theme(document)).toBe('dark');
    expect(toggle(document).textContent).toBe('Light theme');
  });

  test('AC-3: the choice is stored and restored on the next load', async () => {
    const first = await loadApp();
    toggle(first.document).click();
    expect(window.localStorage.getItem('ops-theme')).toBe('light');

    const second = await loadApp();
    expect(theme(second.document)).toBe('light');
    expect(toggle(second.document).textContent).toBe('Dark theme');
  });

  test('an unknown stored value is ignored and the default dark theme applies', async () => {
    window.localStorage.setItem('ops-theme', '"><script>alert(1)</script>');
    const { document } = await loadApp();
    expect(theme(document)).toBe('dark');
  });
});
