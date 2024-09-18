<template>
  <div>
    <!-- Quản lí nhân viên -->
    <div class="container-fluid mt-3">
      <div class="wapper p-2">
        <div class="d-flex">
          <div class="flex-1">
            <h3 class="card-title">Danh sách nhân viên</h3>
          </div>
          <div class="d-flex">
            <form class="tw-max-w-md tw-mx-auto">
              <label
                for="default-search"
                class="tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 tw-sr-only dark:tw-text-white"
                >Search</label
              >
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
                  class="tw-text-white tw-absolute tw-end-2.5 tw-bottom-2.5 tw-bg-blue-700 hover:tw-bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-4 tw-py-2 dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div class="flex-1">
            <button type="button" title="Thêm nhân viên mới">
              <font-awesome-icon
                icon=" fa-plus"
                bounce
                size="lg"
                style="color: #74c0fc"
              />
            </button>
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
                <th scope="col" class="tw-px-6 tw-py-3">Mã nhân viên</th>
                <th scope="col" class="tw-px-6 tw-py-3">Họ và tên</th>
                <th scope="col" class="tw-px-6 tw-py-3">Chức vụ</th>
                <th scope="col" class="tw-px-6 tw-py-3">Email</th>
                <th scope="col" class="tw-px-6 tw-py-3">Số CCCD/CMND</th>
                <th scope="col" class="tw-px-6 tw-py-3">Trạng thái</th>
                <th scope="col" class="tw-px-6 tw-py-3">Ngày tạo</th>
                <th scope="col" class="tw-px-6 tw-py-3">Ngày chỉnh sửa</th>
                <th scope="col" class="tw-px-6 tw-py-3">Tools</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(emp, index) in staffListData"
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
                <td>{{ emp.staff_id }}</td>
                <td>{{ emp.first_name }} {{ emp.last_name }}</td>
                <td>
                  <span v-if="emp.role_id === 'AD'">Người quản trị</span>
                  <span v-if="emp.role_id === 'BS'">Bác Sĩ</span>
                  <span v-if="emp.role_id === 'TN'">Kế Toán</span>
                  <span v-if="emp.role_id === 'YT'">Y Tá</span>
                </td>

                <td class="px-6 py-4">{{ emp.email }}</td>
                <td class="px-6 py-4">{{ emp.citizen_id }}</td>
                <td class="px-6 py-4">
                  <span class="text-success" v-if="emp.status === '1'"
                    >Đang hoạt động</span
                  >
                  <span class="text-danger" v-if="emp.status === '0'"
                    >Ngừng hoạt động</span
                  >
                  <span class="text-warning" v-if="emp.status === '2'"
                    >Tạm khóa</span
                  >
                </td>
                <td class="px-6 py-4">{{ formatDate(emp.created_at) }}</td>
                <td class="px-6 py-4">{{ formatDate(emp.updated_at) }}</td>

                <td class="px-6 py-4">
                  <router-link
                    :to="{
                      name: 'admin.emp_details',
                      params: { username: emp.staff_id },
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
import { handleGetData } from "@/services/handleGetListStaff";
import { searchStaff } from "@/services/handleSearchStaffAccount";
import PaginationComponent from "@/components/Pagination.vue";
import { formatDate } from "@/helper/format-datetime";
const {
  handleGetListStaff,
  staffListData,
  errorMessage,
  totalPagesData,
  itemsPerPageData,
} = handleGetData();
const currentPage = ref(1);

const fetchDataByPage = async (page) => {
  currentPage.value = page;
  await handleGetListStaff(page);
};

// handle search staff
const searchData = ref("");
const handleSearch = async () => {
  if (searchData.value) {
    const resultDataSearch = await searchStaff(searchData.value);
    console.log(resultDataSearch);
    if (resultDataSearch) {
      staffListData.value = resultDataSearch.data;
    }
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

table {
  height: 400px;
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
