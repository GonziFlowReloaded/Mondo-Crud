import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import mesaRoutes from "./routes/mesaRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
const app = express();
app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 4000;

dotenv.config();

conectarDB();
app.get("/", (req, res) => {
  res.send("Hola, mundo!");
});

//Routing

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/mesas", mesaRoutes);

app.listen(PORT, () => {
  console.log(`El servidor está escuchando en http://localhost:${PORT}`);
});
