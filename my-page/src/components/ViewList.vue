<script setup>
import ViewComponent from '/src/components/ViewComponent.vue';
import { useUserInfoStore } from '/src/stores/main-store.js';
import { ref, computed } from 'vue';
const store = useUserInfoStore();
const userId = computed(() => store.userId);
const views = ref({})

const getViewsData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/views")

    if (response.status === 200) {
      views.value = response.data;
      // console.log(response.data);
    }

    if (userId.value) {
      const res = await axios.get(`http://localhost:3000/collects?userId=${userId.value}&_expand=view`);
      if (res.status === 200) {
        res.data.forEach(item => {
          const idxToDelete = views.value.findIndex(i => i.id === item.view.id);
          if (idxToDelete !== -1) {
            views.value.splice(idxToDelete, 1)
          }
          item.view['collectId'] = item.id
          views.value.push(item.view)
        });

        views.value.sort((a, b) => a.id - b.id)
      }
    }
  }
  catch (error) {
    if (error.response) {
      alert(error.response.data);
    } else {
      alert("An error occurred. Please try again later.");
    }
  }

}

getViewsData();

</script>

<template>
  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <ViewComponent v-for="view in views" v-bind="view" :key="view.id"></ViewComponent>
      </div>
    </div>
  </div>
</template>
