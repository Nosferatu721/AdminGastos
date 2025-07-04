<script setup>
import { onMounted, ref, watch } from 'vue'
import { uid } from 'uid'
import iconoNuevoGasto from './assets/img/nuevo-gasto.svg'
import Presupuesto from './components/Presupuesto.vue'
import ControlPresupuesto from './components/ControlPresupuesto.vue'
import Modal from './components/Modal.vue'
import Gasto from './components/Gasto.vue'

const modal = ref({
  mostrar: false,
  animar: false,
})

const presupuesto = ref(0)
const disponible = ref(0)
const gastado = ref(0)

const gasto = ref({
  nombre: '',
  cantidad: 0,
  categoria: '',
  id: null,
  fecha: Date.now(),
})

const gastos = ref([])

watch(
  gastos,
  () => {
    const totalGastado = gastos.value.reduce((total, gasto) => total + Number(gasto.cantidad), 0)
    gastado.value = totalGastado
    disponible.value = presupuesto.value - totalGastado
    localStorage.setItem('gastado', totalGastado.toString())
    localStorage.setItem('disponible', disponible.value.toString())
    localStorage.setItem('gastos', JSON.stringify(gastos.value))
  },
  { deep: true }
)

onMounted(() => {
  const gastosGuardados = localStorage.getItem('gastos')
  const presupuestoGuardado = localStorage.getItem('presupuesto')
  const gastadoGuardado = localStorage.getItem('gastado')
  const disponibleGuardado = localStorage.getItem('disponible')
  if (presupuestoGuardado) presupuesto.value = Number(presupuestoGuardado)
  if (gastadoGuardado) gastado.value = Number(gastadoGuardado)
  if (disponibleGuardado) disponible.value = Number(disponibleGuardado)

  if (gastosGuardados) {
    gastos.value = JSON.parse(gastosGuardados).map(gasto => ({
      ...gasto,
      cantidad: Number(gasto.cantidad)
    }))
  }
})

const definirPresupuesto = (cantidad) => {
  if (cantidad <= 0) {
    alert('El presupuesto debe ser mayor a 0')
    return
  }
  presupuesto.value = Number(cantidad)
  localStorage.setItem('presupuesto', cantidad.toString())
}

const mostrarModal = () => {
  modal.value.mostrar = true
  setTimeout(() => {
    modal.value.animar = true
  }, 300)
}

const cerrarModal = () => {
  limpiarGasto()
  modal.value.animar = false
  setTimeout(() => {
    modal.value.mostrar = false
  }, 300)
}

const limpiarGasto = () => {
  gasto.value = {
    nombre: '',
    cantidad: 0,
    categoria: '',
    id: null,
    fecha: Date.now(),
  }
}

const guardarGasto = () => {
  // Asegurar que cantidad sea un número
  gasto.value.cantidad = Number(gasto.value.cantidad)
  
  if (gasto.value.id) {
    // Actualizar gasto existente
    const index = gastos.value.findIndex((g) => g.id === gasto.value.id)
    if (index !== -1) {
      gastos.value[index] = { ...gasto.value }
    }
  } else {
    // Agregar nuevo gasto
    gastos.value.push({ ...gasto.value, id: uid(), fecha: new Date() })
  }
  limpiarGasto()
  cerrarModal()
}
const seleccionarGasto = (id) => {
  const gastoSeleccionado = gastos.value.find((gasto) => gasto.id === id)
  gasto.value = { ...gastoSeleccionado }
  mostrarModal()
}
</script>

<template>
  <div :class="{ fijar: modal.mostrar }">
    <header>
      <h1>Planificador de Gastos</h1>

      <div class="contenedor-header contenedor sombra">
        <Presupuesto v-if="!presupuesto" @definir-presupuesto="definirPresupuesto" />
        <ControlPresupuesto v-else :presupuesto="presupuesto" :gastado="gastado" :disponible="disponible" />
      </div>
    </header>
    <main>
      <div class="listado-gastos contenedor">
        <h2>{{ gastos.length > 0 ? 'Listado de Gastos' : 'No hay gastos registrados' }}</h2>
        <Gasto v-for="gasto in gastos" :key="gasto.id" :gasto="gasto" @seleccionar-gasto="seleccionarGasto" />
      </div>
      <div class="crear-gasto" v-if="presupuesto">
        <img :src="iconoNuevoGasto" alt="Icono nuevo gasto" @click="mostrarModal" />
      </div>
      <Modal
        v-if="modal.mostrar"
        :animar="modal.animar"
        @cerrar-modal="cerrarModal"
        :modal="modal"
        v-model:nombre="gasto.nombre"
        v-model:cantidad="gasto.cantidad"
        v-model:categoria="gasto.categoria"
        @guardar-gasto="guardarGasto"
        :presupuesto="presupuesto"
        :disponible="disponible"
        :gastado="gastado"
        :gastoId="gasto.id"
        :gastos="gastos"
      />
    </main>
  </div>
</template>

<style>
:root {
  --azul: #3b82f6;
  --blanco: #fff;
  --gris-claro: #f5f5f5;
  --gris: #94a3b8;
  --gris-oscuro: #64748b;
  --negro: #000;
}
html {
  font-size: 62.5%;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
body {
  font-size: 1.6rem;
  font-family: 'Lato', sans-serif;
  background-color: var(--gris-claro);
}
h1 {
  font-size: 4rem;
}
h2 {
  font-size: 3rem;
}
.fijar {
  overflow: hidden;
  height: 100vh;
}
header {
  background-color: var(--azul);
  h1 {
    padding: 3rem 0;
    margin: 0;
    color: var(--blanco);
    text-align: center;
  }
}

.contenedor {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}
.contenedor-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}
.sombra {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--blanco);
  border-radius: 1.2rem;
  padding: 5rem;
}
.crear-gasto {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}
.crear-gasto img {
  width: 5rem;
  cursor: pointer;
}

.listado-gastos {
  margin-top: 10rem;
}
.listado-gastos h2 {
  font-weight: 900;
  color: var(--gris-oscuro);
  text-align: center;
  margin-bottom: 2rem;
}
</style>
