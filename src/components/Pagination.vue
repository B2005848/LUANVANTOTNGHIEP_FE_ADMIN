<template>
  <div class="pagination">
    <paginate
      :page-count="pageCount"
      :click-handler="onPageChange"
      :prev-text="'Trước'"
      :next-text="'Sau'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
    />
  </div>
</template>

<script setup>
import Paginate from "vuejs-paginate-next"; // Import paginate

// Props từ component cha
const props = defineProps({
  pageCount: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

// Sự kiện phát ra khi thay đổi trang
const emit = defineEmits(["page-change"]);

// Hàm xử lý khi người dùng chọn trang mới
const onPageChange = (page) => {
  emit("page-change", page); // Phát ra sự kiện và gửi trang mới về component cha
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.page-item {
  margin: 0 5px;
}

.page-link {
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  cursor: pointer;
}

.page-link:hover {
  background-color: #007bff;
  color: white;
}
</style>
