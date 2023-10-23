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
  import Sidenav from '@/components/admin/Sidenav/Sidenav.vue'
  import Navbar from '@/components/admin/navbar/Navbar.vue'
  import Footer from '@/components/admin/Footer.vue'
</script>

<style scoped lang="scss">
  .main-content {
    @apply ml-[17.125rem];
  }
</style>
