<template>
  <div class="container-fluid mt-3">
    <div class="card p-4">
      <h4 class="text-center">Thông tin cơ bản của nhân viên</h4>
      <form @submit.prevent="addEmployee" class="mt-4">
        <!-- Thông tin cơ bản của nhân viên -->
        <div class="row mb-3">
          <div class="col-md-12">
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

        <!-- Gender -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label class="form-label d-block">Giới Tính</label>
            <div class="gender-options">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="employeeData.gender"
                  id="female"
                  value="0"
                />
                <label class="form-check-label" for="female">Nữ</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="employeeData.gender"
                  id="male"
                  value="1"
                />
                <label class="form-check-label" for="male">Nam</label>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <!-- Do ngôn ngữ trình duyệt -->
            <label for="birthday" class="form-label">Ngày Sinh</label>
            <VueDatePicker
              v-model="employeeData.birthday"
              locale="vi"
              format="dd/MM/yyyy"
              :enable-time-picker="false"
              placeholder="Chọn ngày sinh"
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

        <!-- Thông tin bổ sung -->
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
        </div>

        <hr />
        <h4 class="text-center">Thông tin công việc</h4>
        <!-- Vị trí làm việc và thời hạn hợp đồng -->
        <div class="row mb-3">
          <div class="col-md-6">
            <label for="role_name" class="form-label"
              >Vị trí làm việc (Phân quyền)</label
            >
            <div class="role-options">
              <div v-for="role in roles" :key="role.role_id">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="employeeData.role_id"
                  :id="role.role_id"
                  :value="role.role_id"
                />
                <label class="form-check-label" :for="role.role_id">
                  {{ role.role_name }} - {{ role.description }}
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <label for="work_contract" class="form-label"
              >Hợp Đồng Làm Việc (năm)</label
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

        <!-- Chuyên khoa của nhân viên -->
        <div class="row mb-3">
          <div class="col-md-12">
            <label class="form-label">Chuyên Khoa:</label>
            <button
              type="button"
              class="btn btn-outline-primary ms-3"
              @click="showSpecialtyModal = true"
            >
              Chọn
            </button>

            <!-- Hiển thị danh sách chuyên khoa đã chọn -->
            <div v-if="employeeData.specialty.length" class="mt-2">
              <span
                class="badge bg-info me-2"
                v-for="spec in selectedSpecialtyNames"
                :key="spec"
              >
                {{ spec }}
              </span>
            </div>

            <!-- Modal chọn chuyên khoa -->
            <div
              v-if="showSpecialtyModal"
              class="modal"
              tabindex="-1"
              role="dialog"
              style="display: block"
            >
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Chọn Chuyên Khoa</h5>
                    <button
                      type="button"
                      class="close"
                      @click="showSpecialtyModal = false"
                      aria-label="Close"
                    >
                      <span class="ms-3" aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <!-- Bảng chuyên khoa với checkbox -->
                    <div class="table-wrapper">
                      <table class="table table-bordered table-sm">
                        <thead>
                          <tr>
                            <th>Chọn</th>
                            <th>Tên Chuyên Khoa</th>
                            <th>Mô Tả</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="spec in specialties"
                            :key="spec.specialty_id"
                          >
                            <td>
                              <input
                                type="checkbox"
                                :value="spec.specialty_id"
                                v-model="employeeData.specialty"
                              />
                            </td>
                            <td>{{ spec.specialty_name }}</td>
                            <td>{{ spec.description }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="confirmSpecialtySelection"
                    >
                      Xác Nhận
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="showSpecialtyModal = false"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Đăng kí ca làm việc cho nhân viên -->
        <div class="row mb-3">
          <div class="col-md-12">
            <label for="shifts" class="form-label">Sắp xếp ca làm việc</label>
            <div
              v-for="shift in shifts"
              :key="shift.shift_id"
              class="form-check mb-3"
            >
              <input
                class="form-check-input mb-3"
                type="checkbox"
                :id="shift.shift_id"
                :value="shift.shift_id"
                @change="toggleShiftSelection(shift.shift_id)"
                :checked="employeeData.shifts.includes(shift.shift_id)"
              />
              <label class="form-check-label" :for="shift.shift_id">
                <span v-if="shift.shift_id == 'CN-S'">Chủ nhật buổi sáng</span>
                <span v-if="shift.shift_id == 'CN-C'">Chủ nhật buổi chiều</span>
                <span v-if="shift.shift_id == 'NT-S'"
                  >Thứ 2 - Thứ 7 buổi sáng</span
                >
                <span v-if="shift.shift_id == 'NT-C'"
                  >Thứ 2 - Thứ 7 buổi chiều</span
                >
                ({{ formatTime(shift.start_time) }} đến
                {{ formatTime(shift.end_time) }})
              </label>
            </div>
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import formatDate from "@/helper/format-datetime";
const formatTime = formatDate.formatTime;
// Dữ liệu nhân viên
const employeeData = ref({
  staff_id: "", // Employee ID (phone number)
  role_id: "", // Role ID
  first_name: "", // First name
  last_name: "", // Last name
  birthday: "", // Birthday (format may need adjustment)
  citizen_id: "", // National ID
  phone_number: "", // Phone number
  gender: "0", // Gender (0 for female, 1 for male)
  email: "", // Email address
  address_contact: "", // Full address (constructed later)
  nation: "", // Ethnicity
  religion: "", // Religion
  nationality: "", // Nationality
  work_contract: 0, // Contract duration (in years)
  statusAccount: "1", // Account status (active)
  specialty: [], // List of specialties (array)
  shifts: [], // List of selected shifts (array)
  street: "", // Street address (added here)
});

// Dữ liệu địa chỉ
const addressData = ref([]);
const selectedCity = ref(null);
const selectedDistrict = ref(null);
const selectedWard = ref(null);

//Load dữ liệu vị trí làm việc Roles
const roles = ref([]); // Biến lưu trữ danh sách vai trò

// Hàm tải danh sách role từ API
const loadRoles = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/roles/");
    if (response.data.status === 200) {
      roles.value = response.data.dataInfo; // Gán danh sách vai trò vào biến roles
    } else {
      Swal.fire("Lỗi!", "Không thể tải danh sách vai trò.", "error");
    }
  } catch (error) {
    Swal.fire("Lỗi!", "Không thể kết nối với server để lấy vai trò.", "error");
    console.error("Error loading roles:", error);
  }
};

