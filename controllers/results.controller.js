const db = require('../models');
const Form = db.Form
const FormQuestion = db.FormQuestion
const FormQuestionOption = db.FormQuestionOption
const Answer = db.Answer
const AnswerOption = db.AnswerOption

exports.getResult = async (req, res) => {
    const form = await Form.findOne({
        where: { id: req.params.uuid }
    })

    const formQuestions = await form.getFormQuestions({ order: ["order"] })

    const formQuestionOptions = []
    const answerTexts = []
    const answerOptions = []

    var i
    for (i = 0; i < formQuestions.length; i++) {
        const formQuestionOptionsPerQuestion = await formQuestions[i].getFormQuestionOptions({ order: ["order"] })
        formQuestionOptions.push(formQuestionOptionsPerQuestion)

        if (formQuestions[i].qType == "text") {
            const answerPerQuestion = await formQuestions[i].getAnswerTexts()
            answerTexts.push(answerPerQuestion)
        } else {
            const answerPerQuestion = await formQuestions[i].getAnswerOptions()
            answerOptions.push(answerPerQuestion)
        }
    }

    return res.json({
        form: form,
        formQuestions: formQuestions,
        formQuestionOptions: formQuestionOptions,
        answerTexts: answerTexts,
        answerOptions: answerOptions
    })


}