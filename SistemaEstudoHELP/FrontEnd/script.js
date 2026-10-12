/* =========================================================
   CONFIGURAÇÃO DA API
========================================================= */

/*
    Quando a API ASP.NET Core estiver pronta, altere apenas
    esta constante.

    Exemplo:

    const API_BASE_URL = "/api";

    As funções abaixo já estão separadas para facilitar
    essa integração.
*/

const API_BASE_URL = "/api";


/* =========================================================
   DADOS SIMULADOS
========================================================= */

/*
    Estes dados representam temporariamente a resposta
    que futuramente virá da API.

    Quando a API estiver pronta, eles poderão ser removidos.
*/

const mockDashboard = {
    totalAlunos: 128,
    totalProfessores: 12,
    totalMaterias: 18,
    mediaGeral: 7.8,
    frequenciaGeral: 91.4,

    salas: [
        {
            sala: "LAB 01",
            materia: "C#",
            professor: "Augusto",
            horario: "08:00 - 10:00",
            status: "Ocupada"
        },
        {
            sala: "LAB 02",
            materia: "Banco de Dados",
            professor: "Mariana",
            horario: "10:00 - 12:00",
            status: "Ocupada"
        },
        {
            sala: "SALA 04",
            materia: "Engenharia de Software",
            professor: "Carlos",
            horario: "13:00 - 15:00",
            status: "Ocupada"
        },
        {
            sala: "LAB 03",
            materia: "Programação Web",
            professor: "Fernanda",
            horario: "15:00 - 17:00",
            status: "Disponível"
        }
    ]
};


const mockMaterias = [
    {
        id: 1,
        nome: "Programação C#",
        professor: "Augusto Silva",
        alunos: 32,
        avisos: "Prova em breve"
    },
    {
        id: 2,
        nome: "Banco de Dados",
        professor: "Mariana Souza",
        alunos: 28,
        avisos: "Sem avisos"
    },
    {
        id: 3,
        nome: "Engenharia de Software",
        professor: "Carlos Oliveira",
        alunos: 30,
        avisos: "Trabalho disponível"
    },
    {
        id: 4,
        nome: "Desenvolvimento Web",
        professor: "Fernanda Lima",
        alunos: 25,
        avisos: "Sem avisos"
    },
    {
        id: 5,
        nome: "Inteligência Artificial",
        professor: "Rafael Santos",
        alunos: 20,
        avisos: "Atividade pendente"
    },
    {
        id: 6,
        nome: "Estrutura de Dados",
        professor: "Juliana Costa",
        alunos: 24,
        avisos: "Sem avisos"
    }
];


const mockProfessores = [
    {
        id: 1,
        nome: "Augusto Silva",
        email: "augusto@help.edu.br",
        turno: "Manhã",
        materia: "Programação C#"
    },
    {
        id: 2,
        nome: "Mariana Souza",
        email: "mariana@help.edu.br",
        turno: "Manhã",
        materia: "Banco de Dados"
    },
    {
        id: 3,
        nome: "Carlos Oliveira",
        email: "carlos@help.edu.br",
        turno: "Tarde",
        materia: "Engenharia de Software"
    },
    {
        id: 4,
        nome: "Fernanda Lima",
        email: "fernanda@help.edu.br",
        turno: "Noite",
        materia: "Desenvolvimento Web"
    }
];


const mockAlunos = [
    {
        id: 1,
        nome: "Ana Carolina",
        curso: "ADS - 3º Semestre",
        media: 8.7,
        frequencia: 96
    },
    {
        id: 2,
        nome: "João Pedro",
        curso: "ADS - 3º Semestre",
        media: 7.4,
        frequencia: 89
    },
    {
        id: 3,
        nome: "Mariana Alves",
        curso: "ADS - 3º Semestre",
        media: 9.1,
        frequencia: 98
    },
    {
        id: 4,
        nome: "Lucas Santos",
        curso: "ADS - 3º Semestre",
        media: 6.8,
        frequencia: 82
    },
    {
        id: 5,
        nome: "Beatriz Oliveira",
        curso: "ADS - 3º Semestre",
        media: 8.2,
        frequencia: 93
    },
    {
        id: 6,
        nome: "Gabriel Souza",
        curso: "ADS - 3º Semestre",
        media: 7.9,
        frequencia: 91
    }
];


