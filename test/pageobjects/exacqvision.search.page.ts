
const commonUtils1 = require("../utils/commonUtils");

class SearchPage
{
    
    get enterSearchName() { 
        return $("//input[@placeholder='Search']");
    }

    get searchBtn() { 
        return $("//i[contains(text(),'')]");
    }

    get verifySearchUsername() { 
        return $("//span[text()='altimetrik']");
    }

    get verifyPartialSearchUsername() { 
        return $("//a[normalize-space()='exacqVision Hybrid Demo Server']");
    }

    get partialSearchUsernameText() { 
        return $("//span[@id='helpOnServername']");
    }

    async entersearchDetails(searchName: string){
        await commonUtils1.inputText(await this.enterSearchName,10000,searchName);
        await commonUtils1.waitAndClick(await this.searchBtn,10000);
    }

    async getUsernameResultText(){
        return await commonUtils1.getText(await this.verifySearchUsername,10000);
    }

    async clickServerLink(){
        await commonUtils1.waitAndClick(await this.verifyPartialSearchUsername,10000);
        
    }

    async getServerNameResultText(){
        return await commonUtils1.getText(await this.partialSearchUsernameText,10000);
    }
}

module.exports = new SearchPage();