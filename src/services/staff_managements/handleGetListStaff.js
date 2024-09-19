import { ref } from "vue";

const errorMessage = ref("");
const staffListData = ref([]);
const totalPagesData = ref(0);
const itemsPerPageData = ref(10);
const handleGetListStaff = async (page = 1) => {
  try {
    const response = await window.axios.get(
      `http://localhost:3000/api/handle/staff/getListAccount/?page=${page}`
    );
    if (response.status === 200) {
      const { totalPages, staffList, itemsPerPage } = response.data;
      totalPagesData.value = totalPages;
      staffListData.value = staffList;
      itemsPerPageData.value = itemsPerPage;
      console.log("Get list staff success", totalPages, staffList);
    }
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Get list staff FAILS";
    console.log(error.response.data.message);
  }
};

export {
  handleGetListStaff,
  errorMessage,
  totalPagesData,
  staffListData,
  itemsPerPageData,
};
