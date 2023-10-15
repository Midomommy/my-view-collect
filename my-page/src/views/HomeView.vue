<script setup>
import ViewList from '../components/ViewList.vue';


// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <!--說明文字-->
    <section class="py-2 container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light text-center">景點收藏管理網站</h1>
          <p class="text-center">
            <a href="#" class="btn btn-primary my-2 me-2">立即註冊</a>
            <a href="#" class="btn btn-secondary my-2">立即登入</a>
          </p>
          <p class="lead text-body-secondary">
            [前台]<br />
            - 登入前：註冊、登入、顯示首頁景點列表 <br />- 登入後：<br />
            -- 點入景點詳細列表，出現收藏按鈕，可收藏該景點<br />
            -- 可觀看個人收藏列表<br />
            [後台（登入後）]<br />
            1. 登入後會依照權限，判斷轉址到後台頁面<br />
            2. 首頁顯示景點列表 <br />3. 新增景點功能<br />
            4. 編輯景點功能 <br />5. 刪除景點功能
          </p>
        </div>
      </div>
    </section>
    <!--END 說明文字-->
    <!--景點列表-->
    <ViewList />
    <!--END 景點列表-->
    <!-- <TheWelcome /> -->
  </main>
</template>
