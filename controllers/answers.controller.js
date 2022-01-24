const db = require('../models');
const Form = db.Form
const FormQuestion = db.FormQuestion
const FormQuestionOption = db.FormQuestionOption
const AnswerOption = db.AnswerOption
const AnswerText = db.AnswerText

exports.submitAnswer = async (req, res) => {
    console.log('---')

    const answerTexts = await req.body.answerTexts
    const answerOptions = await req.body.answerOptions

    answerTexts.forEach(answer => {
        AnswerText.create({
            id: answer.id,
            formQuestionId: answer.formQuestionId,
            answerText: answer.answerText
        })
    })
    answerOptions.forEach(answer => {
        AnswerOption.create({
            id: answer.id,
            formQuestionId: answer.formQuestionId,
            answerOptionId: answer.answerOption
        })
    })

    res.json({message: "Answer submitted!"})
}