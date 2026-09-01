import { test, expect } from '@playwright/test';

import { homepage } from '../../pages/home.page';
import { productpage } from '../../pages/productpage.page';
import { cart } from '../../pages/cart.page';
import { checkout } from '../../pages/checkout.page';
import { loginpom } from '../../pages/loginpom.page';


test.beforeEach(async ({ page }) => {

   await page.goto('/');

    const consentButton = page.getByRole('button', { name: 'Consent' });

    if (await consentButton.isVisible().catch(() => false)) {
        await consentButton.click();
    }

    const h = new homepage(page);
    const lp = new loginpom(page);

    await h.gotologin();

    await lp.login(
        process.env.VALID_USER_EMAIL!,
        process.env.VALID_USER_PASSWORD!
    );

    await expect(page.getByText('Logged in as Amal')).toBeVisible();
});


test('E2E test ', {tag:"@e2e"}, async ({ page }) => {

    const h = new homepage(page);
    const products = new productpage(page);
    const c = new cart(page);
    const co= new checkout(page);

    await h.goproduct();
    const nameonproductlist = await products.elements.firstProductName().textContent();
    const priceonproductlist = await products.elements.firstProductPrice().textContent();

    await products.addFirstProduct();
    
    await products.gotocart();    
    const nameoncart = c.element.prodname();
    const priceoncart =c.element.price();

    
    await expect(nameoncart).toContainText(nameonproductlist!);
    await expect(priceoncart).toContainText(priceonproductlist!);

    await c.gocheckout();

    await co.place_order();

});