<template>
  <footer class="py-3">
    <div class="w-100 px-3">
      <div class="grid grid-cols-12 items-center content-between">
        <div class="mb-4 col-span-6 flex">
          <div class="text-sm text-center lg:text-left text-[#67748e]">
            ©
            {{ new Date().getFullYear() }}, made with
            <i class="fa fa-heart"></i> by
            <a
              href="https://www.creative-tim.com"
              class="font-bold"
              target="_blank"
              >Creative Tim</a
            >
            and
            <a href="https://updivision.com" class="font-bold" target="_blank"
              >UPDIVISION</a
            >
            for a better web.
          </div>
        </div>
        <div class="col-span-6">
          <ul class="flex flex-wrap justify-end">
            <li class="nav-item">
              <a
                href="https://updivision.com"
                class="nav-link text-muted"
                target="_blank"
                >UPDIVISION</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://www.creative-tim.com"
                class="nav-link text-muted"
                target="_blank"
                >Creative Tim</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://www.creative-tim.com/presentation"
                class="nav-link text-muted"
                target="_blank"
                >About Us</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://www.creative-tim.com/blog"
                class="nav-link text-muted"
                target="_blank"
                >Blog</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://www.creative-tim.com/license"
                class="nav-link pe-0 text-muted"
                target="_blank"
                >License</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss">
  .nav-item {
    @apply flex;
  }

  .nav-link {
    @apply text-[#67748e] text-[0.875rem] font-normal py-[0.5rem] px-4;
  }
</style>
