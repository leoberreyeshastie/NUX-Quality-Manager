function loadView(view) {

    const container =
        document.getElementById(
            "view-container"
        );

    const title =
        document.getElementById(
            "view-title"
        );

    switch(view) {

        case "dashboard":

            title.textContent = "Dashboard";

            container.innerHTML = renderDashboard();

            initDashboard();

            break;

        case "hallazgos":

            title.textContent =
                "Hallazgos";

            container.innerHTML =
                renderHallazgos();

            break;

        case "ordenes":

            title.textContent =
                "Órdenes";

            container.innerHTML =
                renderOrdenes();

            break;

        case "indicadores":

            title.textContent =
                "Indicadores";

            container.innerHTML =
                renderIndicadores();

            break;

        case "reportes":

            title.textContent =
                "Reportes";

            container.innerHTML =
                renderReportes();

            break;

        case "configuracion":

            title.textContent =
                "Configuración";

            container.innerHTML =
                renderConfiguracion();

            break;

    }

}