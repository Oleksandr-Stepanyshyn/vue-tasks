<template>
  <form class="select">
    <div class="select__title" tabindex="-1" :style="{ backgroundColor: value.color, borderColor: value.color }"
      @click="openOptions" @keydown.enter="openOptions" data-action="open">
      <input class="custom-checkbox" name="checkbox" type="checkbox" v-if="showCheckbox"
        :style="{ borderColor: value.color }" @change="changeCheckbox" />
      <p class="title--active">
        {{ value.label }}
      </p>
      <svg class="title__icon" width="14" height="14">
        <use href="@/images/sprite.svg#icon-arrow-down"></use>
      </svg>
    </div>
    <ul class="select__list" role="select" tabindex="0" v-if="areOptionsVisible" v-focus @click="closeOptions"
      @keydown="navigateByOptions($event, options)">
      <li class="select__item" role="option" tabindex="-1" v-for="option in options" :key="option.id"
        @click="selectOption(option)">
        <span class="item__color" :style="{ backgroundColor: option.color }"></span>
        {{ option.label }}
      </li>
    </ul>
  </form>
</template>

<script>
export default {
  name: 'process-selection',
  props: {
    value: {
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
      title: this.value,
      areOptionsVisible: false,
      focusedOption: -1,
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
      if (e.target.dataset.action === "open" && this.areOptionsVisible) {
        this.closeOptions();
        return;
      }
      this.toggleSelectVisible()

      document.addEventListener("click", this.hideOptions);
    },
    closeOptions() {
      this.areOptionsVisible = false;
      document.removeEventListener("click", this.hideOptions);
    },
    changeCheckbox(e) {
      this.$emit("checkbox-checked", e.target.checked)
    },
    selectOption(option) {
      this.title = option;
      this.checked = false;
      this.focusedOption = -1;
      this.closeOptions();
      this.$emit("select", option);
      this.$emit("submit", option);
    },
    hideOptions(e) {
      if (e.target.dataset.action === "open") {
        return;
      }
      this.closeOptions()
    },
    makeElementFocused(parentEl, childIndex) {
      parentEl.children[childIndex].focus()
    },
    navigateByOptions(event, options) {
      switch (event.code) {
        case "Enter":
          this.selectOption(options[this.focusedOption]);
          break;
        case "ArrowDown":
          if (this.focusedOption === - 1) {
            this.focusedOption = 0;
            this.makeElementFocused(event.currentTarget, this.focusedOption)
            return;
          }
          if (this.focusedOption === this.options.length - 1) {
            this.focusedOption = 0;
            this.makeElementFocused(event.currentTarget, this.focusedOption)
            return;
          }
          this.focusedOption = this.focusedOption + 1;
          this.makeElementFocused(event.currentTarget, this.focusedOption)
          break;
        case "ArrowUp":
          if (this.focusedOption === - 1) {
            this.focusedOption = this.options.length - 1;
            this.makeElementFocused(event.currentTarget, this.focusedOption)
            return;
          }
          if (this.focusedOption === 0) {
            this.focusedOption = this.options.length - 1;
            this.makeElementFocused(event.currentTarget, this.focusedOption)
            return;
          }
          this.focusedOption = this.focusedOption - 1;
          this.makeElementFocused(event.currentTarget, this.focusedOption)
          break;
        case "ArrowLeft":
          this.focusedOption = 0;
          this.makeElementFocused(event.currentTarget, this.focusedOption)
          break;
        case "ArrowRight":
          this.focusedOption = this.options.length - 1;
          this.makeElementFocused(event.currentTarget, this.focusedOption)
          break;
      
        default:
          break;
      }
    },
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
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
  color: red;
  background-color: #ffffff;
  border-color: red;
}

.custom-checkbox::before {
  content: '';
  position: absolute;
  top: -1px;
  width: 14px;
  height: 14px;

  border: 1px solid inherit;
  border-radius: 2px;
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
  max-width: 400px;
  position: absolute;
  /* border: 1px solid gray; */
  border-radius: 4px;
  z-index: 12;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}

.select__item {
  display: flex;
  position: relative;
  text-align: start;
  padding: 8px;
  padding-left: 36px;
  cursor: pointer;
  outline: none;
}

.select__item:hover{
  background-color: #edecec;
}

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
  border-radius: 2px;
  background-color: inherit;
}
</style>