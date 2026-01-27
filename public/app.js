// API Base URL
const API_URL = window.location.origin;

// State
let editingId = null;

// DOM Elements
const athleteForm = document.getElementById('athleteForm');
const athletesBody = document.getElementById('athletesBody');
const emptyState = document.getElementById('emptyState');
const athleteCount = document.getElementById('athleteCount');
const exportBtn = document.getElementById('exportBtn');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const saveConfigBtn = document.getElementById('saveConfig');
const deporteInput = document.getElementById('deporte');
const entidadInput = document.getElementById('entidad');

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Load Config
async function loadConfig() {
    try {
        const response = await fetch(`${API_URL}/api/config`);
        const config = await response.json();
        deporteInput.value = config.deporte || '';
        entidadInput.value = config.entidad || '';
    } catch (error) {
        console.error('Error loading config:', error);
    }
}

// Save Config
saveConfigBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_URL}/api/config`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                deporte: deporteInput.value,
                entidad: entidadInput.value
            })
        });

        if (response.ok) {
            showToast('Configuración guardada correctamente', 'success');
        }
    } catch (error) {
        showToast('Error al guardar configuración', 'error');
        console.error('Error saving config:', error);
    }
});

// Load Athletes
async function loadAthletes() {
    try {
        const response = await fetch(`${API_URL}/api/athletes`);
        const athletes = await response.json();

        athleteCount.textContent = athletes.length;

        if (athletes.length === 0) {
            athletesBody.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        athletesBody.innerHTML = athletes.map(athlete => `
            <tr data-id="${athlete.id}">
                <td>${escapeHtml(athlete.nombre_apellido)}</td>
                <td>${escapeHtml(athlete.dni)}</td>
                <td>${escapeHtml(athlete.telefono || '-')}</td>
                <td>${escapeHtml(athlete.obra_social || '-')}</td>
                <td>${escapeHtml(athlete.horarios || '-')}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-edit" onclick="editAthlete(${athlete.id})">Editar</button>
                        <button class="btn btn-delete" onclick="deleteAthlete(${athlete.id})">Eliminar</button>
                    </div>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        showToast('Error al cargar deportistas', 'error');
        console.error('Error loading athletes:', error);
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add/Update Athlete
athleteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(athleteForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const url = editingId
            ? `${API_URL}/api/athletes/${editingId}`
            : `${API_URL}/api/athletes`;

        const method = editingId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showToast(
                editingId ? 'Deportista actualizado correctamente' : 'Deportista agregado correctamente',
                'success'
            );
            athleteForm.reset();
            editingId = null;
            submitBtn.querySelector('.btn-text').textContent = 'Agregar Deportista';
            cancelBtn.style.display = 'none';
            await loadAthletes();
        }
    } catch (error) {
        showToast('Error al guardar deportista', 'error');
        console.error('Error saving athlete:', error);
    }
});

// Edit Athlete
window.editAthlete = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/athletes`);
        const athletes = await response.json();
        const athlete = athletes.find(a => a.id === id);

        if (athlete) {
            document.getElementById('nombre_apellido').value = athlete.nombre_apellido;
            document.getElementById('dni').value = athlete.dni;
            document.getElementById('telefono').value = athlete.telefono || '';
            document.getElementById('obra_social').value = athlete.obra_social || '';
            document.getElementById('horarios').value = athlete.horarios || '';

            editingId = id;
            submitBtn.querySelector('.btn-text').textContent = 'Actualizar Deportista';
            cancelBtn.style.display = 'inline-flex';

            // Scroll to form
            athleteForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } catch (error) {
        showToast('Error al cargar deportista', 'error');
        console.error('Error loading athlete:', error);
    }
};

// Cancel Edit
cancelBtn.addEventListener('click', () => {
    athleteForm.reset();
    editingId = null;
    submitBtn.querySelector('.btn-text').textContent = 'Agregar Deportista';
    cancelBtn.style.display = 'none';
});

// Delete Athlete
window.deleteAthlete = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este deportista?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/athletes/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showToast('Deportista eliminado correctamente', 'success');
            await loadAthletes();
        }
    } catch (error) {
        showToast('Error al eliminar deportista', 'error');
        console.error('Error deleting athlete:', error);
    }
};

// Export to Excel
exportBtn.addEventListener('click', async () => {
    try {
        exportBtn.disabled = true;
        exportBtn.textContent = 'Generando...';

        const response = await fetch(`${API_URL}/api/export`);

        if (!response.ok) {
            throw new Error('Error al exportar');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `deportistas_${new Date().toISOString().split('T')[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        showToast('Excel descargado correctamente', 'success');
    } catch (error) {
        showToast('Error al exportar a Excel', 'error');
        console.error('Error exporting:', error);
    } finally {
        exportBtn.disabled = false;
        exportBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Exportar a Excel
        `;
    }
});

// Auto-refresh every 10 seconds to sync with other users
setInterval(loadAthletes, 10000);

// Initial load
loadConfig();
loadAthletes();
