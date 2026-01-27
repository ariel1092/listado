import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, 'data.json');

// Initialize database file
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      config: {
        deporte: '',
        entidad: ''
      },
      athletes: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Read database
function readDB() {
  initDB();
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
}

// Write database
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Database operations
export const dbOperations = {
  // Get all athletes
  getAllAthletes: () => {
    const db = readDB();
    return db.athletes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  // Get config (deporte, entidad)
  getConfig: () => {
    const db = readDB();
    return db.config;
  },

  // Update config
  updateConfig: (deporte, entidad) => {
    const db = readDB();
    db.config = { deporte, entidad };
    writeDB(db);
    return { success: true };
  },

  // Add new athlete
  addAthlete: (data) => {
    const db = readDB();
    const newAthlete = {
      id: db.athletes.length > 0 ? Math.max(...db.athletes.map(a => a.id)) + 1 : 1,
      nombre_apellido: data.nombre_apellido,
      dni: data.dni,
      telefono: data.telefono || '',
      obra_social: data.obra_social || '',
      horarios: data.horarios || '',
      created_at: new Date().toISOString()
    };
    db.athletes.push(newAthlete);
    writeDB(db);
    return { lastInsertRowid: newAthlete.id };
  },

  // Update athlete
  updateAthlete: (id, data) => {
    const db = readDB();
    const index = db.athletes.findIndex(a => a.id === parseInt(id));
    if (index !== -1) {
      db.athletes[index] = {
        ...db.athletes[index],
        nombre_apellido: data.nombre_apellido,
        dni: data.dni,
        telefono: data.telefono || '',
        obra_social: data.obra_social || '',
        horarios: data.horarios || ''
      };
      writeDB(db);
    }
    return { success: true };
  },

  // Delete athlete
  deleteAthlete: (id) => {
    const db = readDB();
    db.athletes = db.athletes.filter(a => a.id !== parseInt(id));
    writeDB(db);
    return { success: true };
  }
};

export default { dbOperations };
