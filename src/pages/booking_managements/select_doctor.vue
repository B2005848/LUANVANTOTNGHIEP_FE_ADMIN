<template>
  <div class="container-fluid mt-3">
    <div>
      <ul class="ul__list d-flex" style="justify-content: center">
        <li>Tạo hồ sơ</li>
        <li>&gt;</li>
        <li>Chọn phòng khám</li>
        <li>&gt;</li>
        <li>Chọn dịch vụ</li>
        <li>&gt;</li>
        <li class="active">Chọn bác sĩ</li>
        <li>&gt;</li>
        <li>Thanh toán</li>
      </ul>
    </div>
    <div class="card p-4 mt-3">
      <h4 class="text-center">Chọn bác sĩ khám</h4>
      <!-- ==============================================================================================   CHỌN BÁC SĨ KHÁM -->

      <!-- Danh sách bác sĩ -->
      <div v-if="doctors.length && !selecteddoctor">
        <div v-for="doctor in doctors" :key="doctor.doctor_id" class="mb-3">
          <button
            :class="[
              'btn',
              'w-100',
              doctor.doctor_id === selecteddoctor?.doctor_id
                ? 'selected'
                : 'btn-outline-primary',
            ]"
            @click="selectdoctor(doctor)"
          >
            Bác sĩ
            {{
              doctor.first_name +
              " " +
              doctor.last_name +
              " (" +
              doctor.doctor_id +
              ")"
            }}
          </button>
        </div>
      </div>

      <div v-if="selecteddoctor">
        <div class="alert alert-info mt-4">
          Bạn đã chọn bác sĩ:
          <strong>{{
            selecteddoctor.first_name + " " + selecteddoctor.last_name
          }}</strong>
          <div class="d-flex mt-3" style="flex-direction: row">
            <div>
              <img
                v-if="selecteddoctor.image_avt"
                :src="`http://localhost:3000${selecteddoctor.image_avt}`"
                alt=""
                width="75"
              />

              <img
                v-if="!selecteddoctor.image_avt"
                :src="`http://localhost:3000/uploads/avtStaffs/CTU_logo.png`"
                alt=""
                width="75"
              />
            </div>
            <div>
              <ul>
                <li>Mã bác sĩ: {{ selecteddoctor.doctor_id }}</li>
                <li>Chuyên khoa: {{ selecteddoctor.specialty }}</li>
              </ul>
            </div>
          </div>

          <div>
            <button
              style="color: #007bff"
              class="w-100"
              @click="selecteddoctor = null"
            >
              Chọn lại
            </button>
          </div>
        </div>

        <!-- ==============================================================================================   CHỌN NGÀY KHÁM -->
        <div class="mt-3" v-if="selecteddoctor">
          <h4 v-if="!selectedDate" class="text-center">Chọn ngày khám</h4>
          <VueDatePicker
            v-model="selectedDate"
            :disabled-week-days="disabledDays"
            locale="vi"
            format="dd/MM/yyyy"
            :calendar-button="true"
            placeholder="Chọn ngày khám"
            :enable-time-picker="false"
            class="form-control"
          />
        </div>

        <!-- ==============================================================================================   CHỌN BUỔI KHÁM-->
        <div class="mt-3" v-if="selectedDate && !selectedshift">
          <h4 class="text-center">Chọn buổi khám</h4>
          <div v-for="shift in shifts" :key="shift.shift_id" class="mb-3">
            <button
              :class="[
                'btn',
                'w-100',
                shift.shift_id === selectedshift?.shift_id
                  ? 'selected'
                  : 'btn-outline-primary',
              ]"
              @click="selectshift(shift)"
            >
              {{ shift.shift_name }}
            </button>
          </div>
        </div>

        <div v-if="selectedshift" class="alert alert-info mt-4">
          Bạn đã chọn buổi:
          <strong>{{ selectedshift.shift_name }}</strong>
          <div class="d-flex mt-3" style="flex-direction: row"></div>

          <div>
            <button
              style="color: #007bff"
              class="w-100"
              @click="selectedshift = null"
            >
              Chọn lại
            </button>
          </div>
        </div>

        <!-- ==============================================================================================   CHỌN GIỜ KHÁM-->
        <div v-if="selectedshift && !selectedHour">
          <h5 class="mt-4">Chọn Giờ Khám</h5>
          <div v-for="hour in availableHours" :key="hour" class="mb-3">
            <button
              class="btn btn-outline-primary w-100"
              @click="selectHour(hour)"
            >
              {{ hour }}
            </button>
          </div>
        </div>

        <div v-if="selectedHour" class="alert alert-info mt-4">
          Bạn đã chọn khung giờ
          <strong>{{ selectedHour }}</strong>
          <div class="d-flex mt-3" style="flex-direction: row"></div>

          <div>
            <button
              style="color: #007bff"
              class="w-100"
              @click="selectedHour = null"
            >
              Chọn lại
            </button>
          </div>
        </div>

        <div v-if="selectedHour">
          <label
            for="message"
            class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 tw-dark:text-white"
            >Mô tả ngắn triệu chứng</label
          >
          <textarea
            v-model="reason"
            id="message"
            rows="4"
            class="tw-block tw-p-2.5 tw-w-full tw-text-sm tw-text-gray-900 tw-bg-gray-50 tw-rounded-lg tw-border tw-border-gray-300 tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-dark:bg-gray-700 tw-dark:border-gray-600 tw-dark:placeholder-gray-400 tw-dark:text-white tw-dark:focus:ring-blue-500 tw-dark:focus:border-blue-500"
            placeholder="Nhập mô tả của bệnh nhân ở đây..."
          ></textarea>
        </div>
        <!-- Xác nhận -->

        <div v-if="showbtnPayment" class="row">
          <div class="col-md-6">
            <button
              class="btn btn-success w-100 tw-mt-5"
              @click="paymnentDirect"
            >
              THANH TOÁN TIỀN MẶT
            </button>
          </div>

          <div class="col-md-6">
            <button
              class="btn btn-success w-100 tw-mt-5"
              @click="paymnentVNpay"
            >
              THANH TOÁN VNPAY
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment-timezone";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();
const showbtnPayment = ref(false);
const doctors = ref([]);
const selecteddoctor = ref(null);
const shifts = ref([]);
const selectedshift = ref(null);
const availableHours = ref([]); // Các giờ có thể chọn trong buổi
const patient_id = route.params.patient_id;
const department_id = route.params.department_id;
const specialty_id = route.params.specialty_id;
const service_id = route.params.service_id;
const reason = ref("Chờ tư vấn của bác sĩ");
// Hàm tải danh sách bác sĩ
const loaddoctors = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/handle/staff/getListDoctorBySpecialtyId/${specialty_id}`
    );
    doctors.value = response.data.dataInfo;
  } catch (error) {
    console.error("Lỗi khi tải danh sách bác sĩ:", error);
  }
};

// Chọn bác sĩ
const selectdoctor = (doctor) => {
  selecteddoctor.value = doctor;
  console.log("ID bác sĩ đã chọn:", selecteddoctor.value.doctor_id);
  fetchDoctorShifts();
  loadShift();
};

// Khai báo các biến
const selectedDate = ref(null);
const disabledDays = ref([6, 0]); // Mặc định disable Chủ nhật (0) và Thứ bảy (6)

// Hàm để lấy danh sách các ca làm việc của bác sĩ
const fetchDoctorShifts = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/handle/staff/getDoctorShifts/${department_id}/${specialty_id}/${selecteddoctor.value.doctor_id}`
    );
    const shifts = response.data.shifts;

    // Kiểm tra shift_id và thiết lập disabledDays tương ứng
    shifts.forEach((shift) => {
      if (shift.shift_id === "CN-C") {
        // Chỉ cho phép chọn Chủ nhật
        disabledDays.value = [1, 2, 3, 4, 5, 6]; // Disable tất cả các ngày từ Thứ 2 đến Thứ 7
      } else if (shift.shift_id === "NT-S" || shift.shift_id === "NT-C") {
        // Disable Chủ nhật (0) và Thứ 7 (6), cho phép từ Thứ 2 đến Thứ 6
        disabledDays.value = [0, 6];
      }
    });
  } catch (error) {
    console.error("Error fetching doctor shifts:", error);
  }
};