/* =========================================================
   ELEMENTOS DO DOM
========================================================= */

const loginSection =
    document.getElementById("login-section");

const app =
    document.getElementById("app");

const loginForm =
    document.getElementById("login-form");

const loginError =
    document.getElementById("login-error");

const togglePassword =
    document.getElementById("toggle-password");

const passwordInput =
    document.getElementById("password");

const sidebar =
    document.getElementById("sidebar");

const sidebarToggle =
    document.getElementById("sidebar-toggle");

const logoutButton =
    document.getElementById("logout-button");

const navItems =
    document.querySelectorAll(".nav-item[data-section]");

const sections =
    document.querySelectorAll(".content-section");

const pageTitle =
    document.getElementById("page-title");


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeEvents();

});


/* =========================================================
   EVENTOS
========================================================= */

function initializeEvents() {

    loginForm.addEventListener(
        "submit",
        handleLogin
    );


    togglePassword.addEventListener(
        "click",
        togglePasswordVisibility
    );


    sidebarToggle.addEventListener(
        "click",
        toggleSidebar
    );


    logoutButton.addEventListener(
        "click",
        logout
    );


    navItems.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const section =
                    button.dataset.section;

                navigateTo(section);

            }
        );

    });

}


/* =========================================================
   LOGIN
========================================================= */

async function handleLogin(event) {
    event.preventDefault();
    loginError.textContent = "";

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value;

    if (!email || !senha) {
        loginError.textContent = "Preencha todos os campos.";
        return;
    }

    const submitButton = loginForm.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;

    try {
        const response = await fetch(API_BASE_URL + "/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, senha: senha })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.mensagem || "E-mail ou senha inválidos.");
        }

        if (!data.token) {
            throw new Error("A API não retornou um token de acesso.");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("administrador", JSON.stringify(data.administrador));
        loginSuccess();
    } catch (error) {
        loginError.textContent =
            error.message || "Não foi possível conectar à API.";
    } finally {
        if (submitButton) submitButton.disabled = false;
    }
}


/* =========================================================
   LOGIN SUCCESS
========================================================= */

function loginSuccess() {

    loginSection.classList.add("hidden");

    app.classList.remove("hidden");

    loadDashboard();

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    /*
        Futuramente:

        localStorage.removeItem("token");

        ou invalidação do token
        através da API.
    */

    app.classList.add("hidden");

    loginSection.classList.remove("hidden");

    loginForm.reset();

    loginError.textContent = "";

    navigateTo("dashboard");

}


/* =========================================================
   SENHA
========================================================= */

function togglePasswordVisibility() {

    const isPassword =
        passwordInput.type === "password";


    passwordInput.type =
        isPassword
            ? "text"
            : "password";


    togglePassword.innerHTML =
        isPassword
            ? '<i class="fa-solid fa-eye-slash"></i>'
            : '<i class="fa-solid fa-eye"></i>';

}


/* =========================================================
   NAVEGAÇÃO SPA
========================================================= */

function navigateTo(sectionName) {

    sections.forEach(section => {

        section.classList.remove("active");

    });


    const targetSection =
        document.getElementById(
            `${sectionName}-section`
        );


    if (!targetSection) {
        return;
    }


    targetSection.classList.add("active");


    navItems.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.section === sectionName
        );

    });


    updatePageTitle(sectionName);


    /*
        Carrega os dados somente quando a seção
        correspondente for acessada.
    */

    switch (sectionName) {

        case "dashboard":
            fetchDashboard();
            break;

        case "materias":
            fetchMaterias();
            break;

        case "professores":
            fetchProfessores();
            break;

        case "alunos":
            fetchAlunos();
            break;

    }


    // Fecha o menu no celular
    if (window.innerWidth <= 900) {

        sidebar.classList.remove("open");

    }

}


/* =========================================================
   TÍTULO DA PÁGINA
========================================================= */

function updatePageTitle(sectionName) {

    const titles = {

        dashboard: "Dashboard",

        materias: "Matérias",

        professores: "Professores",

        alunos: "Alunos"

    };


    pageTitle.textContent =
        titles[sectionName] || "Dashboard";

}


/* =========================================================
   SIDEBAR MOBILE
========================================================= */

