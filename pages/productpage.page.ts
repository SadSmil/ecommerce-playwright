import { Page } from '@playwright/test';

export class productpage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    elements = {
        firstProductName: () => this.page.locator('.productinfo.text-center p').first(),

        firstProductPrice: () => this.page.locator('.productinfo.text-center h2').first(),

        firstAddToCart: () =>this.page.locator('.btn.btn-default.add-to-cart').first(),

        viewCart: () =>this.page.getByRole('link', { name: 'View Cart' })

    };

    async addFirstProduct() {
        await this.elements.firstAddToCart().click();
    }

    async gotocart() {
        await this.elements.viewCart().click();
    }
}