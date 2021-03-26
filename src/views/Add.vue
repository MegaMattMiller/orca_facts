<template>
  <b-overlay :show="loading" rounded="sm" style="min-height: 100vh;">
    <b-container>
      <h1>Page for adding facts!</h1>
      <b-form-input v-model="orcaFact" placeholder="Dolphin Fact"></b-form-input>
      <b-button variant="success" @click="handleSubmitClicked">Submit</b-button>
    </b-container>
  </b-overlay>
</template>
<script>
export default {
  name: 'Add',
  data() {
    return {
      loading: false,
      orcaFact: ''
    };
  },
  methods: {
    handleSubmitClicked: function() {
      this.orcaFact = this.orcaFact.trim();
      if (this.orcaFact == '') {
        return;
      }
      this.loading = true;
      var payload = {};
      payload.fact = this.orcaFact;
      this.$store.dispatch('submitData', payload).then(() => {
        this.$store.dispatch('getData').then(() => {
          this.loading = false;
          this.orcaFact = '';
        });
      });
    }
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
