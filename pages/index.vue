<script setup lang="ts">
import { APIResponse } from '~~/types/APIResponse';

const searchTerm = ref('');
const page = ref(1);

const disabledPrevious = computed(() => {
  return page.value === 1;
});

const disabledNext = computed(() => {
  return page.value === data.value?.total_pages;
});

const debouncedSearchTerm = refDebounced(searchTerm, 700);

const url = computed(() => {
  return `api/movies/search?query=${debouncedSearchTerm.value}&page=${page.value}`
});
const { data } = await useFetch<APIResponse>(url);

useSeoMeta({
  titleTemplate: `搜尋 %s | Kama\'s Movies App`,
  title: debouncedSearchTerm
})

</script>

<template>
  <div class="flex flex-col">
    <div class="relative aspect-ratio-1/1 md:aspect-ratio-3/2 lg:aspect-ratio-25/9 flex flex-col justify-center mb-18">
      <div class="absolute inset-0 header-bg bg-cover bg-fixed bg-no-repeat brightness-55"></div>
      <div class="z-1">
        <h2 class="text-2xl md:text-3xl font-bold text-center">Kama's Movies App</h2>
      </div>
      <div class="flex justify-center items-center mx-auto w-max h-32 z-1 relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512" class="absolute z-2 left-3" >
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/>
        </svg>
        <input
          class="text-base font-700 bg-zinc-100 opacity-95 pl-12 pr-4 py-2 border border-neutral-600 rounded-2xl min-w-64 focus:outline-none"
          v-model="searchTerm"
          type="text"
          placeholder="Search ..."
        />
      </div>
    </div>

    <div class="grid grid-cols-1
      sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
      self-center gap-x-10 gap-y-10 mb-10"
    >
      <div v-for="movie in data?.results">
        <MovieCard :movie="movie"></MovieCard>
      </div>
    </div>
    <div v-if="data?.results.length" class="flex justify-center">
      <button v-if="!disabledPrevious" @click="page--" class="px-4 py-2 text-m border rounded-lg cursor-pointer">
        Previous
      </button>
      <div class="px-4 py-2 text-center border rounded-lg w-8"> {{ page }} </div>
      <button v-if="!disabledNext" @click="page++" class="px-4 py-2 text-m border rounded-lg cursor-pointer">
        Next
      </button>
    </div>
  </div>
</template>

<style scoped lang="sass">
.header-bg
  background-image: url(~/assets/img/bg-Caramel.jpg)
</style>