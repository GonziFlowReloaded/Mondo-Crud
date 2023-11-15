import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    const usuarioAlamacenado = await usuario.save();
    res.json({ msg: "Usuario Registrado" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { dni, password } = req.body;
  //Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ dni });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  //comprobar password
  if (await Usuario.findOne({ dni, password })) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      dni: usuario.dni,
      rol: usuario.rol,
      token: generarJWT(usuario._id)
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const perfil = async (req,res)=>{
    const {usuario}=req

    res.json(usuario)
}

export { registrar, autenticar, perfil };