function toggleSidebar() {

    sidebar.classList.toggle("open");

}


/* =========================================================
   DASHBOARD
========================================================= */

async function fetchDashboard() {

    /*
        FUTURA API:

        const response = await fetch(
            `${API_BASE_URL}/dashboard`,
            {
                headers: getAuthHeaders()
            }
        );

        if (!response.ok) {
            throw new Error(
                "Erro ao buscar dashboard"
            );
        }

        const data = await response.json();

        renderDashboard(data);
    */


    // Simulação
    renderDashboard(mockDashboard);

}


/* =========================================================
   RENDER DASHBOARD
========================================================= */

function renderDashboard(data) {

    document.getElementById(
        "total-alunos"
    ).textContent =
        data.totalAlunos;


    document.getElementById(
        "total-professores"
    ).textContent =
        data.totalProfessores;


    document.getElementById(
        "total-materias"
    ).textContent =
        data.totalMaterias;


    document.getElementById(
        "media-geral"
    ).textContent =
        Number(data.mediaGeral).toFixed(1);


    document.getElementById(
        "frequencia-geral"
    ).textContent =
        `${data.frequenciaGeral}%`;


    renderRoomPlanning(data.salas);

}


/* =========================================================
   OCUPAÇÃO DAS SALAS
========================================================= */

