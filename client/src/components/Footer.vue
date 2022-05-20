<template>
  <footer class="text-gray-600 body-font">
    <div
      class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col"
    >
      <a
        class="
          flex
          title-font
          font-medium
          items-center
          md:justify-start
          justify-center
          text-gray-900
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class=" w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        <span
          class="
            ml-3
            text-xl text-2xl
            font-bold
            text-gray-800
            dark:text-white
            lg:text-3xl
            hover:text-gray-700
            dark:hover:text-gray-300
          "
          >ShareIt.
        </span>
      </a>
       <p
        class="
          text-sm text-gray-500
          sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0
          mt-4
        "
      >
        This website gives users the access to store and share their files in cloud without USB or Hardrive
      </p>

      <span
        class="
          inline-flex
          sm:ml-auto sm:mt-0
          mt-4
          justify-center
          sm:justify-start
        "
      >
        <p
        class="
          text-sm text-gray-500
          sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0
          mt-4
        "
      >
        © 2020 ShareIt —
        <a
          href="https://twitter.com/knyttneve"
          class="text-gray-600 ml-1"
          rel="noopener noreferrer"
          target="_blank"
          >All rights reserved</a
        >
      </p>
      </span>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
};
</script>