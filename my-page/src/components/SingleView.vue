<script setup>
import { ref } from 'vue';
const id = 1;
const views = ref({})

getViewData();
function getViewData() {
  axios.get('http://localhost:3000/views/1').then((res) => {
    views.value = res.data;
    console.log(res.data);
  });
}

// getViewData();
// function getViewData() {
//   axios.get('http://localhost:3000/views/' + `${id}`).then((res) => {
//     views.value = res.data;
//     console.log(res.data);
//   });
// }
</script>

<template>
  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="view in views">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg"
              role="img" preserveAspectRatio="xMidYMid slice" focusable="false">
              <rect width="100%" height="100%" fill="#55595c" />
              <text x="1%" y="10%" fill="#eceeef">{{ view.name }}</text>
            </svg>
            <div class="card-body">
              <p class="card-text">
                {{ view.description.slice(0, 50) + "..." }}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a :href="`/view-list/${view.id}`" type="button" class="btn btn-sm btn-outline-secondary">
                    View
                  </a>
                  <!-- <button
                          type="button"
                          class="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

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
          <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">收藏</button>
        </div>
      </div>
    </div>
  </div>
</template>
