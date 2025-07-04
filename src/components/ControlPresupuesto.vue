<script setup>
import imagen from '../assets/img/grafico.jpg';
import { formatearCantidad } from '../helpers';

const props = defineProps({
  presupuesto: {
    type: Number,
    default: 0,
    required: true
  },
  gastado: {
    type: Number,
    default: 0,
    required: true
  },
  disponible: {
    type: Number,
    default: 0,
    required: true
  }
});
</script>

<template>
  <div class="dos-columnas">
    <div class="contenedor-grafico">
      <img :src="imagen" alt="Gráfico de gastos" />
    </div>
    <div class="contenedor-presupuesto">
      <button class="reset-app">Resetear App</button>
      <p><span>Presupuesto:</span> {{ formatearCantidad(props.presupuesto) }}</p>
      <p><span>Disponible:</span> {{ formatearCantidad(props.disponible) }}</p>
      <p><span>Gastado:</span> {{ formatearCantidad(props.gastado) }}</p>
    </div>
  </div> 
</template>

<style scoped>
.dos-columnas {
  display: flex;
  flex-direction: column;
}

.dos-columnas > :first-child {
  margin-bottom: 3rem;
}

.contenedor-presupuesto {
  width: 100%;
}
.contenedor-presupuesto p {
  font-size: 2.4rem;
  text-align: center;
  color: var(--gris-oscuro);
  padding: .5rem;
}
.contenedor-presupuesto span {
  font-weight: 900;
  color: var(--azul);
}

.reset-app {
  background-color: #db2777;
  color: white;
  border: none;
  padding: 1rem;
  width: 100%;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 900;
  cursor: pointer;
  border-bottom: 1rem;
  transition-property: background-color;
  transition-duration: 0.3s;
}

.reset-app:hover {
  background-color: #c0327b;
}

@media (min-width: 768px) {
  .dos-columnas {
    flex-direction: row;
    gap: 4rem;
    align-items: center;
  }
  .dos-columnas > :first-child {
    margin-bottom: 0;
  }
  .contenedor-presupuesto p {
    text-align: left;
  }
}
</style>
