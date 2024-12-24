document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Utilisateur inscrit avec succès') {
            alert('Inscription réussie !');
        } else {
            alert('Erreur : ' + data.message);
        }
    });
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Sauvegarder le token dans le localStorage pour l'utiliser lors des requêtes suivantes
            localStorage.setItem('token', data.token);
            alert('Connexion réussie !');
            showProfile();
        } else {
            alert('Erreur : ' + data.message);
        }
    });
});


function showProfile() {
    const token = localStorage.getItem('token');
    
    if (token) {
        fetch('http://localhost:3000/api/profile', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-name').innerText = `${data.first_name} ${data.last_name}`;
            document.getElementById('profile-section').style.display = 'block';
            document.getElementById('nav-profile-btn').style.display = 'inline-block';
            document.getElementById('nav-login-btn').style.display = 'none';
            document.getElementById('nav-register-btn').style.display = 'none';
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'none';
        });
    }
}

document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('token');
    alert('Déconnexion réussie !');
    window.location.reload();
});

// Afficher le profil si l'utilisateur est connecté au chargement de la page
if (localStorage.getItem('token')) {
    showProfile();
}
