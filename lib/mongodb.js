import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado!");
  } catch (error) {
    console.log("Erro na conexão com mongodb: ", error);
  }
};