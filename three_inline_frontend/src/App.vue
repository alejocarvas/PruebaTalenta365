<template>
  <div id="app">
    <Game @showModal="showModal" />
    <Modal ref="modalName">
      <template v-slot:header>
        <h1>Historial de juegos</h1>
      </template>
      <template v-slot:body>
        <p>A continuación encontrará el historial de juegos:</p>
        <table style="width:100%">
          <tr>
            <th>Id</th>
            <th>Fecha Inicio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
          <tbody>
            <template v-for="(cell, index) in grid" :key="`cell-${index}`">
              <tr></tr>
              <tr class="detail-row"></tr>
            </template>
          </tbody>
        </table>

        <grid :cols="cols" :rows="rows" :pagination="pagination"></grid>
      </template>
    </Modal>
  </div>
</template>

<script>
import Game from './components/Game.vue';
import Modal from './components/Modal.vue';
import Axios from 'axios';
import Grid from 'gridjs-vue';

export default {
  name: 'App',
  data: function() {
    return {
      cols: ['Id', 'Fecha Inicio', 'Estado', 'Acciones'],
      rows: [],
      pagination: true,
    };
  },
  components: {
    Game,
    Modal,
    Grid,
  },
  methods: {
    async getGame(id) {
      let resul = await Axios.get(`http://localhost:3000/games/${id}`);
      console.log(resul);
    },
    async showModal() {
      console.log('llegó al evento del padre');
      let resul = await Axios.get(`http://localhost:3000/games/`);
      console.log(resul.data);
      let games = resul.data.sort((a, b) => b.id - a.id);
      for (var i = 0; i < games.length; i++) {
        games[i].actions = '<div>Prueba</div>';
        this.rows.push(Object.values(games[i]));
      }
      this.$refs.modalName.openModal();
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

.overflow-hidden {
  overflow: hidden;
}
</style>
