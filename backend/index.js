const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 5000
app.use(express.json());

app.use("/api/notes", require('./routes/notes'));
app.use("/api/auth", require('./routes/auth'));

// app.get('/', (req, res) => {
//   res.send('Hello Tanmay!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})