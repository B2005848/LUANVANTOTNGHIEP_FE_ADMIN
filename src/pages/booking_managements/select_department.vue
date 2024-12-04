<template>
  <div class="container-fluid mt-3">
    <div>
      <ul class="ul__list d-flex" style="justify-content: center">
        <li>Tạo hồ sơ</li>
        <li>&gt;</li>
        <li class="active">Chọn phòng khám</li>
        <li>&gt;</li>
        <li>Chọn dịch vụ</li>
        <li>&gt;</li>
        <li>Chọn bác sĩ</li>
        <li>&gt;</li>
        <li>Thanh toán</li>
      </ul>
    </div>
    <div class="card p-4">
      <h4 class="text-center">Chọn Phòng Khám</h4>

      <!-- Danh sách Phòng Khám -->
      <div v-if="departments.length">
        <div
          v-for="department in departments"
          :key="department.department_id"
          class="mb-3"
        >
          <button
            :class="[
              'btn',
              'w-100',
              department.department_id === selectedDepartment?.department_id
                ? 'selected'
                : 'btn-outline-primary',
            ]"
            @click="selectDepartment(department)"
          >
            {{ department.department_name }}
          </button>
        </div>

        <!-- Phân trang -->
        <div class="d-flex justify-content-between mt-4">
          <PaginationComponent
            :pageCount="totalPages"
            :currentPage="currentPage"
            @page-change="fetchDataByPage"
          />
        </div>
      </div>

      <!-- Xác nhận -->
      <div v-if="selectedDepartment">
        <div class="alert alert-info mt-4">
          Bạn đã chọn: <strong>{{ selectedDepartment.department_name }}</strong>
        </div>
        <button class="btn btn-success w-100" @click="confirmSelection">
          Tiến hành chọn dịch vụ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import PaginationComponent from "@/components/Pagination.vue";
import { useProccess } from "@/stores/proccess_booking.store";
import Theproccessbooking from "@/components/proccess_booking.vue";
const router = useRouter();
const route = useRoute();
const departments = ref([]);
const selectedDepartment = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const patient_id = route.params.patient_id;

// Hàm tải danh sách phòng khám theo trang
const loadDepartments = async (page) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/departments/getListForPatient/?page=${page}`
    );
    departments.value = response.data.listDepartments;
    totalPages.value = response.data.totalPages;
    currentPage.value = page;
  } catch (error) {
    console.error("Lỗi khi tải danh sách phòng khám:", error);
  }
};

// Chọn phòng khám
const selectDepartment = (department) => {
  selectedDepartment.value = department;
};

// Xác nhận phòng khám đã chọn
const confirmSelection = () => {
  console.log("ID Phòng Khám Đã Chọn:", selectedDepartment.value.department_id);
  // Tiến hành chọn dịch vụ hoặc chuyển bước tiếp theo
  router.push({
    name: "admin.select.service",
    params: {
      patient_id: patient_id,
      department_id: selectedDepartment.value.department_id,
    },
  });
};

// Hàm xử lý khi chuyển trang
const fetchDataByPage = (newPage) => {
  loadDepartments(newPage);
};

onMounted(() => {
  loadDepartments(currentPage.value);
  const useProccessStore = useProccess();
  useProccessStore.setStep(2);
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
