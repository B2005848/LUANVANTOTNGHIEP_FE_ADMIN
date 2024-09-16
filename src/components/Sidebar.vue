<!-- ------------------------------------------CSS----------------------------------->
<style scoped>
* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
  line-height: 1.5cm;
  padding-top: 20px;
  padding-left: 10px;
  background-color: #f0f0f1;
}

a {
  color: #094067;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  color: #5486c4;
}

a:focus {
  color: #5486c4;
}
</style>
<!-- -----------------------------------TEMPLATE------------------------------ -->
<template>
  <ul>
    <li>
      <router-link :to="{ name: 'admin.dashboard' }"
        >THỐNG KÊ DOANH THU</router-link
      >
    </li>
    <li>
      <router-link :to="{ name: 'admin.emp' }" href="#admin"
        >QUẢN LÍ NHÂN VIÊN</router-link
      >
    </li>
    <li>
      <router-link :to="{ name: 'admin.patients' }" href="#admin"
        >QUẢN LÍ BỆNH NHÂN</router-link
      >
    </li>
    <li>
      <router-link :to="{ name: 'admin.products' }" href="#admin"
        >QUẢN LÍ SẢN PHẨM</router-link
      >
    </li>
    <li>
      <router-link :to="{ name: 'admin.services' }" href="#admin"
        >QUẢN LÍ DỊCH VỤ</router-link
      >
    </li>

    <li>
      <router-link :to="{ name: 'admin.booking' }" href="#admin"
        >QUẢN LÍ LỊCH HẸN</router-link
      >
    </li>
    <li>
      <router-link :to="{ name: 'admin.category_products' }" href="#admin"
        >QUẢN LÍ DANH MỤC SẢN PHẨM</router-link
      >
    </li>

    <li>
      <router-link :to="{ name: '' }" href="#admin">CÁC YÊU CẦU</router-link>
    </li>
    <li>
      <router-link :to="{ name: '' }" href="#admin">CÀI ĐẶT</router-link>
    </li>
  </ul>
</template>
