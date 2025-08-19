import { API_URL } from './config.js';

export async function fetchProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Respuesta inválida del backend");
  return data;
}
