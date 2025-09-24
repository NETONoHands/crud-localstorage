'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields();
    document.getElementById('modal')
    .classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db-client')) ?? [];

const setLocalStorage = (dbClient) => localStorage.setItem("db-client", JSON.stringify(dbClient));

const readClient = () => getLocalStorage();

const deleteCliente = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
}

const updateClient = (index, cliente) => {
    const dbClient = readClient();
    dbClient[index] = cliente;
    setLocalStorage(dbClient);
}

const criaCliente = (cliente) => {
    const dbClient = getLocalStorage();
    dbClient.push(cliente);
    setLocalStorage(dbClient);
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}

const clearFields= () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = '');
}

const saveCliente = () => {
    if (isValidFields()) {
        const cliente = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index;

        if (index == 'novo') {
            criaCliente(cliente);
            updateTabela()
            closeModal();
        } else {
            updateClient(index, cliente);
            updateTabela();
            closeModal();
        }
    }
}

const createRow = (cliente, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${cliente.nome}</td>
    <td>${cliente.email}</td>
    <td>${cliente.celular}</td>
    <td>${cliente.cidade}</td>
    <td>
        <button type="button" class="button green" id="editar-${index}">Editar</button>
        <button type="button" class="button red" id="deletar-${index}">Excluir</button>    
    </td>
    `

    document.querySelector('#tbCliente>tbody').appendChild(newRow);
}

const clearTabela = () => {
    const rows = document.querySelectorAll('#tbCliente>tbody tr');
    rows.forEach(row => row.parentElement.removeChild(row));
}

const updateTabela = () => {
    clearTabela();
    const dbClient = readClient();
    dbClient.forEach(createRow);
}

const preencheCampos = (cliente) => {
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('email').value = cliente.email;
    document.getElementById('celular').value = cliente.celular;
    document.getElementById('cidade').value = cliente.cidade;
    document.getElementById('nome').dataset.index = cliente.index
}

const editaCliente = (index) => {
    const cliente = readClient()[index]
    preencheCampos(cliente);
    openModal();
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-');
        if (action == 'editar') {
            editaCliente(index);
        } else {
            console.log("deletando");
        }
    }
}

updateTabela()

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveCliente)

document.querySelector('#tbCliente>tbody')
    .addEventListener('click', editDelete)