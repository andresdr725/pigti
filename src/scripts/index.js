const content = document.getElementById("content")

// const pages = {
//     dashboard: `
//             <h2 class="text-3xl font-bold text-blue-600 mb-4">Panel Principal</h2>
//             <p class="text-gray-700">Bienvenido al módulo de control tributario.</p>
//         `,
//     vencimientos: `
//             <h2 class="text-3xl font-bold text-blue-600 mb-4">Vencimientos</h2>
//             <p class="text-gray-700">Aquí se mostrará el calendario tributario.</p>
//             <!-- Puedes insertar aquí tu tabla dinámica -->
//         `,
//     diagnostico: `
//             <h2 class="text-3xl font-bold text-blue-600 mb-4">Diagnóstico de Riesgo</h2>
//             <p class="text-gray-700">Evaluación automática del riesgo del contribuyente.</p>
//         `
// };

async function loadPage(page) {
    try {
        const response = await fetch(`views/${page}.html`);
        if (!response.ok) {
            content.innerHTML = `<h2 class="text-red-500">Error cargando la página (${page})</h2>`;
            return;
        }

        const html = await response.text();
        content.innerHTML = html;
    } catch (error) {
        content.innerHTML = `<h2 class="text-red-500">Error del servidor</h2>`;
    }
}

document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", () => {
        const page = item.dataset.page;
        // console.log(`page ${page}`)
        // content.innerHTML = pages[page]
        loadPage(page);
    })
})

content.innerHTML =pages.dashboard;

{/* <script>
    const content = document.getElementById("content");

    // páginas HTML internas
    const pages = {
        dashboard: `
            <h2 class="text-3xl font-bold text-blue-600 mb-4">Panel Principal</h2>
            <p class="text-gray-700">Bienvenido al módulo de control tributario.</p>
        `,
        vencimientos: `
            <h2 class="text-3xl font-bold text-blue-600 mb-4">Vencimientos</h2>
            <p class="text-gray-700">Aquí se mostrará el calendario tributario.</p>
            <!-- Puedes insertar aquí tu tabla dinámica -->
        `,
        diagnostico: `
            <h2 class="text-3xl font-bold text-blue-600 mb-4">Diagnóstico de Riesgo</h2>
            <p class="text-gray-700">Evaluación automática del riesgo del contribuyente.</p>
        `
    };

    // asignar clicks
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", () => {
            const page = item.dataset.page;
            content.innerHTML = pages[page];
        });
    });

    // cargar por defecto
    content.innerHTML = pages.dashboard;
</script> */}
