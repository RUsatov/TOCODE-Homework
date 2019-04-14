<template>
  <div class="wrapper">
    <div class="wrapper-content">

      <section>
        <div class="container">

          <!-- Login -->
          <button class="btn btnPrimary" @click="showModal = 'login'">Login</button>
          <login v-show="showModal === 'login'" @close="showModal = 'close'"/>
          
          <!-- Registration -->
          <button class="btn btnPrimary" @click="showModal = 'registration'">Registration</button>
          <registration v-show="showModal === 'registration'" @close="showModal = 'close'"/>

        </div>
      </section>


    </div>
  </div>
</template>

<script>
import modals from '@/components/UI/Modal.vue'
import login from '@/components/Login.vue'
import registration from '@/components/Registration.vue'

export default {
  components: { modals, login, registration },
  data () {
    return {
      showModal: 'close'
    }
  },
  methods: {
    
  }
}
</script>
