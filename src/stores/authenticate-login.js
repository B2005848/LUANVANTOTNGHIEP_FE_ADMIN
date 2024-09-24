// stores/auth.js
import { defineStore } from "pinia";
import Cookies from "js-cookie";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    staffId: Cookies.get("staffId") || null,
    accessToken: Cookies.get("accessToken") || null, // Access Token
    refreshToken: Cookies.get("refreshToken") || null, // Refresh Token
    isLogged: Cookies.get("isLogged") || false, // state login
  }),

  actions: {
    //  store
    login(
      staff_id,
      accessToken,
      accessTokenExpiry,
      refreshToken,
      refreshTokenExpiry
    ) {
      this.staffId = staff_id;
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.isLogged = true;

      // conver timestamp from server to Date
      // Chuyển đổi timestamp sang Date
      const accessExpiryDate = new Date(accessTokenExpiry * 1000);
      const refreshExpiryDate = new Date(refreshTokenExpiry * 1000);

      // Lưu Access Token và Refresh Token vào cookies
      Cookies.set("accessToken", accessToken, {
        expires: accessExpiryDate,
        secure: true,
      }); // 7 ngày
      Cookies.set("refreshToken", refreshToken, {
        expires: refreshExpiryDate,
        secure: true,
      }); // 7 ngày
      Cookies.set("staffId", staff_id, { expires: accessExpiryDate });
      Cookies.set("isLogged", this.isLogged, {
        expires: accessExpiryDate,
        secure: true,
      });
    },

    // Đăng xuất và xóa thông tin
    logout() {
      this.staffId = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.isLogged = false;
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("staffId");
      Cookies.remove("isLogged");
    },

    // Kiểm tra trạng thái xác thực từ cookies
    checkAuthentication() {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if (accessToken && refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    },
  },
});
