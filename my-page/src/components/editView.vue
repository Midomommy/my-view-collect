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

const viewId = window.location.pathname.split('/').pop();

const getViewData = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/views/${viewId}`)
    if (res.status === 200) {
      viewTitle.value = res.data.name
      viewDescription.value = res.data.description
    }

  } catch (err) {
    alert("錯誤！something went wrong")
    console.log(err)
  }
}

getViewData();

const confirmEdit = async () => {
  try {
    const res = await axios.patch(`http://localhost:3000/views/${viewId}`, {
      name: viewTitle.value,
      description: viewDescription.value
    })
    alert("你已成功編輯景點！")
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
        <h1>編輯景點</h1>
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
        <button class="btn btn-primary mb-3" @click="confirmEdit">確認編輯
        </button>
      </div>
    </div>
  </div>
</template>
