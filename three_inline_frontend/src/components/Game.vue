<template>
  <div>
    <h1>Bienvenido al juego</h1>
    <b-container class="bv-example-row">
      <b-row>
        <b-col></b-col>
        <b-col>
          <b-row>
            <b-col cols="4" v-for="(fruit, index) in fruits" :key="`fruit-${index}`">
              <button v-on:click="select">{{ fruit }}</button>
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
      fruits: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
  // definir métodos bajo el objeto `methods`
  methods: {
    select: function(event) {
      // `this` dentro de los métodos apunta a la instancia de Vue
      alert('Hola ' + this.name + '!');
      // `evento` es el evento DOM nativo
      if (event) {
        alert(event.target.tagName);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
