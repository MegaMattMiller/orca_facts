import Vue from 'vue';
import Vuex from 'vuex';
var faunadb = require('faunadb'),
  q = faunadb.query;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: ''
  },
  mutations: {
    updateData(state, value) {
      state.data = value;
    }
  },
  actions: {
    submitData(context, payload) {
      return new Promise((resolve) => {
        var client = new faunadb.Client({
          secret: process.env.VUE_APP_APP_TOKEN,
          domain: 'db.fauna.com',
          scheme: 'https'
        });
        var createP = client.query(q.Create(q.Collection('facts'), { data: { fact: payload.fact } }));
        createP.then(function(response) {
          resolve(response);
        });
      });
    },
    getData(context) {
      return new Promise((resolve, reject) => {
        var client = new faunadb.Client({
          secret: process.env.VUE_APP_APP_TOKEN,
          domain: 'db.fauna.com',
          scheme: 'https'
        });
        var helper = client.paginate(q.Match(q.Index('fact')));
        helper
          .map(function(ref) {
            return q.Get(ref);
          })
          .each(function(page) {
            if (page.length < 1) {
              reject(page);
            }
            var data = {};
            data.facts = [];
            page.forEach((element) => {
              element.data.ref = element.ref.id;
              data.facts.push(element.data);
            });
            context.commit('updateData', data);
            resolve(data);
          });
      });
    }
  }
});
