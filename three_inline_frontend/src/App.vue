<template>
  <div id="app">
    <Game ref="gameDetail" @showModal="showModal" />
    <Modal ref="modalGames">
      <template v-slot:header>
        <h1>Historial de juegos</h1>
      </template>
      <template v-slot:body>
        <p>A continuación encontrará el historial de juegos:</p>
        <b-table
          :items="rows"
          :fields="fields"
          :tbody-tr-class="rowClass"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <!-- Optional default data cell scoped slot -->
          <template v-slot:cell(actions)="row">
            <b-button size="sm" @click="showGame(row.item.id)" pill variant="primary">
              Ver
            </b-button>
          </template>
        </b-table>
        <b-pagination
          v-model="currentPage"
          :total-rows="rowsCount"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </template>
    </Modal>
  </div>
</template>

<script>
import Game from './components/Game.vue';
import Modal from './components/Modal.vue';
import Axios from 'axios';

export default {
  name: 'App',
  data: function() {
    return {
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'date_start', label: 'Fecha de Inicio' },
        { key: 'status', label: 'Estado' },
        { key: 'actions', label: 'Acciones' },
      ],
      rows: [],
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    rowsCount() {
      return this.rows.length;
    },
  },
  components: {
    Game,
    Modal,
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

      this.rows = resul.data.sort((a, b) => b.id - a.id);
      this.$refs.modalGames.openModal();
    },
    showGame: function(id) {
      this.$refs.modalGames.closeModal();
      this.$refs.gameDetail.loadGame(id);
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
