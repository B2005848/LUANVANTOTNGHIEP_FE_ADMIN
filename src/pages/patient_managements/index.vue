<template>
  <div>
    <!-- Quản lí nhân viên -->
    <div class="container-fluid mt-3">
      <div class="wapper card p-3">
        <div class="d-flex mt-3">
          <div class="flex-1">
            <h3 class="">Danh sách tài khoản bệnh nhân</h3>
          </div>
          <div class="d-flex">
            <form class="tw-max-w-md tw-mx-auto">
              <div class="tw-relative">
                <div
                  class="tw-absolute tw-inset-y-0 tw-start-0 tw-flex tw-items-center tw-ps-3 tw-pointer-events-none"
                >
                  <svg
                    class="tw-w-4 tw-h-4 tw-text-gray-500 dark:tw-text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  v-model="searchData"
                  id="default-search"
                  size="50"
                  class="tw-block tw-w-full tw-p-4 tw-ps-10 tw-text-sm tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-gray-50 focus:tw-ring-blue-500 focus:tw-border-blue-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                  placeholder="Nhập thông tin tài khoản cần tìm..."
                  required
                />
                <button
                  @click="handleSearch"
                  type="button"
                  class="tw-text-white tw-absolute tw-end-2.5 tw-bottom-2.5 tw-bg-blue-500 hover:tw-bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-300 tw-font-normal tw-rounded-lg tw-text-sm tw-px-4 tw-py-2 dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- --TW CSS -->
        <!-- list emp -->
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
                <th scope="col" class="tw-px-6 tw-py-3">STT</th>
                <th scope="col" class="tw-px-6 tw-py-3">Mã bệnh nhân</th>
                <th scope="col" class="tw-px-6 tw-py-3">Họ và tên</th>
                <th scope="col" class="tw-px-6 tw-py-3">Ngày sinh</th>
                <th scope="col" class="tw-px-6 tw-py-3">Email</th>
                <th scope="col" class="tw-px-6 tw-py-3">Số CCCD/CMND</th>
                <th scope="col" class="tw-px-6 tw-py-3">Trạng thái</th>
                <th scope="col" class="tw-px-6 tw-py-3">Ngày tạo</th>
                <th scope="col" class="tw-px-6 tw-py-3">Ngày chỉnh sửa</th>
                <th scope="col" class="tw-px-6 tw-py-3">Hồ sơ bệnh án</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(pa, index) in listPatientsData"
                :key="index"
                class="tw-bg-white tw-text-center tw-border-b tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-hover:bg-gray-50 tw-dark:hover:bg-gray-600"
              >
                <!-- STT -->
                <th
                  scope="row"
                  class="tw-px-6 tw-py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap tw-dark:text-white"
                >
                  {{ (currentPage - 1) * itemsPerPageData + index + 1 }}
                </th>
                <td>{{ pa.patient_id }}</td>
                <td>{{ pa.first_name }} {{ pa.last_name }}</td>
                <td class="px-6 py-4">{{ formatBirthDay(pa.birthday) }}</td>
                <td class="px-6 py-4">{{ pa.email }}</td>
                <td class="px-6 py-4">
                  {{ pa.citizen_id || "Chưa cập nhật" }}
                </td>
                <td class="px-6 py-4">
                  <span class="text-success" v-if="pa.status === '1'"
                    >Đang hoạt động</span
                  >
                  <span class="text-danger" v-if="pa.status === '0'"
                    >Ngừng hoạt động</span
                  >
                  <span class="text-warning" v-if="pa.status === '2'"
                    >Tạm khóa</span
                  >
                </td>
                <td class="px-6 py-4">{{ formatDateTime(pa.created_at) }}</td>
                <td class="px-6 py-4">{{ formatDateTime(pa.updated_at) }}</td>

                <td class="px-6 py-4">
                  <router-link
                    :to="{
                      name: 'admin.emp_details',
                      params: { id: pa.patient_id },
                    }"
                  >
                    Chi tiết
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <PaginationComponent
          :pageCount="totalPagesData"
          :currentPage="currentPage"
          @page-change="fetchDataByPage"
        />
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<!----------------------------------------------------------SCRIP SETUP----------------------------------------------->
<script setup>
import { onMounted, ref } from "vue";
import {
  handleGetListPatients,
  listPatientsData,
  errorMessage,
  totalPagesData,
  itemsPerPageData,
} from "@/services/patient_managements/handleGetListPatient";
import { searchPatients } from "@/services/patient_managements/handleSearchPatients";
import PaginationComponent from "@/components/Pagination.vue";
import formatDate from "@/helper/format-datetime";
const formatDateTime = formatDate.formatDateTime;
const formatBirthDay = formatDate.formatDateBirth;
const currentPage = ref(1);

const fetchDataByPage = async (page) => {
  currentPage.value = page;
  await handleGetListPatients(page);
};

// Xử lý tìm kiếm tài khoản nhân viên
const searchData = ref("");
const handleSearch = async () => {
  if (searchData.value) {
    const resultDataSearch = await searchPatients(searchData.value);
    if (resultDataSearch && resultDataSearch.data.length > 0) {
      listPatientsData.value = resultDataSearch.data;
    } else {
      errorMessage.value = "Không tìm thấy tài khoản nào phù hợp.";
    }
  } else {
    await fetchDataByPage(1);
  }
};

onMounted(async () => {
  await fetchDataByPage(1);
});
</script>

<!------------------------------------------------------CSS SCOPED------------------------------------------>
<style scoped>
.wapper .d-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-search {
  background-color: #007bff;
  border-radius: 14px;
}

.d-flex div:nth-child(2) button {
  color: #ffffff;
  font-size: 25px;
  text-align: center;
  align-items: center;
  border: none;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.page-item {
  margin: 0 5px;
}

.page-link {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  cursor: pointer;
}

.page-link:hover {
  background-color: #007bff;
  color: white;
}
</style>
