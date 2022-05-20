<template>
  <section class="">
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto grid grid-cols-3 gap-4">
        <div
          class="lg:w-5/6 mx-auto"
          v-for="(box, i) in boxes"
          :key="box.heading"
          :class="`box${i}`"
        >
          <div class="lg:w-5/6 sm:1/3 p-4">
            <div class="flex relative">
              <img
                alt="gallery"
                class="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover object-center
                "
                src="../assets/wallpaper-1.jpg"
              />
              <div
                class="
                  px-8
                  py-10
                  relative
                  z-10
                  w-full
                  border-4 border-gray-200
                  bg-white
                  opacity-0
                  hover:opacity-100
                "
              >
                <h2
                  class="
                    tracking-widest
                    text-sm
                    title-font
                    font-medium
                    text-indigo-500
                    mb-1
                  "
                >
                  {{ box.heading }}
                </h2>

                <p class="leading-relaxed">{{ box.details }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
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

    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div
          class="
            flex flex-wrap
            sm:-m-4
            -mx-4
            -mb-10
            -mt-4
            md:space-y-0
            space-y-6
          "
        >
          <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div
              class="
                w-20
                h-20
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-indigo-100
                text-indigo-500
                mb-5
                flex-shrink-0
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
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </div>
            <div class="flex-grow">
              <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                High Quality
              </h2>
              <p class="leading-relaxed text-base">
                The best file sharer, to share your files without reducing file
                quality
              </p>
            </div>
          </div>
          <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div
              class="
                w-20
                h-20
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-indigo-100
                text-indigo-500
                mb-5
                flex-shrink-0
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
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                />
              </svg>
            </div>
            <div class="flex-grow">
              <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                Quick Upload
              </h2>
              <p class="leading-relaxed text-base">
                This site can upload your files, in split seconds without any
                network issue
              </p>
            </div>
          </div>
          <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
            <div
              class="
                w-20
                h-20
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-indigo-100
                text-indigo-500
                mb-5
                flex-shrink-0
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="flex-grow">
              <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                Friendly User-Experience
              </h2>
              <p class="leading-relaxed text-base">
                You don't need any experience on this tool, all you need is to
                drag and drop your file
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
  </section>
</template>

<script>
export default {
  name: "UploadPage",
  data() {
    return {
      boxes: [
        {
          icon: "/wallpaper-1.jpg",
          heading: "filename",
          details: "file size",
        },
        {
          icon: "/wallpaper-2.jpg",
          heading: "file name",
          details: "file size",
        },
        {
          icon: "/wallpaper-1.jpg",
          heading: "filename",
          details: "file size",
        },
      ],
    };
  },
};
</script>
<style>
.section-bg {
}
</style>