// Load buổi làm việc của bác sĩ
const loadShift = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/handle/staff/getDoctorShifts/${department_id}/${specialty_id}/${selecteddoctor.value.doctor_id}`
    );
    shifts.value = response.data.shifts;
    console.log(shifts);
  } catch (error) {
    console.error("Lỗi khi tải danh sách bác sĩ:", error);
  }
};

// Chọn buổi và load giờ
const selectshift = (shift) => {
  selectedshift.value = shift;
  const startMoment = moment.utc(shift.start_time);
  const endMoment = moment.utc(shift.end_time);
  const options = [];
  for (
    let m = startMoment.clone();
    m.isBefore(endMoment);
    m.add(30, "minutes")
  ) {
    options.push(m.format("HH:mm"));
  }

  options.push(endMoment.format("HH:mm"));

  availableHours.value = options;
  console.log("ID ca làm việc đã chọn:", selectedshift.value.shift_id);
};

const selectedHour = ref(null);
// Hàm chọn giờ khám
const selectHour = async (hour) => {
  console.log(`Giờ khám đã chọn: ${hour}`);
  selectedHour.value = hour;
  // Bạn có thể xử lý thêm ở đây, ví dụ lưu lại giờ chọn, chuyển qua bước tiếp theo...
  console.log(
    "Ngày đã chọn:",
    moment.utc(selectedDate.value).format("YYYY-MM-DD")
  );
  const appointmentDetails = {
    doctor_id: selecteddoctor.value.doctor_id,
    department_id: department_id,
    appointment_date: moment.utc(selectedDate.value).format("YYYY-MM-DD"),
    service_id: service_id,
    start_time: hour,
    shift_id: selectedshift.value.shift_id,
  };

  const isAvailable = await axios.get(
    "http://localhost:3000/api/appointment/check-existing-time",
    {
      params: appointmentDetails,
    }
  );

  if (isAvailable.data.status === true) {
    Swal.fire("THÔNG BÁO", "Thông tin hợp lệ", "success");
    showbtnPayment.value = true;
  } else {
    Swal.fire(
      "THÔNG BÁO",
      "Khung giờ này đã có người đặt, vui lòng chọn khung giờ hoặc ngày khác",
      "warning"
    );
    showbtnPayment.value = false;
  }
};

// THANH TOÁN TẠI PHÒNG KHÁM
const paymnentDirect = async () => {
  const endTime = moment(selectedHour.value, "HH:mm")
    .add(30, "minutes")
    .format("HH:mm");
  const infoService = await axios.get(
    `http://localhost:3000/api/services/getdetail/${service_id}`
  );
  if (infoService.status === 200) {
    const amount = infoService.data.dataInfo.service_fee;
    const resultBooking = await axios.post(
      `http://localhost:3000/api/appointment/booking/${patient_id}`,
      {
        staff_id: selecteddoctor.value.doctor_id,
        department_id: department_id,
        appointment_date: moment.utc(selectedDate.value).format("YYYY-MM-DD"),
        start_time: selectedHour.value,
        end_time: endTime,
        shift_id: selectedshift.value.shift_id,
        service_id: service_id,
        reason: reason.value,
        payment_method_id: 1,
      }
    );
    console.log();
    if (resultBooking.status === 200) {
      Swal.fire({
        icon: "success",
        title: "THÀNH CÔNG",
        text: "Đăng kí khám bệnh thành công",
        showCancelButton: true,
        confirmButtonText: "Xác nhận thanh toán",
        cancelButtonText: "Thanh toán sau",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resultPayment = await axios.post(
            "http://localhost:3000/api/appointment/add",
            {
              patient_id: patient_id,
              appointment_id: resultBooking.data.data.appointment_id,
              amount: amount,
              payment_method_id: 1,
              payment_status: "C",
              bankCode: "TT",
            }
          );

          if (resultPayment.status === 201) {
            Swal.fire(
              "THÀNH CÔNG",
              "Xác nhận thanh toán thành công",
              "success"
            );
            router.push({
              name: "admin.booking",
            });
          }
        } else {
          const resultPayment = await axios.post(
            "http://localhost:3000/api/appointment/add",
            {
              patient_id: patient_id,
              appointment_id: resultBooking.data.data.appointment_id,
              amount: amount,
              payment_method_id: 1,
              payment_status: "P",
              bankCode: "TT",
            }
          );
          if (resultPayment.status === 201) {
            Swal.fire("THÀNH CÔNG", "Đã xác nhận thanh toán sau", "success");
            router.push({
              name: "admin.booking",
            });
          }
        }
      });
    }
  }
};

