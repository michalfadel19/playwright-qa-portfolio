import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

const BACKPACK = 'sauce-labs-backpack';
const BIKE_LIGHT = 'sauce-labs-bike-light';

test.describe('Cart and checkout', () => {
  let inventory: InventoryPage;
  let checkout: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    inventory = new InventoryPage(page);
    checkout = new CheckoutPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await inventory.expectLoaded();
  });

  test('TC-CART-01: adding an item updates the cart badge', async () => {
    await inventory.addToCart(BACKPACK);
    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('TC-CART-02: adding two items shows both in the cart', async () => {
    await inventory.addToCart(BACKPACK);
    await inventory.addToCart(BIKE_LIGHT);
    await expect(inventory.cartBadge).toHaveText('2');
    await inventory.openCart();
    await expect(checkout.cartItems).toHaveCount(2);
  });

  test('TC-CART-03: removing an item clears the cart badge', async () => {
    await inventory.addToCart(BACKPACK);
    await inventory.removeFromCart(BACKPACK);
    await expect(inventory.cartBadge).toHaveCount(0);
  });

  test('TC-CHECKOUT-01: user can complete an order', async () => {
    await inventory.addToCart(BACKPACK);
    await inventory.openCart();
    await checkout.checkoutButton.click();
    await checkout.fillShippingInfo('Test', 'User', '49341');
    await checkout.finishButton.click();
    await checkout.expectOrderComplete();
  });

  test('TC-CHECKOUT-02: shipping form requires a first name', async ({ page }) => {
    await inventory.addToCart(BACKPACK);
    await inventory.openCart();
    await checkout.checkoutButton.click();
    await checkout.fillShippingInfo('', 'User', '49341');
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });
});
