<template>
  <newPostForm
    @submit="onSubmit"
    :postEdit="post"
  />
</template>

<script>
import newPostForm from '@/components/Admin/NewPostForm.vue'
  export default {
    components: {newPostForm},
    layout: 'admin',
    data() {
      return {
        post: {
          id: 1,
          title: '1 post',
          descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis rerum repellendus quisquam sit fugit tempore nostrum illum quis, facere, aut fugiat. Quae veniam dignissimos dolorem incidunt. Sunt amet officiis hic!',
          img: 'https://lawnuk.com/wp-content/uploads/2016/08/sprogs-dogs.jpg'
        },
      }
    },
    methods: {
      onSubmit(post) {
        console.log('Post Editing!');
        console.log(post);
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>