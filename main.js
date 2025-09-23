'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields();
    document.getElementById('modal')
    .classList.remove('active')
}

const clienteTemp = {
    nome: "Pedro",
    email: "peu@gmail.com",
    celular: "11123459876",
    cidade: "São Roque"
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
        criaCliente(cliente);
        closeModal();
    }
}

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveCliente)