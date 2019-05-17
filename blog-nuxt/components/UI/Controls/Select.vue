<template>
  <on-click-outside :do='close'>
    <div class="select">
      <button type="button" @click="open">
        <span v-if="value !== null" class="field_select">{{ value }}</span>
        <span v-else class="field_select">Тип связи</span>
      </button>
      <div v-show="isOpen" class="dropdown_select">
        <input
          ref="search"
          v-model="search"
          @keydown.esc="close"
          @keydown.up="highlightedPrev"
          @keydown.down="highlightedNext"
          @keydown.enter.prevent="selectHighlighted"
          @keydown.tab.prevent
          :class="{disabledInput: searchDisable === true}"
        >
        <ul ref="options" v-show="filteredOptions.length > 0">
          <li
            v-for="(option, i) in filteredOptions"
            :key="i"
            @click="select(option)"
            :class="{'is-active': i === highlightedIndex}"
          >{{option}}
          </li>
        </ul>
        <p v-show="filteredOptions.length === 0">Ничего не найдено</p>
      </div>
    </div>
  </on-click-outside>
</template>

<script>
import OnClickOutside from './OnClickOutside'
export default {
  components: {OnClickOutside},
  // props: [ 'value', 'options', 'filterFunction', 'searchDisable' ],
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true,
    },
    // filterFunction: {
    //   type: Object,
    //   default: {}
    // },
    searchDisable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isOpen: false,
      search: "",
      highlightedIndex: 0,
    };
  },
  computed: {
    filteredOptions() {
      // return this.filterFunction(this.search, this.options)
      return this.options.filter(option => {
        return option.toLowerCase().startsWith(this.search.toLowerCase());
      });
    }
  },
  methods: {
    open() {
      if (this.isOpen) {
        return
      }
      this.isOpen = true
      this.$nextTick(() => {
        this.$refs.search.focus();
        this.scrollToHighligted();
      });
    },
    close() {
      if (!this.isOpen) {
        return
      }
      this.isOpen = false;
    },
    select(option) {
      this.$emit('input', option);
      this.search = "";
      this.highlightedIndex = 0;
      this.close();
    },
    selectHighlighted() {
      this.select(this.filteredOptions[this.highlightedIndex])
    },
    scrollToHighligted() {
      this.$refs.options.children[this.highlightedIndex].scrollIntoView({block: 'nearest'})
    },
    highlight(index){
      this.highlightedIndex = index

      if (this.highlightedIndex < 0) {
        this.highlightedIndex = this.filteredOptions.length - 1
      }
      if (this.highlightedIndex > this.filteredOptions.length - 1) {
        this.highlightedIndex = 0
      }
      this.scrollToHighligted()
    },

    highlightedPrev() {
      this.highlight(this.highlightedIndex - 1)
    },
    highlightedNext() {
      this.highlight(this.highlightedIndex + 1)
    },
  }
};
</script>

<style lang="scss" scoped>
.select{
  display: inline-block;
  position: relative;
  width: 207px;
}
button{
  width: 100%;
  background-color: #fff;
  border: none;
}
.disabledInput{
  margin: 0;
  padding: 0;
  height: 0;
  border: none;
  position: absolute;
}
.field_select {
  display: block;
}
.dropdown_select {
  left: 0;
  width: 100%;
  position: absolute;
  background-color: #fff;
  z-index: 10;
  display: inline-block;
  overflow-Y: auto;
  max-height: 200px;

  border: 1px solid black;
  cursor: pointer;
  li {
    &:hover {
      background-color: darkcyan;
    }
  }
}
.is-active{
  background-color: darkcyan;
}
</style>