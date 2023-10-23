<script setup>
import { useUserInfoStore } from '/src/stores/main-store.js';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const $router = useRouter();
const store = useUserInfoStore();
const userId = computed(() => store.userId);
const views = ref([])

const isAdmin = computed(() => store.isAdmin);

onMounted(() => {
  if (!isAdmin.value) {
    alert("你沒有權限！")
    $router.push("/")
  }
})

const getViewsData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/views")

    if (response.status === 200) {
      views.value = response.data;
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

const addNewView = () => {
  $router.push('/add-new-view');

  // try {
  //   const res = axios.post("http://localhost:3000/views", {
  //     name: "test景點名稱",
  //     description: "test景點內文"
  //   })
  //   getViewsData();
  //   alert("你已成功新增景點！")

  // } catch (err) {
  //   alert("錯誤！something went wrong")
  //   console.log(err)
  // }
}

const deleteView = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3000/views/${id}`)
    getViewsData();
    alert("你已成功刪除景點！")

  } catch (err) {
    alert("錯誤！something went wrong錯誤")
    console.log(err)
  }

}

const editView = (id) => {
  $router.push(`/edit-view/${id}`);
}

</script>

<template>
  <div class="album py-5 bg-body-tertiary">
    <div class="container">
      <div class="row">
        <h1>後台</h1>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button class="btn btn-primary mb-3" @click="addNewView">新增景點
        </button>
      </div>
      <div class="table-responsive" id="tableBlock" style="">
        <table class="table">
          <thead>
            <tr class="table-head">
              <th scope="col">ID</th>
              <th scope="col" class="title">標題</th>
              <th scope="col" class="content">內文</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-for="view in views">
              <td>{{ view.id }}</td>
              <td class="title">{{ view.name }}</td>
              <td class="content">{{ view.description.slice(0, 50) + "..." }}</td>
              <td class="d-md-flex justify-content-md-end">
                <a @click="editView(view.id)" class="btn btn-primary mx-1">編輯</a>
                <a @click="deleteView(view.id)" class="btn btn-danger">刪除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .table-responsive .table-head {
  width: 1296px;
} */

.table .title {
  width: 200px;
}

/* .table .content {
  width: 700px;
} */
</style>