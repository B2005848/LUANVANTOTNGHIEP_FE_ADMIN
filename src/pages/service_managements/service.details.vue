<template>
  <div v-if="serviceDetail">
    <!-- Chi tiết dịch vụ -->
    <div class="container-fluid mt-3">
      <div class="wrapper card p-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h3>Chi Tiết Dịch Vụ</h3>
          <router-link
            :to="{ name: 'admin.services' }"
            class="btn btn-secondary"
            >Quay lại danh sách</router-link
          >
        </div>

        <!-- Thông tin dịch vụ -->
        <div class="row mb-4" v-if="serviceDetail">
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Tên dịch vụ:</h5>
            <p class="text-primary">{{ serviceDetail.service_name }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Mã dịch vụ:</h5>
            <p>{{ serviceDetail.service_id }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Giá:</h5>
            <p>{{ formatCurrency(serviceDetail.service_fee) }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Thời gian thực hiện:</h5>
            <p>{{ serviceDetail.duration }} phút</p>
          </div>
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Trạng thái:</h5>
            <p>
              <span v-if="serviceDetail.is_active" class="text-success">
                Đang hoạt động
              </span>
              <span v-else class="text-danger">Ngừng cung cấp</span>
            </p>
          </div>
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Phòng:</h5>
            <p>{{ serviceDetail.department_name }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Chuyên khoa:</h5>
            <p>{{ serviceDetail.specialty_name }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Ngày tạo:</h5>
            <p>{{ formatDateTime(serviceDetail.created_at) }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <h5 class="text-muted">Ngày chỉnh sửa:</h5>
            <p>{{ formatDateTime(serviceDetail.updated_at) }}</p>
          </div>
        </div>

        <!-- Mô tả dịch vụ -->
        <div class="mb-4">
          <h5 class="text-muted">Mô tả:</h5>
          <p>{{ serviceDetail.description }}</p>
        </div>

        <!-- Quản lý nút hành động -->
        <div class="d-flex justify-content-end">
          <button @click="handleEdit" class="btn btn-primary me-2">
            Chỉnh sửa
          </button>
          <button @click="handleDelete" class="btn btn-danger">
            Xóa dịch vụ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import formatDate from "@/helper/format-datetime";
import { formatCurrency } from "@/helper/currencyFormatter";

const formatDateTime = formatDate.formatDateTime;
const router = useRouter();
const route = useRoute();
const serviceDetail = ref(null);

const fetchServiceDetail = async () => {
  try {
    const serviceId = route.params.id;
    const response = await axios.get(
      `http://localhost:3000/api/services/getdetail/${serviceId}`
    );
    serviceDetail.value = response.data.dataInfo;
  } catch (error) {
    console.error(error);
    Swal.fire("Lỗi", "Không thể tải dữ liệu dịch vụ.", "error");
  }
};

const handleEdit = () => {
  router.push({
    name: "admin.editService",
    params: { id: serviceDetail.value.service_id },
  });
};

const handleDelete = async () => {
  const result = await Swal.fire({
    title: "Xác nhận xóa",
    text: "Bạn có chắc chắn muốn xóa dịch vụ này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(
        `http://localhost:3000/api/services/${serviceDetail.value.service_id}`
      );
      Swal.fire("Thành công", "Dịch vụ đã được xóa.", "success");
      router.push({ name: "admin.services" });
    } catch (error) {
      console.error(error);
      Swal.fire("Lỗi", "Không thể xóa dịch vụ.", "error");
    }
  }
};

onMounted(() => {
  fetchServiceDetail();
});
</script>

<style scoped>
.text-primary {
  font-weight: bold;
  color: #007bff;
}
.text-muted {
  color: #6c757d;
}
.text-justify {
  text-align: justify;
}
</style>
