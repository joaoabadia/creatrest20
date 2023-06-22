// Abre ou cria o banco de dados
var request = indexedDB.open('usersDB', 1);
var db;

request.onupgradeneeded = function (event) {
    // Cria a estrutura do banco de dados caso não exista
    db = event.target.result;
    var objectStore = db.createObjectStore('users', { keyPath: 'username' });
    objectStore.createIndex('username', 'username', { unique: true });
};

request.onsuccess = function (event) {
    db = event.target.result;
};

request.onerror = function (event) {
    console.log('Erro ao abrir o banco de dados:', event.target.error);
};

function signup() {
    var username = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;
    var email = document.getElementById('signupEmail').value;
    var name = document.getElementById('signupName').value;

    var transaction = db.transaction(['users'], 'readwrite');
    var objectStore = transaction.objectStore('users');
    var request = objectStore.add({ username: username, password: password, email: email, name: name });

    request.onsuccess = function (event) {
        window.location.href = '/pages/users/login.html'; // Redireciona para a página de login
        alert('Registro bem-sucedido!');
    };

    request.onerror = function (event) {
        console.log('Erro ao registrar:', event.target.error);
    };
}
