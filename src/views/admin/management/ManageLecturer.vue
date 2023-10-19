<template>
  <div class="w-full h-[750px] bg-white rounded-2xl flex flex-col">
    <!-- searching and filtering -->
    <div class="grid grid-cols-12 pt-5 pl-5">
      <!-- search -->
      <div class="col-span-4 h-50px">
        <input
          type="text"
          placeholder="Search Lecturer"
          class="border border-slate-300 pl-5 pr-[200px] py-2 rounded-xl"
        />
      </div>

      <!-- filter -->
      <div class="h-50px">Filter options</div>
    </div>

    <!-- table -->
    <div class="flex-1 w-full mt-5 bg-slate-400 row-span-5"></div>
  </div>
</template>

<script setup lang="ts"></script>
