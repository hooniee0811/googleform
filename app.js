const http = require('http')

const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/static', express.static('public'));

app.listen(port, () => console.log(`Server up and running on port ${port}.`));

const db = require('./models');
const { REPL_MODE_SLOPPY } = require('repl');
const Form = db.Form
const FormQuestion = db.FormQuestion
const FormQuestionOption = db.FormQuestionOption

app.post("/uploadform", async (req, res) => {
  console.log('---');

  const form = await req.body.form
  const questions = await req.body.questions

  Form.create({
    id: form.uuid,
    title: form.title,
    desc: form.desc
  })

  questions.forEach(question => {
    FormQuestion.create({
      id: question.uuid,
      formId: form.uuid,
      qType: question.qType,
      title: question.title,
      desc: question.desc
    })

    if (question.qType !== 'text') {
      question.options.forEach(option => {
        FormQuestionOption.create({
          id: option.uuid,
          formQuestionId: question.uuid,
          title: option.title,
          desc: option.desc
        })
      })
    }
  })

  res.json({ message: "Form created!!" });
});

app.get("/forms", async (req, res) => {
  const forms = await Form.findAll({
    order: [["createdAt"]]
  })

  res.json({ forms: forms })
})

app.get("/forms/:uuid", async (req, res) => {
  const form = await Form.findOne({
    where: { id: req.params.uuid }
  })

  const formQuestions = await form.getFormQuestions()

  const formQuestionOptions = []
  var i
  for (i = 0; i < formQuestions.length; i++) {
    const formQuestionOptionsPerQuestion = await formQuestions[i].getFormQuestionOptions()
    formQuestionOptions.push(formQuestionOptionsPerQuestion)
  }

  return res.json({
    form: form,
    formQuestions: formQuestions,
    formQuestionOptions: formQuestionOptions
  })
})