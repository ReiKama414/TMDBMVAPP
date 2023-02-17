<script setup lang="ts">
import { PropType } from 'vue';
import { Movie } from '~~/types/Movie';

const props = defineProps({
  movie: {
    type: Object as PropType<Movie>
  }
});
const config = useRuntimeConfig();
const imgURL = computed(() => props.movie?.poster_path != null ?
  `${config.public.imgBaseUrl}/${props.movie.poster_path}` :
  'https:via.placeholder.com/300x500');
</script>

<template>
  <div class="h-130 w-64 border flex flex-col text-center">
    <NuxtLink :to="`/movies/${movie?.id}`" class="mb-5 bg-red-900 inline-block">
      <img
        class="transform hover:translate-x-4 hover:-translate-y-4 delay-50 duration-100 inline-block object-cover w-full"
        :src="imgURL"
        alt="Movie Poster"
      />
    </NuxtLink>
    <div class="text-lg">
      {{ movie?.title }}
    </div>
    <p class="text-m text-gray-500 break-words text-wrap truncate overflow-hidden px-2">
      {{ movie?.overview }}
    </p>
    <div>
      
    </div>
  </div>
</template>

<style scoped lang="sass">
// img[src="https:via.placeholder.com/300x500"]
//   max-height: 384px
img
  height: 384px
</style>