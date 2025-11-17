let usuarioLogado = null;

const db = {
  usuarios: [
    { email: 'coord@demo.com', senha: '1234', tipo: 'coordenador' },
    { email: 'idoso@demo.com', senha: '1111', tipo: 'idoso' },
    { email: 'fam@demo.com', senha: '2222', tipo: 'familiar' }
  ],
  atividades: []
};

if (localStorage.getItem("atividades")) {
  db.atividades = JSON.parse(localStorage.getItem("atividades"));
}

/* -------- ÍCONES AUTOMÁTICOS -------- */
function getIcone(atividade) {
  const nome = atividade.toLowerCase();

  if (nome.includes("pilates")) return "🧘‍♂️";
  if (nome.includes("caminhada") || nome.includes("andar") || nome.includes("passeio")) return "🚶‍♂️";
  if (nome.includes("alongamento")) return "🤸‍♂️";
  if (nome.includes("dança")) return "💃";
  if (nome.includes("musculação") || nome.includes("treino") || nome.includes("academia")) return "🏋️‍♂️";
  if (nome.includes("yoga")) return "🧘";

  return "🙂";
}

/* -------- LOGIN -------- */
function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const user = db.usuarios.find(u => u.email === email && u.senha === senha);

  if (!user) return alert("Credenciais incorretas.");

  usuarioLogado = user;
  document.getElementById("login").style.display = "none";
  mostrarTela(user.tipo);
}

function mostrarTela(tipo) {
  document.getElementById("coordenador").style.display = "none";
  document.getElementById("idoso").style.display = "none";
  document.getElementById("familiar").style.display = "none";

  if (tipo === "coordenador") atualizarLista();
  if (tipo === "idoso") atualizarListaIdoso();
  if (tipo === "familiar") atualizarListaFamiliar();

  document.getElementById(tipo).style.display = "flex";
}

/* -------- ATIVIDADES -------- */
function adicionarAtividade() {
  const titulo = document.getElementById("titulo").value;
  const horario = document.getElementById("horario").value;
  const local = document.getElementById("local").value;
  const instrutor = document.getElementById("instrutor").value;

  if (!titulo || !horario || !local || !instrutor) {
    return alert("Preencha todos os campos!");
  }

  db.atividades.push({ titulo, horario, local, instrutor });
  localStorage.setItem("atividades", JSON.stringify(db.atividades));

  atualizarLista();
}

function atualizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  db.atividades.forEach((a, i) => {
    lista.innerHTML += `
      <li>
        <div class="info-text">
          <strong>${a.titulo}</strong><br>
          ${a.horario} • ${a.local} • ${a.instrutor}<br>
          <button class="remove-btn" onclick="remover(${i})">Remover</button>
        </div>
        <div class="icone">${getIcone(a.titulo)}</div>
      </li>
    `;
  });
}

function remover(i) {
  db.atividades.splice(i, 1);
  localStorage.setItem("atividades", JSON.stringify(db.atividades));
  atualizarLista();
}

/* -------- IDOSO -------- */
function atualizarListaIdoso() {
  const lista = document.getElementById("listaIdoso");
  lista.innerHTML = "";

  db.atividades.forEach(a => {
    lista.innerHTML += `
      <li>
        <div class="info-text">
          <strong>${a.titulo}</strong><br>
          ${a.horario} • ${a.local}
        </div>
        <div class="icone">${getIcone(a.titulo)}</div>
      </li>
    `;
  });
}

/* -------- FAMILIAR -------- */
function atualizarListaFamiliar() {
  const lista = document.getElementById("listaFamiliar");
  lista.innerHTML = "";

  db.atividades.forEach(a => {
    lista.innerHTML += `
      <li>
        <div class="info-text">
          <strong>${a.titulo}</strong><br>
          ${a.horario} • ${a.local}
        </div>
        <div class="icone">${getIcone(a.titulo)}</div>
      </li>
    `;
  });
}

function sair() {
  location.reload();
}
