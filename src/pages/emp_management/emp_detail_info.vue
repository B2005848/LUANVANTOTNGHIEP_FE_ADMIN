<template>
  <div class="card container-fuild p-3">
    <div class="mb-5">
      <!-- control -->
      <div class="me-3">
        <h3 class="tw-text-xl tw-font-medium tw-dark:text-white">
          <router-link :to="{ name: 'admin.emp' }">
            <font-awesome-icon
              class="me-3"
              icon=" fa-arrow-left"
              style="color: #a3aec2"
              size="xl"
          /></router-link>
          Thông tin nhân viên
        </h3>
      </div>
      <!-------------------------------------------------------------------------------------- THÔNG TIN CHUNG -->
      <div class="container-infor-detail mt-5 card p-5">
        <h4 class="text-center">
          THÔNG TIN CHUNG
          <router-link :to="{ name: 'admin.emp' }">
            <font-awesome-icon
              class="ms-3"
              icon="fa-regular fa-pen-to-square"
              size="sm"
              style="color: #74c0fc"
          /></router-link>
        </h4>

        <div class="avatar row">
          <!-- title-col -->
          <div class="col-md-2">
            <p class="tw-dark:text-white tw-ms-5">Ảnh chân dung</p>
          </div>

          <div class="col-md-4">
            <div>
              <figure class="tw-max-w-lg">
                <!-- -------------------SRC IMG STAFF-------------------------------- -->
                <img
                  class="tw-h-auto tw-max-w-full tw-rounded-lg"
                  src="https://scontent.fvca1-1.fna.fbcdn.net/v/t39.30808-1/276272639_696360524952560_7771497957306498064_n.jpg?stp=dst-jpg_s200x200&_nc_cat=106&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=6b-6zBL6DD0Q7kNvgHwNlSu&_nc_ht=scontent.fvca1-1.fna&_nc_gid=ALnaq4Rh2HUpQ4zZKed6gHy&oh=00_AYAhvs3s9ke4lKKZ042AGOSYQH6hPedwbMJviSCAoOrGzA&oe=66F0E565"
                  alt="image description"
                />
              </figure>
            </div>
          </div>
        </div>

        <div class="info-detail row mt-2">
          <!-- col-1 -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5">Mã nhân viên</p>
              <p class="tw-dark:text-white tw-ms-5">Họ và tên</p>
              <p class="tw-dark:text-white tw-ms-5">Ngày sinh</p>
              <p class="tw-dark:text-white tw-ms-5">Số CCCD/CMND</p>
              <p class="tw-dark:text-white tw-ms-5">Giới tính</p>
              <p class="tw-dark:text-white tw-ms-5">Địa chỉ liên hệ</p>
            </div>
            <div class="col-md-8">
              <!-- Staff id  -->
              <p class="value tw-text-black-500 tw-font-semibold">B2005848</p>

              <!-- Name -->
              <p class="value tw-text-black-500 tw-font-semibold">
                Lê Thanh Nam
              </p>

              <!-- Birthday -->
              <p class="value tw-text-black-500 tw-font-semibold">18-12-2002</p>

              <!-- Citizen ID -->
              <p class="value tw-text-black-500 tw-font-semibold">
                0912020556664
              </p>

              <!-- Gender -->
              <p class="value tw-text-black-500 tw-font-semibold">Nam</p>

              <!-- Contact address -->
              <p class="value tw-text-black-500 tw-font-semibold">
                ấp Cống Cả, xã Vĩnh Điều, huyện Giang Thành, tỉnh Kiên Giang
              </p>
            </div>
          </div>
          <!-- col-2 -->
          <div class="row col-md-6">
            <div class="col-md-4">
              <p class="tw-dark:text-white tw-ms-5">Quyền truy cập</p>
              <p class="tw-dark:text-white tw-ms-5">Số điện thoại</p>
              <p class="tw-dark:text-white tw-ms-5">Dân tộc</p>

              <p class="tw-dark:text-white tw-ms-5">Tôn giáo</p>
              <p class="tw-dark:text-white tw-ms-5">Quốc tịch</p>
            </div>
            <div class="col-md-8">
              <!-- Role id -->
              <p class="value tw-text-black-500 tw-font-semibold">
                Người quản trị
              </p>

              <!-- number-phone -->
              <p class="value tw-text-black-500 tw-font-semibold">
                09812321545
              </p>

              <!-- Nation -->
              <p class="value tw-text-black-500 tw-font-semibold">Kinh</p>

              <!-- Religion -->
              <p class="value tw-text-black-500 tw-font-semibold">Phật</p>

              <!-- Nationality -->
              <p class="value tw-text-black-500 tw-font-semibold">Việt Nam</p>
            </div>
          </div>
        </div>
      </div>
      <!-------------------------------------------------------------------------------------------------- THÔNG TIN CÔNG VIỆC-->
      <div class="container-infor-detail mt-3 card p-5">
        <h4 class="text-center">
          THÔNG TIN CÔNG VIỆC
          <router-link :to="{ name: 'admin.emp' }">
            <font-awesome-icon
              class="ms-3"
              icon="fa-regular fa-pen-to-square"
              size="sm"
              style="color: #74c0fc"
          /></router-link>
        </h4>
      </div>
    </div>
    <!-- END CODE DIV CONTAINER -->
  </div>
</template>

<style scoped>
.value {
  border-bottom: 1px solid rgb(199, 199, 199);
}
</style>
