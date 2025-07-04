<script setup>
import { ref } from 'vue';
import Alerta from './Alerta.vue';

const emit = defineEmits(['definir-presupuesto']);

const nuevoPresupuesto = ref(0);
const error = ref('');

const definirPresupuesto = () => {
  if (nuevoPresupuesto.value <= 0) {
    error.value = 'El presupuesto debe ser mayor a 0';
    setTimeout(() => {
      error.value = '';
    }, 3000);
  }
  emit('definir-presupuesto', nuevoPresupuesto.value);
};
</script>

<template>
  <form class="presupuesto" @submit.prevent="definirPresupuesto">
    <Alerta v-if="error">
      <p>{{ error }}</p>
    </Alerta>
    <div class="campo">
      <label for="nuevo-presupuesto">Nuevo Presupuesto</label>
      <input type="number" id="nuevo-presupuesto" class="nuevo-presupuesto" placeholder="Ingresa tu presupuesto" v-model="nuevoPresupuesto" />
    </div>
    <input type="submit" id="submit" class="submit" value="Definir Presupuesto" />
  </form>
</template>

<style scoped>
.presupuesto {
  width: 100%;
}
.campo {
  display: grid;
  gap: 2rem;
}
.presupuesto label {
  font-size: 2.8rem;
  text-align: center;
  color: var(--gris-oscuro);
  font-weight: 700;
}
.presupuesto input[type='number'] {
  background-color: var(--gris-claro);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
  text-align: center;
}
.presupuesto input[type='submit'] {
  background-color: var(--azul);
  border: none;
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
  margin-top: 2rem;
  color: var(--blanco);
  font-weight: 900;
  width: 100%;
  transition: background-color 0.3s ease;
}
.presupuesto input[type='submit']:hover {
  cursor: pointer;
  background-color: #1048a4;
}
</style>
