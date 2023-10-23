<script setup>
import { useUserInfoStore } from '/src/stores/main-store.js';
import { ref, computed } from 'vue';
const store = useUserInfoStore();
const isLogin = computed(() => store.isLogin);
const userId = computed(() => store.userId);

const props = defineProps({
  id: Number,
  name: String,
  description: String,
  collectId: Number
  // collectId: {
  //   type: Number,
  //   default: 0
  // }
})

// const isCollect = ref(props.collectId !== undefined)

const emit = defineEmits(['update'])

const isCollect = computed({
  get: () => props.collectId,
  set: (val) => {
    emit('update')
    return val;
  }
});

const collect = async (id) => {
  try {
    const res = await axios.post('https://tourist-web-2023-js-1.vercel.app/collects', {
      userId: userId.value,
      viewId: id
    });
    console.log('isCollect.value', isCollect.value)
    console.log('res.data.id', res.data.id)
    // isCollect.value = res.data.id
    isCollect.value = true;
  }
  catch (error) {
    if (error.message) {
      alert(error.message);
    } else {
      alert("An error occurred. Please try again later.");
    }
  }
}

const unCollect = async (id) => {
  try {
    const res = await axios.delete(`https://tourist-web-2023-js-1.vercel.app/collects/${id}`);
    if (res.status === 200) {
      // location.reload();
      // isCollect.value = 0
      isCollect.value = false;
    }
  }
  catch (error) {
    if (error.message) {
      alert(error.message);
    } else {
      alert("An error occurred. Please try again later.");
    }
  }

}

</script>

<template>
  <div class="col">
    <div class="card shadow-sm">
      <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img"
        preserveAspectRatio="xMidYMid slice" focusable="false">
        <rect width="100%" height="100%" fill="#55595c" />
        <text x="1%" y="10%" fill="#eceeef">{{ name }}</text>
      </svg>
      <div class="card-body">
        <p class="card-text">
          {{ description.slice(0, 50) + "..." }}
        </p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <a :href="`/view-list/${id}`" type="button" class="btn btn-sm btn-outline-secondary">
              View
            </a>
            <template v-if="isLogin">
              <button @click="unCollect(collectId)" v-if="isCollect" type="button"
                class="ms-3 btn btn-outline-secondary btn-sm btn-light">
                取消收藏
              </button>
              <button @click="collect(id)" v-else type="button" class="ms-3 btn btn-sm btn-primary">
                收藏
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
