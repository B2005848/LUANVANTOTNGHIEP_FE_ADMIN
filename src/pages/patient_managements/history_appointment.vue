<template>
  <div>
    <h3 class="text-center mb-4">Lịch Sử Khám Bệnh</h3>
    <div
      v-if="appointments.length > 0"
      class="tw-relative tw-overflow-x-auto tw-shadow-md tw-sm:rounded-lg"
    >
      <table
        class="tw-w-full tw-text-sm tw-text-left tw-text-gray-800 tw-dark:text-gray-400"
      >
        <thead
          class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-200 tw-dark:bg-gray-700 tw-dark:text-gray-400"
        >
          <tr class="tw-text-center">
            <th class="tw-px-6 tw-py-3">STT</th>
            <th class="tw-px-6 tw-py-3">Mã Lịch Hẹn</th>
            <th class="tw-px-6 tw-py-3">Họ và Tên Bác Sĩ</th>
            <th class="tw-px-6 tw-py-3">Phòng Khám</th>
            <th class="tw-px-6 tw-py-3">Dịch Vụ</th>
            <th class="tw-px-6 tw-py-3">Ngày Hẹn</th>
            <th class="tw-px-6 tw-py-3">Thời Gian</th>
            <th class="tw-px-6 tw-py-3">Trạng Thái</th>
            <th class="tw-px-6 tw-py-3">Thanh Toán</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(appointment, index) in appointments"
            :key="appointment.appointment_id"
            class="tw-bg-white tw-text-center tw-border-b tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-hover:bg-gray-50 tw-dark:hover:bg-gray-600"
          >
            <td class="tw-px-6 tw-py-4">{{ index + 1 }}</td>
            <td class="tw-px-6 tw-py-4">{{ appointment.appointment_id }}</td>
            <td class="tw-px-6 tw-py-4">
              {{ appointment.first_name }} {{ appointment.last_name }}
            </td>
            <td class="tw-px-6 tw-py-4">{{ appointment.department_name }}</td>
            <td class="tw-px-6 tw-py-4">{{ appointment.service_name }}</td>
            <td class="tw-px-6 tw-py-4">
              {{ formatDate(appointment.appointment_date) }}
            </td>
            <td class="tw-px-6 tw-py-4">
              {{ formatTime(appointment.start_time) }} -
              {{ formatTime(appointment.end_time) }}
            </td>
            <td class="tw-px-6 tw-py-4">{{ mapStatus(appointment.status) }}</td>
            <td class="tw-px-6 tw-py-4">
              {{ mapPaymentStatus(appointment.payment_status) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center mt-4">Không có lịch sử khám bệnh</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import axios from "axios";

const appointments = ref([]);
const route = useRoute();
const username = route.params.username;
const getAppointments = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/appointment/getinformation/" + username
    );
    if (response.data.status) {
      appointments.value = response.data.data;
    }
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  }
};

const formatDate = (date) => new Date(date).toLocaleDateString();
const formatTime = (time) =>
  new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const mapStatus = (status) => {
  switch (status) {
    case "H":
      return "Hoàn thành";
    case "C":
      return "Đã hủy";
    case "S":
      return "Chờ xử lý";
    default:
      return "Không rõ";
  }
};
const mapPaymentStatus = (paymentStatus) => {
  switch (paymentStatus) {
    case "P":
      return "Chưa thanh toán";
    case "C":
      return "Đã thanh toán";
    default:
      return "Không rõ";
  }
};

onMounted(() => {
  getAppointments();
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
  text-align: center;
}
tr:hover {
  background-color: #f1f1f1;
}
</style>
