import moment from "moment-timezone";

// Hàm format ngày từ UTC sang múi giờ Việt Nam (Asia/Ho_Chi_Minh)
export function formatDate(datatime) {
  return moment.utc(datatime).format("DD/MM/YYYY - HH:mm:ss");
}
