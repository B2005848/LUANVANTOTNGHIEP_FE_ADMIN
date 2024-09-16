<!-- TRANG THỐNG KÊ DOANH THU -->
<template>
  <div class="mt-2">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Thống kê doanh thu</h3>
          </div>
          <!-- /.card-header -->
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="from">Từ ngày</label>
                  <input
                    type="date"
                    class="form-control"
                    id="from"
                    placeholder="Từ ngày"
                  />
                </div>
                <div class="form-group">
                  <label for="to">Đến ngày</label>
                  <input
                    type="date"
                    class="form-control"
                    id="to"
                    placeholder="Đến ngày"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ------------------------MORE------------- -->
  <div class="dashboard">
    <!-- Sales Overview -->
    <section class="section sales-overview">
      <h2>Sales Overview</h2>
      <div class="chart-container">
        <!-- Placeholder for sales chart -->
        <canvas id="revenueChart"></canvas>
      </div>
    </section>

    <!-- Latest Orders -->
    <section class="section latest-orders">
      <h2>Latest Orders</h2>
      <div class="order-list">
        <div
          class="order-item"
          v-for="(order, index) in latestOrders"
          :key="index"
        >
          <span class="order-info">{{ order.customerName }}</span>
          <span class="order-info">{{ order.productName }}</span>
          <span class="order-info">{{ formatDate(order.orderDate) }}</span>
        </div>
      </div>
    </section>

    <!-- Product Inventory -->
    <section class="section product-inventory">
      <h2>Product Inventory</h2>
      <div class="inventory-list">
        <div
          class="inventory-item"
          v-for="(product, index) in productInventory"
          :key="index"
        >
          <span class="product-info">{{ product.name }}</span>
          <span class="product-info">Stock: {{ product.quantity }}</span>
          <span class="product-info"
            >Rating: {{ product.rating }}/5 ({{
              product.reviews
            }}
            reviews)</span
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const latestOrders = ref([
  { customerName: "John Doe", productName: "Sofa", orderDate: "2024-04-20" },
  { customerName: "Jane Smith", productName: "Bed", orderDate: "2024-04-19" },
  {
    customerName: "David Brown",
    productName: "Table",
    orderDate: "2024-04-18",
  },
]);

const productInventory = ref([
  { name: "Sofa", quantity: 20, rating: 4.5, reviews: 15 },
  { name: "Bed", quantity: 15, rating: 4.0, reviews: 10 },
  { name: "Table", quantity: 25, rating: 4.2, reviews: 20 },
]);

const chartData = ref({
  labels: [
    "Tháng",
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
  ],
  datasets: [
    {
      label: "Revenue",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
      data: [1000, 1500, 2000, 1800, 2200, 2500, 2300],
    },
  ],
});

// eslint-disable-next-line no-unused-vars
let chartInstance;

onMounted(() => {
  const ctx = document.getElementById("revenueChart").getContext("2d");
  chartInstance = new Chart(ctx, {
    type: "line",
    data: chartData.value,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

// Function to format date in a readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
</script>
<style scoped>
.dashboard {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-top: 30px;
}

.chart-container {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
}

.order-list,
.inventory-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.order-item,
.inventory-item {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

canvas {
  max-width: 600px;
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.order-info,
.product-info {
  display: block;
  margin-bottom: 5px;
}
</style>
