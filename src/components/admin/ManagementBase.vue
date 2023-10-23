<template>
  <div class="w-full h-[750px] bg-white rounded-2xl flex flex-col">
    <!-- searching and filtering -->
    <div class="grid gap-5 grid-cols-12 pt-6 px-5">
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
    <div class="flex-1 w-full mt-5 row-span-5 min-h-[36.5625rem]">
      <slot name="main" />
    </div>

    <div class="">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
