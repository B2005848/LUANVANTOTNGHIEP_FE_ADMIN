<style scoped>
* {
  margin: 0;
}

.d-flex {
  background-color: #ffffff;
  border: #212f3c 1px solid;
  border-right: none;
  border-left: none;
  padding: 30px 25px 30px 25px;
  height: 30px;
  margin: 0;
}

.d-flex:nth-child(1),
.d-flex:nth-child(2) {
  justify-content: center;
  align-items: center;
}

p {
  color: #ffffff;
  font-size: 15px;
  margin-left: 15px;
}
</style>
<template>
  <div class="d-flex justify-content-between">
    <div>
      <img src="/LogoNoText.svg" width="50" alt="" />
      <img src="/TitleLogo.svg" width="200" alt="" />
    </div>
    <div>
      <font-awesome-icon
        style="color: #34495e; font-size: 20px"
        icon="fa-bars-staggered"
      />
    </div>
  </div>
</template>
<script setup></script>
