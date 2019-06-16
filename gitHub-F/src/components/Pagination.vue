<template>
  <div v-if="totalPages > 1" class="pagination__wrapper d-flex justify-content-center">
    <!-- Назад -->
    <span
      @click="prevPage()"
      :class="{disabled: page === 1}"
      class="page__number mr-14 pagination__arrow arrow__prev"
    >
      <i class="icon-arrow-left"></i> Назад
    </span>

    <!-- 1 страница -->
    <span
      @click="changePage(1)"
      class="page__number pNormal"
      :class="{'page__number--active': page === 1}"
    >1</span>

    <!-- Точки -->
    <span v-if="page>4" class="dots pNormal">...</span>

    <!-- Центральный блок -->
    <div class="d-flex center_block-page">
      <span
        v-show="checkpages(item)"
        @click="changePage(item)"
        class="page__number pNormal"
        :class="{'page__number--active': page === item}"
        v-for="(item, index) in totalPages"
        :key="index"
      >{{ item }}</span>
    </div>

    <!-- Точки -->
    <span v-if="page<totalPages-2" class="dots pNormal">...</span>

    <!-- Последняя страница -->
    <span
      v-if="totalPages !== 1"
      @click="changePage(totalPages)"
      class="page__number pNormal"
      :class="{'page__number--active': page === totalPages}"
    >{{ totalPages }}</span>

    <!-- Вперёд -->
    <span
      @click="nextPage()"
      :class="{disabled: page === totalPages}"
      class="page__number ml-14 pagination__arrow arrow__next"
    >
      Вперёд
      <i class="icon-arrow-left"></i>
    </span>
  </div>
</template>

<script>
/**
 * arr ( Array ) - Массив, который привязан к пагинации. Требуется для вычисления количества страниц
 * currentPage ( Number ) - начальная страница. Указывает, с какой страницы отображать список
 * length ( Number ) - длина отображаемого массива (кол-во элементов на странице)
 * multi ( Boolean ) - требуется, если пагинации на странице более 1.
 * При использовании multi в родительском компоненте обязательно принять объект (@params="название_метода") со значениями length и currentPage.
 * ПРИМЕР:
 * название_метода(data) {
      this.params = data //где this.params - заранее объявленный объект в data()
    }
 *
 * Если пагинация на странице одна, пользуемся Vuex. В родительском компоненте
 * получаем объект в поле computed() при помощи комманды return this.$store.getters.params;
 * и далее используем в функции.
 *
 * Объект params: {
    length: '',
    currentPage: ''
  }
 * Ключи объекта совпадают с названиями пропов в поле props()
 */
export default {
  props: {
    arr: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    length: {
      type: Number,
      required: true
    },
    pageTotal: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      page: ""
    };
  },
  created() {
    this.getPage;
    this.$emit("params", {
      currentPage: this.currentPage,
      length: this.length
    });
  },
  computed: {
    getPage() {
      this.page = this.currentPage;
      return this.page;
    },
    totalPages() {
      let numPages;
      if (this.pageTotal !== null) {
        numPages = this.pageTotal;
      } else numPages = Math.ceil(this.arr.length / this.length);

      // console.log(numPages);
      return numPages;
    }
  },
  methods: {
    checkpages: function(item) {
      /*
       * функция получает каждую страницу и отбирает по условиям если true то елемент попадает на страницу
       * первая страница неотображаемая так как выведена статично как и последняя
       * нужно вывести 5 элементов от активной страницы
       */
      if (item === 1) {
        return false;
      } // для первой страницы
      if (item === this.totalPages) {
        return false;
      } // для последней страницы

      let start = this.page - 3; // старт = текущая страница минус реинж
      let end;

      if (this.page === this.totalPages) {
        start = this.page - 3;
      }

      if (item < 8) {
        // хз почему 8
        end = this.page + 3; // цифра - количество страниц в начале включая первую
      } else {
        end = this.page + 3; // цифра - количество страниц от активной вправо включая активную
      }
      if (start < item && end > item) {
        return true;
      }
    },
    changePage: function(item) {
      if (this.page === item) {
      } else {
        this.page = item;
        this.$emit("params", {
          currentPage: this.page,
          length: this.length
        });
      }
    },
    prevPage: function() {
      if (this.page == 1) {
      } else {
        this.page = this.page - 1;
        this.$emit("params", {
          currentPage: this.page,
          length: this.length
        });
      }
    },
    nextPage: function() {
      if (this.page == this.totalPages) {
      } else {
        this.page = this.page + 1;
        this.$emit("params", {
          currentPage: this.page,
          length: this.length
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "./resources/sass/components/color";

.pagination__wrapper {
  display: flex;
  justify-content: center;
  padding-bottom: 0.0667rem;
}
.center_block-page {
  display: flex;
}
.page__number,
.dots {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.7333rem;
  height: 2.8667rem;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
  user-select: none;
}
.dots {
  cursor: default;
}
.page__number {
  cursor: pointer;
  margin-right: 0.0667rem;
  box-shadow: 0 0 0 0.0667rem #dbdbdb;
  z-index: 1;
  &:hover {
    z-index: 2;
    box-shadow: 0 0 0 0.0667rem rgb(201, 201, 201);
  }
  &:active {
    box-shadow: 0 0 0 0.0667rem rgb(201, 201, 201);
    background-color: whitesmoke;
  }
  &--active {
    cursor: default;
    z-index: 3;
    box-shadow: 0 0 0 0.0667rem #494ce8;
    &:hover {
      box-shadow: 0 0 0 0.0667rem #494ce8;
    }
    &:active {
      box-shadow: 0 0 0 0.0667rem #494ce8;
    }
  }
}
.pagination__arrow{
  width: 6.4667rem;
}
.arrow__next{
  border-radius: 0 0.3333rem 0.3333rem 0;
  .icon-arrow-left{
    transform: rotate(180deg);
    margin-left: 0.5333rem;
  }
}
.arrow__prev{
  border-radius: 0.3333rem 0 0 0.3333rem;
  .icon-arrow-left{
    margin-right: 0.5333rem;
  }
}
.disabled{
  cursor: not-allowed;
  opacity: .3;
  &:hover{
    box-shadow: 0 0 0 0.0667rem #dbdbdb;
  }
  &:active {
    box-shadow: 0 0 0 0.0667rem rgb(201, 201, 201);
    background-color: unset;
  }
}
</style>