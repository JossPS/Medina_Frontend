document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  
  form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que el formulario recargue la página

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('https://medina-backend.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem('token', data.token); // Guarda el token
      window.location.href = 'admin.html';       // Redirige al panel de admin
    } else {
      alert(data.message || 'Error al iniciar sesión');
    }

  } catch (error) {
    console.error('Error en la solicitud:', error);
    alert('Hubo un error al conectar con el servidor');
  }
});
});
