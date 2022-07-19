<template>
  <div class="select">
    <div class="select__title" :style="{ backgroundColor: title.color, borderColor: title.color }" @click="openOptions"
      data-action="open">
      <input class="custom-checkbox" name="checkbox" type="checkbox" v-if="showCheckbox"
        :style="{ borderColor: title.color }" :checked="checked" @change="changeCheckbox" />
      <p class="title--active" data-action="open">{{ title.label }}</p>
      <svg class="title__icon" width="14" height="14">
        <use href="@/images/sprite.svg#icon-arrow-down"></use>
      </svg>
    </div>
    <form class="select__form" v-if="areOptionsVisible" @click="closeOptions">
      <label class="select__label" v-for="option in options" :key="option.id" @click="selectOption(option)">
        <input class="select__input" type="radio" :style="{ backgroundColor: option.color }" />
        {{ option.label }}
      </label>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    select: {
      type: Object
    },
    options: {
      type: Array,
      required: true
    },
    showCheckbox: {
      type: Boolean,
    }
  },
  data() {
    return {
      title: this.select,
      areOptionsVisible: false,
      checked: false
    }
  },
  methods: {
    toggleSelectVisible() {
      this.areOptionsVisible = !this.areOptionsVisible;
    },
    openOptions(e) {
      if (e.target.type === "checkbox") {
        return;
      }
      this.toggleSelectVisible();
      document.addEventListener("click", this.hideOptions);
    },
    closeOptions() {
      this.areOptionsVisible = false;
      document.removeEventListener("click", this.hideOptions);
    },
    changeCheckbox(e) {
      this.$emit("checkbox-checked", e.target.checked)
      this.checked = e.target.checked
      if (e.target.checked) {
        this.title = this.options[0]
      }
    },
    selectOption(option) {
      this.title = option;
      this.checked = false;
      this.toggleSelectVisible();
      this.$emit("select", option);
    },
    hideOptions(e) {
      if (e.target.dataset.action === "open" || e.target.type === "radio") {
        return;
      }
      this.closeOptions()
    }
  },
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  display: block;
  color: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

.select {
  width: 100%;
  position: relative;
}

.select__title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-style: 16px;
  text-align: start;

  line-height: 3;

  border-left: 8px solid;
  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8));
}

.custom-checkbox {
  position: absolute;
  top: 45%;
  left: 4px;
  transform: translateY(-50%);
  border-color: red;
}

.custom-checkbox::before {
  content: '';
  position: absolute;
  top: -1px;
  width: 14px;
  height: 14px;

  /* border: 1px solid; */
  /* border-color: inherit; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-color: #fff;
}

.custom-checkbox:checked::before {
  background-image: url('@/images/check.png');
}

.title--active {
  margin-left: 32px;
  cursor: pointer;
}

.title__icon {
  margin-right: 12px;
  pointer-events: none;
}

.select__title:target .title__icon{
  rotate: 45deg;
}

.select__form {
  width: 200px;
  position: absolute;
  border: 1px solid gray;
  border-left: 3px solid gray;
  z-index: 12;
  background-color: #fff;
}

.select__label {
  display: flex;
  position: relative;
  padding: 8px;
  padding-left: 36px;
  cursor: pointer;

}

.select__label:hover,
.select__label:focus {
  background-color: #5ee2ff;
}
.select__input{
  position: absolute;
  left: 8px;
}
.select__input::before {
  content: "";
  position: absolute;
  left: 0;
  width: 13px;
  height: 13px;
  background-color: inherit;
}
</style>