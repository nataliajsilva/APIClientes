const Clientes = require('../model/clientes');
const Joi = require ('joi')

exports.postNewCliente = (req, res) => { 
    let cliente = new Clientes(req.body);
  
    cliente.save(function (err) {
      if (err) res.status(500).send(err);
      
      return res.status(201).send(cliente);
    })
console.log("Cliente inserido com sucesso")
}
 
/*OU

 exports.postNewCliente = (req, res) => {

    let cliente = new Clientes(req.body);
  
    cliente.save(function (err){
        if (err) res.status(500).send(err);
        else {
            res.status(201).send({
                status: true,
                mensagem: "Aluna incluida com sucesso"
            })
}*/
        

exports.getClientes = (req, res) => {
    Clientes.find(function (err, clientes){
    if (err) res.status(500).send(err);
    res.status(200).send(clientes)
    })
  }

  exports.getCpf = (req, res) => {
    const cpf = req.params.cpf
    Clientes.find(function(err, cliente){
      if (err) return res.status(500).send(err);
      if(!cliente){
        return res.status(200).send({message: 'Infelizmente não localizamos o cliente com esse cpf'});
      }
      res.status(200).send(cliente.filter(cliente => cliente.cpf == cpf))     
    })
   }

   /* OUUUU
   exports.getCpf=(req,res) => {
       const cpf = req.params.cpf;
       Clientes.find({cpf}, function (err,cliente){
           if (err) res.status(500).send(err);
           res.status(200).send(cliente)
       })
   }*/

   exports.getCompradores = (req, res) => {
    Clientes.find({comprou: true}, function (err, clientes){
        if (err) res.status(500).send(err);
        const clientesRetorno = clientes.map(cliente => {
            return {
                nome: cliente.nome,
                email: cliente.email
            }
        })
        res.status(200).send(clientesRetorno)
    })
   }

/* OUUUUUU
exports.getCompradores = (req, res) => {
    Clientes.find(function(err, clientes){
      if (err) res.status(500).send(err)
  
      const compraram = clientes.filter(cliente => cliente.comprou == true);
      const compradores = compraram.map(cliente => {
          return {
              nome: cliente.nome,
              email: cliente.email
          }
      })
      res.status(200).send(compradores)
    })
}*/

exports.updateCliente = (req, res) => {
    Clientes.update(
        { cpf: req.params.cpf },
        { $set: req.body },
        { upsert: true },
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send({ message: "Atualizado com sucesso!" });
        })
}

/*UPDATE COM JOIN - VALIDAÇÃO DE CAMPOS

exports.updateCliente = (req, res) => {

    if(!validaFormulario(req.body)) return res.status(400).send("Campo inválido")

    Clientes.update(
        { cpf: req.params.cpf },
        { $set: req.body },
        { upsert: true },
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send({ message: "Atualizado com sucesso!" });
        })
}

const validaFormulario = (campos) => {
    const schema = {
        nome: Joi.string().min(1).required(),
        email: Joi.number().min(1).required(),
    }
    const validation = Joi.validate(campos,schema);
    if (validation.error){
        return false;
    }
    return true;

}*/

exports.deleteCliente = (req, res) => { 
    let idCliente = req.params.id;
  
    Clientes.findById(idCliente,function(err,cliente){
        if (err) return res.status(500).send(err);

        if (!cliente) {
            return res.status(200).send({message:"Infelizmente não localizamos o cliente"})
        }

        cliente.remove(function(err){
            if (!err) {
                res.status(200).send({message: "Cleinte removido com sucesso"})
            }
        })
    })
}
 


