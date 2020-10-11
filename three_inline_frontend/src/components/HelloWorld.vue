<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Si deseas conocer las reglas del juego visita el siguiente link
      <a href="https://es.wikipedia.org/wiki/Tres_en_l%C3%ADnea#:~:text=ficha%20al%20oponente.-,Reglas,recta%20o%20diagonal%20por%20s%C3%ADmbolo." target="_blank" rel="noopener">ver reglas del juego</a>.
    </p>
    <h3>Quiero jugar ya!</h3>
    <ul>
      <li><a href="" target="_blank" rel="noopener">Jugar</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">Historial</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
