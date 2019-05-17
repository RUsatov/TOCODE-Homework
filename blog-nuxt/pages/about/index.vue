<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section class="about">
      <div class="container">
        <h1 class="title"> {{selectedBand}} </h1>
        <!-- :options="contact"
        :pos="0"
        @selected='getLink($event)'
        -->
        <AppSelect v-model="selectedBand" :options="contact"/>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut </p>
        <Intro title="Lorem ipsum dolor sit amet"/>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut </p>
        <img src="@/assets/img/about.jpg" alt="">
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedBand: 'Моб. телефон',
      // link: {},
      contact: [
        'Электронная почта',
        'Моб. телефон',
        'Факс',
        'Телеграм',
        'Скайп',
        'Электронная почта',
        'Моб. телефон',
        'Факс',
        'Телеграм',
        'Скайп',
      ]
    }
  },
  methods: {
    applySearchFilter(search, options) {
      return options.filter(option => {
        return option.toLowerCase().startsWith(search.toLowerCase());
      });
    }
  },
}
</script>

<style lang="scss">
.about {
  text-align: center;
  p {
    margin-bottom: 10px;
  }
}
</style>
