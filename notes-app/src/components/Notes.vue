<template>
  <!-- note list -->
  <div class="notes">
    <div
      class="note"
      :class="{ full: !grid, high: note.priority === 'high', veryHigh: note.priority === 'veryHigh' }"
      v-for="(note, index) in notes"
      :key="index"
    >
      <div class="note-header" :class="{ full: !grid }">
        <p
          @click="showInput(index, note.title)"
          v-if="show.title !== index"
          :data-title-idx="index"
        >{{ note.title }}</p>

        <input
          type="text"
          class="change-title"
          v-model="input.title"
          v-show="show.title === index"
          @keydown.escape="show.title = null"
          @keydown.enter="saveText(index, note.title)"
          @blur="show.title = null"
          ref="inputTitle"
          autofocus
        >

        <p style="cursor: pointer;" @click="removeNote(index)">x</p>
      </div>

      <div class="note-body">
        <p
          @click="showInput(index, note.descr)"
          v-if="show.descr !== index"
          :data-descr-idx="index"
        >{{ note.descr }}</p>
        <input
          type="text"
          class="change-descr"
          v-model="input.descr"
          v-show="show.descr === index"
          @keydown.enter="saveText(index, note.descr)"
          @keydown.escape="show.descr = null"
          @blur="show.descr = null;"
          ref="inputDescr"
          autofocus
        >
        <span>{{ note.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    notes(){
      return this.$store.getters.getNotes
    },
    grid(){
      return this.$store.getters.getGrid
    },
    input(){
      return this.$store.getters.getInput
    },
    show(){
      return this.$store.getters.getShow
    }
  },

  methods: {
    removeNote(index) {
      this.$store.dispatch('removeNote', index);
    },
    showInput(index, text) {
      this.$store.dispatch('showInput', {
        index,
        text,
        descrText: this.$el.querySelector(`*[data-descr-idx="${index}"]`),
        titleText: this.$el.querySelector(`*[data-title-idx="${index}"]`)
      });

      this.$nextTick(() => {
        this.$refs.inputDescr[index].focus();
        this.$refs.inputTitle[index].focus();
      });
    },
    saveText(index, text) {
      this.$store.dispatch('saveText', {
        index,
        text,
        notes: this.notes
      });
    },
    /**
     * Стаpый код
     */
    // changeTitleNote(index) {
    //   // Отображаем инпут
    //   this.showInput = index;
    //   // Присваиваем инпуту значение тайтла
    //   this.changeTitle = this.notes[index].title;
    //   //фокус на инпуте при клике
    //   this.$nextTick(() => {
    //     this.$refs.inputTitle[index].focus();
    //   });
    // },
    // saveTitle(index) {
    //   //присваиваем значение инпута нашему тайтлу
    //   this.notes[index].title = this.changeTitle;
    //   //присваиваем новую дату
    //   this.notes[index].date = new Date(Date.now()).toLocaleString();
    //   //Закрываем инпут
    //   this.showInput = -1;
    // }
  }
};
</script>

<style lang="scss">
.notes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
}
.note {
  width: 48%;
  margin-bottom: 20px;
  padding: 18px 20px;

  background-color: #ffffff;
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.02);

  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  &.high {
    border: 3px solid rgb(223, 212, 70);
  }
  &.veryHigh {
    border: 3px solid tomato;
  }
  &:hover {
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.04);
    transform: translate(0, -6px);

    transition-delay: 0s !important;
  }
  &.full {
    width: 100%;

    text-align: center;
  }
}
.change-title, .change-descr{
  width: 100%;
  margin: 0;
  padding: 0;

  font-size: 22px;
  color: #402caf;

  border: none;
  border-radius: 0;
}
.change-descr{
  margin: 20px 0;
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 32px;
  }
  p {
    font-size: 22px;
    color: #402caf;
  }
  svg {
    margin-right: 12px;

    color: #999999;
    &.active {
      color: #402caf;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &.full {
    justify-content: center;
    p {
      margin-right: 16px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.note-body {
  p {
    margin: 20px 0;
  }
  span {
    font-size: 14px;
    color: #999999;
  }
}
</style>

