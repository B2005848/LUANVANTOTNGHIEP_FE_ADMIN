<template>
  <div
    class="tw-container tw-mx-auto tw-p-6 tw-bg-white tw-shadow-md tw-rounded-lg"
  >
    <h2 class="tw-text-2xl tw-font-bold tw-mb-6">Thống kê doanh thu</h2>

    <!-- Form lọc theo ngày, tháng, năm -->
    <div class="tw-flex tw-gap-4 tw-mb-6">
      <input
        v-model="filters.year"
        type="number"
        placeholder="Năm"
        class="tw-border tw-border-gray-300 tw-p-2 tw-rounded tw-w-32 tw-text-black"
      />
      <input
        v-model="filters.month"
        type="number"
        placeholder="Tháng"
        class="tw-border tw-border-gray-300 tw-p-2 tw-rounded tw-w-32 tw-text-black"
      />
      <input
        v-model="filters.day"
        type="number"
        placeholder="Ngày"
        class="tw-border tw-border-gray-300 tw-p-2 tw-rounded tw-w-32 tw-text-black"
      />
      <button
        @click="fetchRevenueStatistics"
        class="tw-bg-blue-500 tw-text-white tw-py-2 tw-px-4 tw-rounded hover:tw-bg-blue-700"
      >
        Lọc
      </button>
    </div>

    <!-- Biểu đồ doanh thu -->
    <div v-if="chartData">
      <canvas id="revenueChart" class="tw-mb-6"></canvas>
    </div>

    <!-- Hiển thị thông báo nếu không có dữ liệu -->
    <div v-else class="tw-text-center tw-text-gray-500">
      Không có dữ liệu để hiển thị.
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Chart } from "chart.js";
import axios from "axios";

export default {
  name: "RevenueStatistics",
  setup() {
    const filters = ref({
      year: 2024,
      month: 11,
      day: 12,
    });

    const chart = ref(null);
    const chartData = ref(null);

    const fetchRevenueStatistics = async () => {
      try {
        const { year, month, day } = filters.value;

        // Gửi yêu cầu đến API
        const response = await axios.get(
          `http://localhost:3000/api/statistics/revenue`,
          {
            params: { year, month, day },
          }
        );

        const data = response.data.data;

        if (data.length > 0) {
          // Cập nhật dữ liệu biểu đồ
          updateChart(data);
        } else {
          chartData.value = null;
          if (chart.value) {
            chart.value.destroy();
          }
        }
      } catch (error) {
        console.error("Error fetching revenue statistics:", error);
      }
    };

    const updateChart = (data) => {
      const labels = data.map(
        (item) =>
          `${item.transaction_day}-${item.transaction_month}-${item.transaction_year}`
      );

      const appointmentRevenue = data.map((item) => item.revenue_appointment);
      const prescriptionRevenue = data.map((item) => item.revenue_prescription);

      if (chart.value) {
        chart.value.destroy();
      }

      // Tạo dữ liệu biểu đồ
      chartData.value = {
        labels,
        datasets: [
          {
            label: "Doanh thu dịch vụ đặt lịch",
            data: appointmentRevenue,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Doanh thu đơn thuốc",
            data: prescriptionRevenue,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      };

      // Tạo biểu đồ
      const ctx = document.getElementById("revenueChart").getContext("2d");
      chart.value = new Chart(ctx, {
        type: "bar",
        data: chartData.value,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Thống kê doanh thu",
            },
          },
        },
      });
    };

    onMounted(() => {
      fetchRevenueStatistics();
    });

    return {
      filters,
      fetchRevenueStatistics,
    };
  },
};
</script>

<style scoped>
.tw-container {
  max-width: 800px;
}
</style>
