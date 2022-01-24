const db = require('../models');
const Form = db.Form
const FormQuestion = db.FormQuestion
const FormQuestionOption = db.FormQuestionOption

exports.uploadForm = async (req, res) => {
    console.log('---');

    const form = await req.body.form
    const questions = await req.body.questions

    Form.create({
        id: form.uuid,
        title: form.title,
        desc: form.desc
    })

    questions.forEach((question, index) => {
        FormQuestion.create({
            id: question.uuid,
            formId: form.uuid,
            order: index,
            qType: question.qType,
            title: question.title,
            desc: question.desc
        })

        if (question.qType !== 'text') {
            question.options.forEach((option, opIndex) => {
                FormQuestionOption.create({
                    id: option.uuid,
                    formQuestionId: question.uuid,
                    order: opIndex,
                    title: option.title,
                    desc: option.desc
                })
            })
        }
    })

    res.json({ message: "Form created!!" });
}

exports.findAllForms = async (req, res) => {
    const forms = await Form.findAll({
        order: [["createdAt"]]
    })

    res.json({ forms: forms })
}

exports.findWithId = async (req, res) => {
    const form = await Form.findOne({
        where: { id: req.params.uuid }
    })

    const formQuestions = await form.getFormQuestions({ order: [["order"]] })

    const formQuestionOptions = []
    var i
    for (i = 0; i < formQuestions.length; i++) {
        const formQuestionOptionsPerQuestion = await formQuestions[i].getFormQuestionOptions({ order: [["order"]] })
        formQuestionOptions.push(formQuestionOptionsPerQuestion)
    }

    return res.json({
        form: form,
        formQuestions: formQuestions,
        formQuestionOptions: formQuestionOptions
    })
}