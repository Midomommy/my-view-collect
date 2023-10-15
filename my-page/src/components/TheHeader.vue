<script setup>
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
              <a class="nav-link" href="/view-list">景點列表</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">個人收藏列表</a>
            </li>
          </ul>
          <div class="text-end">
            <button type="button" class="btn btn-outline-light me-2">
              Login
            </button>
            <button type="button" class="btn btn-warning">Sign-up</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
