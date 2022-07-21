<template>
  <form class="select">
    <div class="select__title" tabindex="0" :style="{ backgroundColor: value.color, borderColor: value.color }"
      @click="openOptions" @keydown.enter="openOptions" data-action="open">
      <input id="checkbox" class="custom-checkbox" name="checkbox" type="checkbox" v-if="showCheckbox && hasValue"
        @change="changeCheckbox" />
      <label class="checkbox__label" v-if="showCheckbox && hasValue" for="checkbox">
        <span class="checkbox__icon" :style="{ borderColor: value.color }">
          <svg width="14" height="14">
            <use href="@/images/sprite.svg#icon-check"></use>
          </svg>
        </span>
      </label>
      <p class="title__text" placeholder="Please select">
        {{ value.label || "Please select" }}
      </p>
      <svg class="title__arrow" :class="{open: areOptionsVisible}" width="14" height="14">
        <use href="@/images/sprite.svg#icon-arrow-down"></use>
      </svg>
    </div>
    <ul class="select__list" role="select" tabindex="0"
      :style="{ minWidth: minWidthList + 'px', maxWidth: maxWidthList+'px' }" v-if="areOptionsVisible"
      @click="closeOptions" @keydown="navigateByOptions($event, options)" v-focus="!hasValue">
      <li class="select__item" role="option" tabindex="-1" v-for="(option, idx) in options" :key="option.id"
        v-focus="idx === focusedOptionIndex" @click="selectOption(option)">
        <span class="item__color" :style="{ backgroundColor: option.color }"></span>
        {{ option.label }}
      </li>
    </ul>
  </form>
</template>

<script>

export default {
  name: 'process-selection',
  model: {
    prop: 'value',
    event: 'select'
  },
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
    },
    minWidthList: {
      type: Number,
      default: 200,
    },
    maxWidthList: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      areOptionsVisible: false,
      focusedOptionIndex: -1,
    }
  },
  computed: {
    hasValue: function () {
      const arrayKeys = Object.keys(this.value);
      const Bool = arrayKeys.includes("id");
      return Bool;
    }
  },
  methods: {
    toggleSelectVisible() {
      this.areOptionsVisible = !this.areOptionsVisible;
    },
    findAndSetFocusedOption(options, value) {
      this.focusedOptionIndex = options.findIndex(({ id }) => id === value.id);
    } ,
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
      this.closeOptions();
      this.findAndSetFocusedOption(this.options, option);
      this.$emit("select", option);
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
          this.selectOption(options[this.focusedOptionIndex]);
          break;
        case "ArrowDown":
          if (this.focusedOptionIndex === - 1) {
            this.focusedOptionIndex = 0;
            this.makeElementFocused(event.currentTarget, this.focusedOptionIndex)
            return;
          }
          if (this.focusedOptionIndex === this.options.length - 1) {
            this.focusedOptionIndex = 0;
            this.makeElementFocused(event.currentTarget, this.focusedOptionIndex)
            return;
          }
          this.focusedOptionIndex = this.focusedOptionIndex + 1;
          this.makeElementFocused(event.currentTarget, this.focusedOptionIndex)
          break;
        case "ArrowUp":
          if (this.focusedOptionIndex === - 1) {
            this.focusedOptionIndex = this.options.length - 1;
            this.makeElementFocused(event.currentTarget, this.focusedOptionIndex)
            return;
          }
          if (this.focusedOptionIndex === 0) {
            this.focusedOptionIndex = this.options.length - 1;
            this.makeElementFocused(event.currentTarget, this.focusedOptionIndex)
            return;
          }
          this.focusedOptionIndex = this.focusedOptionIndex - 1;
          this.makeElementFocused(event.currentTarget, this.focusedOptionIndex)
          break;
        case "ArrowLeft":
          this.focusedOptionIndex = 0;
          this.makeElementFocused(event.currentTarget, this.focusedOptionIndex)
          break;
        case "ArrowRight":
          this.focusedOptionIndex = this.options.length - 1;
          this.makeElementFocused(event.currentTarget, this.focusedOptionIndex)
          break;
        case "Escape":
          this.closeOptions();
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
          el.focus()
        }
        return;
      }
    }
  },
  mounted() {
    this.findAndSetFocusedOption(this.options, this.value);
  }
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
  min-width: 160px;
  max-width: 400px;
  position: relative;
}

.select__title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  font-style: 16px;
  text-align: start;

  line-height: 1.5;

  border-left: 8px solid;
  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8));
}

.custom-checkbox {
  position: absolute;
  top: 45%;
  left: 5px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}
.title__text {
  width: 100%;
  margin-left: 36px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}

.checkbox__icon {
  position: absolute;
  top: 50%;
  left: 9px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 2px solid;
  fill: #ffffff;
  background-color: #ffffff;
}

.custom-checkbox:checked + .checkbox__label .checkbox__icon {
  fill: #000000;
}

.title__arrow {
  margin-right: 12px;
  pointer-events: none;
  /* transition: all 0.3s ease-out; */
}

.title__arrow.open {
  transform: rotate(180deg);
}

.select__title:target .title__arrow{
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