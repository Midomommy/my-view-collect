<script setup>
import ViewComponent from '/src/components/ViewComponent.vue';
import { useUserInfoStore } from '/src/stores/main-store.js';
import { onMounted, ref, computed } from 'vue';

const store = useUserInfoStore();
const userId = computed(() => store.userId);
const views = ref([])

const getUserViewList = async () => {
  views.value = [];
  const res = await axios.get(`https://json-server-in.vercel.app/collects?userId=${userId.value}&_expand=view`);
  if (res.data) {
    res.data.forEach(item => {
      item.view['collectId'] = item.id
      views.value.push(item.view)
    });
  }
}

getUserViewList();


</script>

<template>
  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <div class="row mb-5">
        <h1>我的景點</h1>
      </div>
    </div>
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <ViewComponent v-for="view in views" v-bind="view" :key="view.id" @update="getUserViewList"></ViewComponent>
      </div>
    </div>
  </div>
</template>
