<script lang="ts" setup>
const props = defineProps({
  filtro: {
    type: String,
    default: '',
  },
})
defineEmits(['update:filtro'])
</script>

<template>
  <div class="filtros sombra contenedor">
    <form>
      <div class="campo">
        <label for="filtro">Filtrar Gastos</label>
        <select id="filtro" @change="$emit('update:filtro', $event.target.value)">
          <option value="all" selected>Todo</option>
          <option value="ahorro">Ahorro</option>
          <option value="comida">Comida</option>
          <option value="casa">Casa</option>
          <option value="gastos">Gastos</option>
          <option value="ocio">Ocio</option>
          <option value="salud">Salud</option>
          <option value="suscripciones">Suscripciones</option>
        </select>
      </div>
    </form>
  </div>
</template>

<style scoped>
.filtros {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 7rem;
}
.filtros form {
  width: 100%;
}
.filtros .campo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.filtros label {
  font-weight: bold;
  font-size: 3rem;
  color: var(--gris-oscuro);
  margin-right: 1rem;
}
.filtros select {
  width: 50%;
  padding: 1rem;
  font-size: 1.6rem;
  border-radius: 1rem;
  border: none;
  background-color: #ebebeb;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}
.filtros select option {
  font-size: 1.6rem;
  color: var(--gris-oscuro);
}
</style>
