<template>
  <div class="container-fluid mt-3">
    <div>
      <ul class="ul__list d-flex">
        <li class="active">Tạo hồ sơ</li>
        <li>&gt;</li>
        <li>Chọn phòng khám</li>
        <li>&gt;</li>
        <li>Chọn dịch vụ</li>
        <li>&gt;</li>
        <li>Chọn bác sĩ</li>
        <li>&gt;</li>
        <li>Chọn ngày khám</li>
        <li>&gt;</li>
        <li>Thanh toán</li>
      </ul>
    </div>
    <h4 class="text-center">Thông tin cơ bản của bệnh nhân</h4>
    <form @submit.prevent="addpatient" class="mt-4">
      <!-- Thông tin cơ bản của Bệnh Nhân-->
      <div class="row mb-3">
        <div class="col-md-12">
          <label for="patient_id" class="form-label"
            >Mã Bệnh Nhân (Tên tài khoản đăng nhập)
            <sup style="color: red">*</sup>
          </label>
          <input
            type="text"
            v-model="patientData.username"
            placeholder="Email hoặc số điện thoại"
            class="form-control"
            id="patient_id"
            required
          />
        </div>
      </div>

      <!-- Thông tin cá nhân khác -->
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="first_name" class="form-label"
            >Họ và tên đệm <sup style="color: red">*</sup>
          </label>
          <input
            type="text"
            v-model="patientData.first_name"
            class="form-control"
            placeholder="Ví dụ Nguyễn Văn"
            id="first_name"
            required
          />
        </div>
        <div class="col-md-6">
          <label for="last_name" class="form-label"
            >Tên <sup style="color: red">*</sup>
          </label>
          <input
            type="text"
            v-model="patientData.last_name"
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
          <label class="form-label d-block"
            >Giới Tính <sup style="color: red">*</sup>
          </label>
          <div class="gender-options">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                v-model="patientData.gender"
                id="female"
                value="0"
              />
              <label class="form-check-label" for="female">Nữ</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                v-model="patientData.gender"
                id="male"
                value="1"
              />
              <label class="form-check-label" for="male">Nam</label>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <!-- Do ngôn ngữ trình duyệt -->
          <label for="health_insurance_id" class="form-label"
            >Mã số BHYT <sup style="color: red"></sup>
          </label>
          <input
            type="text"
            v-model="patientData.health_insurance_id"
            class="form-control"
            id="health_insurance_id"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <!-- Do ngôn ngữ trình duyệt -->
          <label for="birthday" class="form-label"
            >Ngày Sinh <sup style="color: red">*</sup>
          </label>
          <VueDatePicker
            v-model="patientData.birthday"
            locale="vi"
            format="dd/MM/yyyy"
            :enable-time-picker="false"
            placeholder="Chọn ngày sinh"
            text-input
          />
        </div>
        <div class="col-md-6">
          <label for="citizen_id" class="form-label"
            >CCCD/CMND <sup style="color: red">*</sup>
          </label>
          <input
            type="text"
            v-model="patientData.citizen_id"
            class="form-control"
            id="citizen_id"
            required
            maxlength="13"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <label for="phone_number" class="form-label"
            >Số Điện Thoại <sup style="color: red">*</sup>
          </label>
          <input
            type="tel"
            v-model="patientData.phone_number"
            class="form-control"
            id="phone_number"
            required
          />
        </div>
        <div class="col-md-6">
          <label for="email" class="form-label">Email </label>
          <input
            type="email"
            v-model="patientData.email"
            class="form-control"
            id="email"
          />
        </div>
      </div>

      <!-- Địa chỉ chi tiết -->
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="city" class="form-label"
            >Thành Phố / Tỉnh <sup style="color: red">*</sup>
          </label>
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
          <label for="district" class="form-label"
            >Quận / Huyện <sup style="color: red">*</sup>
          </label>
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
          <label for="ward" class="form-label"
            >Xã / Phường <sup style="color: red">*</sup>
          </label>
          <select v-model="selectedWard" class="form-select" id="ward" required>
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
          <label for="street" class="form-label"
            >Số Nhà, Tên Đường <sup style="color: red">*</sup>
          </label>
          <input
            type="text"
            v-model="patientData.street"
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
            v-model="patientData.nation"
            class="form-control"
            id="nation"
            required
          />
        </div>
        <div class="col-md-6">
          <label for="religion" class="form-label">Tôn Giáo</label>
          <input
            type="text"
            v-model="patientData.religion"
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
            v-model="patientData.nationality"
            class="form-control"
            id="nationality"
            required
          />
        </div>

        <div class="col-md-6">
          <label for="major" class="form-label">Nghề Nghiệp:</label>
          <input
            type="text"
            v-model="patientData.major"
            class="form-control"
            id="religion"
            required
          />
        </div>
      </div>

      <!-- Nút thêm Bệnh Nhân-->
      <button type="submit" class="btn btn-primary w-100 mt-3">TIẾP TỤC</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import moment from "moment";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const router = useRouter();
