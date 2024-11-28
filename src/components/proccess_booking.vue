<template>
  <div>
    <ul class="ul__list d-flex">
      <li @click="setStep(1)" :class="{ active: currentStep === 1 }">
        Tạo hồ sơ
      </li>
      <li v-if="currentStep > 1">&gt;</li>
      <li @click="setStep(2)" :class="{ active: currentStep === 2 }">
        Chọn dịch vụ khám
      </li>
      <li v-if="currentStep > 2">&gt;</li>
      <li @click="setStep(3)" :class="{ active: currentStep === 3 }">
        Thanh toán
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useProccess } from "@/stores/proccess_booking.store";

const store = useProccess();
const currentStep = store.currentStep;

const setStep = (newStep) => {
  store.setStep(newStep);
};
</script>

<style scoped>
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
