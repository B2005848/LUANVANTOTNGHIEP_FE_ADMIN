<template>
  <div class="container-fluid mt-3">
    <Theproccessbooking></Theproccessbooking>
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
            class="btn btn-outline-primary w-100"
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
import PaginationComponent from "@/components/Pagination.vue";
import { useProccess } from "@/stores/proccess_booking.store";
import Theproccessbooking from "@/components/proccess_booking.vue";

const departments = ref([]);
const selectedDepartment = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);

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
</style>
