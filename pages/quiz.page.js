const BasePage = require('./BasePage');

class QuizPage extends BasePage {

    async getQuizPageTitle() {
        await this.waitForElementDisplayed("QuizPage.AncientQuiz.Title", 5000)
        return await this.getElementText("QuizPage.AncientQuiz.Title");
    }

    async startQuiz() {
        await this.clickElement("QuizPage.StartQuiz.Button");
    }

    async getQuestionFromPage() {
        await this.waitForElementVisible("QuizPage.Question.Title");
        return this.getElementText("QuizPage.Question.Text");
    }

    async answerQuestion(answer) {
        var answerBy = this.getDynamicBy("QuizPage.Answer.Option", [answer]);
        await this.clickByElement(answerBy);
    }

    async verifyResult() {
        if(await this.waitForElementDisplayed("QuizPage.Continue.Option", 5000)){
            await this.clickElement("QuizPage.Continue.Option");
            return false;
        }
        return true;
    }

}
  
module.exports = QuizPage;