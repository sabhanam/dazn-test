const { By, until } = require('selenium-webdriver');
const Driver = require('../utils/web-driver');

class BasePage extends Driver {

    constructor() {
        super();
    }

    getBy(locator){
        const parts = locator.split(':');
        const selectorType = parts[0];
        const selectorValue = parts[1];
        switch (selectorType) {
            case 'name':
                return By.name(selectorValue);
            case 'id':
                return By.id(selectorValue);
            case 'xpath':
                return By.xpath(selectorValue);
            case 'className':
                return By.className(selectorValue);
            default:
                return By.id('dummy');
        }
    }

    getDynamicBy(key, parameters) {
        if (global.locators.hasOwnProperty(key)) {
            let locator = global.locators[key];
            var newLocator = locator.replace(/\{\d+\}/g, (match) => {
                const index = Number(match.slice(1, -1));
                return parameters[index];
            });
            return this.getBy(newLocator);
        } else {
            return By.id('dummy');
        }
        
    }
  
    getByValue(key){
        if (global.locators.hasOwnProperty(key)) {
            let locator = global.locators[key];
            return this.getBy(locator);
        } else {
            return By.id('dummy');
        }
    }

    async waitForPageLoad() {
        let element = await global.driver.findElement(By.css('body'));
        await global.driver.wait(until.stalenessOf(element));
    }

    async visit(url) {
        await global.driver.get(url);
    }
  
    async findElement(locator) {
        return await global.driver.findElement(this.getByValue(locator));
    }
  
    async clickElement(locator) {
        let element = await this.findElement(locator);
        await element.click()
    }
  
    async getElementText(locator) {
        let element = await this.findElement(locator);
        var text = await element.getText()
        return text;
    }
  
    async waitForTitle(title) {
        await global.driver.wait(until.titleIs(title), 5000);
    }
  
    async waitForElementVisible(locator) {
        let element = await this.findElement(locator);
        await global.driver.wait(until.elementIsVisible(element), 5000);
    }

    async waitForElementDisplayed(locator, timeout) {
        try {
            let element = await global.driver.findElement(this.findElement(locator));
            await global.driver.wait(until.elementIsVisible(element), timeout);
            return true;
        } catch (error) {
            return false;
        }
    }
  
    async clickByElement(by) {
        await global.driver.findElement(by).click();
    }
  
    async getByElementText(by) {
        return await global.driver.findElement(by).getText();
    }
  
    async waitByForElementVisible(by) {
        let element = await global.driver.findElement(by);
        await global.driver.wait(until.elementIsVisible(element), 5000);
    }

}
  
module.exports = BasePage;
  