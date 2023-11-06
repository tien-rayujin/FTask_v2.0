<template>
  <div class="w-full h-fit rounded-2xl flex flex-col">
    <div class="col-span-full mb-5">
      <slot name="detail" />
    </div>

    <!-- searching and filtering -->
    <div class="grid gap-5 grid-cols-12 py-6 px-5 bg-white rounded-xl">
      <!-- search -->
      <div class="col-span-4">
        <slot name="header" />
      </div>

      <!-- filter -->
      <div class="col-span-6">
        <slot name="header_filter" />
      </div>

      <div class="col-span-2 flex justify-end">
        <slot name="header_add" />
      </div>
    </div>

    <!-- table -->
    <div
      class="flex-1 w-full mt-5 row-span-5 min-h-[19.5625rem] p-5 bg-white rounded-xl"
    >
      <slot name="main" />

      <div class="">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
