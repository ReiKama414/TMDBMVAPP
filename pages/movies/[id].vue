<script setup lang="ts">
import { Movie } from '~~/types/Movie';

const route = useRoute();
const config = useRuntimeConfig();
const movieId = computed(() => route.params.id);

const {data} = await useFetch<Movie>(`/api/movies/${movieId.value}`);

const imgUrl = computed(() => data.value?.poster_path ?
  `${config.public.imgBaseUrl}/${data.value.poster_path}` :
  'https:via.placeholder.com/300x500');

function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedHours = hours > 0 ? `${hours}h ` : '';
  const formattedMinutes = remainingMinutes > 0 ? `${remainingMinutes}m` : '';
  return `${formattedHours}${formattedMinutes}`;
}

function getYearFromDate(dateString: string): number | null {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return isNaN(year) ? null : year;
}

function roundNumber(num: number): number {
  return Math.round(num * 10) / 10;
}

function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  } else {
    const rounded = Math.round(num / 100) / 10;
    return `${rounded}K`;
  }
}

useSeoMeta({
  titleTemplate: `%s | Kama\'s Movies App`,
  title: data.value?.title
})

</script>

<template>
  <div class="flex flex-col px-8 md:px-20 mt-10">
    <div>
      <div class="inline-flex items-center flex-row flex-wrap text-4xl font-bold mb-5">
        <span class="mr-8">{{ data?.title }}</span>
        <div v-if="data?.vote_average" class="flex flex-row items-start mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="w-8 h-8 mr-3">
            <path
              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              fill="#F6CA2A"
            />
          </svg>
          <div class="inline-flex flex-row items-center text-sm text-neutral-300 leading-12">
            <p class="m-0">
              <span class="text-3xl text-gray-50">
                {{ roundNumber(data?.vote_average) }}
              </span>
              / 10
            </p>
            <span>‧</span>
            <p class="m-0">{{ formatNumber(data?.vote_count) }}</p>
          </div>
        </div>
      </div>
      <div v-if="data?.title != data?.original_title" class="text-md text-neutral-300 mb-3">
        Original title: {{ data?.original_title }}
      </div>
      <div class="text-md text-neutral-300 mb-8">
        <span v-if="data?.release_date"> {{ getYearFromDate(data?.release_date) }} </span>
        <span v-if="data?.release_date && data?.runtime">‧</span>
        <span v-if="data?.runtime"> {{ formatMinutes(data?.runtime) }} </span>
      </div>
      <img class="w-64 md:w-84 mb-8" :src="imgUrl" alt="" />
      <div class="flex">
        <div v-for="genre in data?.genres" class="px-4 py-2 bg-black text-zinc-50 rounded mr-2 mb-2">
          {{ genre.name }}
        </div>
      </div>
      
      <p class="text-neutral-400 mb-16">
        {{ data?.tagline }}
      </p>
      <p class="text-gray-50 text-2xl font-700 mb-4">
        概要
      </p>
      <p v-if="data?.overview" class="text-gray-200 font-300">
        {{ data?.overview }}
      </p>
      <p v-else class="text-gray-200 font-300">
        無
      </p>
    </div>
  </div>
</template>