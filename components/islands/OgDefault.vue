<script setup lang="ts">
defineProps({
  title: String,
  image: String,
})

// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="w-full h-full bg-stone-800">
    <img class="absolute top-0 left-0 z-0 w-full h-full opacity-5 " style="objectFit: cover;" :src="image" alt="">
    <img class="absolute top-0 left-0 z-0" src="/og_bg.png" alt="">
    <div class="w-full h-full z-10 relative font-main flex flex-col text-white  items-center justify-center">
      <svg

        height="120"
        viewBox="0 0 150 155"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M121.5 79C121.5 105.234 100.234 126.5 74 126.5C47.7665 126.5 26.5 105.234 26.5 79C26.5 52.7665 47.7665 31.5 74 31.5C100.234 31.5 121.5 52.7665 121.5 79Z"
          stroke="white"
          stroke-width="15"
        />
        <path
          d="M87.444 152.42C83.4946 157.416 75.4867 154.679 75.3915 148.3L74 55H136.456C147.768 55 154.078 68.1242 147.043 77.0234L87.444 152.42Z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M87.444 152.42C83.4946 157.416 75.4867 154.679 75.3915 148.3L74 55H136.456C147.768 55 154.078 68.1242 147.043 77.0234L87.444 152.42Z"
          fill="url(#paint1_linear)"
          fill-opacity="0.2"
        />
        <path
          d="M62.3744 2.58022C66.3124 -2.4161 74.2971 0.321522 74.392 6.70054L75 100H13.505C2.22509 100 -4.06591 86.8757 2.94826 77.9766L62.3744 2.58022Z"
          fill="#3ECF8E"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="74"
            y1="75.6868"
            x2="129.582"
            y2="98.8945"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#249361" />
            <stop offset="1" stop-color="#3ECF8E" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="49.3904"
            y1="41.8418"
            x2="74.8813"
            y2="89.614"
            gradientUnits="userSpaceOnUse"
          >
            <stop />
            <stop offset="1" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <h1 class="mt-6 mb-0 font-semibold text-gray-200 text-center whitespace-normal mx-12 leading-12" style=" font-size: 5.5rem;">
        {{ title }}
      </h1>

      <h2 class="font-medium mt-6 mb-20 text-5xl">
        Made with Supabase
      </h2>
    </div>
  </div>
</template>
