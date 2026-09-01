import { test, expect } from '@playwright/test';

import { homepage } from '../../pages/home.page';
import { productpage } from '../../pages/productpage.page';


test.beforeEach(async ({ page }) => {

    await page.goto('/');

    const consentButton = page.getByRole('button', { name: 'Consent' });

    if (await consentButton.isVisible().catch(() => false)) {
        await consentButton.click();
    }
});


test('ajouter un produit au panier', async ({ page }) => {

    const h = new homepage(page);
    const products = new productpage(page);

    await h.goproduct();

    await products.addFirstProduct();

    await products.gotocart();

});