<template>
  <div class="container mt-4">
    <div class="card p-4">
      <h4 class="text-center">Thêm Ca Làm Việc Cho Nhân Viên</h4>
      <form @submit.prevent="addStaffShift" class="mt-4">
        <!-- Hiển thị Mã Nhân Viên -->
        <div class="mb-3">
          <label class="form-label">Mã Nhân Viên</label>
          <input
            type="text"
            :value="staffInfo.staff_id"
            class="form-control"
            disabled
          />
        </div>

        <!-- Hiển thị Tên Nhân Viên -->
        <div class="mb-3">
          <label class="form-label">Tên Nhân Viên</label>
          <input
            type="text"
            :value="`${staffInfo.first_name} ${staffInfo.last_name}`"
            class="form-control"
            disabled
          />
        </div>

        <!-- Chọn Loại Ca -->
        <div class="mb-3">
          <label class="form-label"
            >Chọn Ca Làm Việc <sup style="color: red">*</sup></label
          >
          <div v-for="shift in shifts" :key="shift.shift_id" class="form-check">
            <input
              type="checkbox"
              :value="shift"
              v-model="staffShiftData.shifts"
              class="form-check-input"
              :id="`shift_${shift.shift_id}`"
            />
            <label
              class="form-check-label mb-3"
              :for="`shift_${shift.shift_id}`"
            >
              <span v-if="shift.shift_id === 'NT-S'"> Thứ 2 đến Thứ 7 </span>
              <span v-if="shift.shift_id === 'NT-C'"> Thứ 2 đến Thứ 7 </span>
              <span v-if="shift.shift_id === 'CN-S'"> Chủ nhật </span>
              <span v-if="shift.shift_id === 'CN-C'"> Chủ nhật </span>
              {{ shift.shift_name }} ({{ formatTime(shift.start_time) }} -
              {{ formatTime(shift.end_time) }})
            </label>
          </div>
        </div>

        <!-- Hiển thị số 5 hợp đồng -->
        <div class="mb-3">
          <label class="form-label">Hợp đồng làm việc</label>
          <input
            type="text"
            :value="`${staffInfo.work_contract} năm`"
            class="form-control"
            disabled
          />
        </div>

        <!-- Ngày Bắt Đầu và Kết Thúc -->
        <div class="mb-3 row">
          <div class="col-md-6">
            <label for="shift_date" class="form-label"
              >Ngày Bắt Đầu <sup style="color: red">*</sup></label
            >
            <VueDatePicker
              v-model="staffShiftData.shift_date"
              locale="vi"
              format="dd/MM/yyyy"
              :enable-time-picker="false"
              placeholder="Chọn ngày bắt đầu vào ca"
              text-input
              @change="updateEndDate"
              @update-month-year="updateEndDate"
            />
          </div>
          <div class="col-md-6">
            <label for="shift_end_date" class="form-label"
              >Ngày Kết Thúc <sup style="color: red">*</sup></label
            >
            <VueDatePicker
              v-model="staffShiftData.shift_end_date"
              locale="vi"
              format="dd/MM/yyyy"
              :enable-time-picker="false"
              placeholder="= Ngày bắt đầu + số năm hợp đồng"
              text-input
              disabled
            />
          </div>
        </div>

        <!-- Chọn Chuyên Khoa -->
        <div class="mb-3">
          <label for="specialty_id" class="form-label"
            >Chuyên Khoa <sup style="color: red">*</sup></label
          >
          <select
            v-model="selectedSpecialty"
            @change="updateDepartment"
            class="form-select"
            id="specialty_id"
            required
          >
            <option
              v-for="specialty in specialties"
              :key="specialty.specialty_id"
              :value="specialty.specialty_id"
            >
              {{ specialty.specialty_name }}
            </option>
          </select>
        </div>

        <!-- Phòng Ban (Hiển thị tự động khi chọn chuyên khoa) -->
        <div class="mb-3">
          <label class="form-label">Phòng Làm Việc</label>
          <input
            type="text"
            :value="departmentName"
            class="form-control"
            disabled
          />
        </div>

        <!-- Nút Thêm Ca Làm Việc -->
        <button type="submit" class="btn btn-primary w-100 mt-3">
          Thêm Ca Làm Việc
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import formatDate from "@/helper/format-datetime";
const formatTime = formatDate.formatTime;