// Dữ liệu bệnh nhân
const patientData = ref({
  username: "", // patient ID (phone number)
  first_name: "", // First name
  last_name: "", // Last name
  birthday: "", // Birthday (format may need adjustment)
  citizen_id: "", // National ID
  major: "",
  health_insurance_id: "",
  phone_number: "", // Phone number
  gender: "0", // Gender (0 for female, 1 for male)
  email: "", // Email address
  address_contact: "", // Full address (constructed later)
  nation: "", // Ethnicity
  religion: "", // Religion
  nationality: "", // Nationality
  statusAccount: "1", // Account status (active)
  street: "", // Street address (added here)
});

// Dữ liệu địa chỉ
const addressData = ref([]);
const selectedCity = ref(null);
const selectedDistrict = ref(null);
const selectedWard = ref(null);

// Xử lý thay đổi khi chọn thành phố
const onCityChange = () => {
  selectedDistrict.value = null;
  selectedWard.value = null;
};

// Xử lý thay đổi khi chọn quận/huyện
const onDistrictChange = () => {
  selectedWard.value = null;
};

const addpatient = async () => {
  // Cấu trúc địa chỉ chi tiết
  patientData.value.address_contact = `${patientData.value.street || ""}, ${
    selectedWard.value?.name || ""
  }, ${selectedDistrict.value?.name || ""}, ${
    selectedCity.value?.name || ""
  }`.trim();
  // Tạo dữ liệu cho tài khoản, và thông tin chi tiết từ các trường form
  const accountData = {
    username: patientData.value.username,
    password: "123@", //Mặc khẩu mặc định
    first_name: patientData.value.first_name,
    last_name: patientData.value.last_name,
    birthday: moment(patientData.value.birthday, "DD/MM/YYYY").format(
      "DD/MM/YYYY"
    ), // Chuyển đổi định dạng ngày bằng moment
    citizen_id: patientData.value.citizen_id,
    gender: patientData.value.gender,
    phone: patientData.value.phone_number,
    email: patientData.value.email,
    major: patientData.value.major,
    address_contact: patientData.value.address_contact,
    nation: patientData.value.nation,
    religion: patientData.value.religion,
    nationality: patientData.value.nationality,
    health_insurance_id: patientData.value.health_insurance_id,
  };
  try {
    const responseCreateAccount = await axios.post(
      "http://localhost:3000/api/patient/account/create",
      accountData
    );

    if (responseCreateAccount.status === 201) {
      {
        Swal.fire({
          title: "Thành công!",
          text: "Bệnh Nhân mới đã được thêm",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Tiến hành đăng kí khám dịch vụ",
          cancelButtonText: "Hủy",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push({
              name: "admin.select.department",
              params: { patient_id: patientData.value.username },
            });
            console.log("Đã thêm thành công");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Thông báo!", "Đã hủy việc đăng kí khám.", "warning");
          }
        });
      }
    } else {
      Swal.fire("Lỗi!", "Đã xảy ra lỗi khi thêm bệnh nhân. ", "error");
    }
  } catch (error) {
    Swal.fire("Lỗi!", error, "error");
    console.error("Error adding patient:", error);
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
  max-width: 100%;
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

.ul__list {
  list-style: none;
  display: flex;
  margin-top: 20px;
}

.ul__list li {
  margin: 10px;
}

.ul__list li.active {
  font-weight: bold; /* Thay đổi style khi active */
  color: #007bff; /* Màu sắc khi active */
  cursor: pointer; /* Chỉnh con trỏ thành dấu chấm khi di chuột */
}
</style>
