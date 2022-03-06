
<template>
  <header>
    <Navbar />
  </header>
  <main>
    <UploadPage />
  </main>
  <footer>
    <Footer />
  </footer>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import UploadPage from "./components/UploadPage.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    UploadPage,
    Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
#app {
  background-color: #fbfafb;
  font-family: "Rubik", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
