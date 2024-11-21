<template>
  <div class="p-3 card tw-p-6 tw-bg-white tw-shadow-md tw-rounded-lg">
    <div class="title">
      <h3 class="">DANH SÁCH LỊCH HẸN</h3>
    </div>
    <div>
      <!-- Tổng số doanh thu cho 2 loại dịch vụ đặt lịch và đơn thuốc bệnh nhân -->
      <RevenueTotal></RevenueTotal>
    </div>
  </div>
</template>

<script setup>
import RevenueTotal from "@/components/RevenueTotal.vue";
</script>

<style scoped></style>
