import { Locator, Page, expect, test } from "@playwright/test";

//יכיל את כל הפונקציונליות הנדרשת
//הוא יוריש ל-loginPage + productsPage

export abstract class BasePage {  //לא ניתן ליצור מופעים שלו - absrtact

    constructor(protected page: Page) {

    }

    public async validatePageUrl(url: string) {
        await test.step(`Validating that a correct value of URL is ${url}`, async () => {
            await expect(this.page).toHaveURL(url)
        })
    }

    public async validateTitle(title: string) {
        await this.validateElementText(this.page.locator('[class="title"]'), title);

    }

    protected async validateElementText(element: Locator, expectedText: string) {
        await test.step(`Validating that a correct elemet text is  ${expectedText}`, async () => {
            await expect(element).toContainText(expectedText);
        });
    }

    protected async clickElement(element: Locator) {
        await test.step(`Clicking the '${element}' element`, async() => {
            await element.click();
        })
    }

    protected async fillText(element: Locator, textToFill: string) {
        await test.step(`Filling '${textToFill}' into the '${element}' element`, async() => {
            await element.fill(textToFill);
        })
    }



}


