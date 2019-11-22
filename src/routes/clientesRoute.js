const express = require("express")
const router = express.Router()
const controller = require("../controllers/clientesController")

router.post("/", controller.postNewCliente)
router.get("/", controller.getClientes)
router.get("/compradores", controller.getCompradores)
router.get("/:cpf", controller.getCpf)
router.put("/:cpf", controller.updateCliente)
router.delete("/:id", controller.deleteCliente)

module.exports = router