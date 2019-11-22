const mongoose = require('mongoose');

const ClientesSchema = new mongoose.Schema({
    nome: {type: String},
    email: {type: String /*required: true CAMPO OBRIGATÓRIO*/},
    cpf: {type: Number},
    dataNascimento: {type: Date},
    estadoCivil: {type: String},
    telefone: {type: Number},
    comprou: {type: Boolean}
},{
    versionKey: false
})

const Clientes = mongoose.model('Clientes', ClientesSchema);

module.exports = Clientes;

 //var sampleSchema = new Schema ({name: {type: String, required: true}});