import mongoose from "mongoose";

const mesaSchema = mongoose.Schema(
  {
    asignatura: {
      type: String,
      require: true,
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
  },
  {
    timestamps: true,
  }
);

const Mesa = mongoose.model("Mesa", mesaSchema);

export default Mesa;
