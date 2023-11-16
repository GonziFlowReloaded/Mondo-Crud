import mongoose from "mongoose";

const mesaSchema = mongoose.Schema(
  {
    asignatura: {
      type: String,
      required: true,
    },
    aula: {
      type: String,
    },
    profesor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
    fecha: {
      type: Date,
    },
    hora: {
      type: String,
    },
    alumnos: {
      type: String,
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    categoria: {
      type: String,
    },
    llamado: {
      type: String,
     
    },
    modalidad: {
      type: String,
    
    },
  },
  {
    timestamps: true,
  }
);

const Mesa = mongoose.model("Mesa", mesaSchema);

export default Mesa;
