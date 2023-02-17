<template>
  <div class="flex flex-col md:flex-row w-screen h-screen">
    <nav class="flex flex-row md:flex-col order-1 md:order-0 justify-around bg-black border-r-1 border-r-solid border-r-zinc-700">
      <NuxtLink class="px-4 py-2 border rounded-lg" to="/" title="Home">
        <img class="w-8 filter-invert" src="~/assets/img/icon-home.svg" />
        <!-- Home Page -->
      </NuxtLink>
    </nav>
    <main class="bg-zinc-900 flex-1 overflow-x-hidden overflow-y-overlay text-white pb-20">
      <slot />
    </main>
  </div>
</template>

<style lang="sass">
*
  ::-webkit-scrollbar
    background-color: rgb(32 35 36)
    color: rgb(171 164 153)
  ::-webkit-scrollbar-corner
    background-color: rgb(24 26 27)
  ::-webkit-scrollbar-thumb
    background-color: rgb(69 74 77)
</style>