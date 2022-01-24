const db = require('../models');
const Form = db.Form
const FormQuestion = db.FormQuestion
const FormQuestionOption = db.FormQuestionOption

const formController = require("../controllers/forms.controller")
const answerController = require("../controllers/answers.controller")
const resultController = require("../controllers/results.controller")

module.exports = function (app) {
    app.post("/forms/uploadform", formController.uploadForm);
    app.get("/forms", formController.findAllForms)
    app.get("/forms/:uuid", formController.findWithId)
    app.post("/answers/submitanswer", answerController.submitAnswer)
    app.get("/results/:uuid", resultController.getResult)
}