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
                  button_play_x: cell.image == 'x',
                  button_play_o: cell.image == 'o',
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
                  <b-button pill variant="info" v-on:click="showGames">Ver Historial</b-button>
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
import Axios from 'axios';

export default {
  data() {
    return {
      showGame: true,
      gamer: 'Quiero jugar ya!',
      user: 'x',
      initiated: false,
      gameId: 0,
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
    //Method that define a select cell
    select: function(id) {
      if (!this.initiated) {
        alert('Debes iniciar el juego primero.');
      } else {
        //Set user in cell
        this.grid[id - 1].image = this.user == 'x' ? 'x' : 'o';
        //Consume the method to create a new game
        Axios.post('http://localhost:3000/games/move', {
          game_id: this.gameId,
          cell: id,
          user: this.user,
        })
          .then(response => {
            //Check if response is OK
            if (response.status == 200) {
              //Set data values
              var res = response.data;
              console.log(res);
              if (res.result == true) {
                var msg = '';
                //Check if the game has a winner
                if (res.winner == 'Empate') {
                  alert('El juego ha quedado en empate');
                  msg = res.winner;
                } else {
                  alert('El ganador es el jugador ' + (res.winner == 'x' ? '1 (X)' : '2 (O)'));
                  msg = 'Ganó jugador ' + res.winner;
                }
                Axios.post('http://localhost:3000/games/winner', {
                  game_id: this.gameId,
                  status: msg,
                })
                  .then(finish => {
                    console.log(finish);
                    //Game over
                    this.initiated = false;
                  })
                  .catch(error => {
                    console.log(error);
                  });
              } else {
                this.gamer = 'Truno Jugador ' + (this.user == 'x' ? '2 (O)' : '1 (X)');
                this.user = this.user == 'x' ? 'o' : 'x';
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
        console.log(this.grid);
      }
    },
    //Event that init game
    init: function() {
      //Consume the method to create a new game
      Axios.post('http://localhost:3000/games', {})
        .then(response => {
          //Check if response is OK
          if (response.status == 200) {
            //Set data values
            this.user = 'x';
            this.gamer = 'Turno Jugador 1 (X)';
            this.initiated = true;
            this.gameId = response.data.id;
            this.grid.forEach(function(cell) {
              cell.image = '';
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //Event that pause game
    pause: function() {
      //Consume the method to pause the game
      Axios.post(`http://localhost:3000/games/${this.gameId}/pause`, {})
        .then(response => {
          //Check if response is OK
          if (response.status == 200) {
            //Set data values
            this.user = 'x';
            this.gamer = 'Turno Jugador 1 (X)';
            this.initiated = false;
            this.gameId = 0;
            this.grid.forEach(function(cell) {
              cell.image = '';
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    showGames() {
      console.log('pasó por el evento del componente');
      this.$emit('showModal');
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
