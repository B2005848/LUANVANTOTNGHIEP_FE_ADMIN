// stores/auth.js
import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    patientId: Cookies.get("patientId") || null,
    accessToken: Cookies.get("accessToken") || null, // Access Token
    refreshToken: Cookies.get("refreshToken") || null, // Refresh Token
    isLogged: Cookies.get("isLogged") || false, // state login
  }),

  actions: {
    //  store
    login(patient_id, accessToken, refreshToken) {
      this.patientId = patient_id;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.isLogged = true;

      // Lưu Access Token và Refresh Token vào cookies
      Cookies.set("accessToken", accessToken, { expires: 7, secure: true }); // 7 ngày
      Cookies.set("refreshToken", refreshToken, { expires: 7, secure: true }); // 7 ngày
      Cookies.set("patientId", patient_id, { expires: 7 });
      Cookies.set("isLogged", this.isLogged, { expires: 7, secure: true });
    },

    // Đăng xuất và xóa thông tin
    logout() {
      this.patientId = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("patientId");
      Cookies.remove("isLogged");
    },

    // Kiểm tra trạng thái xác thực từ cookies
    checkAuthentication() {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if (accessToken && refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    },
  },
});
