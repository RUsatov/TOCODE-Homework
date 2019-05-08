<template>
  <div class="wrapper-content wrapper-content--fixed">
    <promo />
    <Intro title="My lasts posts: "/>
    <PostsList :posts="posts" />
    <contacts />
  </div>
</template>

<script>
import promo from '@/components/Promo.vue'
import contacts from '@/components/Contacts.vue'

export default {
  components: {
    promo,
    contacts
  },
  asyncData(contex) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          posts: [
            {
              id: 1,
              title: '1 post',
              descr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
              img: 'https://lawnuk.com/wp-content/uploads/2016/08/sprogs-dogs.jpg'
            },
          ]
        })
      }, 1500)
    })
    .then(data => {
      return data
    })
    .catch(e => {
      contex.error(e)
    })
  },
}
</script>
