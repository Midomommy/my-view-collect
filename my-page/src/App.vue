<script setup>
import TheHeader from '/src/components/TheHeader.vue';
import TheFooter from '/src/components/TheFooter.vue';
import LogIn from '/src/components/LogIn.vue';

import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <TheHeader></TheHeader>
  <RouterView />
  <TheFooter />
  <LogIn />
</template>