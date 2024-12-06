<template>
  <div>
    <!-- Quản lí nhân viên -->
    <div class="mt-3">
      <div class="wapper card p-3">
        <div class="d-flex mt-3">
          <div class="flex-1">
            <h3 class="">DANH SÁCH LỊCH HẸN</h3>
          </div>
          <div class="d-flex">
            <form class="tw-max-w-md tw-mx-auto">
              <div class="tw-relative">
                <div
                  class="tw-absolute tw-inset-y-0 tw-start-0 tw-flex tw-items-center tw-ps-3 tw-pointer-events-none"
                >
                  <svg
                    class="tw-w-4 tw-h-4 tw-text-gray-500 dark:tw-text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  v-model="searchData"
                  id="default-search"
                  size="100"
                  class="tw-block tw-w-full tw-p-4 tw-ps-10 tw-text-sm tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-gray-50 focus:tw-ring-blue-500 focus:tw-border-blue-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                  placeholder="Nhập thông tin cần tìm..."
                  required
                />
                <button
                  @click="handleSearch"
                  type="button"
                  class="tw-text-white tw-absolute tw-end-2.5 tw-bottom-2.5 tw-bg-blue-500 hover:tw-bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-blue-300 tw-font-normal tw-rounded-lg tw-text-sm tw-px-4 tw-py-2 dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>

          <div class="flex-1">
            <router-link :to="{ name: 'admin.create.booking' }">
              <font-awesome-icon
                icon=" fa-plus"
                bounce
                size="2xl"
                style="color: #74c0fc"
              />
            </router-link>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px">
          <div style="font-weight: bold">Chú thích hành động:</div>
          <div>
            <span style="font-weight: bold">Xác nhận:</span> "Xác nhận thông tin
            lịch hẹn"
          </div>
          <div>
            <span style="font-weight: bold">Đã đến:</span> "Xác nhận bệnh nhân
            đã đến phòng khám đúng hẹn và
            <span style="font-weight: bold; text-decoration: underline">
              đã thanh toán dịch vụ khám</span
            >"
          </div>
          <div>
            <span style="font-weight: bold">Không đến:</span> "Bệnh nhân không
            đến phòng khám khi quá thời gian hẹn"
          </div>
          <div>
            <span style="font-weight: bold">Hủy:</span> "Hủy lịch hẹn khi không
            đúng thông tin "
          </div>
        </div>
        <!-- --TW CSS -->
        <!-- list emp -->
        <div
          class="mt-5 tw-relative tw-overflow-x-auto tw-shadow-md tw-sm:rounded-lg"
        >
          <table
            class="tw-w-full tw-text-sm tw-text-left tw-rtl:text-right tw-text-gray-800 tw-dark:text-gray-400"
          >
            <thead
              class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-200 tw-dark:bg-gray-700 tw-dark:text-gray-400"
            >
              <tr class="tw-text-center">
                <th scope="col" class="tw-px-6 tw-py-4">STT</th>
                <th scope="col" class="tw-px-6 tw-py-4">Mã lịch hẹn</th>
                <th scope="col" class="tw-px-6 tw-py-4">Mã bệnh nhân (SĐT)</th>
                <th scope="col" class="tw-px-6 tw-py-4">Bệnh nhân</th>
                <th scope="col" class="tw-px-6 tw-py-4">Bác sĩ tiếp nhận</th>
                <th scope="col" class="tw-px-6 tw-py-4">Ngày hẹn</th>
                <th scope="col" class="tw-px-6 tw-py-4">Lí do khám</th>
                <th scope="col" class="tw-px-6 tw-py-4">Dịch vụ khám</th>
                <th scope="col" class="tw-px-6 tw-py-4">Thanh toán</th>
                <th scope="col" class="tw-px-6 tw-py-4">Phòng tiếp nhận</th>
                <th scope="col" class="tw-px-6 tw-py-4">Trạng thái</th>
                <th scope="col" class="tw-px-6 tw-py-4">Hành động</th>
                <th scope="col" class="tw-px-6 tw-py-4">Ngày tạo</th>
                <th scope="col" class="tw-px-6 tw-py-4">Ngày cập nhật</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in listAppointmentsData"
                :key="index"
                class="tw-bg-white tw-text-center tw-border-b tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-hover:bg-gray-50 tw-dark:hover:bg-gray-600"
              >
                <!-- STT -->
                <th
                  scope="row"
                  class="tw-px-6 tw-py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap tw-dark:text-white"
                >
                  {{ (currentPage - 1) * itemsPerPageData + index + 1 }}
                </th>

                <!-- MÃ LỊCH HẸN -->
                <td class="px-6 py-4">{{ data.appointment_id }}</td>

                <!-- MÃ BỆNH NHÂN -->
                <td class="px-6 py-4">
                  <router-link
                    :to="{
                      name: 'admin.patient_details',
                      params: { username: data.patient_id },
                    }"
                  >
                    {{ data.patient_id }}</router-link
                  >
                </td>

                <!-- HỌ TÊN BỆNH NHÂN -->
                <td class="px-6 py-4">
                  {{ data.patient_firstname }} {{ data.patient_lastname }}
                </td>

                <!-- BÁC SĨ TIẾP NHẬN -->
                <td class="px-6 py-4">
                  {{ data.staff_id }} <br />
                  {{ data.doctor_firstname }} {{ data.doctor_lastname }}
                </td>

                <!-- NGÀY HẸN -->
                <td class="px-6 py-4">
                  {{ formatDay(data.appointment_date) }}
                </td>

                <!-- LÍ DO KHÁM -->
                <td class="px-6 py-4">
                  {{ data.reason ? data.reason : "Chờ tư vấn" }}
                </td>

                <!-- DỊCH VỤ KHÁM -->
                <td class="px-6 py-4">{{ data.service_name }}</td>

                <!-- Trạng thái thanh toán -->
                <td class="px-6 py-4">
                  <span
                    class="text-warning"
                    v-if="
                      data.payment_status === 'X' || data.payment_status === 'F'
                    "
                  >
                    Chưa thanh toán
                  </span>

                  <span class="text-success" v-if="data.payment_status === 'C'">
                    Đã thanh toán
                  </span>

                  <span v-if="data.payment_status === 'P'"> Đang xử lí </span>

                  <span v-if="data.payment_status === 'H'"> Đã hoàn tiền </span>
                </td>

                <!-- PHÒNG TIẾP NHẬN  -->
                <td class="px-6 py-4">
                  {{ data.department_id }} <br />
                  {{ data.department_name }}
                </td>

                <!-- TRẠNG THÁI ĐẶT HẸN -->
                <td class="px-6 py-4">
                  <span v-if="data.status === 'CO-F'">Đã xác nhận </span>
                  <span v-if="data.status === 'S'">
                    <font-awesome-icon
                      icon="fa-solid fa-bell"
                      shake
                      size="xl"
                      style="color: #ffd43b"
                    />
                    Chờ xác nhận
                  </span>
                  <span v-if="data.status === 'C-IN'"> Đã đến </span>
                  <span v-if="data.status === 'IN-P'" style="color: #63e6be">
                    Đang thực hiện
                    <font-awesome-icon
                      icon="fa-solid fa-spinner"
                      spin-pulse
                      size="lg"
                    />
                  </span>
                  <span v-if="data.status === 'CO-P'" style="color: #0000ff">
                    Đã hoàn thành
                  </span>

                  <span v-if="data.status === 'CA'" style="color: red">
                    Đã hủy
                  </span>
                  <span v-if="data.status === 'NO-S'" style="color: #4682b4">
                    Không đến
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span v-if="data.status !== 'CO-P'">
                    <select
                      v-model="data.selectedAction"
                      @change="
                        updateAppointmentStatus(
                          data.appointment_id,
                          data.transaction_id,
                          data.selectedAction
                        )
                      "
                      class="tw-border tw-p-2 tw-rounded"
                    >
                      <option value="">Chọn hành động</option>
                      <option value="C-IN">Đã đến</option>
                      <option value="CO-F">Xác nhận</option>
                      <option value="NO-S">Không đến</option>
                      <option value="CA">Hủy</option>
                      <!-- Thêm các lựa chọn khác nếu cần -->
                    </select>
                  </span>
                  <span v-if="data.status === 'CO-P'"> Đã khám xong </span>
                </td>

                <td class="px-6 py-4">{{ formatDateTime(data.created_at) }}</td>
                <td class="px-6 py-4">{{ formatDateTime(data.updated_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <PaginationComponent
          :pageCount="totalPagesData"
          :currentPage="currentPage"
          @page-change="fetchDataByPage"
        />
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<!----------------------------------------------------------SCRIP SETUP----------------------------------------------->
<script setup>
import { onMounted, ref } from "vue";
import { handleGetListAppointments } from "@/services/appointment_managements/handleGetListAppointment";
import { searchDepartments } from "@/services/department_managements/handleSearchDep";
import PaginationComponent from "@/components/Pagination.vue";
import formatDate from "@/helper/format-datetime";
const formatDateTime = formatDate.formatDateTime;
const formatDay = formatDate.formatDateBirth;
import Swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

// Hàm hiển thị thông báo
const checkUrlAndNotify = () => {
  const status = route.query.status; // Lấy giá trị 'status' từ query string
  const transactionId = route.query.transactionId; // Lấy giá trị 'transactionId' từ query string

  if (status && transactionId) {
    // Nếu có status và transactionId, hiển thị thông báo
    if (status === "success") {
      Swal.fire({
        icon: "success",
        title: "Đặt lịch thành công",
        text: `Giao dịch thành công! Mã giao dịch: ${transactionId}`,
      });
    } else if (status === "failure") {
      Swal.fire({
        icon: "error",
        title: "Đặt lịch không thành công",
        text: `Giao dịch thất bại! Mã giao dịch: ${transactionId}`,
      });
    }

    // Xóa các giá trị status và transactionId khỏi URL để tránh lặp lại thông báo
    router.replace({
      query: { ...route.query, status: undefined, transactionId: undefined },
    });
  }
};

// Kiểm tra URL ngay khi component được gọi
onMounted(() => {
  checkUrlAndNotify();
});
const {
  getData,
  listAppointmentsData,
  errorMessage,
  totalPagesData,
  itemsPerPageData,
} = handleGetListAppointments();
const currentPage = ref(1);

const fetchDataByPage = async (page) => {
  currentPage.value = page;
  await getData(page);
};

const updateAppointmentStatus = async (
  appointmentId,
  transaction_id,
  action
) => {
  if (!action) return; // Nếu không chọn hành động thì không làm gì

  // Hiển thị thông báo xác nhận
  const result = await Swal.fire({
    title: `Bạn chắc chắn muốn ${
      action === "CO-F"
        ? "xác nhận"
        : action === "CA"
        ? "hủy"
        : action === "C-IN"
        ? "xác nhận bệnh nhân đã đến khám"
        : action === "NO-S"
        ? "xác nhận bệnh nhân 'KHÔNG ĐẾN HẸN với'"
        : "Thực hiện hành động"
    } lịch hẹn này?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xác nhận",
    cancelButtonText: "Hủy",
  });

  if (result.isConfirmed) {
    try {
      // Gọi API để cập nhật trạng thái
      await axios.put(
        `http://localhost:3000/api/appointment/modifyStatus/${appointmentId}`,
        { status: action }
      );

      // Nếu hành động là "Đã đến" (C-IN), gọi thêm API thứ hai
      if (action === "C-IN") {
        const checkInResponse = await axios.put(
          `http://localhost:3000/api/statistics/revenue/update-status/${transaction_id}`,
          { newStatus: "C" } // Dữ liệu có thể thay đổi tùy theo API
        );

        // Kiểm tra kết quả của API thứ hai
        if (checkInResponse.status === 200) {
          Swal.fire(
            "Thành công!",
            "Lịch hẹn đã được xác nhận và bệnh nhân đã được ghi nhận đã thanh toán.",
            "success"
          );
        } else {
          throw new Error("Có lỗi khi xác nhận bệnh nhân đã đến.");
        }
      }
      if (action === "CA") {
        const checkInResponse = await axios.put(
          `http://localhost:3000/api/statistics/revenue/update-status/${transaction_id}`,
          { newStatus: "H" } // Dữ liệu có thể thay đổi tùy theo API
        );

        // Kiểm tra kết quả của API thứ hai
        if (checkInResponse.status === 200) {
          Swal.fire(
            "Thành công!",
            "Lịch hẹn đã được xác nhận hủy thành công",
            "success"
          );
        } else {
          throw new Error("Có lỗi khi xác nhận hủy lịch hẹn");
        }
      } else {
        Swal.fire(
          "Thành công!",
          `Lịch hẹn đã được ${action === "C-IN" ? "xác nhận" : "dời lịch"}.`,
          "success"
        );
      }

      // Cập nhật lại danh sách lịch hẹn sau khi thay đổi trạng thái
      fetchDataByPage(currentPage.value); // Tải lại dữ liệu từ server
    } catch (error) {
      Swal.fire(
        "Lỗi!",
        error.message || "Có lỗi xảy ra khi cập nhật trạng thái lịch hẹn.",
        "error"
      );
    }
  }
};

// handle search staff
const searchData = ref("");

const handleSearch = async () => {
  if (searchData.value) {
    const resultDataSearch = await searchDepartments(searchData.value);
    console.log(resultDataSearch);
    if (resultDataSearch) {
      listAppointmentsData.value = resultDataSearch.data;
    }
  }
};
onMounted(async () => {
  await fetchDataByPage(1);
});
</script>

<!------------------------------------------------------CSS SCOPED------------------------------------------>
<style scoped>
.wapper .d-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-search {
  background-color: #007bff;
  border-radius: 14px;
}

.d-flex div:nth-child(2) button {
  color: #ffffff;
  font-size: 25px;
  text-align: center;
  align-items: center;
  border: none;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.page-item {
  margin: 0 5px;
}

.wapper .d-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-search {
  background-color: #007bff;
  border-radius: 14px;
}

.d-flex div:nth-child(2) button {
  color: #ffffff;
  font-size: 25px;
  text-align: center;
  align-items: center;
  border: none;
}

button {
  cursor: pointer;
}
</style>
