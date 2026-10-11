import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-LOGIN-01: valid user can log in', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await new InventoryPage(page).expectLoaded();
  });

  test('TC-LOGIN-02: locked out user sees an error', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectError('this user has been locked out');
  });

  test('TC-LOGIN-03: wrong password shows an error', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await loginPage.expectError('do not match any user');
  });

  test('TC-LOGIN-04: empty username is rejected', async () => {
    await loginPage.login('', 'secret_sauce');
    await loginPage.expectError('Username is required');
  });

  test('TC-LOGIN-05: empty password is rejected', async () => {
    await loginPage.login('standard_user', '');
    await loginPage.expectError('Password is required');
  });

  test('TC-LOGIN-06: inventory page is blocked without logging in', async ({ page }) => {
    await page.goto('/inventory.html');
    await loginPage.expectError("You can only access '/inventory.html'");
  });
});
