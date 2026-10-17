// Run in the Codex browser REPL: await (await import(path)).smoke(appTab).
// This accepts the documented CUA tab API; no separate browser dependency is needed.
export async function smoke(tab) {
  const assert = (value, message) => { if (!value) throw new Error(message) }
  const read = fn => tab.playwright.evaluate(fn)
  await tab.playwright.getByRole('button', { name: 'Open shortcut menu', exact: true }).click()
  await tab.playwright.getByRole('combobox').fill('zzzz')
  assert(await read(() => document.querySelector('#command-results')?.textContent.includes('No matches')), 'Empty search feedback')
  await tab.playwright.getByRole('combobox').press('Escape')
  assert(await read(() => !document.querySelector('dialog').open && document.activeElement?.getAttribute('aria-label') === 'Open shortcut menu'), 'Escape restores focus')
  await tab.playwright.getByRole('button', { name: 'Open shortcut menu', exact: true }).click()
  await tab.playwright.getByRole('combobox').fill('Toggle light')
  await tab.playwright.getByRole('combobox').press('Enter')
  assert(await read(() => !document.querySelector('dialog').open), 'Enter selects without reopening dialog')
  
  assert(await read(() => !!document.querySelector('.portfolio.light')), 'Light theme applies')
  await tab.playwright.getByRole('button', { name: 'Switch to dark theme', exact: true }).click()
  assert(await read(() => !document.querySelector('.draft-guides, .show-grid, pattern')), 'Decorative grids are removed')
  await tab.playwright.locator('#samson summary').click()
  assert(await read(() => document.querySelector('#samson details').open), 'Engineering notes expand')
  await tab.playwright.locator('#samson summary').click()
  await tab.playwright.getByRole('button', { name: 'operations', exact: true }).click()
  assert(await read(() => document.querySelector('#helmet-cartel img').getAttribute('src').endsWith('operations.png')), 'Operations image switches')
  await tab.getScreenshot({emit:false});
  await tab.playwright.getByRole('button', { name: 'storefront', exact: true }).click()
  assert(await read(() => document.documentElement.scrollWidth <= innerWidth), 'No horizontal overflow')
  assert(await read(() => document.querySelectorAll('a[target="_blank"]').length === 2), 'Both supplied project links present')
  await tab.playwright.getByRole('link', { name: 'dcd. home', exact: true }).click()
  assert(await read(() => document.querySelectorAll('.statement-line').length === 2 && Array.from(document.querySelectorAll('.statement-line')).every(line => line.scrollWidth <= line.clientWidth + 1)), 'Hero has exactly two unwrapped lines')
  assert(await read(() => !document.querySelector('.grid-toggle') && !document.querySelector('.command-button')), 'Removed header controls stay absent')
  assert(await read(() => matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('lenis')), 'Smooth scrolling initializes outside reduced motion')
  assert(await read(() => !document.querySelector('.hero-meta,.title-measure')), 'Removed hero labels stay absent')
  assert(await read(() => document.querySelector('.header .nav-ruler') && getComputedStyle(document.querySelector('.header')).position === 'sticky'), 'Ruler belongs to sticky navbar')
  assert(await read(() => document.querySelectorAll('.approach-line').length === 3 && document.querySelector('.approach-copy').textContent.length > 400), 'Approach has staggered lines and expanded copy')
  assert(await read(() => Math.abs(document.querySelector('.hero-content').offsetTop + document.querySelector('.hero-content').offsetHeight - document.querySelector('.hero-footer').offsetTop) < 2), 'Hero content meets its bottom footer')
  return 'PASS: 16 menu, keyboard, theme, grid removal, disclosure, image, layout and hero checks'
}



