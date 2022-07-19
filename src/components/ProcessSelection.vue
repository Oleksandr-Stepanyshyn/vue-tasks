<template>
  <form class="select">
    <div class="select__title" tabindex="0" :style="{ backgroundColor: title.color, borderColor: title.color }"
      @click="openOptions" @keydown.enter="openOptions" data-action="open">
      <input class="custom-checkbox" name="checkbox" type="checkbox" v-if="showCheckbox"
        :style="{ borderColor: title.color }" :checked="checked" @change="changeCheckbox" />
      <p class="title--active" data-action="open">{{ title.label }}</p>
      <svg class="title__icon" width="14" height="14">
        <use href="@/images/sprite.svg#icon-arrow-down"></use>
      </svg>
    </div>
    <ul class="select__list" role="select" tabindex="0" v-if="areOptionsVisible" @click="closeOptions">
      <li class="select__item" tabindex="-1" v-for="(option, idx) in options" v-focus="idx === focusedOption"
        :key="option.id" @click="selectOption(option)" @keydown="navigateByOptions(option, $event)">
        <span class="item__color" type="radio" :style="{ backgroundColor: option.color }"></span>
        {{ option.label }}
      </li>
    </ul>
  </form>
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
      checked: false,
      focusedOption: 0,
    }
  },
  methods: {
    toggleSelectVisible() {
      this.areOptionsVisible = !this.areOptionsVisible;
    },
    async openOptions(e) {
      console.log(e.target.nextSibling.firstChild)
      if (e.target.type === "checkbox") {
        return;
      }
      await this.toggleSelectVisible();

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
    },
    navigationBySelection() {
      
    },
    navigateByOptions(option, event) {
      switch (event.code) {
        case "Enter":
          this.selectOption(option);
          break;
        case "ArrowDown":
          if (this.focusedOption === this.options.length - 1) {
            this.focusedOption = 0;
            return;
          }
          this.focusedOption = this.focusedOption + 1;
          break;
        case "ArrowUp":
          if (this.focusedOption === 0) {
            this.focusedOption = this.options.length - 1;
            return;
          }
          this.focusedOption = this.focusedOption - 1;
          break;
        case "ArrowLeft":
          this.focusedOption = 0;
          break;
        case "ArrowRight":
          this.focusedOption = this.options.length - 1;
          break;
      
        default:
          break;
      }
    },
  },
  directives: {
    focus: {
      inserted: function (el, binding) {
        if (binding.value) {
          el.focus();
        }
        return;
      }
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
  pointer-events: none;
}

.title__icon {
  margin-right: 12px;
  pointer-events: none;
}

.select__title:target .title__icon{
  rotate: 45deg;
}

.select__list {
  min-width: 200px;
  position: absolute;
  /* border: 1px solid gray; */
  border-left: 3px solid gray;
  z-index: 12;
  background-color: #edecec;
}

.select__item {
  display: flex;
  position: relative;
  padding: 8px;
  padding-left: 36px;
  cursor: pointer;
  outline: none;
}

.select__item:hover,
.select__item:focus {
  background-color: #5ee2ff;
}
.item__color::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background-color: inherit;
}
</style>