// THANH TOÁN VNPAY
const paymnentVNpay = async () => {
  const endTime = moment(selectedHour.value, "HH:mm")
    .add(30, "minutes")
    .format("HH:mm");
  const infoService = await axios.get(
    `http://localhost:3000/api/services/getdetail/${service_id}`
  );
  if (infoService.status === 200) {
    const amount = infoService.data.dataInfo.service_fee;
    const resultBooking = await axios.post(
      `http://localhost:3000/api/appointment/booking/${patient_id}`,
      {
        staff_id: selecteddoctor.value.doctor_id,
        department_id: department_id,
        appointment_date: moment.utc(selectedDate.value).format("YYYY-MM-DD"),
        start_time: selectedHour.value,
        end_time: endTime,
        shift_id: selectedshift.value.shift_id,
        service_id: service_id,
        reason: reason.value,
        payment_method_id: 2,
      }
    );
    console.log();
    if (resultBooking.status === 200) {
      Swal.fire({
        icon: "success",
        title: "THÀNH CÔNG",
        text: "Đăng kí khám bệnh thành công",
        showCancelButton: true,
        confirmButtonText: "Xác nhận thanh toán",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resultPayment = await axios.post(
            "http://localhost:3000/api/VNPay/payment/appointment-payment-web",
            {
              patient_id: patient_id,
              appointment_id: resultBooking.data.data.appointment_id,
              amount: amount,
              bankCode: "VNBANK",
              ipAddr: "192.168.137.1", // Địa chỉ IP của người dùng (bạn có thể lấy từ req.ip nếu triển khai thực tế)
            }
          );
          if (resultPayment.status === 200) {
            // Hiển thị SweetAlert loading trước khi chuyển trang
            Swal.fire({
              title: "Đang chuyển tới cổng thanh toán...",
              text: "Vui lòng chờ giây lát",
              icon: "info",
              allowOutsideClick: false,
              showConfirmButton: false,
              willOpen: () => {
                Swal.showLoading();
              },
            });
            // Chuyển hướng tới trang thanh toán sau 0.5 giây
            setTimeout(() => {
              window.location.href = resultPayment.data.paymentUrl;
            }, 500);
          }
        } else {
          await axios.delete(
            `http://localhost:3000/api/appointment/delete/${resultBooking.data.data.appointment_id}`
          );
        }
      });
    }
  }
};

onMounted(() => {
  loaddoctors();
});
</script>

<style scoped>
.container-fluid {
  max-width: 100%;
  margin: 0 auto;
}
.selected {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.btn:hover {
  color: white;
}

.btn-outline-primary {
  border-color: #007bff;
  color: #007bff;
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
