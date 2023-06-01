const { Builder } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
var json = require('../app-settings.json');
let instance = null;

class Driver {
    
    constructor() {
        if (!instance) instance = this;
        global.config = {};
        for (let key in json) {
            global.config[key] = json[key];
        }
        const chromeOptions = new Options();
        chromeOptions.addArguments('--start-maximized');
        global.driver = new Builder()
            .forBrowser(global.config["browserName"])
            .setChromeOptions(chromeOptions).build();
        return instance;
    }

}

module.exports = Driver;
