<script setup>
import { useUserInfoStore } from '/src/stores/main-store.js';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const $router = useRouter();
const store = useUserInfoStore();
const viewTitle = ref("")
const viewDescription = ref("")

const isAdmin = computed(() => store.isAdmin);

onMounted(() => {
  if (!isAdmin.value) {
    alert("你沒有權限！")
    $router.push("/")
  }
})

const addNewView = async () => {
  try {
    const res = await axios.post("https://tourist-web-2023-js-1.vercel.app/views", {
      name: viewTitle.value,
      description: viewDescription.value
    })
    alert("你已成功新增景點！")
    $router.push("/admin")
  } catch (err) {
    alert("錯誤！something went wrong")
    console.log(err)
  }
}

</script>

<template>
  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <div class="row mb-3">
        <h1>新增景點</h1>
      </div>
      <div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">標題（景點名稱）</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" v-model="viewTitle">
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">內文敘述</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="viewDescription"></textarea>
        </div>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button class="btn btn-primary mb-3" @click="addNewView">確認新增
        </button>
      </div>
    </div>
  </div>
</template>
