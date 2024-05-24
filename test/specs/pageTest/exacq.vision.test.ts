const signInPage = require("../../pageobjects/exacqvision.login.page");
const searchPage = require("../../pageobjects/exacqvision.search.page");
const serverPage = require("../../pageobjects/exacqvision.server.page");
const expectchai = require("chai").expect;
const allureReporter = require("@wdio/allure-reporter");
const exacqTestData = require("../../testData/exacqvision_testdata");
const pageCommonUtils = require("../../utils/commonUtils");

describe('Exacq Vision Enterprise Manager Test Suite', function(){
    
    let actualTitleText: string;
    let invalidLoggedInText: string;
    let actualuserNameText: string;

    it('Exacq Vision url Login without username and password inputs', async() =>{
        allureReporter.addFeature('Login without username and password inputs');
        await pageCommonUtils.open();
        await pageCommonUtils.waitForTitleVerify(await browser.getTitle(),exacqTestData.loginPageTitle,exacqTestData.setTimeout,exacqTestData.loginPageTitleErrorMessage);
        actualTitleText = await browser.getTitle();
        expectchai(actualTitleText).to.equals(exacqTestData.loginPageTitle);
        await signInPage.enterCredentials(exacqTestData.inValidEmptyUsername,exacqTestData.inValidEmptyPassWord);
        invalidLoggedInText = await signInPage.verifyInvalidCredMsg();
        console.log(await signInPage.verifyInvalidCredMsg());
        expectchai(invalidLoggedInText).to.equals(exacqTestData.loginPageInvalidAuthMsg);

    });

    it("Exacq Vision url Login with only valid username", async function () {
        allureReporter.addFeature('Login with only valid username');
        await pageCommonUtils.waitForTitleVerify(await browser.getTitle(),exacqTestData.loginPageTitle,exacqTestData.setTimeout,exacqTestData.loginPageTitleErrorMessage);
        actualTitleText = await browser.getTitle();
        expectchai(actualTitleText).to.equals(exacqTestData.loginPageTitle);
        await signInPage.enterCredentials(exacqTestData.validUsername,exacqTestData.inValidEmptyPassWord);
        invalidLoggedInText = await signInPage.verifyInvalidCredMsg();
        console.log(await signInPage.verifyInvalidCredMsg());
        expectchai(invalidLoggedInText).to.equals(exacqTestData.loginPageInvalidAuthMsg);
    });

    it('Exacq Vision url Submit valid username and invalid password', async function () {
        allureReporter.addFeature('Submit valid username and invalid password');
        await pageCommonUtils.waitForTitleVerify(await browser.getTitle(),exacqTestData.loginPageTitle,exacqTestData.setTimeout,exacqTestData.loginPageTitleErrorMessage);
        actualTitleText = await browser.getTitle();
        expectchai(actualTitleText).to.equals(exacqTestData.loginPageTitle);
        await signInPage.enterCredentials(exacqTestData.validPassword,exacqTestData.inValidPassword);
        invalidLoggedInText = await signInPage.verifyInvalidCredMsg();
        console.log(await signInPage.verifyInvalidCredMsg());
        expectchai(invalidLoggedInText).to.equals(exacqTestData.loginPageInvalidAuthMsg);
    });

    it('Exacq Vision url Submit valid username and valid password', async function () {
        allureReporter.addFeature('Submit valid username and valid password');
        await pageCommonUtils.waitForTitleVerify(await browser.getTitle(),exacqTestData.loginPageTitle,exacqTestData.setTimeout,exacqTestData.loginPageTitleErrorMessage);
        actualTitleText = await browser.getTitle();
        expectchai(actualTitleText).to.equals(exacqTestData.loginPageTitle);
        await signInPage.enterCredentials(exacqTestData.validUsername,exacqTestData.validPassword);
        await pageCommonUtils.waitForTitleVerify(await browser.getTitle(),exacqTestData.dashBoardPageTitle,exacqTestData.setTimeout,exacqTestData.loginPageTitleErrorMessage);
        actualTitleText = await browser.getTitle();
        expectchai(actualTitleText).to.equals(exacqTestData.dashBoardPageTitle);
    });

    it('Exacq Vision dashboard page active username verification in searchBar Page', async function () {
        allureReporter.addFeature('SearchBar Page userName verification');
        await searchPage.entersearchDetails(exacqTestData.searchUserName);
        actualuserNameText = await searchPage.getUsernameResultText();
        expectchai(actualuserNameText).to.equals(exacqTestData.searchUserName);
    });

    it('Exacq Vision dashboard page active partial username verification in searchBar Page', async function () {
        allureReporter.addFeature('SearchBar Page partial userName verification');
        await searchPage.entersearchDetails(exacqTestData.searchPartialUserName);
        await searchPage.clickServerLink();
        actualuserNameText = await searchPage.getServerNameResultText();
        expectchai(actualuserNameText).to.equals(exacqTestData.serverName);
    });


    it('Exacq Vision active servername details verification', async function () {
        allureReporter.addFeature('Servername connection details verification');
        await serverPage.getserverDetails();
        const serverName = await serverPage.getServerNameResultText();
        const serverStatus = await serverPage.getServerStatus();
        switch (serverName) {
            case exacqTestData.serverName:
                expectchai(serverStatus).to.equal(exacqTestData.serverStatus,'Server status is not connected');
                break;
            default:
                console.log(`Unexpected server name: ${serverName}`);
                break;
        }
    });

    

})    
