<template>
  <div class="relative inline-block text-left px-5 group">
    <div>
      <button
        id="menu-button"
        type="button"
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        aria-expanded="true"
        aria-haspopup="true"
      >
        Department
        <i class="fa-solid fa-angle-down pt-1 -mr-1 h-5 w-5 text-gray-400"></i>
      </button>
    </div>

    <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
    <div
      class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          >Edit</a
        >
        <a
          href="#"
          class="text-gray-700 block px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          >Duplicate</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
