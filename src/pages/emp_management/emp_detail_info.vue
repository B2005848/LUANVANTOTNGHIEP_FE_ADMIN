<template>
  <div class="card mt-3 p-5">
    <div class="d-flex mt-5" style="justify-content: space-around">
      <div v-if="emp" class="flex-1 avt">
        <img :src="emp.image" alt="" width="300" />
        <p class="text-center mt-2" style="font-weight: bold" v-if="emp">
          {{ emp.name }}
        </p>
        <p class="text-center mt-2" v-if="emp">Tham gia vào: {{ emp.join }}</p>
      </div>
      <div class="flex-1">
        <div class="d-flex">
          <div class="flex-1 me-5">
            <div class="form-group">
              <p style="font-weight: bold">Mã nhân viên:</p>
              <p style="font-weight: bold">Tên nhân viên:</p>
              <p style="font-weight: bold">Ngày sinh:</p>
              <p style="font-weight: bold">Địa chỉ:</p>
              <p style="font-weight: bold">Điện thoại:</p>
              <p style="font-weight: bold">Email:</p>
              <p style="font-weight: bold">Chuyên khoa:</p>
              <p style="font-weight: bold">Quyền truy cập:</p>
            </div>
          </div>
          <div class="flex-1">
            <div class="form-group">
              <p v-if="emp">{{ emp.username }}</p>
              <p v-if="emp">{{ emp.name }}</p>
              <p v-if="emp">{{ emp.birthyear }}</p>
              <p v-if="emp">{{ emp.address }}</p>
              <p v-if="emp">{{ emp.phone }}</p>
              <p v-if="emp">{{ emp.email }}</p>
              <p v-if="emp">{{ emp.specialty }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Số bệnh nhân đã khám -->
    <div class="d-flex mt-5" style="justify-content: space-around">
      <div class="flex-1 box__info">
        <p style="font-weight: bold">Số bệnh nhân đã khám</p>
        <p>156 bệnh nhân</p>
      </div>

      <div class="flex-1 box__info">
        <p style="font-weight: bold">Tổng doanh thu</p>
        <p>120.000.000 VNĐ</p>
      </div>
    </div>

    <div>
      <div class="d-flex mt-5" style="justify-content: center">
        <button class="btn btn-primary" style="width: 200px">
          Xem lịch sử khám
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.avt img {
  border-radius: 50%;
}

.box__info {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  text-align: center;
  padding: 10px;
  border-radius: 13px;
}
</style>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const empId = route.params.username;
const emp = ref(null);
onMounted(async () => {
  const response = await fetch("/list-doctors.json");
  const data = await response.json();
  emp.value = data.listdoctors.find((doctor) => doctor.username == empId);
});
</script>
