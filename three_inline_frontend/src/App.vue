<template>
  <div id="app">
    <Game @showModal="showModal" />
    <Modal ref="modalName">
      <template v-slot:header>
        <h1>Modal title</h1>
      </template>

      <template v-slot:body>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <p>
          Arcu cursus vitae congue mauris rhoncus aenean. Tempor id eu nisl nunc mi. Pharetra diam
          sit amet nisl suscipit adipiscing bibendum. Ut faucibus pulvinar elementum integer enim.
          Odio facilisis mauris sit amet massa vitae tortor condimentum lacinia. Eu non diam
          phasellus vestibulum lorem sed risus.
        </p>
      </template>

      <template v-slot:footer>
        <div>
          <button @click="$refs.modalName.closeModal()">Cancel</button>
          <button @click="$refs.modalName.closeModal()">Save</button>
        </div>
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
    return {};
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
