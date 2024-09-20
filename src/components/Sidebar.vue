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
    <!-- ------------------------------------CHART--------------------------------- -->
    <li>
      <font-awesome-icon
        icon=" fa-solid fa-chart-simple"
        style="color: #094067"
        size="sm"
      />
      <router-link :to="{ name: 'admin.dashboard' }">
        THỐNG KÊ DOANH THU</router-link
      >
    </li>

    <!-- ------------------------------------------------ACCOUNT PATIENT MANAGEMENTS--------------------------------- -->
    <li>
      <font-awesome-icon
        icon="fa-solid fa-bed-pulse"
        style="color: #094067"
        size="sm"
        class="me-2"
      />
      <router-link :to="{ name: 'admin.patients' }" href="#admin"
        >QUẢN LÍ TÀI KHOẢN BỆNH NHÂN</router-link
      >
    </li>

    <!-- ------------------------------------------------ACCOUNT STAFF MANAGEMENTS--------------------------------- -->
    <li>
      <font-awesome-icon
        icon="fa-solid fa-user"
        style="color: #094067"
        size="sm"
        class="me-2"
      />
      <router-link :to="{ name: 'admin.emp' }" href="#admin"
        >QUẢN LÍ TÀI KHOẢN NHÂN VIÊN</router-link
      >
    </li>

    <li>
      <font-awesome-icon
        icon="fa-solid fa-user"
        style="color: #094067"
        size="sm"
        class="me-2"
      />
      <router-link :to="{ name: 'admin.shifts' }" href="#admin"
        >QUẢN LÍ TÀI CA LÀM VIỆC</router-link
      >
    </li>

    <li>
      <font-awesome-icon
        icon="fa-solid fa-window-restore"
        style="color: #094067"
        size="sm"
        class="me-2"
      />
      <router-link :to="{ name: 'admin.departments' }" href="#admin"
        >QUẢN LÍ PHÒNG KHÁM</router-link
      >
    </li>

    <li>
      <font-awesome-icon
        :icon="['fab', 'creative-commons-nd']"
        style="color: #094067"
        size="sm"
        class="me-2"
      />
      <router-link :to="{ name: 'admin.services' }" href="#admin"
        >QUẢN LÍ DỊCH VỤ</router-link
      >
    </li>

    <li>
      <font-awesome-icon
        :icon="['far', 'calendar-check']"
        style="color: #094067"
        size="sm"
        class="me-2"
      />
      <router-link :to="{ name: 'admin.booking' }" href="#admin"
        >QUẢN LÍ LỊCH HẸN</router-link
      >
    </li>

    <li>
      <font-awesome-icon
        icon="fa-regular fa-bell"
        style="color: #094067"
        size="sm"
        class="me-2"
      />
      <router-link :to="{ name: 'admin.requests' }" href="#admin"
        >CÁC YÊU CẦU</router-link
      >
    </li>
    <li>
      <font-awesome-icon
        icon="fa-solid fa-gear"
        style="color: #094067"
        size="sm"
        class="me-2"
      />
      <router-link :to="{ name: 'admin.settings' }" href="#admin"
        >CÀI ĐẶT</router-link
      >
    </li>
  </ul>
</template>
