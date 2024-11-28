<template>
  <div>
    <ul class="ul__list d-flex">
      <li @click="setStep(1)" :class="{ active: currentStep === 1 }">
        Tạo hồ sơ
      </li>
      <li v-if="currentStep > 1">&gt;</li>
      <li @click="setStep(2)" :class="{ active: currentStep === 2 }">
        Chọn phòng khám
      </li>
      <li v-if="currentStep > 2">&gt;</li>
      <li @click="setStep(3)" :class="{ active: currentStep === 3 }">
        Chọn dịch vụ
      </li>
      <li v-if="currentStep > 3">&gt;</li>
      <li @click="setStep(4)" :class="{ active: currentStep === 4 }">
        Chọn bác sĩ
      </li>
      <li v-if="currentStep > 4">&gt;</li>

      <li @click="setStep(5)" :class="{ active: currentStep === 5 }">
        Chọn ngày khám
      </li>
      <li v-if="currentStep > 5">&gt;</li>

      <li @click="setStep(6)" :class="{ active: currentStep === 6 }">
        Thanh toán
      </li>
      <li v-if="currentStep > 6">&gt;</li>

      <li @click="setStep(7)" :class="{ active: currentStep === 7 }">
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
