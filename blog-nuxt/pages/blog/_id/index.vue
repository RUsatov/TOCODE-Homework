<template>
  <div class="wrapper-content wrapper-content--fixed">
    <post :post="post" />
    <comments :comments="comments" />
    <newComment />
  </div>
</template>

<script>
import post from '@/components/Blog/Post.vue'
import newComment from '@/components/Comments/NewComment.vue'
import comments from '@/components/Comments/Comments.vue'
  export default {
    components: {
      post, comments, newComment,
    },
    data() {
      return {
        post: {
          id: 1,
          title: '1 post',
          descr: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis rerum repellendus quisquam sit fugit tempore nostrum illum quis, facere, aut fugiat. Quae veniam dignissimos dolorem incidunt. Sunt amet officiis hic!',
          img: 'https://lawnuk.com/wp-content/uploads/2016/08/sprogs-dogs.jpg'
        },
        comments: [
          { name: 'Alex', text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'},
          { name: 'Evgeniy', text: 'Lorem ipsum, dolor sit amet.'},
        ]
      }
    },
  }
</script>

<style lang="scss">
.post {
	max-width: 900px;
	margin: 0 auto;
}
.post-header {
	margin-bottom: 30px;

	text-align: center;
	img {
		max-width: 400px;
    margin-bottom: 16px;
	}
	p {
		color: #999999;
	}
}
.post-body {
  text-align: left;
}
</style>