<template>
  <div>
    <!-- Quản lý dịch vụ -->
    <div class="container-fluid mt-3">
      <div class="wrapper card p-3">
        <h3 class="mb-4">THÊM DỊCH VỤ MỚI</h3>

        <!-- Add Service Form -->
        <form @submit.prevent="handleAddService">
          <div class="form-group mb-3">
            <label for="serviceName">Tên dịch vụ</label>
            <input
              type="text"
              id="serviceName"
              v-model="newService.service_name"
              class="form-control"
              placeholder="Nhập tên dịch vụ"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label for="serviceFee">Giá dịch vụ</label>
            <input
              type="number"
              id="serviceFee"
              v-model="newService.service_fee"
              class="form-control"
              placeholder="Nhập giá dịch vụ"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label for="duration">Thời gian thực hiện (phút)</label>
            <input
              type="number"
              id="duration"
              v-model="newService.duration"
              class="form-control"
              placeholder="Nhập thời gian thực hiện"
              required
            />
          </div>

          <!-- Chọn Chuyên Khoa -->
          <div class="mb-3">
            <label for="specialty_id" class="form-label tw-font-bold"
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
            <label class="form-label tw-font-bold">Phòng Làm Việc</label>
            <input
              type="text"
              :value="departmentName"
              class="form-control"
              disabled
            />
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary">Thêm dịch vụ</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

// Initialize form data
const newService = ref({
  service_name: "",
  service_fee: "",
  duration: "",
  department_id: "",
  specialty_id: "",
});

const departments = ref([]); // List of departments
const specialties = ref([]); // List of specialties
const selectedSpecialty = ref(null); // Selected specialty
const departmentName = ref(""); // Department name corresponding to the specialty

// Fetch departments and specialties when component is mounted
onMounted(async () => {
  try {
    // Fetch specialties
    const specialtyResponse = await axios.get(
      "http://localhost:3000/api/specialties/all"
    );
    specialties.value = specialtyResponse.data.listSpecialties;

    // Fetch all departments (this will be updated later based on the selected specialty)
    const departmentResponse = await axios.get(
      "http://localhost:3000/api/departments/getAllDepartments"
    );
    departments.value = departmentResponse.data.listDepartments;
  } catch (error) {
    console.error("Error fetching specialties or departments:", error);
  }
});

// Update department when a specialty is selected
const updateDepartment = async () => {
  try {
    // Fetch department based on the selected specialty
    const response = await axios.get(
      `http://localhost:3000/api/departments/specialty/${selectedSpecialty.value}`
    );

    // Check if a department is returned
    if (response.data && response.data.data) {
      const department = response.data.data; // Get the department object
      departmentName.value = department.department_name; // Update the department name
      newService.value.department_id = department.department_id; // Set department_id in the form
    } else {
      departmentName.value = "Phòng ban không xác định"; // No department found
      newService.value.department_id = ""; // Clear department_id if no department found
    }
  } catch (error) {
    console.error("Error fetching department:", error);
    Swal.fire("Lỗi!", "Không thể tải thông tin phòng ban.", "error");
  }
};

// Handle adding the service
const handleAddService = async () => {
  try {
    // Add the new service
    const response = await axios.post(
      "http://localhost:3000/api/services",
      newService.value
    );
    if (response.status === 200) {
      Swal.fire("Thành công!", "Dịch vụ đã được thêm thành công!", "success");
      // Optionally, reset the form after successful submission
      newService.value = {
        service_name: "",
        service_fee: "",
        duration: "",
        department_id: "",
        specialty_id: "",
      };
    }
  } catch (error) {
    Swal.fire("Lỗi!", "Đã xảy ra lỗi khi thêm dịch vụ.", "error");
    console.error("Error adding service:", error);
  }
};
</script>

<style scoped>
.wrapper {
  padding: 20px;
}

.form-group {
  margin-bottom: 1.5rem;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}
</style>
