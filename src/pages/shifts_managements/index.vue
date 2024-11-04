<template>
  <div>
    <!-- Quản lí ca làm việc tại phòng khám -->
    <div class="container-fluid mt-3">
      <div class="wapper card p-3">
        <div class="d-flex mt-3">
          <div class="flex-1">
            <h3 class="">Danh sách ca làm việc</h3>
          </div>

          <div class="flex-1">
            <button type="button" title="Thêm ca làm việc mới">
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
        <!-- list shifts -->
        <div
          v-if="shiftsListData"
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
                <th scope="col" class="tw-px-4 tw-py-2">Mã ca</th>
                <th scope="col" class="tw-px-4 tw-py-2">Mô tả ca làm việc</th>
                <th scope="col" class="tw-px-4 tw-py-2">Thời gian bắt đầu</th>
                <th scope="col" class="tw-px-4 tw-py-2">Thời gian kết thúc</th>
                <th scope="col" class="tw-px-4 tw-py-2">Ngày tạo</th>
                <th scope="col" class="tw-px-4 tw-py-2">Ngày chỉnh sửa</th>
                <th scope="col" class="tw-px-4 tw-py-2">Danh sách nhân viên theo ca</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(sh, index) in shiftsListData"
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
                <td class="px-4 py-2">{{ sh.shift_id }}</td>
                <td class="px-4 py-2">{{ sh.shift_name }}</td>
                <td class="px-4 py-2">{{ formatTime(sh.start_time) }}</td>
                <td class="px-4 py-2">{{ formatTime(sh.end_time) }}</td>
                <td class="px-4 py-2">{{ formatDateTime(sh.created_at) }}</td>
                <td class="px-4 py-2">{{ formatDateTime(sh.updated_at) }}</td>

                <td class="px-4 py-2">
                  <router-link
                    :to="{
                      name: 'admin.staff_shifts',
                      params: { shift_id: sh.shift_id },
                    }"
                  >
                    <font-awesome-icon icon="fa-eye" size="lg" style="color: #74c0fc" />
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
  handleGetListShifts,
  errorMessage,
  totalPagesData,
  shiftsListData,
  itemsPerPageData,
} from "@/services/shift_managements/handleGetListShits";
import PaginationComponent from "@/components/Pagination.vue";
import formatDate from "@/helper/format-datetime";
const formatDateTime = formatDate.formatDateTime;
const formatTime = formatDate.formatTime;
const currentPage = ref(1);

const fetchDataByPage = async (page) => {
  currentPage.value = page;
  await handleGetListShifts(page);
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
