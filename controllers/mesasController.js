import Mesa from "../models/Mesas.js";
import Usuario from "../models/Usuario.js";

const crearMesa = async (req, res) => {
  // Verificar si el usuario tiene el rol de "admin"
  if (req.usuario.rol !== "admin") {
    return res
      .status(403)
      .json({ mensaje: "No tienes permiso para crear mesas." });
  }

  const mesa = new Mesa(req.body);
  mesa.creador = req.usuario._id;

  try {
    const mesaAlmacenada = await mesa.save();
    res.json(mesaAlmacenada);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al crear la mesa." });
  }
};

const obtenerMesas = async (req, res) => {
  // Verificar si el usuario tiene el rol de "admin"
  if (req.usuario.rol !== "admin") {
    return res
      .status(403)
      .json({ msg: "No tienes permiso para obtener las mesas." });
  }

  try {
    // Obtener las mesas solo si el usuario es un admin
    const mesas = await Mesa.find();
    res.json({ mesas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener las mesas." });
  }
};

const obtenerMesa = async (req, res) => {
  // Verificar si el usuario tiene el rol de "admin"
  if (req.usuario.rol !== "admin") {
    return res
      .status(403)
      .json({ mensaje: "No tienes permiso para obtener esta mesa." });
  }

  try {
    // Obtener la mesa solo si el usuario es un admin
    const mesa = await Mesa.findById(req.params.id);

    if (!mesa) {
      return res.status(404).json({ msg: "Mesa no encontrada" });
    }

    res.json(mesa);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Error al obtener la mesa." });
  }
};

const editarMesa = async (req, res) => {
  if (req.usuario.rol !== "admin") {
    return res
      .status(403)
      .json({ mensaje: "No tienes permiso para actualizar esta mesa." });
  }

  const mesa = await Mesa.findById(req.params.id);

  if (!mesa) {
    return res.status(404).json({ msg: "Mesa no encontrada" });
  }

  res.json(mesa);

  mesa.asignatura = req.body.asignatura || mesa.asignatura;
  mesa.aula = req.body.aula || mesa.aula;
  mesa.profesor = req.body.profesor || mesa.profesor;
  mesa.fecha = req.body.fecha || mesa.fecha;
  mesa.alumnos = req.body.alumnos || mesa.alumnos;

  try {
    const mesaAlmacenada = await mesa.save();
    res.json(mesaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const eliminarMesa = async (req, res) => {
  if (req.usuario.rol !== "admin") {
    return res
      .status(403)
      .json({ mensaje: "No tienes permiso para actualizar esta mesa." });
  }

  const mesa = await Mesa.findById(req.params.id);

  if (!mesa) {
    return res.status(404).json({ msg: "Mesa no encontrada" });
  }


  try {
    await mesa.deleteOne()
    res.json({msg: "Mesa eliminada"})
  } catch (error) {
    console.log(error)
  }
};

const buscarProfesor = async (req, res) => {
  const {dni}=req.body

  const usuario= await Usuario.findOne({dni})

  if(!usuario){
    const error= new Error("Usuario no encontrado")
    return res.status(404).json({msg:error.message})
  }

  res.json(usuario)

};

const agregarProfesor = async (req, res) => {};

const eliminarProfesor = async (req, res) => {};
export {
  crearMesa,
  obtenerMesa,
  obtenerMesas,
  editarMesa,
  eliminarMesa,
  buscarProfesor,
  agregarProfesor,
  eliminarProfesor,
};
