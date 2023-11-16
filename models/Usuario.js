import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,

      trim: true,
    },
    password: {
      type: String,

      trim: true,
    },
    email: {
      type: String,

      trim: true,
      unique: true,
    },

    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
    rol: {
      type: String,
      enum: ["admin", "profesor"],
      default: "profesor",
    },
    alerta: {
      type: String,
      enum: ["gmail", "discord", "telegram"],
    },
  },
  {
    timestamps: true,
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
