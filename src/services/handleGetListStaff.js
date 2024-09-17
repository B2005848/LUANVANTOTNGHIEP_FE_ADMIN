import { ref } from "vue";

export const handleGetData = () => {
  const errorMessage = ref("");
  const staffListData = ref([]);
  const totalPagesData = ref(0);
  const handleGetListStaff = async (page = 1) => {
    try {
      const response = await window.axios.get(
        `http://localhost:3000/api/handle/staff/getListAccount/?page=${page}`
      );
      if (response.status === 200) {
        const { totalPages, staffList } = response.data;
        totalPagesData.value = totalPages;
        staffListData.value = staffList;
        console.log("Get list staff success", totalPages, staffList);
      }
    } catch (error) {
      errorMessage.value =
        error.response?.data?.message || "Get list staff FAILS";
      console.log(error.response.data.message);
    }
  };

  return {
    handleGetListStaff,
    errorMessage,
    totalPagesData,
    staffListData,
  };
};
