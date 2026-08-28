import {Page} from '@playwright/test'

export class loginpom{
    readonly page : Page;
    constructor(page : Page){
        this.page=page;
    }

    elements={
        email : () => this.page.locator("[data-qa='login-email']"),
        password : () => this.page.locator("[data-qa='login-password']"),
        loginbtn : () => this.page.getByRole('button',{name:'login'}),
        errormsg : () => this.page.getByText('Your email or password is incorrect!')
        }

    async login (email: string, pass:string){
        await this.elements.email().fill(email);
        await this.elements.password().fill(pass);
        await this.elements.loginbtn().click();
    }


}
