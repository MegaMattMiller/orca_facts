<template>
  <b-overlay :show="loading" rounded="sm" style="min-height: 100vh;">
    <b-container>
      <h1>Orca Facts!</h1>
      <b-card v-for="(fact, index) in this.$store.state.data.facts" :key="index" border-variant="dark">
        <b-card-title>{{ fact.fact }}</b-card-title>
      </b-card>
      <div class="footer-div">
        <a href="https://github.com/MegaMattMiller/orca_facts" class="footer-logo"
          ><b-icon icon="github" class="github-icon"></b-icon
        ></a>
      </div>
    </b-container>
  </b-overlay>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      loading: true
    };
  },
  computed: {
    hasAuth: function() {
      if (this.$route.query.auth == process.env.VUE_APP_PASSWORD) {
        return true;
      } else {
        return false;
      }
    },
    addGameUrl: function() {
      return `/add?auth=${this.$route.query.auth}`;
    }
  },
  mounted() {
    this.$store.dispatch('getData').then(() => {
      this.loading = false;
    });
  }
};
</script>

<style lang="scss" scoped>
.footer-div {
  text-align: center;
}

.footer-logo {
  text-align: center;
  font-size: 40px;
  color: #000;
}

.details-button {
  margin-left: 10px;
}
</style>
