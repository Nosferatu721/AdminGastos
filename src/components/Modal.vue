<script lang="ts" setup>
import { ref } from 'vue'
import cerrarModal from '../assets/img/cerrar.svg'
import Alerta from './Alerta.vue'

const emit = defineEmits(['cerrar-modal', 'update:nombre', 'update:cantidad', 'update:categoria', 'guardar-gasto'])

const error = ref('')

const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  presupuesto: {
    type: Number,
    required: true,
  },
  disponible: {
    type: Number,
    required: true,
  },
  gastado: {
    type: Number,
    required: true,
  },
  gastoId: {
    type: String,
    default: null,
  },
  gastos: {
    type: Array,
    required: true,
  },
})

const agregarGasto = () => {
  // Validar los campos
  if (!props.nombre || props.cantidad <= 0 || !props.categoria) {
    error.value = 'Por favor, completa todos los campos correctamente.'
    setTimeout(() => {
      error.value = ''
    }, 3000)
    return
  }

  // Validar si se pasa de presupuesto
  if (props.gastoId) {
    // Actualizar gasto existente
    const index = props.gastos.findIndex((g) => g.id === props.gastoId)
    if (index !== -1) {
      let gastoExistente = props.gastos[index].cantidad
      let nuevoDisponible = props.disponible + gastoExistente
      if (nuevoDisponible < props.cantidad) {
        error.value = 'No puedes exceder el presupuesto disponible.'
        setTimeout(() => {
          error.value = ''
        }, 3000)
        return
      }
    }
  } else {
    // Validar si se pasa de presupuesto al agregar un nuevo gasto
    if (props.cantidad > props.disponible) {
      error.value = 'No puedes exceder el presupuesto disponible.'
      setTimeout(() => {
        error.value = ''
      }, 3000)
      return
    }
  }

  // Si todo es válido, emitir el evento para guardar el gasto
  emit('guardar-gasto')
}
</script>
<template>
  <div class="modal">
    <div class="cerrar-modal" @click="emit('cerrar-modal')">
      <img :src="cerrarModal" alt="Cerrar modal" />
    </div>

    <div class="contenedor contenedor-formulario" :class="[modal.animar ? 'animar' : 'cerrar']">
      <form class="nuevo-gasto" @submit.prevent="agregarGasto">
        <legend>Añadir Gasto</legend>
        <Alerta v-if="error">{{ error }}</Alerta>
        <div class="campo">
          <label for="nombre">Nombre Gasto</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añade el nombre del gasto"
            :value="nombre"
            @input="emit('update:nombre', $event.target.value)"
          />
        </div>
        <div class="campo">
          <label for="cantidad">Cantidad Gasto</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Añade la cantidad del gasto"
            :value="cantidad"
            @input="emit('update:cantidad', Number($event.target.value))"
          />
        </div>
        <div class="campo">
          <label for="categoria">Categoría Gasto</label>
          <select name="categoria" id="categoria" :value="categoria" @change="emit('update:categoria', $event.target.value)">
            <option value="">Selecciona una categoría</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" :value="gastoId ? 'Actualizar Gasto' : 'Añadir Gasto'" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0 / 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.cerrar-modal {
  position: absolute;
  top: 3rem;
  right: 3rem;
}
.cerrar-modal img {
  width: 3rem;
  cursor: pointer;
}

.contenedor-formulario {
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
  opacity: 0;
}
.contenedor-formulario.animar {
  opacity: 1;
}
.contenedor-formulario.cerrar {
  opacity: 0;
}

.nuevo-gasto {
  margin: 10rem auto 0 auto;
  display: grid;
  gap: 2rem;
}

.nuevo-gasto legend {
  color: var(--blanco);
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
}
.campo {
  display: grid;
  gap: 2rem;
}
.nuevo-gasto input,
.nuevo-gasto select {
  background-color: var(--gris-claro);
  border-radius: 1rem;
  padding: 1rem;
  font-size: 2.2rem;
  border: none;
}
.nuevo-gasto label {
  color: var(--blanco);
  font-size: 3rem;
}
.nuevo-gasto input[type='submit'] {
  background-color: var(--azul);
  color: var(--blanco);
  font-weight: 700;
  cursor: pointer;
}
</style>
