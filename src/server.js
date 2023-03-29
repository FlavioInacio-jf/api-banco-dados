const app = require('./app');

const PORT = 4000;

app.listen(process.env.PORT || PORT, () => {
  console.log("listening on port " + process.env.PORT || PORT)
})