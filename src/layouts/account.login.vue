<template>
  <div class="back-ground">
    <h1>TRANG LOGIN ADMIN</h1>
  </div>
</template>

<style scoped>
.back-ground {
  width: 100vw;
  height: 100vh;
  background-image: url(background.svg);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

h1 {
  font-size: 24px; /* Kích thước chữ mặc định cho màn hình nhỏ */
}

/* Thiết bị có màn hình từ 768px trở lên */
@media (min-width: 768px) {
  h1 {
    font-size: 36px; /* Tăng kích thước chữ cho màn hình lớn hơn */
  }
}

/* Thiết bị có màn hình từ 1024px trở lên */
@media (min-width: 1024px) {
  h1 {
    font-size: 48px; /* Kích thước lớn cho màn hình desktop */
  }
}
</style>

<script setup></script>
