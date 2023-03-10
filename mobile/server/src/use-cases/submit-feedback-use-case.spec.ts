import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

// spies = espiões: permitem saber se uma função foi chamada quando o código foi rodado

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
    

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    {sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base6457290aihfoa',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base6457290aihfoa',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base6457290aihfoa',
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'ta tudo bugado',
            screenshot: 'test.jpg',
        })).rejects.toThrow();
    });
});