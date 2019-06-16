<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <!-- erorrs -->
        <div class="error" v-if="error" style="margin-bottom: 20px;">
          <p>{{ error }}</p>
        </div>

        <!-- search -->
        <search :value="search" placeholder="Type username..." @search="search = $event"/>

        <!-- buttons -->
        <button v-if="!repos" class="btn btnPrimary" @click="getData">Search!</button>
        <button v-else class="btn btnPrimary" @click="getData">Search Again!</button>

        <!-- wrapper -->
        <div class="repos__wrapper" v-if="repos">
          <!-- information -->
          <div class="user-info">
            <!-- avatar -->
            <div class="avatar">
              <img :src="owner.avatar_url" :alt="owner.login" class="avatar_img">
            </div>
            <!-- info about user -->
            <div class="info">
              <!-- name -->
              <p class="info--padding" v-if="owner.name">
                <b>Name:</b>
                {{owner.name}}
              </p>
              <!-- Login if name is empty -->
              <p class="info--padding" v-else>
                <b>Name:</b>
                {{owner.login}}
              </p>
              <!-- biography -->
              <p class="info--padding" v-if="owner.bio">
                <b>About:</b>
                {{owner.bio}}
              </p>
              <!-- Followers and following -->
              <div class="follow-info info--padding">
                <a :href="owner.followers ? `https://github.com/${this.search}?tab=followers` : null" target="_blank">
                  <b>Followers:</b>
                  {{owner.followers}}
                </a>
                <a :href="owner.followers ? `https://github.com/${this.search}?tab=following` : null" target="_blank">
                  <b>Following:</b>
                  {{owner.following}}
                </a>
              </div>
            </div>
          </div>
          <!-- item -->
          <div class="repos-info">
            <span @click="sortBy('name')" class="cursor-pointer">Repos name ↓</span>
            <span @click="sortBy('stargazers_count')" class="cursor-pointer">Stars ↓</span>
          </div>
          <div class="repos-item" v-for="repo in reposSort" :key="repo.id">
            <div class="repos-info">
              <a class="link" target="_blank" :href="repo.html_url">{{ repo.name }}</a>
              <span>{{ repo.stargazers_count }} ⭐</span>
            </div>
          </div>

          <pagination :currentPage="1" :length="10" :arr="repos" @params="onParams" class="pagination"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import search from "@/components/Search.vue";
import pagination from "@/components/Pagination.vue";
import axios from "axios";
export default {
  components: { search, pagination },
  data() {
    return {
      search: "",
      error: null,
      repos: null,
      owner: null,
      currentSort: "repos",
      currentSortDir: "asc",
      page: {}
    };
  },
  computed: {
    reposSort() {
      return this.repos
        .sort((a, b) => {
          let mod = 1;
          if (this.currentSortDir === "desc") mod = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * mod;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.page.currentPage - 1) * this.page.length;
          let end = this.page.currentPage * this.page.length;
          if (index >= start && index < end) return true;
        });
    }
  },
  methods: {
    getData() {
      Promise.all([
        axios.get(`https://api.github.com/users/${this.search}/repos`),
        axios.get(`https://api.github.com/users/${this.search}`)
      ])
        .then(([repos, user]) => {
          this.error = null;
          this.repos = repos.data;
          this.owner = user.data;
        })
        .catch(err => {
          console.log(err);
          this.repos = null;
          this.owner = null;
          this.error = "Can`t find this user";
        });
    },
    sortBy(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = e;
    },
    onParams(data) {
      this.page = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
button {
  margin-top: 40px;
}
.repos__wrapper {
  width: 600px;
  margin: 30px 0;
}
.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  .info--padding {
    padding: 5px 0;
  }
  .avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 120px;
    height: 120px;
    margin-right: 20px;
    &_img {
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .follow-info {
    display: flex;
    a{
      color: #494ce8;
      &:hover{
        color: darken(#494ce8, 10%);
      }
    }
    a:first-child {
      margin-right: 20px;
    }
  }
}
.repos-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #dbdbdb;
}
.cursor-pointer {
  cursor: pointer;
}
.pagination{
  margin-top: 40px;
}
</style>
