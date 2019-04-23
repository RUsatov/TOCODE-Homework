<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">

        <!-- table -->
        <table>

          <!-- head -->
          <thead>
            <tr>
              <th @click="sort('name')">Name ↓</th>
              <th @click="sort('age')">Age ↓</th>
              <th @click="sort('gender')">Gender ↓</th>
            </tr>
          </thead>

          <!-- body -->
          <tbody>
            <tr v-for="user in usersSort" :key="user.id">
              <td>
                <img :src="user.img" :alt="user.name">
                <span>{{ user.name }}</span>
              </td>
              <td> {{ user.age }}</td>
              <td> {{ user.gender }}</td>
            </tr>
          </tbody>

        </table>
        <p>debug: sort: {{ currentSort }}, dir: {{ currentSortDir }} </p>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="button-list">
          <div class="btn btnPrimary" @click="prevPage">←</div>
          <div class="btn btnPrimary" @click="nextPage">→</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      users: [],
      currentSort: 'name',
      currentSortDir: 'asc',
      page: {
        current: 1,
        length: 3
      }
    }
  },
  created () {
    axios
      .get('https://api.myjson.com/bins/rzgya')
        .then(response => {
          // console.log(response.data)
          this.users = response.data
        })
        .catch(error => {
          console.log(error)
        })
  },
  computed: {
    usersSort() {
      return this.users.sort((a, b) => {
        let mod = 1;
        if (this.currentSortDir === 'desc') mod = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * mod
        if(a[this.currentSort] > b[this.currentSort]) return 1 * mod
        return 0
      }).filter((row, index) => {
        let start = (this.page.current - 1) * this.page.length
        let end = this.page.current * this.page.length
        if (index >= start && index < end) return true
      })
    }
  },
  methods: {
    sort(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = e
    },
    prevPage() {
      if (this.page.current > 1) this.page.current -= 1
    },
    nextPage() {
      if ((this.page.current * this.page.length) < this.users.length) this.page.current += 1
    },
  },
}
</script>


<style lang="scss" scoped>
img {
  width: 60px;
  height: auto;
  border-radius: 50%;
  margin-right: 16px;
}
.button-list{
  text-align: center;
  width: 100%;
  .btn{
    border-radius: 60px;
    margin: 0 auto;
  }
}
</style>
