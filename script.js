let usuarioLogado = null

const db = {
  usuarios: [
    { email: 'coord@demo.com', senha: '1234', nome: 'Coordenador', tipo: 'coordenador' },
    { email: 'idoso@demo.com', senha: '1111', nome: 'João', tipo: 'idoso' },
    { email: 'fam@demo.com', senha: '2222', nome: 'Maria', tipo: 'familiar', idoso: 'idoso@demo.com' }
  ],
  atividades: []
}

function login() {
  const email = document.getElementById('email').value
  const senha = document.getElementById('senha').value

  const user = db.usuarios.find(u => u.email === email && u.senha === senha)

  if (!user) {
    alert('Credenciais incorretas')
    return
  }

  usuarioLogado = user
  mostrarTela(user.tipo)
}

function mostrarTela(tipo) {
  document.getElementById('login').style.display = 'none'
  document.getElementById('coordenador').style.display = 'none'
  document.getElementById('idoso').style.display = 'none'
  document.getElementById('familiar').style.display = 'none'

  if (tipo === 'coordenador') atualizarLista()
  if (tipo === 'idoso') atualizarListaIdoso()
  if (tipo === 'familiar') atualizarListaFamiliar()

  document.getElementById(tipo).style.display = 'block'
}

function adicionarAtividade() {
  const titulo = document.getElementById('titulo').value
  const horario = document.getElementById('horario').value
  const local = document.getElementById('local').value
  const instrutor = document.getElementById('instrutor').value

  db.atividades.push({ titulo, horario, local, instrutor })
  atualizarLista()
}

function atualizarLista() {
  const box = document.getElementById('listaAtividades')
  box.innerHTML = ''

  db.atividades.forEach((a, i) => {
    const div = document.createElement('div')
    div.className = 'card'
    div.innerHTML = `<b>${a.titulo}</b><br>${a.horario} • ${a.local} • ${a.instrutor}<br><br>
      <button class='btn' onclick='remover(${i})'>Remover</button>`
    box.appendChild(div)
  })
}

function remover(i) {
  db.atividades.splice(i, 1)
  atualizarLista()
}

function atualizarListaIdoso() {
  const box = document.getElementById('atividadesIdoso')
  box.innerHTML = ''

  db.atividades.forEach(a => {
    const div = document.createElement('div')
    div.className = 'card'
    div.innerHTML = `<b>${a.titulo}</b><br>${a.horario} • ${a.local} • ${a.instrutor}`
    box.appendChild(div)
  })
}

function atualizarListaFamiliar() {
  const box = document.getElementById('atividadesFamiliar')
  box.innerHTML = ''

  db.atividades.forEach(a => {
    const div = document.createElement('div')
    div.className = 'card'
    div.innerHTML = `<b>${a.titulo}</b><br>${a.horario} • ${a.local} • ${a.instrutor}`
    box.appendChild(div)
  })
}

function sair() {
  usuarioLogado = null
  document.getElementById('login').style.display = 'block'
  document.getElementById('coordenador').style.display = 'none'
  document.getElementById('idoso').style.display = 'none'
  document.getElementById('familiar').style.display = 'none'
}