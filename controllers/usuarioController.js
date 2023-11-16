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

const registerGoogle = async (req, res) => {
  try {
    const { email, nombre } = req.body;

    // Verifica si el usuario ya está registrado
    const usuarioExistente = await Usuario.findOne({ email });

    if (usuarioExistente) {
      // Si ya existe, genera el token y responde con él
      const token = generarJWT(usuarioExistente._id);
      res.json({ token });
    } else {
      // Si no existe, crea un nuevo usuario y luego genera el token
      const nuevoUsuario = new Usuario({ email, nombre });
      const usuarioAlmacenado = await nuevoUsuario.save();
      const token = generarJWT(usuarioAlmacenado._id);
      res.json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  //Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  //comprobar password
  if (await Usuario.findOne({ email, password })) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generarJWT(usuario._id)
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};
const perfil = async (req, res) => {
  try {
    const { usuario } = req;

    if (!usuario) {
      // Manejar caso en el que el usuario no está autenticado
      res.status(401).json({ msg: "Usuario no autenticado" });
      return;
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};


const configurarAlerta = async (req, res) => {
  const { id } = req.params;
  const { alerta } = req.body;

  try {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    usuario.alerta = alerta;
    await usuario.save();

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al configurar la alerta" });
  }
};

export { registrar, autenticar, perfil,registerGoogle,configurarAlerta };