function renderRoomPlanning(salas) {

    const container =
        document.getElementById(
            "room-planning-list"
        );


    if (!salas || salas.length === 0) {

        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-building"></i>
                <p>Nenhum planejamento encontrado.</p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        salas.map(sala => {

            const statusClass =
                sala.status === "Disponível"
                    ? "available"
                    : "";


            return `
                <div class="room-item">

                    <span class="room-name">
                        ${escapeHTML(sala.sala)}
                    </span>

                    <div class="room-info">

                        <strong>
                            ${escapeHTML(sala.materia)}
                        </strong>

                        <span>
                            ${escapeHTML(sala.professor)}
                            ·
                            ${escapeHTML(sala.horario)}
                        </span>

                    </div>

                    <span
                        class="room-status ${statusClass}"
                    >
                        ${escapeHTML(sala.status)}
                    </span>

                </div>
            `;

        }).join("");

}


/* =========================================================
   MATÉRIAS
========================================================= */

async function fetchMaterias() {

    /*
        FUTURA API:

        const response = await fetch(
            `${API_BASE_URL}/materias`
        );

        const data = await response.json();

        renderMaterias(data);
    */


    renderMaterias(mockMaterias);

}


/* =========================================================
   RENDER MATÉRIAS
========================================================= */

function renderMaterias(materias) {

    const container =
        document.getElementById(
            "materias-grid"
        );


    document.getElementById(
        "materias-count"
    ).textContent =
        materias.length;


    if (!materias.length) {

        renderEmptyState(
            container,
            "fa-book",
            "Nenhuma matéria encontrada."
        );

        return;
    }


    container.innerHTML =
        materias.map(materia => {

            return `
                <article class="entity-card">

                    <div class="entity-card-header">

                        <div class="entity-icon">
                            <i class="fa-solid fa-book"></i>
                        </div>

                        <div class="entity-title">

                            <h3>
                                ${escapeHTML(materia.nome)}
                            </h3>

                            <span>
                                ID: ${materia.id}
                            </span>

                        </div>

                    </div>


                    <div class="entity-data">

                        <div class="data-row">

                            <span class="data-label">
                                Professor responsável
                            </span>

                            <span class="data-value">
                                ${escapeHTML(materia.professor)}
                            </span>

                        </div>


                        <div class="data-row">

                            <span class="data-label">
                                Quantidade de alunos
                            </span>

                            <span class="data-value">
                                ${materia.alunos}
                            </span>

                        </div>


                        <div class="data-row">

                            <span class="data-label">
                                Avisos
                            </span>

                            <span class="notice">
                                ${escapeHTML(materia.avisos)}
                            </span>

                        </div>

                    </div>

                </article>
            `;

        }).join("");

}


/* =========================================================
   PROFESSORES
========================================================= */

async function fetchProfessores() {

    /*
        FUTURA API:

        const response = await fetch(
            `${API_BASE_URL}/professores`
        );

        const data = await response.json();

        renderProfessores(data);
    */


    renderProfessores(mockProfessores);

}


/* =========================================================
   RENDER PROFESSORES
========================================================= */

function renderProfessores(professores) {

    const container =
        document.getElementById(
            "professores-grid"
        );


    document.getElementById(
        "professores-count"
    ).textContent =
        professores.length;


    if (!professores.length) {

        renderEmptyState(
            container,
            "fa-chalkboard-user",
            "Nenhum professor encontrado."
        );

        return;
    }


    container.innerHTML =
        professores.map(professor => {

            return `
                <article class="entity-card">

                    <div class="entity-card-header">

                        <div class="entity-icon">
                            <i class="fa-solid fa-chalkboard-user"></i>
                        </div>

                        <div class="entity-title">

                            <h3>
                                ${escapeHTML(professor.nome)}
                            </h3>

                            <span>
                                ID: ${professor.id}
                            </span>

                        </div>

                    </div>


                    <div class="entity-data">

                        <div class="data-row">

                            <span class="data-label">
                                E-mail
                            </span>

                            <span class="data-value">
                                ${escapeHTML(professor.email)}
                            </span>

                        </div>


                        <div class="data-row">

                            <span class="data-label">
                                Turno
                            </span>

                            <span class="data-value">
                                ${escapeHTML(professor.turno)}
                            </span>

                        </div>


                        <div class="data-row">

                            <span class="data-label">
                                Matéria
                            </span>

                            <span class="data-value">
                                ${escapeHTML(professor.materia)}
                            </span>

                        </div>

                    </div>

                </article>
            `;

        }).join("");

}


/* =========================================================
   ALUNOS
========================================================= */

async function fetchAlunos() {

    /*
        FUTURA API:

        const response = await fetch(
            `${API_BASE_URL}/alunos`
        );

        const data = await response.json();

        renderAlunos(data);
    */


    renderAlunos(mockAlunos);

}


/* =========================================================
   RENDER ALUNOS
========================================================= */

function renderAlunos(alunos) {

    const container =
        document.getElementById(
            "alunos-grid"
        );


    document.getElementById(
        "alunos-count"
    ).textContent =
        alunos.length;


    if (!alunos.length) {

        renderEmptyState(
            container,
            "fa-users",
            "Nenhum aluno encontrado."
        );

        return;
    }


    container.innerHTML =
        alunos.map(aluno => {

            return `
                <article class="entity-card">

                    <div class="entity-card-header">

                        <div class="entity-icon">
                            <i class="fa-solid fa-user-graduate"></i>
                        </div>

                        <div class="entity-title">

                            <h3>
                                ${escapeHTML(aluno.nome)}
                            </h3>

                            <span>
                                ID: ${aluno.id}
                            </span>

                        </div>

                    </div>


                    <div class="entity-data">

                        <div class="data-row">

                            <span class="data-label">
                                Curso / Série
                            </span>

                            <span class="data-value">
                                ${escapeHTML(aluno.curso)}
                            </span>

                        </div>


                        <div class="data-row">

                            <span class="data-label">
                                Média individual
                            </span>

                            <span class="data-value">
                                ${Number(aluno.media).toFixed(1)}
                            </span>

                        </div>


                        <div class="data-row">

                            <span class="data-label">
                                Frequência
                            </span>

                            <span class="data-value">
                                ${aluno.frequencia}%
                            </span>

                        </div>

                    </div>

                </article>
            `;

        }).join("");

}


/* =========================================================
   EMPTY STATE
========================================================= */

function renderEmptyState(
    container,
    icon,
    message
) {

    container.innerHTML = `
        <div class="empty-state">

            <i class="fa-solid ${icon}"></i>

            <p>
                ${message}
            </p>

        </div>
    `;

}


/* =========================================================
   AUTENTICAÇÃO
========================================================= */

/*
    Quando o JWT estiver implementado, você pode centralizar
    os headers nesta função.
*/

function getAuthHeaders() {

    const token =
        localStorage.getItem("token");


    return {

        "Content-Type":
            "application/json",

        "Authorization":
            `Bearer ${token}`

    };

}


/* =========================================================
   SANITIZAÇÃO
========================================================= */

/*
    Como os dados futuramente virão da API e serão inseridos
    com innerHTML, esta função evita que conteúdo recebido
    do backend seja interpretado como HTML.
*/

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}