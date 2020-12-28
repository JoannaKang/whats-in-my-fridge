//*Express
const express = require('express');
const app = express();
const cors = require('cors');

const router = require('./router');
const db = require('./db');

const MG_PORT = 3001

app.use(cors());
app.use(express.json());
app.use(router);

db.then(
  app.listen(MG_PORT, () => {
    console.log(`🚀 MONGODB firing up on http://localhost:${MG_PORT}`);
  })
)
