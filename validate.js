document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('success-message');
    const fields = ['nome', 'email', 'assunto', 'mensagem'];
    const maxChar = { 'nome': 50, 'email': 50, 'assunto': 50, 'mensagem': 300 };
    const errors = {};

    fields.forEach(field => {
        errors[field] = document.getElementById(`${field}-error`);
        document.getElementById(field).addEventListener('input', validateForm);
    });

    function validateForm() {
        let isValid = true;
        fields.forEach(field => {
            errors[field].textContent = '';
            const value = document.getElementById(field).value.trim();
            if (value === '') {
                errors[field].textContent = `Por favor, preencha o campo ${field.charAt(0).toUpperCase() + field.slice(1)}.`;
                isValid = false;
            } else if (value.length > maxChar[field]) {
                errors[field].textContent = `${field.charAt(0).toUpperCase() + field.slice(1)} muito grande! Tamanho máximo: ${maxChar[field]} caracteres.`;
                isValid = false;
            } else if (field === 'email' && !isValidEmail(value)) {
                errors[field].textContent = 'Formato de email inválido. Exemplo: texto@texto.com.';
                isValid = false;
            }
        });

        submitBtn.disabled = !isValid;
    }

    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        if (!submitBtn.disabled) {
            form.submit();
            form.reset();
            successMessage.textContent = 'Mensagem enviada! Em breve entraremos em contato.';
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});


