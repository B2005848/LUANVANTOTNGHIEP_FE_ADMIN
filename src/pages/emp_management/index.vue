<template>
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
        <table class="table table-bordered table-hover table-striped table-sm">
          <thead class="thead-dark">
            <tr class="text-center">
              <th scope="col">STT</th>
              <th scope="col">Mã nhân viên</th>
              <th scope="col">Họ và tên</th>
              <th scope="col">Ngày sinh</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Email</th>
              <th scope="col">Tools</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-center"
              v-for="(emp, index) in list_doctors"
              :key="index"
            >
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ emp.username }}</td>
              <td>{{ emp.name }}</td>
              <td>{{ emp.birthyear }}</td>
              <td>{{ emp.gender }}</td>
              <td>{{ emp.phone }}</td>
              <td>{{ emp.email }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'admin.emp_details',
                    params: { username: emp.username },
                  }"
                >
                  Chi tiết
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <router-view></router-view>
</template>

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
</style>

<script setup>
import { onMounted, ref } from "vue";
const list_doctors = ref([]);

onMounted(() => {
  fetch("/list-doctors.json")
    .then((response) => response.json())
    .then((data) => (list_doctors.value = data.listdoctors));
});
</script>
