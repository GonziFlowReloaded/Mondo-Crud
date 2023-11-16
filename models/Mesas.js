import mongoose from "mongoose";

const mesaSchema = mongoose.Schema(
  {
    llamado: {
      type: String,
      enum: ["1er llamado", "2do llamado"], // Specify the allowed enum values
    },
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
    categoria: {
      type: String,
    },
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
