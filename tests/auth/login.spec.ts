import  { test, expect } from "@playwright/test";
import { loginpom } from "../../pages/loginpom.page";
import users from '../../data/users.json';
import dotenv from 'dotenv';
dotenv.config();
test.beforeEach(async ({ page }) => {
  await page.goto('/login');
  const consentButton = page.getByRole('button', { name: 'Consent' });

  if (await consentButton.isVisible().catch(() => false)) {
    await consentButton.click();
  }
});

test('login valide',async({page})=>{
    const lp=new loginpom(page);
    await lp.login(process.env.VALID_USER_EMAIL!,process.env.VALID_USER_PASSWORD!);
    await expect(page.getByText('Logged in as Amal')).toBeVisible();
})

test('login invalide',async({page})=>{
    const lp=new loginpom(page);
    await lp.login(users.invalidUser.email,users.invalidUser.password);
    await expect(lp.elements.errormsg()).toBeVisible();

})