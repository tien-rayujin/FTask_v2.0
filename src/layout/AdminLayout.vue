<template>
  <Sidenav />
  <main class="main-content">
    <Navbar />
    <div class="p-6">
      <RouterView />
    </div>
    <Footer />
  </main>
</template>
<script setup lang="ts">
  import Sidenav from '@/component/admin/Sidenav/Sidenav.vue'
  import Navbar from '@/component/admin/navbar/Navbar.vue'
  import Footer from '@/component/admin/Footer.vue'
</script>

<style scoped lang="scss">
  .main-content {
    @apply ml-[17.125rem];
  }
</style>
