import mongoose from 'mongoose';

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kronos-deportistas';

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    console.log('🔌 Intentando conectar a:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    throw error;
  }
}

// Config Schema
const configSchema = new mongoose.Schema({
  deporte: { type: String, default: '' },
  entidad: { type: String, default: '' }
}, { timestamps: true });

// Athlete Schema
const athleteSchema = new mongoose.Schema({
  nombre_apellido: { type: String, required: true },
  dni: { type: String, required: true },
  telefono: { type: String, default: '' },
  obra_social: { type: String, default: '' },
  horarios: { type: String, default: '' }
}, { timestamps: true });

const Config = mongoose.model('Config', configSchema);
const Athlete = mongoose.model('Athlete', athleteSchema);

// Database operations
export const dbOperations = {
  // Get all athletes
  getAllAthletes: async () => {
    await connectDB();
    return await Athlete.find().sort({ createdAt: -1 }).lean();
  },

  // Get config
  getConfig: async () => {
    await connectDB();
    let config = await Config.findOne().lean();
    if (!config) {
      config = await Config.create({ deporte: '', entidad: '' });
    }
    return { deporte: config.deporte, entidad: config.entidad };
  },

  // Update config
  updateConfig: async (deporte, entidad) => {
    await connectDB();
    await Config.findOneAndUpdate(
      {},
      { deporte, entidad },
      { upsert: true, new: true }
    );
    return { success: true };
  },

  // Add new athlete
  addAthlete: async (data) => {
    await connectDB();
    const athlete = await Athlete.create({
      nombre_apellido: data.nombre_apellido,
      dni: data.dni,
      telefono: data.telefono || '',
      obra_social: data.obra_social || '',
      horarios: data.horarios || ''
    });
    return { lastInsertRowid: athlete._id };
  },

  // Update athlete
  updateAthlete: async (id, data) => {
    await connectDB();
    await Athlete.findByIdAndUpdate(id, {
      nombre_apellido: data.nombre_apellido,
      dni: data.dni,
      telefono: data.telefono || '',
      obra_social: data.obra_social || '',
      horarios: data.horarios || ''
    });
    return { success: true };
  },

  // Delete athlete
  deleteAthlete: async (id) => {
    await connectDB();
    await Athlete.findByIdAndDelete(id);
    return { success: true };
  }
};

export default { dbOperations, connectDB };
