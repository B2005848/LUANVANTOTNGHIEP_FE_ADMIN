<template>
  <div class="container-fluid mt-3">
    <div class="card p-4">
      <h3 class="text-center">Thêm Nhân Viên Mới</h3>
      <form @submit.prevent="addEmployee" class="mt-4">
        <!-- Thông tin cơ bản của nhân viên -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="staff_id" class="form-label"
              >Mã Nhân Viên (Số điện thoại của nhân viên)</label
            >
            <input
              type="text"
              v-model="employeeData.staff_id"
              placeholder="Ví dụ 034415xxxx"
              class="form-control"
              id="staff_id"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="role_name" class="form-label">Vai Trò</label>
            <input
              type="text"
              v-model="employeeData.role_name"
              class="form-control"
              id="role_name"
              required
            />
          </div>
        </div>

        <!-- Địa chỉ chi tiết -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="city" class="form-label">Thành Phố / Tỉnh</label>
            <select
              v-model="selectedCity"
              @change="onCityChange"
              class="form-select"
              id="city"
              required
            >
              <option
                v-for="city in addressData"
                :key="city.level1_id"
                :value="city"
              >
                {{ city.name }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="district" class="form-label">Quận / Huyện</label>
            <select
              v-model="selectedDistrict"
              @change="onDistrictChange"
              class="form-select"
              id="district"
              required
            >
              <option
                v-for="district in selectedCity?.level2s || []"
                :key="district.level2_id"
                :value="district"
              >
                {{ district.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="ward" class="form-label">Xã / Phường</label>
            <select
              v-model="selectedWard"
              class="form-select"
              id="ward"
              required
            >
              <option
                v-for="ward in selectedDistrict?.level3s || []"
                :key="ward.level3_id"
                :value="ward"
              >
                {{ ward.name }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="street" class="form-label">Số Nhà, Tên Đường</label>
            <input
              type="text"
              v-model="employeeData.street"
              class="form-control"
              id="street"
              placeholder="Ví dụ: 122A1, QLN1"
              required
            />
          </div>
        </div>

        <!-- Thông tin cá nhân khác -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="first_name" class="form-label">Họ và tên đệm</label>
            <input
              type="text"
              v-model="employeeData.first_name"
              class="form-control"
              placeholder="Ví dụ Nguyễn Văn"
              id="first_name"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="last_name" class="form-label">Tên</label>
            <input
              type="text"
              v-model="employeeData.last_name"
              class="form-control"
              placeholder="Ví dụ ABC"
              id="last_name"
              required
            />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="birthday" class="form-label">Ngày Sinh</label>
            <input
              type="date"
              v-model="employeeData.birthday"
              class="form-control"
              id="birthday"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="citizen_id" class="form-label">CCCD/CMND</label>
            <input
              type="text"
              v-model="employeeData.citizen_id"
              class="form-control"
              id="citizen_id"
              required
            />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="phone_number" class="form-label">Số Điện Thoại</label>
            <input
              type="tel"
              v-model="employeeData.phone_number"
              class="form-control"
              id="phone_number"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              v-model="employeeData.email"
              class="form-control"
              id="email"
              required
            />
          </div>
        </div>

        <!-- Thông tin bổ sung -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="gender" class="form-label">Giới Tính</label>
            <select
              v-model="employeeData.gender"
              class="form-select"
              id="gender"
              required
            >
              <option value="0">Nữ</option>
              <option value="1">Nam</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="statusAccount" class="form-label"
              >Trạng Thái Tài Khoản</label
            >
            <select
              v-model="employeeData.statusAccount"
              class="form-select"
              id="statusAccount"
              required
            >
              <option value="1">Đang hoạt động</option>
              <option value="0">Ngừng hoạt động</option>
              <option value="2">Tạm khóa</option>
            </select>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="nation" class="form-label">Dân Tộc</label>
            <input
              type="text"
              v-model="employeeData.nation"
              class="form-control"
              id="nation"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="religion" class="form-label">Tôn Giáo</label>
            <input
              type="text"
              v-model="employeeData.religion"
              class="form-control"
              id="religion"
              required
            />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label for="nationality" class="form-label">Quốc Tịch</label>
            <input
              type="text"
              v-model="employeeData.nationality"
              class="form-control"
              id="nationality"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="work_contract" class="form-label"
              >Hợp Đồng Làm Việc</label
            >
            <input
              type="number"
              v-model="employeeData.work_contract"
              class="form-control"
              id="work_contract"
              required
            />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-12">
            <label for="specialty" class="form-label">Chuyên Khoa</label>
            <select
              multiple
              v-model="employeeData.specialty"
              class="form-select"
              id="specialty"
              required
            >
              <option
                v-for="spec in specialties"
                :key="spec.staff_specialty_id"
                :value="spec.staff_specialty_id"
              >
                {{ spec.specialty_name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Nút thêm nhân viên -->
        <button type="submit" class="btn btn-primary w-100 mt-3">
          Thêm Nhân Viên
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

// Dữ liệu nhân viên
const employeeData = ref({
  staff_id: "",
  first_name: "",
  last_name: "",
  birthday: "",
  citizen_id: "",
  phone_number: "",
  gender: "0",
  email: "",
  address_contact: "",
  nation: "",
  religion: "",
  nationality: "",
  work_contract: 0,
  role_name: "",
  statusAccount: "1",
  specialty: [],
});

// Dữ liệu địa chỉ
const addressData = ref([]);
const selectedCity = ref(null);
const selectedDistrict = ref(null);
const selectedWard = ref(null);

const specialties = ref([
  { staff_specialty_id: 11, specialty_name: "Y học tổng quát" },
  { staff_specialty_id: 19, specialty_name: "Ngoại khoa" },
]);

// Xử lý thay đổi khi chọn thành phố
const onCityChange = () => {
  selectedDistrict.value = null;
  selectedWard.value = null;
};

// Xử lý thay đổi khi chọn quận/huyện
const onDistrictChange = () => {
  selectedWard.value = null;
};

// Thêm nhân viên mới
const addEmployee = async () => {
  // Cấu trúc địa chỉ chi tiết
  employeeData.value.address_contact = `${employeeData.value.street}, ${selectedWard.value.name}, ${selectedDistrict.value.name}, ${selectedCity.value.name}`;
  try {
    const response = await axios.post(
      "http://localhost:3000/api/staff/add",
      employeeData.value
    );
    if (response.data.success) {
      Swal.fire("Thành công!", "Nhân viên mới đã được thêm.", "success");
    } else {
      Swal.fire("Lỗi!", "Đã xảy ra lỗi khi thêm nhân viên.", "error");
    }
  } catch (error) {
    Swal.fire("Lỗi!", "Không thể kết nối với server.", "error");
    console.error("Error adding employee:", error);
  }
};

// Gọi hàm loadAddressData khi component được mount
onMounted(() => {
  Promise.all([
    fetch("/dvhc.json")
      .then((res) => res.json())
      .then((data) => (addressData.value = data.data)),
  ]).then(() => {
    console.log(addressData.value);
  });
});
</script>

<style scoped>
.container-fluid {
  max-width: 800px;
  margin: 0 auto;
}
</style>