// Lấy `staff_id` từ URL
const route = useRoute();
const staff_id = route.params.staff_id;

// Dữ liệu chi tiết nhân viên và chuyên khoa
const staffInfo = ref({});
const specialties = ref([]);
const selectedSpecialty = ref(null);
const departmentName = ref("");
const shifts = ref([]);

// Dữ liệu cho ca làm việc
const staffShiftData = ref({
  shifts: [],
  shift_date: "",
  shift_end_date: "",
  specialty_id: "",
  department_id: "",
});

const updateEndDate = () => {
  if (staffInfo.value.work_contract) {
    const startDate = new Date(staffShiftData.value.shift_date);
    const endDate = new Date(
      startDate.setFullYear(
        startDate.getFullYear() + staffInfo.value.work_contract
      )
    );
    staffShiftData.value.shift_end_date = endDate.toISOString().split("T")[0]; // Cập nhật ngày kết thúc
  }
};

// Hàm gọi API lấy dữ liệu các ca làm việc tại phòng khám
const loadShifts = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/shifts/getList/?page=1`
    );
    shifts.value = response.data.shiftList; // Lưu danh sách ca làm việc vào shifts
  } catch (error) {
    Swal.fire("Lỗi!", "Không thể tải danh sách ca làm việc.", "error");
  }
};

// Hàm gọi API để lấy thông tin nhân viên và chuyên khoa
const loadStaffInfo = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/handle/staff/getInformationDetail/${staff_id}`
    );
    staffInfo.value = response.data.data; // Thông tin chi tiết của nhân viên
    specialties.value = response.data.specialty; // Danh sách chuyên khoa của nhân viên
  } catch (error) {
    Swal.fire("Lỗi!", "Không thể tải thông tin nhân viên.", "error");
  }
};

// Cập nhật phòng ban khi chọn chuyên khoa
const updateDepartment = async () => {
  try {
    // Lấy thông tin phòng ban dựa trên `specialty_id`
    const response = await axios.get(
      `http://localhost:3000/api/departments/specialty/${selectedSpecialty.value}`
    );

    // Kiểm tra nếu dữ liệu trả về có phòng ban
    if (response.data && response.data.data.length > 0) {
      const department = response.data.data[0]; // Lấy phòng ban đầu tiên từ kết quả trả về

      // Cập nhật `department_id` và `department_name` cho ca làm việc
      staffShiftData.value.department_id = department.department_id;
      departmentName.value = department.department_name;
    } else {
      departmentName.value = "Phòng ban không xác định";
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu phòng ban:", error);
    Swal.fire("Lỗi!", "Không thể tải thông tin phòng ban.", "error");
  }
};

// Hàm thêm ca làm việc
const addStaffShift = async () => {
  try {
    const shiftToAdd = staffShiftData.value.shifts.map((shift) => ({
      shift_id: shift.shift_id,
      shift_date: staffShiftData.value.shift_date,
      shift_end_date: staffShiftData.value.shift_end_date,
      department_id: staffShiftData.value.department_id, // Cập nhật với phòng ban cho ca này
      specialty_id: selectedSpecialty.value, // Cập nhật với chuyên khoa cho ca này
    }));
    const response = await axios.post(
      `http://localhost:3000/api/handle/staff/${staff_id}/shifts`,
      { shifts: shiftToAdd }
    );
    if (response.status === 200) {
      Swal.fire("Thành công!", "Ca làm việc đã được thêm.", "success");
    }
  } catch (error) {
    Swal.fire(
      "Lỗi!",
      "Lỗi server, không thể thêm ca làm việc ngay bây giờ.",
      "error"
    );
  }
};

// Tải thông tin nhân viên khi component được mount
onMounted(() => {
  loadStaffInfo();
  loadShifts();
});
</script>

<style scoped>
.container {
  max-width: 100%;
  margin: 0 auto;
}
</style>
