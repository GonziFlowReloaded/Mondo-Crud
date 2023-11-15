import express from "express";
import {
  crearMesa,
  obtenerMesa,
  obtenerMesas,
  editarMesa,
  eliminarMesa,
  buscarProfesor,
  agregarProfesor,
  eliminarProfesor,
} from "../controllers/mesasController.js";

import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, crearMesa);
router.get("/", checkAuth, obtenerMesas);

router.get("/:id", checkAuth, obtenerMesa);
router.put("/:id", checkAuth, editarMesa);
router.delete("/:id", checkAuth, eliminarMesa);

router.post("/profesores", checkAuth, buscarProfesor);
router.post("/profesores/:id", checkAuth, agregarProfesor);
router.delete("/profesores/:id", checkAuth, eliminarProfesor);

export default router;
