<template>
  <div class="container mt-5">
    <div class="row">
      <div class="text-center">
        <h4>VUI LÒNG NHẬP MÃ SỐ BỆNH NHÂN</h4>

        <input
          v-model="patient_id"
          type="text"
          class="form-control mb-3"
          placeholder="Nhập số điện thoại hoặc email mà bệnh nhân đã đăng kí"
        />
        <button
          @click="handlePreBooking"
          style="background-color: #307be7; color: aliceblue; font-weight: bold"
          class="form-control"
        >
          XÁC NHẬN
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const patient_id = ref(null);

const checkExistingAccount = async () => {};

const handlePreBooking = async () => {
  router.push({
    name: "admin.select.department",
    params: { patient_id: patient_id.value },
  });
};
</script>
