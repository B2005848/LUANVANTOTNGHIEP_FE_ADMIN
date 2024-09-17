<template>
  <div>
    <!-- Quản lí nhân viên -->
    <div class="container-fluid mt-3">
      <div class="card p-2">
        <div class="d-flex">
          <div class="flex-1">
            <h3 class="card-title">Danh sách nhân viên</h3>
          </div>
          <div class="flex-1">
            <input
              type="text"
              class="form-control"
              size="50"
              placeholder="Nhập mã nhân viên muốn tìm......"
            />
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

        <!-- list emp -->
        <div class="table-responsive mt-2">
          <table
            class="table table-bordered table-hover table-striped table-sm"
          >
            <thead class="thead-dark">
              <tr class="text-center">
                <th scope="col">STT</th>
                <th scope="col">Mã nhân viên</th>
                <th scope="col">Họ và tên</th>
                <th scope="col">Chức vụ</th>
                <th scope="col">Email</th>
                <th scope="col">Số CCCD/CMND</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Ngày tạo</th>
                <th scope="col">Ngày chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center"
                v-for="(emp, index) in staffListData"
                :key="index"
              >
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ emp.staff_id }}</td>
                <td>{{ emp.first_name }} {{ emp.last_name }}</td>
                <td>
                  <span v-if="emp.role_id === 'AD'">Người quản trị</span>
                  <span v-if="emp.role_id === 'BS'">Bác Sĩ</span>
                  <span v-if="emp.role_id === 'TN'">Kế Toán</span>
                  <span v-if="emp.role_id === 'YT'">Y Tá</span>
                </td>

                <td>{{ emp.email }}</td>
                <td>{{ emp.citizen_id }}</td>
                <td>
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
                <td>{{ formatDate(emp.created_at) }}</td>
                <td>{{ formatDate(emp.updated_at) }}</td>

                <td>
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
          @page-change="fetchPage"
        />
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { handleGetData } from "@/services/handleGetListStaff";
import PaginationComponent from "@/components/Pagination.vue";
import { formatDate } from "@/helper/format-datetime";
const { handleGetListStaff, staffListData, errorMessage, totalPagesData } =
  handleGetData();
const currentPage = ref(1);

const fetchDataByPage = async (page) => {
  currentPage.value = page;
  await handleGetListStaff(page);
};
onMounted(async () => {
  await fetchDataByPage(1);
});
</script>

<style scoped>
.card .d-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
