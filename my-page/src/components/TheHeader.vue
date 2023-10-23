<script setup>
import { useUserInfoStore } from '/src/stores/main-store.js';
import { ref, computed } from 'vue';
const store = useUserInfoStore();
const isLogin = computed(() => store.isLogin);
const isAdmin = computed(() => store.isAdmin);

const openLoginBox = computed(() => store.openLoginBox);

const logOut = () => {
  localStorage.clear();
  store.updateEmail("");
  store.updateLoginState(false);
  store.updateToken("");
  alert("您已登出！")
  window.location.href = '/'
}

</script>

<template>
  <header class="p-3 m-3 text-bg-dark">
    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">首頁</a>
        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <!-- <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/"
                    >首頁</a
                  >
                </li> -->
            <li class="nav-item">
              <a class="nav-link" href="/view-list">所有景點</a>
            </li>
            <li class="nav-item" v-if="isLogin">
              <a class="nav-link" href="/my-collect-list">個人收藏列表</a>
            </li>

          </ul>
          <div class="text-end" v-if="isAdmin">
            <a href="/admin" type="button" class="btn btn-outline-light me-2">
              回到後台
            </a>
          </div>
          <div class="text-end" v-if="!isLogin">
            <button type="button" class="btn btn-outline-light me-2" @click="openLoginBox">
              Login
            </button>
            <a href="/sign-up" type="button" class="btn btn-warning">Sign-up</a>
          </div>
          <div class="text-end" v-else>
            <!-- <div>Hi, xx!</div> -->
            <button type="button" class="btn btn-outline-light me-2" @click="logOut">
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
