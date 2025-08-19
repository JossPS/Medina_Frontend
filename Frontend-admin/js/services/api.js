const API = (() => {
  const BASE_URL = 'https://medina-backend.onrender.com';

  // Funcion para traer el token de autenticación
  const getToken = () => localStorage.getItem('token');

  const fetchWithAuth = async (url, options = {}) => {
    const token = getToken();
    const headers = options.headers || {};
    return fetch(url, {
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };
//
  const verifyToken = () => fetchWithAuth(`${BASE_URL}/api/auth/verify-token`);

  //Fetch para obtener los productos
  const fetchProducts = () => fetchWithAuth(`${BASE_URL}/api/products`).then(res => res.json());

  const createProduct = (formData) =>
    fetchWithAuth(`${BASE_URL}/api/products`, {
      method: 'POST',
      body: formData,
    });

  const updateProduct = (id, formData) =>
    fetchWithAuth(`${BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      body: formData,
    });

  const deleteProduct = (id) =>
    fetchWithAuth(`${BASE_URL}/api/products/${id}`, {
      method: 'DELETE',
    });

  return {
    verifyToken,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
})();
