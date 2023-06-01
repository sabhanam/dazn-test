const { quizPage } = require('./base.middleware');
var quiz = require('../testdata/quiz.json');
const assert = require('assert');

module.exports.performQuizTesting = async (questionCount) => {
    
    await quizPage.visit(global.config["appurl"]);

    var titleOfThePage = await quizPage.getQuizPageTitle();
    
    assert.strictEqual("Ancient Rome Quiz", titleOfThePage);

    await quizPage.startQuiz();

    for (let index = 0; index < questionCount; index++) {
        
        var question = await quizPage.getQuestionFromPage();
        
        let answer = quiz[question];

        assert.notStrictEqual(answer, undefined);

        await quizPage.answerQuestion(answer);

        var result = await quizPage.verifyResult();

        assert.strictEqual(result, true);
    }

}