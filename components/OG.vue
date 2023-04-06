<script setup lang="ts">
defineProps({
  title: String,
  author: String,
  cover_img: String,
})
</script>

<template>
  <div
    tw="h-full w-full flex items-start justify-start   text-white "
    style="
      background: linear-gradient(
        40deg,
        rgba(15, 15, 15, 1),
        rgba(35, 35, 35, 0.85),
        rgba(52, 185, 125, 1)
      );
    "
  >
    <div tw="p-8 flex  h-full">
      <div tw="flex flex-col items-center justify-between w-full h-full'">
        <svg
          width="97"
          height="100"
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

        <h1 tw="text-5xl font-bold leading-4 mt-8">
          {{ title }}
        </h1>
        <h2 tw="text-white text-3xl">by {{ author }}</h2>
        <div
          tw="text-2xl flex mx-20 mt-4 rounded-[2rem] overflow-hidden border-[8px] border-[#3a3a3a] border-opacity-50"
        >
          <img :src="cover_img" tw="w-full" />
        </div>
      </div>
    </div>
  </div>
</template>
