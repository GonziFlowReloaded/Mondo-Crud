import express from "express"
import { registrar, autenticar, perfil, registerGoogle, configurarAlerta } from "../controllers/usuarioController.js";
import checkAuth from "../middlewares/checkAuth.js";
const router= express.Router()

router.post("/", registrar);
router.post("/login", autenticar);
router.post("/register-google", registerGoogle);
router.post("/configurar-alerta/:id", checkAuth, configurarAlerta);


router.get("/perfil", checkAuth, perfil)




export default router