//Load dữ liệu ca làm việc Shifts
const toggleShiftSelection = (shiftId) => {
  const index = employeeData.value.shifts.indexOf(shiftId);
  if (index === -1) {
    employeeData.value.shifts.push(shiftId); // Thêm nếu chưa có
  } else {
    employeeData.value.shifts.splice(index, 1); // Xóa nếu đã có
  }

  console.log("Selected Shifts:", employeeData.value.shifts);
};
const shifts = ref([]);
// Hàm xử lý chọn/bỏ chọn ca làm việc
const loadShifts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/shifts/getList/?page=1"
    );
    if (response) {
      shifts.value = response.data.shiftList;
    } else {
      Swal.fire("Lỗi!", "Không thể tải danh sách ca làm việc.", "error");
    }
  } catch (error) {
    Swal.fire(
      "Lỗi!",
      "Không thể kết nối với server để lấy ca làm việc.",
      "error"
    );
    console.error("Error loading shifts:", error);
  }
};

// ------CHUYEN KHOA
const showSpecialtyModal = ref(false);
const specialties = ref([]);

const loadSpecialties = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/specialties/all"
    );
    if (response.data.message === "Specialties retrieved successfully") {
      specialties.value = response.data.listSpecialties;
      console.log("Danh sách chuyên khoa:", specialties.value);
    }
  } catch (error) {
    console.error("Lỗi khi tải danh sách chuyên khoa:", error);
  }
};

// Hàm xác nhận chuyên khoa đã chọn
const confirmSpecialtySelection = () => {
  showSpecialtyModal.value = false;
};

// Hiển thị tên chuyên khoa đã chọn
const selectedSpecialtyNames = computed(() => {
  return specialties.value
    .filter((spec) => employeeData.value.specialty.includes(spec.specialty_id))
    .map((spec) => spec.specialty_name);
});

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

  employeeData.value.address_contact = `${employeeData.value.street || ""}, ${
    selectedWard.value?.name || ""
  }, ${selectedDistrict.value?.name || ""}, ${
    selectedCity.value?.name || ""
  }`.trim();
  // Tạo dữ liệu cho tài khoản, và thông tin chi tiết từ các trường form
  const accountData = {
    staff_id: employeeData.value.staff_id,
    password: "123@", //Mặc khẩu mặc định
    role_id: employeeData.value.role_id,
    first_name: employeeData.value.first_name,
    last_name: employeeData.value.last_name,
    birthday: employeeData.value.birthday,
    citizen_id: employeeData.value.citizen_id,
    gender: employeeData.value.gender,
    phone_number: employeeData.value.phone_number,
    email: employeeData.value.email,
    address_contact: employeeData.value.address_contact,
  };
  try {
    const responseCreateAccount = await axios.post(
      "http://localhost:3000/api/staff/account/createAccount",
      accountData
    );
    const responseAddSpecialties = await axios.post("");
    if (responseCreateAccount.data.success) {
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

  loadRoles();
  loadShifts();
  loadSpecialties();
});
</script>

<style scoped>
.container-fluid {
  max-width: 800px;
  margin: 0 auto;
}

.gender-options {
  display: flex;
  gap: 15px;
  align-items: center;
}

.form-check-input {
  margin-right: 5px;
}

.form-check-input:hover,
.form-check-label:hover {
  cursor: pointer;
}

.role-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.table-wrapper {
  max-height: 300px; /* Giới hạn chiều cao của bảng */
  overflow-y: auto; /* Cuộn dọc khi bảng vượt quá chiều cao */
}

.table {
  font-size: 0.9rem; /* Làm nhỏ kích thước chữ trong bảng */
}

.modal-lg {
  max-width: 80%;
}
</style>
