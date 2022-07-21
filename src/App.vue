<template>
  <div id="app">
    <input type="text" style="marginBottom: 20px">
    <div class="select__container">
      <ProcessSelection v-model="value" :options="options" :showCheckbox="showCheckbox" :minWidthList="300"
        :maxWidthList="500" @checkbox-checked="toggleChecked" />
    </div>
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
        { id: 4, label: 'Postponed Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium eligendi eveniet porro optio sed odio rem veniam debitis quia numquam.', color: '#00fffb', checked: true },
        { id: 5, label: 'Returned', color: '#0015ff', checked: false },
      ],
      showCheckbox: true,
      value: { id: 2, label: 'In process', color: '#fff700', checked: true },
    }
  },
  methods: {
    optionSelect(option) {
      this.value = option;
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

.select__container {
  width: 500px;
  text-align: center;
}
</style>
