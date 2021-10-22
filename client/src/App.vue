<template>
  <header>
    <Navbar />
  </header>
  <main>
    <UploadPage />
  </main>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import UploadPage from "./components/UploadPage.vue";
export default {
  name: "App",
  components: {
    Navbar,
    UploadPage,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
#app {
  background-color: #f1f1f3;
  font-family: "Rubik", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
