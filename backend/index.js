const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CNC Diagnostic App Backend is running!');
});

const errorsRouter = require('./routes/errors');
const forumsRouter = require('./routes/forums');
const claudeRouter = require('./routes/claude');

app.use('/api/errors', errorsRouter);
app.use('/api/forums', forumsRouter);
app.use('/api/claude', claudeRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
