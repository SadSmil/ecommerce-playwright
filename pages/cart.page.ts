import {Page} from "@playwright/test"

export class cart {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    element={
        prodname : () => this.page.locator('#cart_info_table tbody .cart_description h4 a'),
        price : () => this.page.locator('#cart_info_table tbody .cart_price'),
        proceedcheckout : () => this.page.locator(".btn.btn-default.check_out")
        }

    async gocheckout(){
        await this.element.proceedcheckout().click();
    }

}