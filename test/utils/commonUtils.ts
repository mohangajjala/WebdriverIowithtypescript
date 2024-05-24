const { WebDriver, ThenableWebDriver, until, error } = require('webdriverio');

class PageUtils {

    async open() {
        return await browser.url("/");
        
    }

      async waitForPageLoaded() {
        const expectation = async () => {
            const readyState = await WebDriver.executeScript("return document.readyState");
            console.log("Ready state:", readyState);
            return readyState === "complete";
        };
    
        try {
            await WebDriver.until(expectation, {
                timeout: 120000,
                timeoutMsg: "Page is not ready !!! Time out !!!"
            });
        } catch (e) {
                console.error("Time out exception", e);
                console.error("Page is not ready !!! Time out !!!");
        }
    }

    async waitAndClick(el:any, timeout:any)
    {
        try {
            await el.waitForDisplayed({ timeout });
            await el.click();  
        } 
        catch (error) 
        {
            console.error('Exception is:'+ error);
            
        }
    }

    async waitForTextVerify(el:any,text:string, timeout:any){

        await browser.waitUntil(async () =>{
            return await el.getText() === text;
        },{timeout});
    };

    async waitForTitleVerify(el:any,text:string, timeout:any,timeoutMsg:any){

        await browser.waitUntil(async () =>{
            return await el === text;
        },{timeout,timeoutMsg});
    };

    async acceptAlert(){
        await browser.acceptAlert();
    }

    async dismissAlert(){
        await browser.dismissAlert();
    }

    async inputAlert(text: string){
        await browser.sendAlertText(text);
    }

    async printAlert(){
        console.log('Alert Text: ');
        console.log(await browser.getAlertText());
    }

    async click(el:any, timeout:any){
        //wait for the element to be clickable before interacting
        await el.waitForClickable({ timeout });
        await el.click();
    }

    async inputText(el:any, timeout:any, text: string){
        //wait for the element to be clickable before interacting
        await el.waitForDisplayed({ timeout });
        await el.setValue(text);
    }

    async getText(el:any, timeout:any){
        //wait for the element to be clickable before interacting
        await el.waitForDisplayed({ timeout });
        const text = await el.getText();
        return text;
    }

    async getInputValue(el:any, timeout:any){
        //wait for the element to be clickable before interacting
        await el.waitForDisplayed({ timeout });
        const text = await timeout.getValue();
        return text;
    }

    async dragAndDropElm(draggable: WebdriverIO.Element,droppable: WebdriverIO.Element){
        //drag and drop the draggable element to droppable element
        await browser.action('pointer')
        .move({ duration: 0, origin: draggable})
        .down({ button: 0 }) // left button
        .pause(500)
        .move({ duration: 0, origin: droppable })
        .up({ button: 0 })
        .perform()
    }

    async verifyElement(el:any, timeout:any){
        //wait for the element to be clickable before interacting
        await el.waitForExist({ timeout });
        await el.waitForDisplayed({ timeout });
        await el.waitForClickable({ timeout });
    }

    async scrollToElement(element: any,timeout:any) {
        await element.waitForDisplayed({ timeout });
        await element.scrollIntoView(element);
    }

    async selectDropdownByText(element: any, text: string,timeout:any) {
        await element.waitForDisplayed({ timeout });
        await element.selectByVisibleText(text)
    }

    async selectDropdownByIndex(element: any, index: number,timeout:any) {
        await element.waitForDisplayed({ timeout });
        await element.selectByIndex(index);
    }

    async selectDropdownByAttribute(element: any, attribute: string,value:string,timeout:any) {
        await element.waitForDisplayed({ timeout });
        await element.selectByAttribute(attribute,value);
    }

    async clickOnMatchingElement(elements: any, expectedText: string) {
        await elements.forEach(async (ele: { getText: () => any; click: () => any; })  => {
            if (await ele.getText() === expectedText) 
                await ele.click();
        })
    }

    async uploadFile(element:any,filePath: string) {
        await element.setValue(filePath)
        await element.click();
      }

      async moveToElement(element:any, timeout:any){
        await element.waitForDisplayed(timeout);
        await element.moveTo();
      
        }



}

module.exports = new PageUtils();
