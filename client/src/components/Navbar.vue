<template>
  <nav class="bg-white shadow dark:bg-gray-800 fixed w-full z-30 top-0">
    <div
      class="
        container
        px-6
        py-4
        mx-auto
        lg:flex lg:justify-between lg:items-center
      "
    >
      <div class="lg:flex lg:items-center">
        <div class="flex items-center justify-between">
          <div>
            <a
              class="
                text-2xl
                font-bold
                text-gray-800
                dark:text-white
                lg:text-3xl
                hover:text-gray-700
                dark:hover:text-gray-300
              "
              href="#"
              >ShareIt.</a
            >
          </div>

          <!-- Mobile menu button -->
          <div class="flex lg:hidden">
            <button
              type="button"
              class="
                text-gray-500
                dark:text-gray-200
                hover:text-gray-600
                dark:hover:text-gray-400
                focus:outline-none focus:text-gray-600
                dark:focus:text-gray-400
              "
              aria-label="toggle menu"
              v-on:click="toggleNavbar()"
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div
          v-bind:class="{ hidden: !menuShow, flex: menuShow }"
          class="lg:flex lg:flex-grow items-center"
        >
          <div
            class="
              flex flex-col
              align-center
              text-gray-600
              capitalize
              dark:text-gray-300
              lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center
            "
          >
            <a
              href="#"
              class="
                mt-2
                lg:mt-0 lg:mx-4
                hover:text-gray-800
                dark:hover:text-gray-200
                flex
              "
              >all files</a
            >
            <a
              href="#"
              class="
                mt-2
                lg:mt-0 lg:mx-4
                hover:text-gray-800
                dark:hover:text-gray-200
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                /></svg
            ></a>
            <a
              href="#"
              class="
                mt-2
                lg:mt-0 lg:mx-4
                hover:text-gray-800
                dark:hover:text-gray-200
              "
              >support</a
            >

            <div class="relative mt-4 lg:mt-0 lg:mx-4">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  class="w-4 h-4 text-gray-600 dark:text-gray-300"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>

              <input
                type="text"
                class="
                  w-full
                  py-1
                  pl-10
                  pr-4
                  text-gray-700
                  placeholder-gray-600
                  bg-white
                  border-b border-gray-600
                  dark:placeholder-gray-300 dark:focus:border-gray-300
                  lg:w-56 lg:border-transparent
                  dark:bg-gray-800 dark:text-gray-300
                  focus:outline-none focus:border-gray-600
                "
                placeholder="Search your files"
              />
            </div>
          </div>

          <div
            class="flex justify-center mt-6 lg:flex lg:mt-0 lg:-mx-2 lg:ml-auto"
          >
            <a
              href="#"
              class="
                mx-2
                text-gray-600
                dark:text-gray-300
                hover:text-gray-500
                dark:hover:text-gray-300
              "
              aria-label="Music"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </a>

            <a
              href="#"
              class="
                mx-2
                text-gray-600
                dark:text-gray-300
                hover:text-gray-500
                dark:hover:text-gray-300
              "
              aria-label="Video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </a>

            <a
              href="#"
              class="
                mx-2
                text-gray-600
                dark:text-gray-300
                hover:text-gray-500
                dark:hover:text-gray-300
              "
              aria-label="Document"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      menuShow: false,
    };
  },
  methods: {
    toggleNavbar: function () {
      this.menuShow = !this.menuShow;
    },
  },
};
</script>

<style>
</style>