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
        <p @click="changeTitleNote(index)" v-if="showInput !== index">{{ note.title }}</p>
        <input
          type="text"
          class="change-title"
          v-model="changeTitle"
          v-show="showInput === index"
          @keydown.enter="saveTitle(index)"
          @blur="showInput = -1"
          ref="inputTitle"
          autofocus
        >

        <p style="cursor: pointer;" @click="removeNote(index)">x</p>
      </div>
      <div class="note-body">
        <p>{{ note.descr }}</p>
        <span>{{ note.date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // При клике на esc вырубаем инпут
    window.addEventListener("keydown", e => {
      if (e.keyCode === 27) {
        this.showInput = -1;
      }
    })
  },
  props: {
    notes: {
      type: Array,
      required: true
    },
    grid: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      changeTitle: "",
      showInput: -1
    };
  },

  methods: {
    removeNote(index) {
      console.log(`Note id - ${index} removed`);
      this.$emit("remove", index);
    },
    changeTitleNote(index) {
      // Отображаем инпут
      this.showInput = index;
      // Присваиваем инпуту значение тайтла
      this.changeTitle = this.notes[index].title;
      //фокус на инпуте при клике
      this.$nextTick(() => {
        this.$refs.inputTitle[index].focus();
      });
    },

    saveTitle(index) {
      //присваиваем значение инпута нашему тайтлу
      this.notes[index].title = this.changeTitle;
      //присваиваем новую дату
      this.notes[index].date = new Date(Date.now()).toLocaleString();
      //Закрываем инпут
      this.showInput = -1;
    }
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
.change-title {
  width: 100%;
  margin: 0;
  padding: 0;

  font-size: 22px;
  color: #402caf;

  border: none;
  border-radius: 0;
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

