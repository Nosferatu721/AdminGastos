<script setup>
import 'vue3-circle-progress/dist/circle-progress.css'
import CircleProgress from 'vue3-circle-progress'
import imagen from '../assets/img/grafico.jpg'
import { formatearCantidad } from '../helpers'

const props = defineProps({
  presupuesto: {
    type: Number,
    default: 0,
    required: true,
  },
  gastado: {
    type: Number,
    default: 0,
    required: true,
  },
  disponible: {
    type: Number,
    default: 0,
    required: true,
  },
  calcularPorcentaje: {
    type: Number,
    default: 0,
    required: true,
  },
})

const emit = defineEmits(['resetear-app'])
</script>

<template>
  <div class="dos-columnas">
    <div class="contenedor-grafico">
      <circle-progress
        :percent="calcularPorcentaje"
        :is-gradient="true"
        :gradient="{
          angle: 90,
          startColor: '#3498ab',
          stopColor: '#2980f9',
        }"
      />
      <span class="current-counter">{{ calcularPorcentaje }}%</span>
    </div>
    <div class="contenedor-presupuesto">
      <button class="reset-app" @click="emit('resetear-app')">Resetear App</button>
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
  padding: 0.5rem;
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
.contenedor-grafico {
  position: relative;
}
.current-counter {
  font-weight: 900;
  font-size: 3rem;
  color: #2980f9;
  position: absolute;
  top: 7.2rem;
  left: 6.6rem;
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
