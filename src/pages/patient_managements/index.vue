<style scoped>
.card .d-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<template>
  <div class="container-fluid mt-3">
    <div class="card p-2">
      <div class="d-flex">
        <div class="flex-1">
          <h3 class="card-title">Danh sách tài khoản bệnh nhân</h3>
        </div>
        <div class="flex-1">
          <input
            type="text"
            id="filterName"
            v-model="filterName"
            @input="filterUsers"
            class="form-control"
            size="50"
            placeholder="Nhập mã bệnh nhân muốn tìm......"
          />
        </div>
        <div class="flex-1">
          <router-link
            :to="{
              name: 'admin.add.patient',
            }"
            ><span style="align-items: center; margin-right: 5px"
              >Thêm bệnh nhân mới</span
            >
            <font-awesome-icon
              icon="fa-solid fa-plus-minus"
              bounce
              style="color: #74c0fc; font-size: 30px"
            />
          </router-link>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table table-bordered table-hover table-striped">
            <thead>
              <tr class="text-center">
                <th>No.</th>
                <th @click="sortTable('Username')">Tài khoản</th>
                <th>Họ và tên</th>
                <th @click="sortTable('Email')">Email</th>
                <th @click="sortTable('Phone')">Số điện thoại</th>
                <th @click="sortTable('StatusID')">Trạng thái</th>
                <th @click="sortTable('RegistrationDate')">Ngày đăng ký</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-center"
                v-for="(record, index) in users"
                :key="index"
              >
                <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td>{{ record.username }}</td>
                <td>{{ record.name }}</td>
                <td v-if="record.email">{{ record.email }}</td>
                <td v-if="!record.email" style="color: coral">Chưa cập nhật</td>
                <td v-if="record.phone_number">
                  {{ record.phone_number }}
                </td>
                <td v-if="!record.phone_number" style="color: coral">
                  Chưa cập nhật
                </td>
                <td v-if="record.statusAccount == 1" class="text-success">
                  Đang hoạt động
                </td>
                <td v-if="record.statusAccount == 2" class="text-warning">
                  Tạm khóa
                </td>
                <td v-if="record.statusAccount == 3" class="text-danger">
                  Ngừng hoạt động
                </td>
                <td>{{ formatDatetime(record.registration_date) }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'admin.patient_details',
                      params: { username: record.username },
                    }"
                  >
                    Chi tiết</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <nav class="mt-3" aria-label="Page navigation">
      <!-- case 1 use pagination vue-->
      <paginate
        v-model="currentPage"
        :page-count="totalPages"
        :page-range="3"
        :margin-pages="1"
        :click-handler="changePage"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      >
      </paginate>
    </nav>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import Paginate from "vuejs-paginate-next";
import moment from "moment";

// Hàm định dạng thời gian theo UTC mà không cần chuyển đổi múi giờ
const formatDatetime = (datetime) => {
  const formattedDatetime = moment.utc(datetime).format("DD/MM/YYYY (HH:mm)");
  console.log("Formatted datetime (UTC):", formattedDatetime); // Kiểm tra giá trị datetime sau khi định dạng
  return formattedDatetime;
};
const users = ref([]);
const totalPages = ref(0);
let currentPage = ref(1);
const itemsPerPage = 5;
const changePage = (page) => {
  currentPage.value = page;
  getUsers(page);
};
let originalUsers = [];

// GET_DATA
const getUsers = async (page) => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/handle/patient/getlistpatients/?page=${page}`
    );
    totalPages.value = response.data.totalPages;

    if (Array.isArray(response.data.patients)) {
      users.value = response.data.patients;
      originalUsers.value = response.data.patients;
    } else {
      originalUsers.value = [];
    }

    console.log(originalUsers.value);
  } catch (error) {
    console.error(error);
  }
};

// FILTER
const filterName = ref("");
const filterUsers = async () => {
  if (!originalUsers.length) {
    originalUsers = [...users.value];
    await getUsers(1);
  }
  await getUsers(currentPage.value);
  const filteredUsers = originalUsers.filter((user) => {
    const nameCondition = user.username
      .toLowerCase()
      .includes(filterName.value.toLowerCase());

    return nameCondition;
  });

  users.value = filteredUsers;
};

watch(filterName, filterUsers);

onMounted(() => {
  getUsers(currentPage.value);
});
</script>
