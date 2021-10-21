
<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <Navbar />
  <UploadPage />
</template>

<script>
import Navbar from './components/Navbar.vue'
import UploadPage from './components/UploadPage.vue'
export default {
  name: "App",
  components: {
    Navbar,
    UploadPage
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
#app {
  background-color:#F1F1F3;
font-family: 'Rubik', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
