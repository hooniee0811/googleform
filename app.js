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

const db = require('./models')
const { REPL_MODE_SLOPPY } = require('repl');

require('./routes/forms.routes')(app)