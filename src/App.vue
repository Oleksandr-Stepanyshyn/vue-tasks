<template>
  <div id="app">
    <ProcessSelection :select="options[0]" :options="options" :showCheckbox="showCheckbox"
      @checkbox-checked="toggleChecked" @select="optionSelect" />
  </div>
</template>

<script>
import ProcessSelection from '@/components/ProcessSelection.vue'

export default {
  name: 'App',
  data() {
    return {
      options: [
        { id: 1, label: 'Accepted', color: '#04ff00', checked: false },
        { id: 2, label: 'In process', color: '#fff700', checked: true },
        { id: 3, label: 'Rejected', color: '#ff1100', checked: false },
        { id: 4, label: 'Postponed', color: '#00fffb', checked: true },
        { id: 5, label: 'Returned', color: '#0015ff', checked: false },
      ],
      showCheckbox: true,
      selectedId: '',
    }
  },
  methods: {
    optionSelect(option) {
      this.selectedId = option.id;
    },
    toggleChecked(checked) {
      this.options.forEach(opt => {
        if (opt.id === this.selectedId) {
          opt.checked = checked;
          return;
        }
      })
    },
  },
  components: {
    ProcessSelection,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
