const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 3000

app.use("/api/notes", require('./routes/notes'));
// app.get('/', (req, res) => {
//   res.send('Hello Tanmay!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})