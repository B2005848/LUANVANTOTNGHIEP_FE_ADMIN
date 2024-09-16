<style scoped>
.avt {
  border-radius: 50%;
}
</style>
<template>
  <div class="container-fuild mt-3">
    <div v-if="data" class="card">
      <div class="d-flex m-2" style="justify-content: end"></div>
      <div style="justify-content: space-around" class="d-flex">
        <div class="flex-1 mt-3">
          <img
            v-if="data.image_url"
            class="avt"
            :src="data.image_url"
            alt=""
            width="200"
          />
          <p v-if="!data.image_url">
            <img
              src="https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
              alt=""
              width="200"
            />
          </p>
          <div class="text-center mt-3">
            <p>{{ data.name }}</p>
            <p>Mã bệnh nhân: {{ data.username }}</p>
            <p v-if="data.citizenID">CCCD/CMND: {{ data.citizenID }}</p>
            <p v-if="!data.citizenID">CCCD/CMND: Chưa cập nhật</p>
            <a href="">Lịch sử khám bệnh</a>
          </div>
        </div>
        <div class="flex-1 pt-3">
          <h3 class="text-center mb-5">Thông tin cá nhân</h3>
          <div class="d-flex">
            <div class="flex-1 me-5">
              <p style="font-weight: bold">Email:</p>
              <p style="font-weight: bold">Số điện thoại:</p>
              <p style="font-weight: bold">Địa chỉ:</p>
              <p style="font-weight: bold">Ngày sinh:</p>
              <p style="font-weight: bold">Giới tính:</p>
              <p style="font-weight: bold">Trạng thái tài khoản:</p>
              <p style="font-weight: bold">Ngày tạo:</p>
              <p style="font-weight: bold">Ngày cập nhật:</p>
            </div>
            <div class="flex-1">
              <p v-if="data.email">{{ data.email }}</p>
              <p v-if="!data.email">Chưa cập nhật!</p>

              <p v-if="data.phone_number">{{ data.phone_number }}</p>
              <p v-if="!data.phone_number">Chưa cập nhật!</p>

              <p v-if="data.contact_addrees">{{ data.contact_addrees }}</p>
              <p v-if="!data.contact_addrees">Chưa cập nhật!</p>

              <p v-if="data.birth_year">
                {{ formatDatetime(data.birth_year) }}
              </p>
              <p v-if="!data.birth_year">Chưa cập nhật</p>

              <p v-if="data.gender == 1">Nam</p>
              <p v-if="data.gender == 2">Nữ</p>
              <p v-if="!data.gender">Chưa cập nhật!</p>

              <p v-if="data.statusAccount == 1" class="text-success">
                Đang hoạt động
                <font-awesome-icon
                  icon="fa-circle-check"
                  beat
                  style="
                    --fa-primary-color: #0fffb7;
                    --fa-secondary-color: #2ff9bc;
                  "
                />
              </p>
              <p v-if="data.statusAccount == 2" class="text-warning">
                Tạm khóa
                <font-awesome-icon
                  icon=" fa-user-lock"
                  style="
                    --fa-primary-color: #4b511f;
                    --fa-secondary-color: #c1dd31;
                  "
                />
              </p>
              <p v-if="data.statusAccount == 3" class="text-danger">
                Ngừng hoạt động
                <font-awesome-icon
                  icon=" fa-ban"
                  style="
                    --fa-primary-color: #dd2c2c;
                    --fa-secondary-color: #dd2c2c;
                  "
                />
              </p>

              <!-- date created -->
              <p>03/07/2024</p>

              <!-- date updated -->
              <p>03/07/2024</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <!-- ----------------------PAYMENT HISTORY------------------------------ -->
      <div class="row mt-5">
        <div class="col-md-12">
          <h3 class="text-center mb-5">Lịch sử mua hàng</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import moment from "moment";
const formatDatetime = (datetime) => {
  return moment(datetime).format("DD/MM/YYYY");
};
const route = useRoute();
const username = route.params.username;

const data = ref(null);
const getData = async () => {
  const res = await window.axios.get(
    "http://localhost:3000/api/handle/patient/getinfo/" + username
  );
  data.value = res.data.dataInfo;
  console.log(data.value);
};

onMounted(() => {
  getData();
});
</script>
