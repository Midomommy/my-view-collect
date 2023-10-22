<script setup>
import { useUserInfoStore } from '/src/stores/main-store.js';
import { ref, computed } from 'vue';
const store = useUserInfoStore();
const isLogin = computed(() => store.isLogin);

const id = window.location.pathname.split('/')[2];
const view = ref({})

getViewData();
function getViewData() {
  axios.get('http://localhost:3000/views/' + `${id}`).then((res) => {
    view.value = res.data;
    console.log(res.data);
  });
}
</script>

<template>
  <div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="https://picsum.photos/700/500" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700"
          height="500" loading="lazy">
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">{{ view.name }}</h1>
        <p class="lead">{{ view.description }}</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <button v-if="isLogin" type="button" class="btn btn-primary btn-lg px-4 me-md-2">收藏</button>
        </div>
      </div>
    </div>
  </div>
</template>
