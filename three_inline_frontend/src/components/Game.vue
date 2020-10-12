<template>
  <div>
    <h1>Bienvenido al juego de Triqui!</h1>
    <b-container class="bv-example-row margin_top_20">
      <b-row>
        <b-col></b-col>
        <b-col>
          <b-row>
            <b-col
              cols="4"
              v-bind:class="{
                grid_button_1: cell.class == 1,
                grid_button_2: cell.class == 2,
                grid_button_3: cell.class == 3,
              }"
              v-for="(cell, index) in grid"
              :key="`cell-${index}`"
            >
              <button
                class="button_play"
                v-bind:class="{
                  button_play_o: cell.image == 'x',
                  button_play_x: cell.image == 'o',
                }"
                v-on:click="select(cell.id)"
                :id="cell.id"
              ></button>
            </b-col>
          </b-row>
          <b-row class="margin_top_20">
            <b-col>
              <h3>{{ gamer }}</h3>
              <b-row class="margin_top_20">
                <b-col>
                  <b-button pill variant="success" v-on:click="init" v-if="!initiated"
                    >Iniciar Juego</b-button
                  >
                  <b-button pill variant="danger" v-on:click="pause" v-if="initiated"
                    >Pausar Juego</b-button
                  >
                </b-col>
                <b-col>
                  <b-button pill variant="info">Ver Historial</b-button>
                </b-col>
              </b-row>
              <b-row class="margin_top_20">
                <b-col>
                  <p>
                    Si deseas conocer las reglas del juego visita el siguiente link
                    <a
                      href="https://es.wikipedia.org/wiki/Tres_en_l%C3%ADnea#:~:text=ficha%20al%20oponente.-,Reglas,recta%20o%20diagonal%20por%20s%C3%ADmbolo."
                      target="_blank"
                      rel="noopener"
                      >ver reglas del juego</a
                    >.
                  </p>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showGame: true,
      gamer: 'Quiero jugar ya!',
      user: 'x',
      initiated: false,
      grid: [
        { id: 1, class: 1, image: '' },
        { id: 2, class: 1, image: '' },
        { id: 3, class: 2, image: '' },
        { id: 4, class: 1, image: '' },
        { id: 5, class: 1, image: '' },
        { id: 6, class: 2, image: '' },
        { id: 7, class: 3, image: '' },
        { id: 8, class: 3, image: '' },
        { id: 9, class: 4, image: '' },
      ],
    };
  },
  // definir métodos bajo el objeto `methods`
  methods: {
    select: function(id) {
      if (!this.initiated) {
        alert('Debes iniciar el juego primero.');
      } else {
        if (this.user == 'x') {
          this.user = 'o';
          this.gamer = 'Truno Jugador 2 (O)';
          this.grid[id - 1].image = 'o';
        } else {
          this.user = 'x';
          this.gamer = 'Turno Jugador 1 (X)';
          this.grid[id - 1].image = 'x';
        }
        console.log(this.grid);
      }
    },
    init: function() {
      //
      this.gamer = 'Turno Jugador 1 (X)';
      this.initiated = true;
    },
    pause: function() {
      //
      this.initiated = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.button_play {
  padding: 40px;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: transparent;
  border: none;
}
.button_play_o {
  background: url('../assets/o.jpg') no-repeat scroll 0 0 transparent;
}
.button_play_x {
  background: url('../assets/x.jpg') no-repeat scroll 0 0 transparent;
}

.grid_button_1 {
  border-bottom: solid 6px #acf4e6;
  border-right: solid 6px #acf4e6;
}
.grid_button_2 {
  border-bottom: solid 6px #acf4e6;
}
.grid_button_3 {
  border-right: solid 6px #acf4e6;
}

.margin_top_20 {
  margin-top: 20px;
}
</style>
