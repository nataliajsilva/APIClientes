const express = require("express")
const mongoose = require("mongoose")
const app = express()

mongoose.connect("mongodb://localhost:27017/reprograma", {useNewUrlParser: true,
useUnifiedTopology: true});

let db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function () {
  console.log("conexão feita com sucesso.")
})

//rotas
//const index = require("./routes/index")
const clientes = require("./routes/clientesRoute")

app.use(express.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
}) 

//app.use("/", index) nessa rota apareceria apenas a descrição do arquivo index
app.use("/clientes", clientes)

module.exports = app
