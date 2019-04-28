<template>
  <div class="wrapper">
    <div class="wrapper-content">

      <section>
        <div class="container">
          <div class="note-header" style="margin: 36px 0; justify-content: center;">
            <p> {{ title }} </p>
          </div>
          <!-- message -->
          <message v-if="message" />

          <!-- new note -->
          <newNote />

          <!-- notes header -->
          <div class="note-header" style="margin: 35px 0;">
            <!-- title -->
            <h1> {{ title }} </h1>

            <!-- search -->
            <search placeholder="Find your note" />

            <!-- icons controls -->
            <div class="icons">
              <svg :class="{ active: grid }" @click="setGrid(true)" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <svg :class="{ active: !grid }" @click="setGrid(false)" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
            </div>
          </div>

          <!-- note list -->
          <notes />

        </div>
      </section>

    </div>
  </div>
</template>

<script>
import message from '@/components/Message.vue'
import notes from '@/components/Notes.vue'
import newNote from '@/components/NewNote.vue'
import search from '@/components/Search.vue'

export default {
  components: {
    message, notes, newNote, search
  },
  data () {
    return {
      title: 'Notes App',
    }
  },
  computed: {
    message(){
      return this.$store.getters.getMessage
    },
    search(){
      return this.$store.getters.getSearch
    },
    grid(){
      return this.$store.getters.getGrid
    },
    note() {
      return this.$store.getters.getNote
    },
    notes(){
      return this.$store.getters.getNotes
    },
  },
  methods: {
    setGrid (e) {
      return this.$store.dispatch('setGrid', e)
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
