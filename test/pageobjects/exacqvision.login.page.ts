const commonUtils = require("../utils/commonUtils");

class SignInPage
{
    
    get enterUserName() { 
        return $("//input[@id='loginUsernameId']");
    }

    get enterPassWord() { 
        return $("//input[@id='loginPasswordId']");
    }

    get loginBtn() { 
        return $("//input[@value='Login']");
    }

    get invalidCredMsg() { 
        return $("//div[@id='message_auth_failure']");
    }

    async enterCredentials(username: string,password: string){
        await commonUtils.inputText(await this.enterUserName,10000,username);
        await commonUtils.inputText(await this.enterPassWord,10000,password);
        await commonUtils.waitAndClick(await this.loginBtn,10000);
    }

    async verifyInvalidCredMsg(){
        return await commonUtils.getText(await this.invalidCredMsg,10000);
    }
}

module.exports = new SignInPage();