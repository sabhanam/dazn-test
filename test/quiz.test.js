require('./test-setup.js');
const quizMiddleWare = require('../middlewares/quiz.middleware');

describe('Quiz Tests', () => {
    it('Perform quiz testing for 5 questions', async () => {
        await quizMiddleWare.performQuizTesting(5);
    });
});
