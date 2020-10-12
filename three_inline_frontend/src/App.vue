<template>
  <div id="app">
    <Game />
  </div>
</template>

<script>
import Game from './components/Game.vue';
import Axios from 'axios';

export default {
  name: 'App',
  data: function() {
    return {
      modal: false,
    };
  },
  components: {
    Game,
  },
  methods: {
    async getGame(id) {
      let resul = await Axios.get(`http://localhost:3000/games/${id}`);
      console.log(resul);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
