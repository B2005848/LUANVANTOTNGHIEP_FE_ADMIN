<template>
  <div>
    <Theproccessbooking></Theproccessbooking>
    <div class="main mt-5 fade-in">
      <div class="title text-center">
        <h3>ĐĂNG KÍ KHÁM BỆNH</h3>

        <p style="color: #6b6b6b; margin-top: 15px">
          Bạn đã từng khám tại phòng khám Shine On You chưa?
        </p>

        <div class="option__booking row">
          <div class="option__1 col-6">
            <router-link :to="{ name: 'home.page.booking.old' }">
              <button
                :style="corlorButtonCursor1"
                @click="buttonCorsor1"
                type="button"
              >
                ĐÃ TỪNG KHÁM
              </button></router-link
            >
            <p>(Nhập mã bệnh nhân)</p>
          </div>

          <div class="option__2 col-6">
            <router-link :to="{ name: 'home.page.booking.new' }">
              <button
                @click="buttonCorsor2"
                :style="corlorButtonCursor2"
                type="button"
              >
                CHƯA TỪNG KHÁM
              </button></router-link
            >
            <p>(Tạo hồ sơ mới)</p>
          </div>
        </div>
        <p class="note">
          Lưu ý thông tin phải chính xác khi điền vào, những trường bắt buộc
          không được bỏ trống (<span style="color: red; font-size: 15px">*</span
          >)
        </p>
      </div>
      <hr class="mt-5" />
      <router-view class="fade-in"></router-view>
    </div>
  </div>
</template>

<script setup>
import Theproccessbooking from "@/components/proccess_booking.vue";
import { useProccess } from "@/stores/proccess_booking.store";
import {
  corlorButtonCursor1,
  corlorButtonCursor2,
  buttonCorsor1,
  buttonCorsor2,
} from "@/assets/js/pages/booking_page.js";
const useProccessStore = useProccess();
useProccessStore.setStep(1);
</script>
<style scoped>
@import "@/assets/css/pages/booking_new.css";
@import "@/assets/css/pages/booking_page.css";

@import "@/assets/css/animation__page.css";
</style>
