const commonUtils2 = require("../utils/commonUtils");

class ServerPage
{
    
    get clickServerLink() { 
        return $("(//*[name()='tspan'][contains(text(),'1')])[2]");
    }

    get dashBoardLink() { 
        return $("//div[@id='sideBar']/div[contains(@class,'SideBar')]//a[contains(text(),'dashboard')]");
    }

    get serverName() { 
        return $("//td[normalize-space()='exacqVision Hybrid Demo Server']");
    }

    get serverStatus() { 
        return $("//td[normalize-space()='Connected']");
    }

    async getserverDetails(){
        await commonUtils2.waitAndClick(await this.dashBoardLink,10000);
        await commonUtils2.waitAndClick(await this.clickServerLink,10000);
    }

    async getServerNameResultText(){
        return await commonUtils2.getText(await this.serverName,10000);
    }

    async getServerStatus(){
        return await commonUtils2.getText(await this.serverStatus,10000);
    }
}

module.exports = new ServerPage();