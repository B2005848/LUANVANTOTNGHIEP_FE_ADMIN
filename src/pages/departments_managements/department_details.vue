<template>
  <div>
    <!-- Chi tiết phòng làm việc -->
    <div class="container mt-4">
      <div class="card p-4">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Chi Tiết Phòng Làm Việc</h2>
          <button
            class="btn btn-secondary"
            @click="$router.push({ name: 'admin.departments' })"
          >
            Trở Lại
          </button>
        </div>

        <!-- Thông tin chi tiết phòng -->
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label fw-bold">Mã Phòng:</label>
              <p class="form-control">{{ departmentId }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label class="form-label fw-bold">Tên Phòng:</label>
              <p class="form-control">
                <!-- {{ departmentDetails.department_name }} -->
                Phòng Khám Tổng Quát
              </p>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label class="form-label fw-bold">Mô tả :</label>
          <p class="form-control">
            <!-- {{ departmentDetails.description }} -->
            Nơi mà các bệnh nhân có thể kiểm tra sức khỏe định kì một cách tổng
            quát và nhanh chóng.
          </p>
        </div>

        <!-- Thông tin nhân viên trong phòng -->
        <h3 class="mt-4">Danh Sách Nhân Viên</h3>
        <p>Đây là danh sách nhân viên làm việc tại phòng này</p>

        <!-- -------  TABLE---------------- -->
        <div class="table-responsive mt-3">
          <div
            class="mt-5 tw-relative tw-overflow-x-auto tw-shadow-md tw-sm:rounded-lg"
          >
            <table
              class="tw-w-full tw-text-sm tw-text-left tw-rtl:text-right tw-text-gray-800 tw-dark:text-gray-400"
            >
              <thead
                class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-200 tw-dark:bg-gray-700 tw-dark:text-gray-400"
              >
                <tr class="tw-text-center">
                  <th scope="col" class="tw-px-4 tw-py-2">STT</th>
                  <th scope="col" class="tw-px-4 tw-py-2">MÃ NHÂN VIÊN</th>
                  <th scope="col" class="tw-px-4 tw-py-2">HỌ VÀ TÊN</th>
                  <th scope="col" class="tw-px-4 tw-py-2">CHỨC VỤ</th>
                  <th scope="col" class="tw-px-4 tw-py-2">EMAIL</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(emp, index) in employees"
                  :key="index"
                  class="tw-bg-white tw-text-center tw-border-b tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-hover:bg-gray-50 tw-dark:hover:bg-gray-600"
                >
                  <!-- STT -->
                  <th
                    scope="row"
                    class="tw-px-4 tw-py-2 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap tw-dark:text-white"
                  >
                    {{ (currentPage - 1) * itemsPerPageData + index + 1 }}
                  </th>
                  <td>{{ emp.staff_id }}</td>
                  <td>{{ emp.first_name + " " + emp.last_name }}</td>

                  <td>
                    {{ emp.role_name }}
                  </td>

                  <td>
                    {{ emp.email }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <PaginationComponent
            v-if="employees.length !== 0"
            :pageCount="totalPagesData"
            :currentPage="currentPage"
            @page-change="fetchDataByPage"
          />
          <p v-if="employees.length === 0" class="text-center mt-3 text-muted">
            Không có nhân viên nào trong phòng này.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import PaginationComponent from "@/components/Pagination.vue";
const currentPage = ref(1);

const route = useRoute();
const departmentId = route.params.id;

const departmentDetails = ref({});
const employees = ref([]);

// 1. Tải dữ liệu thông tin phòng khám
const fetchDepartmentDetails = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/departments/${departmentId}`
    );
    departmentDetails.value = response.data.department;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin chi tiết phòng:", error);
  }
};

// 2. Tải dữ liệu nhân viên theo trang
const errorMessage = ref("");
const totalPagesData = ref(0);
const itemsPerPageData = ref(10);
const fetchDataByPage = async (page) => {
  currentPage.value = page;
  await fetchListStaffByDepartmentId(page);
};
const fetchListStaffByDepartmentId = async (page = 1) => {
  currentPage.value = page;
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/departments/liststaff/${departmentId}?page=${page}`
    );
    if (response.status === 200) {
      employees.value = response.data.listStaffByDep;
      itemsPerPageData.value = response.data.itemsPerPage;
      totalPagesData.value = response.data.totalPages;
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Get list staff by department ID FAILS";
    console.log(error.response.data.message);
  }
};

onMounted(() => {
  fetchDepartmentDetails();
  fetchListStaffByDepartmentId();
});
</script>

<style scoped>
.container {
  width: 100%;
}
.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.table {
  margin-top: 20px;
}
.table th {
  text-align: center;
}
.table td {
  text-align: center;
  vertical-align: middle;
}
</style>
