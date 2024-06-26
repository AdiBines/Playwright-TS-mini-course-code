import { test } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import { ErrorMessages } from "../../helpers/ErrorMessages";
import ApplicationURL from "../../helpers/ApplicationURL";

//טסט לבדיקה של התחברויות לא מוצלחות 

test.describe("Negative Login Scenarios", () => { //describe-מאגד מספר טסטסים מאותה קבוצה תחתיו
    
    let loginPage: LoginPage;  //נגדיר אותו בתור משתנה גלובלי 

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page)  //אתחול בשביל כל הטסטים
    })

    test("Login with locked_out_user", async({page}) => {
        await loginPage.loginToApplication(process.env.LOCKED_OUT_USER);
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_LOCKED_USER);
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL)
    })

    test("Login with incorrect username", async({page}) => {
        await loginPage.loginToApplication("useruser");
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS)
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL)
    })

    test("Login with incorrect password", async({page}) => {
        await loginPage.loginToApplication(process.env.STANDARD_USER, "blablabla");
        await loginPage.validateErrorMessage(ErrorMessages.LOGIN_WITH_INCORRECT_CREDENTIALS);
        await loginPage.validatePageUrl(ApplicationURL.BASE_URL)
    })
})