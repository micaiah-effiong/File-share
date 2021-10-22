<template>
  <section class="h-screen">
    <div
      class="
        max-w-2xl
        px-8
        py-4
        mx-auto
        bg-white
        rounded-lg
        shadow-md
        my-24
        dark:bg-gray-800
      
        space-y-16
        border-dashed border-4
      "
    >
      <div class="flex items-center justify-between">
        <span class="text-sm font-light text-gray-600 dark:text-gray-400"
          >Oct 18, 2021</span
        >
        <a
          class="
            px-3
            py-1
            text-sm
            font-bold
            text-gray-500
            transition-colors
            duration-200
            transform
            cursor-pointer
          "
          ><svg
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
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            /></svg
        ></a>
      </div>

      <div class="mt-2">
        <a
          class="
            text-2xl
            font-bold
            text-gray-700
            dark:text-white
            hover:text-gray-600
            dark:hover:text-gray-200
          "
          >Drag & Drop files here to upload</a
        >
        <p class="mt-2 text-gray-600 dark:text-gray-300">No size limit</p>

        <button
          class="
            my-6
            px-4
            py-2
            font-medium
            tracking-wide
            text-white
            capitalize
            transition-colors
            duration-200
            transform
            bg-indigo-600
            rounded-sm
            hover:bg-indigo-500
            focus:outline-none
            focus:ring
            focus:ring-indigo-300
            focus:ring-opacity-80
          "
        >
          Browse Files
        </button>
      </div>

      <div class="flex items-center justify-between mt-4">
        <a
          href="#"
          class="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
          >Simple</a
        >

        <div class="flex items-center">
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
              d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
            />
          </svg>
          <a class="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
            >Fast</a
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UploadPage",
};
</script>
<style>
.section-bg {
}
</style>