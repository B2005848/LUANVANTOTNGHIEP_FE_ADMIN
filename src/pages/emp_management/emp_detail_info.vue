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
          <router-link :to="{ name: 'admin.emp' }">
            <font-awesome-icon
              class="ms-3"
              icon="fa-regular fa-pen-to-square"
              size="sm"
              style="color: #74c0fc"
          /></router-link>
        </h4>

        <div class="avatar row">
          <!-- title-col -->
          <div class="col-md-2">
            <p class="tw-dark:text-white tw-ms-5">Ảnh chân dung</p>
          </div>

          <div class="col-md-4">
            <div>
              <figure class="tw-max-w-lg">
                <!-- -------------------SRC IMG STAFF-------------------------------- -->
                <img
                  class="tw-h-auto tw-max-w-full tw-rounded-lg"
                  :src="`http://localhost:3000${staffDetail.image_avt}`"
                  alt="Chưa cập nhật"
                  width="150"
                />
              </figure>
            </div>
          </div>
        </div>

        <div class="info-detail row mt-2">
          <!-- col-1 -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5">Mã nhân viên</p>
              <p class="tw-dark:text-white tw-ms-5">Họ và tên</p>
              <p class="tw-dark:text-white tw-ms-5">Ngày sinh</p>
              <p class="tw-dark:text-white tw-ms-5">Số CCCD/CMND</p>
              <p class="tw-dark:text-white tw-ms-5">Giới tính</p>
              <p class="tw-dark:text-white tw-ms-5">Địa chỉ liên hệ</p>
              <p class="tw-dark:text-white tw-ms-5">Ngày cấp tài khoản</p>
            </div>
            <div class="col-md-8">
              <!-- Staff id  -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.staff_id }}
              </p>

              <!-- Name -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.first_name }} {{ staffDetail.last_name }}
              </p>

              <!-- Birthday -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ formatBirthDay(staffDetail.birthday) }}
              </p>

              <!-- Citizen ID -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.citizen_id }}
              </p>

              <!-- Gender -->
              <p class="value tw-text-black-500 tw-font-semibold">
                <span v-if="staffDetail.gender == 0"
                  >Nữ
                  <font-awesome-icon
                    icon=" fa-venus"
                    style="color: #b197fc"
                    size="lg"
                /></span>
                <span v-if="staffDetail.gender == 1"
                  >Nam
                  <font-awesome-icon
                    icon=" fa-mars"
                    style="color: #74c0fc"
                    size="lg"
                /></span>
              </p>

              <!-- Contact address -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.address_contact }}
              </p>

              <!-- date hire or join in -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ formatDateTime(staffDetail.created_at) }}
              </p>
            </div>
          </div>
          <!-- col-2 -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5">Quyền truy cập</p>
              <p class="tw-dark:text-white tw-ms-5">Số điện thoại</p>
              <p class="tw-dark:text-white tw-ms-5">Dân tộc</p>
              <p class="tw-dark:text-white tw-ms-5">Tôn giáo</p>
              <p class="tw-dark:text-white tw-ms-5">Quốc tịch</p>
              <p class="tw-dark:text-white tw-ms-5">Trạng thái tài khoản</p>
              <p class="tw-dark:text-white tw-ms-5">Ngày sửa đổi</p>
            </div>
            <div class="col-md-8">
              <!-- Role id -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.role_name }}
              </p>

              <!-- number-phone -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.phone_number }}
              </p>

              <!-- Nation: Dân tộc -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.nation || "Chưa cập nhật !" }}
              </p>

              <!-- Religion: Tôn giáo -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.religion || "Chưa cập nhật !" }}
              </p>

              <!-- Nationality: Quốc tịch -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ staffDetail.nationality || "Chưa cập nhật !" }}
              </p>

              <!-- Status account -->
              <p class="value tw-text-black-500 tw-font-semibold">
                <!-- status = 1: Hoạt động -->
                <span
                  class="text-success"
                  v-if="staffDetail.statusAccount === '1'"
                  >Đang hoạt động
                  <font-awesome-icon
                    class="tw-ms-4"
                    icon="fa-solid fa-signal"
                    size="lg"
                    style="color: #63e6be"
                /></span>

                <!-- status = 0: Ngừng hoạt động -->
                <span
                  class="text-danger"
                  v-if="staffDetail.statusAccount === '0'"
                  >Ngừng hoạt động<font-awesome-icon
                    class="tw-ms-4"
                    icon="fa-solid fa-ban"
                    size="lg"
                    style="color: #f41f1f"
                  />
                </span>

                <!-- status = 2: Tạm khóa -->
                <span
                  class="text-warning"
                  v-if="staffDetail.statusAccount === '2'"
                  >Tạm khóa
                  <font-awesome-icon
                    class="tw-ms-4"
                    size="lg"
                    icon="fa-lock"
                    style="color: #ffd43b"
                /></span>
              </p>

              <!-- date modify -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ formatDateTime(staffDetail.updated_at) }}
              </p>
            </div>
          </div>
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
              <p class="tw-dark:text-white tw-ms-5">Ngày vào làm</p>
              <p class="tw-dark:text-white tw-ms-5">Hợp đồng làm việc</p>
              <p class="tw-dark:text-white tw-ms-5">Chuyên khoa</p>
            </div>
            <div class="col-md-8">
              <!-- Start Date -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ formatDateTime("2021-06-15") }}
              </p>
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ "5 năm" }}
              </p>
              <!-- Specialty -->
              <p
                v-if="specialtyData"
                class="value tw-text-black-500 tw-font-semibold"
              >
                <span
                  v-for="(spec, index) in specialtyData"
                  :key="spec.staff_specialty_id"
                >
                  {{ spec.specialty_name
                  }}<span v-if="index < specialtyData.length - 1">, </span>
                </span>
              </p>
            </div>
          </div>

          <!-- Column 2 -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5">Ca làm việc</p>
            </div>
            <div class="col-md-8">
              <!-- SHIFTS -->
              <p class="value tw-text-black-500 tw-font-semibold">
                {{ "Ca sáng " }} <router-link>Xem</router-link>
              </p>
            </div>
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
const formatDateTime = formatDate.formatDateTime;
const formatBirthDay = formatDate.formatDateBirth;
const route = useRoute();
const staff_id = route.params.id;

onMounted(async () => {
  handleGetDetailStaff(staff_id);
  console.log(staff_id);
});
</script>

<style scoped>
.value {
  border-bottom: 1px solid rgb(199, 199, 199);
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
</style>
