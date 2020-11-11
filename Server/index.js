const express = require('express');
const app = express();
const cors = require('cors');

const router = require('./router');
const db = require('./db');

const PORT = 4000

app.use(cors());
app.use(express.json());
app.use(router);

db.then(
  app.listen(PORT, () => {
    console.log(`🚀 firing up on http://localhost:${PORT}`);
  })
)