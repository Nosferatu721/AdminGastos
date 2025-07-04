export const formatearCantidad = (cantidad) => {
  return parseInt(cantidad).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
};
