// ---------------- BASE DE DATOS SIMULADA ----------------
const BASE_CALENDAR = [
    { id: 'renta', name: 'Renta Anual', periodicity: 'Anual', apply: () => true, date: [2026, 7, 10] },
    { id: 'iva1', name: 'IVA Bimestre 1', periodicity: 'Bimestral', apply: c => c.ivaPeriodicity === 'bimestral', date: [2025, 3, 20] },
    { id: 'ivaC1', name: 'IVA Cuatrimestre 1', periodicity: 'Cuatrimestral', apply: c => c.ivaPeriodicity === 'cuatrimestral', date: [2025, 5, 25] },
    { id: 'rete1', name: 'Retefuente Enero', periodicity: 'Mensual', apply: c => c.retefuente === 'si', date: [2025, 2, 15] },
    { id: 'consumo', name: 'Impoconsumo', periodicity: 'Bimestral', apply: c => c.impConsumo, date: [2025, 3, 12] },
    { id: 'predial', name: 'Predial', periodicity: 'Anual', apply: c => c.impPredial, date: [2025, 5, 31] }
];

// ---------------- CONFIG INICIAL ----------------
let currentConfig = {
    regimen: "ordinario",
    ivaResponsible: true,
    ivaPeriodicity: "bimestral",
    retefuente: "si",
    impConsumo: false,
    impBolsas: false,
    impPredial: false,
    daysFilter: 30
};

// ---------------- FUNCIONES ----------------
function updateCalendar() {

    currentConfig = {
        regimen: document.getElementById("regimen").value,
        ivaResponsible: document.querySelector('input[name="iva-responsible"]:checked').value === "si",
        ivaPeriodicity: document.getElementById("iva-periodicity").value,
        retefuente: document.querySelector('input[name="retefuente"]:checked').value,
        impConsumo: document.getElementById("imp-consumo").checked,
        impBolsas: document.getElementById("imp-bolsas").checked,
        impPredial: document.getElementById("imp-predial").checked,
        daysFilter: parseInt(document.getElementById("days-filter").value)
    };

    document.getElementById("iva-period-group").style.display =
        currentConfig.ivaResponsible ? "block" : "none";

    const tbody = document.getElementById("calendar-results");
    tbody.innerHTML = "";

    const now = new Date();
    const maxDate = new Date();
    maxDate.setDate(now.getDate() + currentConfig.daysFilter);

    const filtered = BASE_CALENDAR
        .filter(item => item.apply(currentConfig))
        .filter(item => {
            const d = new Date(...item.date);
            return d >= now && d <= maxDate;
        })
        .sort((a, b) => new Date(...a.date) - new Date(...b.date));

    document.getElementById("total-obligations").textContent = filtered.length;

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="4" class="py-4 text-center text-gray-400 italic">
                No hay vencimientos en este periodo.
            </td></tr>`;
        return;
    }

    filtered.forEach(item => {
        const date = new Date(...item.date);
        const remaining = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

        tbody.innerHTML += `
            <tr>
                <td class="px-6 py-3">${item.name}</td>
                <td class="px-6 py-3">${item.periodicity}</td>
                <td class="px-6 py-3">${date.toLocaleDateString()}</td>
                <td class="px-6 py-3 font-bold text-pigti-blue">${remaining}</td>
            </tr>`;
    });
}

// Ejecutar cuando la vista cargue
setTimeout(() => {
    if (window.lucide) lucide.createIcons();
    updateCalendar();
}, 200);
