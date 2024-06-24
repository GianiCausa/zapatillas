const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;

const emailValue = emailInput.value.trim();
    if (!validateEmail(emailValue)) {
        emailError.style.display = 'block';
        valid = false;
    } else {
        emailError.style.display = 'none';
    }

    const passwordValue = passwordInput.value.trim();
    if (passwordValue === '') {
        passwordError.style.display = 'block';
           valid = false;
    } else {
        passwordError.style.display = 'none';
    }

    if (valid) {
        alert('Inicio de sesión exitoso');
        window.location.href = 'index.html';
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}