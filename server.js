import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { dbOperations } from './database.js';
import ExcelJS from 'exceljs';
import path from 'path';
import { fileURLToPath } from 'url';


// Load environment variables
// Load environment variables
// dotenv.config(); // Loaded via node -r dotenv/config

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Routes

// Get all athletes
app.get('/api/athletes', async (req, res) => {
    try {
        const athletes = await dbOperations.getAllAthletes();
        res.json(athletes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get config
app.get('/api/config', async (req, res) => {
    try {
        const config = await dbOperations.getConfig();
        res.json(config);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update config
app.put('/api/config', async (req, res) => {
    try {
        const { deporte, entidad } = req.body;
        await dbOperations.updateConfig(deporte, entidad);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add new athlete
app.post('/api/athletes', async (req, res) => {
    try {
        const result = await dbOperations.addAthlete(req.body);
        res.json({ id: result.lastInsertRowid, success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update athlete
app.put('/api/athletes/:id', async (req, res) => {
    try {
        await dbOperations.updateAthlete(req.params.id, req.body);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete athlete
app.delete('/api/athletes/:id', async (req, res) => {
    try {
        await dbOperations.deleteAthlete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export to Excel
app.get('/api/export', async (req, res) => {
    try {
        const athletes = await dbOperations.getAllAthletes();
        const config = await dbOperations.getConfig();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Deportistas');

        // Add header with logo placeholder and title
        worksheet.mergeCells('A1:E1');
        const titleCell = worksheet.getCell('A1');
        titleCell.value = 'LISTADO DE DEPORTISTAS';
        titleCell.font = { size: 16, bold: true };
        titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getRow(1).height = 30;

        // Add config fields
        worksheet.mergeCells('A2:B2');
        worksheet.getCell('A2').value = `DEPORTE: ${config.deporte || ''}`;
        worksheet.getCell('A2').font = { bold: true };

        worksheet.mergeCells('C2:E2');
        worksheet.getCell('C2').value = `ENTIDAD/CLUB: ${config.entidad || ''}`;
        worksheet.getCell('C2').font = { bold: true };

        worksheet.getRow(2).height = 20;

        // Add empty row
        worksheet.addRow([]);

        // Add column headers
        const headerRow = worksheet.addRow(['NOMBRE Y APELLIDO', 'DNI', 'TELEFONO', 'OBRA SOCIAL', 'HORARIOS']);
        headerRow.font = { bold: true, size: 11 };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD3D3D3' }
        };
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

        // Add data rows
        athletes.forEach((athlete, index) => {
            const row = worksheet.addRow([
                athlete.nombre_apellido,
                athlete.dni,
                athlete.telefono,
                athlete.obra_social,
                athlete.horarios
            ]);

            // Alternate row colors
            if (index % 2 === 0) {
                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFF5F5F5' }
                };
            }
        });

        // Set column widths
        worksheet.columns = [
            { width: 30 },
            { width: 15 },
            { width: 15 },
            { width: 20 },
            { width: 20 }
        ];

        // Add borders to all cells
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber >= 4) {
                row.eachCell((cell) => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            }
        });

        // Generate filename with timestamp
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `deportistas_${timestamp}.xlsx`;

        // Set response headers
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        // Write to response
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 Base de datos: ${process.env.MONGODB_URI ? 'MongoDB Atlas' : 'MongoDB Local'}`);
});
