/*
* @jest-environment node
*/

import puppeteer from 'puppeteer';

jest.setTimeout(30000);

describe('calendar', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    page = await browser.newPage();
    await page.goto('http://localhost:9000');
  });

  afterEach(async () => {
    await browser.close();
  });

  test('calendar should render on page start', async () => {
    await page.waitForSelector('.day');
  });

  test('calendar should highlight today', async () => {
    await page.waitForSelector('.today');
  });

  test('Dates before today should not be active', async () => {
    await page.waitForSelector('.outdated');
  });

  test('Month switching should be implemented', async () => {
    const loadingTitle = await page.$eval('.title', (el) => el.textContent);
    const nextBtn = '.next';

    await page.click(nextBtn);

    const changedTitle = await page.$eval('.title', (el) => el.textContent);

    expect(changedTitle).not.toBe(loadingTitle);
  });

  test('block back should be open if checkbox checked', async () => {
    const checkbox = ('.checkbox');

    await page.click(checkbox);

    const unvisible = await page.$eval('.back', (el) => el.classList.contains('hidden'));
    expect(unvisible).toBeFalsy();
  });

  test('block back should be close if checkbox not checked', async () => {
    const checkbox = ('.checkbox');

    await page.click(checkbox);
    await page.click(checkbox);

    const unvisible = await page.$eval('.back', (el) => el.classList.contains('hidden'));
    expect(unvisible).toBeTruthy();
  });

  test('Selected date there must be no earlier than today\'s date (browser time)', async () => {
    const outdatedDay = '.outdated';

    await page.click(outdatedDay);

    const value = await page.$eval('.there-input', (el) => el.value);

    expect(value).toBe('');
  });

  test('the date there should be successfully selected', async () => {
    const available = '.available';

    await page.click(available);

    const clickedDay = await page.$eval(available, (el) => el.dataset.date);
    const value = await page.$eval('.there-input', (el) => el.value);

    expect(value).toBe(clickedDay);
  });
});
