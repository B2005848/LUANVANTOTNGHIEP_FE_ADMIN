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
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const patient_id = ref(null);

const handlePreBooking = async () => {
  if (!patient_id.value || patient_id.value.trim() === "") {
    Swal.fire("LƯU Ý", "Vui lòng nhập mã bệnh nhân", "warning");
    return;
  }

  try {
    const result = await axios.post(
      "http://localhost:3000/api/patient/account/check-account-existing",
      { patient_id: patient_id.value }
    );

    if (result.status === 200) {
      Swal.fire("THÔNG BÁO", "Mã bệnh nhân hợp lệ", "success");
      router.push({
        name: "admin.select.department",
        params: { patient_id: patient_id.value },
      });
    }
  } catch (error) {
    console.error("Error checking patient account:", error);

    Swal.fire("LƯU Ý", "Mã bệnh nhân không tồn tại", "warning");
  }
};
</script>
