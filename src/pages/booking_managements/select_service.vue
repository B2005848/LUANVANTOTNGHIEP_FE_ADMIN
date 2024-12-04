<template>
  <div class="container-fluid mt-3">
    <div>
      <ul class="ul__list d-flex" style="justify-content: center">
        <li>Tạo hồ sơ</li>
        <li>&gt;</li>
        <li>Chọn phòng khám</li>
        <li>&gt;</li>
        <li class="active">Chọn dịch vụ</li>
        <li>&gt;</li>
        <li>Chọn bác sĩ</li>
        <li>&gt;</li>
        <li>Thanh toán</li>
      </ul>
    </div>
    <div class="card p-4">
      <h4 class="text-center">Chọn dịch vụ khám</h4>

      <!-- Danh sách Phòng Khám -->
      <div v-if="services.length">
        <div v-for="service in services" :key="service.service_id" class="mb-3">
          <button
            :class="[
              'btn',
              'w-100',
              service.service_id === selectedservice?.service_id
                ? 'selected'
                : 'btn-outline-primary',
            ]"
            @click="selectservice(service)"
          >
            {{ service.service_name }}
            {{ formatCurrency(service.service_fee) }}
          </button>
        </div>
      </div>

      <!-- Xác nhận -->
      <div v-if="selectedservice">
        <div class="alert alert-info mt-4">
          Bạn đã chọn: <strong>{{ selectedservice.service_name }}</strong>
        </div>
        <button class="btn btn-success w-100" @click="confirmSelection">
          Tiến hành chọn bác sĩ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { formatCurrency } from "@/helper/currencyFormatter";
const router = useRouter();
const route = useRoute();

const services = ref([]);
const selectedservice = ref(null);
const patient_id = route.params.patient_id;
const department_id = route.params.department_id;
// Hàm tải danh sách phòng khám theo trang
const loadservices = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/services/getService/${department_id}`
    );
    services.value = response.data.dataInfo;
  } catch (error) {
    console.error("Lỗi khi tải danh sách dịch vụ:", error);
  }
};

// Chọn dịch
const selectservice = (service) => {
  selectedservice.value = service;
};

// Xác nhận dịch đã chọn
const confirmSelection = () => {
  console.log("ID Dịch Vụ Đã Chọn:", selectedservice.value.service_id);
  console.log(
    "ID Chuyên Khoa Dịch Vụ Đã Chọn",
    selectedservice.value.specialty_id
  );
  // Tiến hành chọn dịch vụ hoặc chuyển bước tiếp theo
  router.push({
    name: "admin.select.doctor",
    params: {
      patient_id: patient_id,
      department_id: department_id,
      service_id: selectedservice.value.service_id,
      specialty_id: selectedservice.value.specialty_id,
    },
  });
};

onMounted(() => {
  loadservices();
});
</script>

<style scoped>
.container-fluid {
  max-width: 100%;
  margin: 0 auto;
}
.selected {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.btn:hover {
  color: white;
}

.btn-outline-primary {
  border-color: #007bff;
  color: #007bff;
}
.ul__list {
  list-style: none;
  display: flex;
  margin-top: 20px;
}

.ul__list li {
  margin: 10px;
}

.ul__list li.active {
  font-weight: bold; /* Thay đổi style khi active */
  color: #007bff; /* Màu sắc khi active */
  cursor: pointer; /* Chỉnh con trỏ thành dấu chấm khi di chuột */
}
</style>
