<template>
  <div v-if="staffDetail" class="card container-fuild p-3">
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div class="mb-5">
      <!-- control -->
      <div class="me-3">
        <h3 class="tw-text-xl tw-font-medium tw-dark:text-white">
          <router-link :to="{ name: 'admin.emp' }">
            <font-awesome-icon
              class="me-3"
              icon=" fa-arrow-left"
              style="color: #a3aec2"
              size="xl"
          /></router-link>
          Thông tin nhân viên
        </h3>
      </div>
      <!-------------------------------------------------------------------------------------- THÔNG TIN CHUNG -->
      <div class="container-infor-detail mt-5 card p-5">
        <h4 class="text-center">
          THÔNG TIN CHUNG
          <button
            v-if="!isEditingInfoBasic"
            @click="isEditingInfoBasic = !isEditingInfoBasic"
            type="button"
            title="Chỉnh sửa thông tin cơ bản nhân viên"
          >
            <font-awesome-icon
              class="ms-3"
              icon="fa-regular fa-pen-to-square"
              size="sm"
              style="color: #74c0fc"
            />
          </button>
          <button
            v-if="isEditingInfoBasic"
            @click="isEditingInfoBasic = false"
            type="button"
            class="text-center title-btn-cancle"
          >
            <font-awesome-icon
              icon="fa-regular fa-rectangle-xmark"
              size="sm"
              class="ms-3"
              style="color: #ff1414"
            />
          </button>
        </h4>

        <div class="avatar row mt-2">
          <!-- title-col -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5">Ảnh hồ sơ</p>
            </div>
            <div class="col-md-8">
              <div>
                <input
                  v-if="isEditingInfoBasic"
                  class="form-control tw-block tw-w-full tw-text-sm tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-cursor-pointer tw-bg-gray-50 dark:tw-text-gray-400 tw-focus:outline-none dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400"
                  id="file_input"
                  type="file"
                />
                <figure class="tw-max-w-lg">
                  <!-- -------------------SRC IMG STAFF-------------------------------- -->
                  <img
                    v-if="!isEditingInfoBasic"
                    class="tw-h-auto tw-max-w-full tw-rounded-lg"
                    :src="`http://localhost:3000${staffDetail.image_avt}`"
                    alt="Chưa cập nhật"
                    width="150"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>

        <div class="info-detail row mt-2">
          <!-- col-1 -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5">Mã nhân viên:</p>
              <p class="tw-dark:text-white tw-ms-5">Họ và tên:</p>
              <p class="tw-dark:text-white tw-ms-5">Ngày sinh:</p>
              <p class="tw-dark:text-white tw-ms-5">Số CCCD/CMND:</p>
              <p class="tw-dark:text-white tw-ms-5">Giới tính:</p>
              <p class="tw-dark:text-white tw-ms-5">Địa chỉ liên hệ:</p>
              <p class="tw-dark:text-white tw-ms-5">Ngày cấp tài khoản:</p>
            </div>
            <div class="col-md-8">
              <!-- Staff id  -->
              <input
                type="text"
                :value="staffDetail.staff_id"
                disabled
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Name -->
              <input
                type="text"
                :value="staffDetail.first_name + ' ' + staffDetail.last_name"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Birthday -->
              <input
                type="text"
                :value="formatBirthDay(staffDetail.birthday)"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Citizen ID -->
              <input
                type="text"
                :value="staffDetail.citizen_id"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Gender -->
              <input
                v-if="staffDetail.gender == 0"
                type="text"
                value="Nữ"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />
              <input
                v-if="staffDetail.gender == 1"
                type="text"
                value="Nam"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- edit gender -->
              <div
                v-if="!staffDetail.gender"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              >
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="female"
                    value="0"
                  />
                  <label class="form-check-label" for="female">Nữ</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="male"
                    value="1"
                  />
                  <label class="form-check-label" for="male">Nam</label>
                </div>
              </div>

              <!-- Contact address -->
              <input
                type="text"
                :value="staffDetail.address_contact"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- date hire or join in -->
              <input
                type="text"
                :value="formatDateTime(staffDetail.created_at)"
                disabled
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />
            </div>
          </div>
          <!-- col-2 -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5">Quyền truy cập:</p>
              <p class="tw-dark:text-white tw-ms-5">Số điện thoại:</p>
              <p class="tw-dark:text-white tw-ms-5">Dân tộc:</p>
              <p class="tw-dark:text-white tw-ms-5">Tôn giáo:</p>
              <p class="tw-dark:text-white tw-ms-5">Quốc tịch:</p>
              <p class="tw-dark:text-white tw-ms-5">Trạng thái tài khoản:</p>
              <p class="tw-dark:text-white tw-ms-5">Ngày sửa đổi:</p>
            </div>
            <div class="col-md-8">
              <!-- Role id -->
              <input
                type="text"
                :value="staffDetail.role_name"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- number-phone -->
              <input
                type="text"
                :value="staffDetail.phone_number"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Nation: Dân tộc -->
              <input
                type="text"
                :value="staffDetail.nation || 'Chưa cập nhật'"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Religion: Tôn giáo -->
              <input
                type="text"
                :value="staffDetail.religion || 'Chưa cập nhật'"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Nationality: Quốc tịch -->
              <input
                type="text"
                :value="staffDetail.nationality || 'Chưa cập nhật'"
                :disabled="!isEditingInfoBasic"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- Status account -->
              <!-- status = 1: Hoạt động -->

              <input
                v-if="staffDetail.statusAccount === '1'"
                type="text"
                value="Đang hoạt động"
                :disabled="!isEditingInfoBasic"
                class="value text-success form-control ps-3 tw-text-black-500 tw-font-semibold"
              />
              <!-- status = 0: Ngừng hoạt động -->

              <input
                v-if="staffDetail.statusAccount === '0'"
                type="text"
                value="Ngừng hoạt động"
                :disabled="!isEditingInfoBasic"
                class="value text-danger form-control ps-3 tw-text-black-500 tw-font-semibold"
              />
              <!-- status = 2: Tạm khóa -->

              <input
                v-if="staffDetail.statusAccount === '2'"
                type="text"
                value="Tạm khóa"
                :disabled="!isEditingInfoBasic"
                class="value text-warning form-control ps-3 tw-text-black-500 tw-font-semibold"
              />

              <!-- date modify -->
              <input
                type="text"
                disabled
                :value="formatDateTime(staffDetail.updated_at)"
                class="value form-control ps-3 tw-text-black-500 tw-font-semibold"
              />
            </div>
          </div>
        </div>

        <div @click="handleSaveInfoBasic" class="mt-5 text-center btn-save">
          <button
            v-if="isEditingInfoBasic"
            type="button"
            class="title-btnSave"
            title="Lưu"
          >
            LƯU
          </button>
        </div>
      </div>
      <!--------------------------------------------------------------------------------------------------WORK INFORMATION: THÔNG TIN CÔNG VIỆC-->
      <!-- Work Information Section -->
      <div class="container-infor-detail mt-3 card p-5">
        <h4 class="text-center">
          THÔNG TIN CÔNG VIỆC
          <router-link :to="{ name: 'admin.emp' }">
            <font-awesome-icon
              class="ms-3"
              icon="fa-regular fa-pen-to-square"
              size="sm"
              style="color: #74c0fc"
            />
          </router-link>
        </h4>

        <div class="info-detail row mt-2">
          <!-- Column 1 -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5">Ngày vào làm:</p>
              <p class="tw-dark:text-white tw-ms-5">Hợp đồng làm việc:</p>
              <p
                v-if="
                  staffDetail.role_id !== 'LT' && staffDetail.role_id !== 'TN'
                "
                class="tw-dark:text-white tw-ms-5"
              >
                Chuyên khoa:
              </p>
            </div>
            <div class="col-md-8">
              <!-- Start Date -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ formatBirthDay(staffDetail.created_at) }}
              </p>
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.work_contract }} năm
              </p>
              <!-- Specialty -->
              <p
                v-if="
                  staffDetail.role_id !== 'LT' &&
                  staffDetail.role_id !== 'TN' &&
                  specialtyData
                "
                class="value tw-text-black-500 tw-font-semibold"
              >
                <span
                  v-for="(spec, index) in specialtyData"
                  :key="spec.specialty_id"
                >
                  {{ spec.specialty_name
                  }}<span v-if="index < specialtyData.length - 1">, </span>
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- Thông tin ca làm việc -->
        <div class="col-md-12 tw-text-center tw-mt-5">
          <p class="tw-dark:text-white tw-ms-5">Thông tin ca làm việc</p>
          <!-- Hiển thị danh sách ca làm việc -->
          <div
            v-if="shiftStaffList"
            class="tw-relative tw-overflow-x-auto tw-shadow-md tw-sm:rounded-lg"
          >
            <table
              class="tw-w-full tw-text-sm tw-text-left tw-rtl:text-right tw-text-gray-800 tw-dark:text-gray-400"
            >
              <thead
                class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-200 tw-dark:bg-gray-700 tw-dark:text-gray-400"
              >
                <tr class="tw-text-center">
                  <th scope="col" class="tw-px-1 tw-py-1">STT</th>

                  <th scope="col" class="tw-px-4 tw-py-2">Ngày vào ca</th>
                  <th scope="col" class="tw-px-4 tw-py-2">Ca làm việc</th>
                  <th scope="col" class="tw-px-4 tw-py-2">
                    Thời gian làm việc
                  </th>
                  <th scope="col" class="tw-px-6 tw-py-2">Phòng làm việc</th>
                  <th scope="col" class="tw-px-6 tw-py-2">
                    Chuyên khoa làm việc
                  </th>
                  <th scope="col" class="tw-px-4 tw-py-2">Ngày tạo</th>
                  <th scope="col" class="tw-px-4 tw-py-2">Ngày chỉnh sửa</th>
                  <th scope="col" class="tw-px-4 tw-py-2">Tools</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(shift, index) in shiftStaffList"
                  :key="index"
                  class="tw-bg-white tw-text-center tw-border-b tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-hover:bg-gray-50 tw-dark:hover:bg-gray-600"
                >
                  <!-- STT -->
                  <th
                    scope="row"
                    class="tw-px-4 tw-py-2 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap tw-dark:text-white"
                  >
                    {{ index + 1 }}
                  </th>

                  <!-- JOIN IN -->
                  <td class="tw-px-6 tw-2y-3">
                    {{ formatDay(shift.shift_date) }}
                  </td>

                  <!-- SHIFT NAME -->
                  <td class="tw-px-4 tw-py-2">{{ shift.shift_name }}</td>

                  <!-- TIME SHIFT -->
                  <td class="px-4 py-2">
                    {{ formatTime(shift.start_time) }} -
                    {{ formatTime(shift.end_time) }}
                  </td>

                  <!-- WORKED IN DEPARTMENT -->
                  <td class="px-6 py-2">{{ shift.department_name }}</td>

                  <!-- WORKED IN SPECIALTIES -->
                  <td class="px-6 py-2">{{ shift.specialty_name }}</td>

                  <!-- CREATED AT -->
                  <td class="px-4 py-2">
                    {{ formatDateTime(shift.created_at) }}
                  </td>

                  <!-- UPDATED AT -->
                  <td class="px-4 py-2">
                    {{ formatDateTime(shift.updated_at) }}
                  </td>

                  <!-- TOOLS -->
                  <td class="px-6 py-2">
                    <router-link to="#">Cập nhật</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- END CODE DIV CONTAINER -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  handleGetDetailStaff,
  staffDetail,
  specialtyData,
  errorMessage,
} from "@/services/staff_managements/handleGetDetailStaff";
import formatDate from "@/helper/format-datetime";
import Swal from "sweetalert2";
import { Result } from "postcss";
const formatDateTime = formatDate.formatDateTime;
const formatBirthDay = formatDate.formatDateBirth;
const formatDay = formatDate.formatDateBirth;
const formatTime = formatDate.formatTime;
const route = useRoute();
const staff_id = route.params.id;
const shiftStaffList = ref([]);
// Hàm gọi API để lấy thông tin ca làm việc của nhân viên
const fetchShifts = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/handle/staff/getStaffShifts/${staff_id}`
    );
    if (response.status === 200) {
      console.log(response.data.shiftStaffList);
      shiftStaffList.value = response.data.shiftStaffList; // Lưu dữ liệu trả về vào shiftStaffList
    } else {
      console.log(response.data.message);
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu ca làm việc:", error);
  }
};

// Cập nhật thông tin cơ bản của nhân viên
const isEditingInfoBasic = ref(false);

const handleSaveInfoBasic = async () => {
  try {
    Swal.fire({
      title: "Lưu ý",
      text: "Bạn có chắc chắn cập nhật thông tin cho nhân viên này",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Đã lưu thành công");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        isEditingInfoBasic.value = false;
      }
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin nhân viên:", error);
  }
};
onMounted(async () => {
  handleGetDetailStaff(staff_id);
  fetchShifts();
  console.log(shiftStaffList);
});
</script>

<style scoped>
.value {
  padding: 5px 0;
  margin-bottom: 10px;
}

.info-detail .col-md-4 p,
.info-detail .col-md-8 p {
  margin-bottom: 10px;
  line-height: 1.5;
}

.info-detail .col-md-4 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-detail .col-md-8 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.btn-save {
  margin: 0 auto;
  background-color: rgb(0, 255, 102);
  width: 70%;
  border-radius: 14px;
  cursor: pointer;
}

.title-btnSave {
  color: #fff;
  font-weight: bold;
  padding: 5px 0px 5px 0px;
}
</style>
