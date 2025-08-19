import { API } from './services/api.js';

export async function checkAuthOrRedirect() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Debes iniciar sesión');
    window.location.href = 'login.html';
    return null;
  }
  try {
    const res = await API.verifyToken();
    if (!res.ok) throw new Error('Token inválido');
    const data = await res.json();
    if (!data?.user || data.user.role !== 'admin') {
      alert('No tienes permisos para acceder a esta página.');
      window.location.href = 'login.html';
      return null;
    }
    return data.user; // { id, email, role }
  } catch (e) {
    alert('Tu sesión ha expirado. Inicia sesión nuevamente.');
    window.location.href = 'login.html';
    return null;
  }
}