import { Page } from "@playwright/test";
export class checkout{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    element ={
        placeorder : () => this.page.locator(".btn.btn-default.check_out")
    }
    async place_order (){
        await this.element.placeorder().click();
    }
}