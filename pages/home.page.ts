import { Page } from '@playwright/test';

export class homepage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    elements = {
        clickloginbtn: () => this.page.getByRole('link', { name: 'Signup / Login' }),
        clickProduct: () => this.page.getByRole('link', { name: 'Products' })
    };

    async gotologin() {
        await this.elements.clickloginbtn().click();
    }

    async goproduct() {
        await this.elements.clickProduct().click();
    }
}