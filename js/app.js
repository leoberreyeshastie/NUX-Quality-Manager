document.addEventListener(
    "DOMContentLoaded",
    init
);

function init() {

    renderLayout();

    loadView("dashboard");

}

function renderLayout() {

    document.getElementById("app").innerHTML = `

        <div class="app-layout">

            <aside class="sidebar">

                <div class="logo">

                    <h3>NÜX</h3>

                    <small>Quality Manager</small>

                </div>

                <nav>

                    <button onclick="loadView('dashboard')">
                        📊 Dashboard
                    </button>

                    <button onclick="loadView('hallazgos')">
                        🔍 Hallazgos
                    </button>

                    <button onclick="loadView('ordenes')">
                        📦 Órdenes
                    </button>

                    <button onclick="loadView('indicadores')">
                        📈 Indicadores
                    </button>

                    <button onclick="loadView('reportes')">
                        📄 Reportes
                    </button>

                    <button onclick="loadView('configuracion')">
                        ⚙ Configuración
                    </button>

                </nav>

            </aside>

            <main class="main-content">

                <header class="topbar">

                    <h2 id="view-title">
                        Dashboard
                    </h2>

                </header>

                <section id="view-container">

                </section>

            </main>

        </div>

    `;

}