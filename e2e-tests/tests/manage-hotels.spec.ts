import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = 'http://localhost:5173/';

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    // get the sign in button
    await page.getByRole('link', { name: 'Sign In' }).click();

    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

    // Fill in the form
    await page.locator('[name=email]').fill('admin_e2e_test@gmail.com');
    await page.locator('[name=password]').fill('password');

    // Click submit button
    await page.getByRole('button', { name: 'Login' }).click();

    // Expect the result
    await expect(page.getByText('Sign in Successful!')).toBeVisible();
});

test('should allow user to add a hotel', async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill('Test Hotel');
    await page.locator('[name="city"]').fill('Test City');
    await page.locator('[name="country"]').fill('Test Country');
    await page
        .locator('[name="description"]')
        .fill('This is a test description');
    await page.locator('[name="pricePerNight"]').fill('100');
    await page.selectOption('select[name="starRating"]', '3');

    await page.getByText('Budget').click();

    await page.getByLabel('Free Wifi').check();
    await page.getByLabel('Parking').check();

    await page.locator('[name="adultCount"]').fill('2');
    await page.locator('[name="childCount"]').fill('1');

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, 'files', 'test-img-1.jpg'),
        path.join(__dirname, 'files', 'test-img-2.jpg')
    ]);

    await page.getByRole('button', { name: 'Save ' }).click();
    await expect(page.getByText('Hotel Saved!')).toBeVisible();
});

test('should display hotels', async ({ page }) => {
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText('Add Hotel Test Name')).toBeVisible();
    await expect(page.getByText('Add Hotel Test Description')).toBeVisible();
    await expect(
        page.getByText('Add Hotel Test City, Add Hotel Test Country')
    ).toBeVisible();
    await expect(
        page.getByText('Add Hotel Test City, Add Hotel Test Country')
    ).toBeVisible();
    await expect(page.getByText('Family')).toBeVisible();
    await expect(page.getByText('$1 per night')).toBeVisible();
    await expect(page.getByText('1 adults, 1 children')).toBeVisible();
    await expect(page.getByText('5 star rating')).toBeVisible();

    await expect(
        page.getByRole('link', { name: 'View Details' })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add Hotel' })).toBeVisible();
});
