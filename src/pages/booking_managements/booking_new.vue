<template>
  <div class="container mt-5">
    <form @submit.prevent="updateValues()" action="" method="get">
      <div class="mb-5">
        <h3 class="text-center mb-5">NHẬP THÔNG TIN BỆNH NHÂN</h3>
        <div class="row">
          <!-- column-1 -->
          <div class="col-md-6">
            <div class="row">
              <!-- FIRST NAME -->
              <div class="col">
                <label class="mb-2" for="sub-name"
                  >Họ và tên lót <i>(Có dấu)</i>
                  <sup class="note__star">*</sup></label
                >
                <input
                  v-model="sub_name"
                  type="text"
                  id="sub-name"
                  class="form-control"
                  placeholder="Vui lòng nhập họ và tên lót"
                />
              </div>

              <!-- LAST NAME -->
              <div class="col">
                <label class="mb-2" for="first-name"
                  >Tên<i> (Có dấu)</i> <sup class="note__star">*</sup></label
                >
                <input
                  v-model="first_name"
                  type="text"
                  id="first-name"
                  class="form-control"
                  placeholder="Vui lòng nhập tên"
                />
              </div>
            </div>

            <!-- BIRTH DAY -->
            <div class="row mt-4">
              <label for="birthday" class="mb-2"
                >Ngày / tháng / năm sinh <sup class="note__star">*</sup></label
              >
              <div class="col">
                <select v-model="selectedDay" class="form-control" id="day">
                  <option v-for="n in 31" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>
              <div class="col">
                <select v-model="selectedMonth" class="form-control" id="month">
                  <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
                </select>
              </div>
              <div class="col">
                <select v-model="selectedYear" class="form-control" id="year">
                  <option v-for="y in getYearRange()" :key="y" :value="y">
                    {{ y }}
                  </option>
                </select>
              </div>
            </div>

            <!-- GENDER -->
            <div class="mt-5">
              <label class="mb-2" for="gender"
                >Giới tính <sup class="note__star">*</sup></label
              >
              <br />
              <input
                v-model="selectedGender"
                checked
                class="me-1"
                type="radio"
                name="gender"
                id="male"
                value="male"
              />
              <label class="me-5" for="male">Nam</label>
              <input
                v-model="selectedGender"
                class="me-1"
                type="radio"
                name="gender"
                id="female"
                value="female"
              />
              <label for="female">Nữ</label>
            </div>

            <!-- DANTOC -->
            <div class="mt-4">
              <label for="dtoc">Dân tộc <sup class="note__star">*</sup></label>
              <select
                v-model="selectedDtoc"
                class="form-control"
                name="dtoc"
                id="dt"
              >
                <option v-for="dt in dtRange" :key="dt" :value="dt.ten">
                  {{ dt.ten }}
                </option>
              </select>
            </div>
            <!-- MAJOR -->
            <div class="mt-4">
              <label class="mb-2" for="major"
                >Nghề nghiệp <sup class="note__star">*</sup></label
              >
              <select
                v-model="selectedMajor"
                class="form-control"
                name="major"
                id="job"
              >
                <option v-for="mj in getMjRange" :key="mj" :value="mj">
                  {{ mj }}
                </option>
              </select>
            </div>

            <div class="mt-4">
              <label class="mb-2" for="email"
                >Email <i>(Email để nhận phiếu khám bệnh)</i></label
              >
              <input
                v-model="email"
                type="text"
                class="form-control"
                placeholder="Nhập email của bạn"
              />
            </div>
          </div>

          <!-- <----------------------------------COL-2--------------------------------------------->
          <!-- column-2 -->
          <div class="col-md-6">
            <!-- NUMBER PHONE -->
            <div>
              <label class="mb-2" for="phone"
                >Số điện thoại <sup class="note__star">*</sup></label
              >

              <input
                v-model="number_phone"
                type="text"
                name="phone"
                id=""
                class="form-control"
                placeholder="Vui lòng nhập số điện thoại liên lạc"
              />
            </div>

            <!-- CITIZEN ID -->
            <div class="mt-4">
              <label class="mb-2" for="citizen_id"
                >Số CCCD/CMND <sup class="note__star">*</sup></label
              >
              <input
                name="citizen_id"
                v-model="citizen_id"
                type="text"
                class="form-control"
                placeholder="Nhập số căn cước công dân hoắc CMND"
              />
            </div>

            <!-- TINH -->
            <div class="mt-4">
              <label class="mb-2" for="tinh"
                >Thành Phố/Tỉnh <sup class="note__star">*</sup></label
              >
              <select
                class="form-control"
                name="tinh"
                id="tinh"
                v-model="selectedProvince"
                @change="handleChangeProvince"
              >
                <option
                  v-for="t in provinces"
                  :key="t.province"
                  :value="t.province"
                >
                  {{ t.province }}
                </option>
              </select>
            </div>

            <!-- DISTRICTS -->
            <div class="mt-4">
              <label class="mb-2" for="district"
                >Quận/Huyện <sup class="note__star">*</sup></label
              >
              <select
                class="form-control"
                name="district"
                id="district"
                v-model="selectedDistrict"
              >
                <option v-for="(d, index) in districts" :key="index" :value="d">
                  {{ d }}
                </option>
              </select>
            </div>

            <div class="mt-4">
              <label class="mb-2" for="commune"
                >Phường/Xã <sup class="note__star">*</sup></label
              >
              <input
                v-model="commune"
                type="text"
                class="form-control"
                placeholder="Vui lòng nhập tên phường hoặc xã"
              />
            </div>

            <div class="mt-4">
              <label class="mb-2" for="commune"
                >Địa chỉ liên lạc cụ thể <sup class="note__star">*</sup></label
              >
              <textarea
                v-model="address"
                type="text"
                class="form-control"
                placeholder="Vui lòng nhập thông tin địa chỉ liên lạc"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="col-mt-5">
        <h3 class="text-center">NHẬP THÔNG TIN NHÂN THÂN</h3>
        <p class="text-center mb-5"><i>(Không bắt buộc)</i></p>
        <div class="row">
          <!-- col-1 -->
          <div class="col-md-6">
            <div class="mb-4">
              <label class="mb-2" for="name_mate">Họ và tên người thân</label>
              <input
                v-model="name_mate"
                class="form-control"
                type="text"
                name="name_mate"
                placeholder="Vui lòng nhập họ tên người thân"
              />
            </div>

            <div class="mb-4">
              <label class="mb-2" for="number_mate"
                >Số điện thoại người thân</label
              >
              <input
                v-model="phone_mate"
                class="form-control"
                type="text"
                name="phone_mate"
                placeholder="Vui lòng nhập số điện thoại người thân"
              />
            </div>
          </div>

          <!-- col-2 -->
          <div class="col-md-6">
            <div class="mb-4">
              <label class="mb-2" for="email_mate">Email người thân</label>
              <input
                v-model="email_mate"
                class="form-control"
                type="email"
                name="email_mate"
                placeholder="Vui lòng nhập email người thân"
              />
            </div>

            <div class="mb-4">
              <label class="mb-2" for="relation_mate">Chọn mối quan hệ</label>
              <select
                v-model="selectedRelate"
                class="form-control"
                name="relation_mate"
              >
                <option value="">Chọn mối quan hệ</option>
                <option value="Bố">Bố</option>
                <option value="Mẹ">Mẹ</option>
                <option value="Anh">Anh</option>
                <option value="Chị">Chị</option>
                <option value="Em">Em trai/ em gái</option>
                <option value="Ông">Ông</option>
                <option value="Bà">Bà</option>
                <option value="Cô/Dì/Chú/Thím">Cô/Dì/Chú/Thím</option>
                <option value="Khác">Khác...</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4 mt-5 text-center">
        <router-link
          :to="{ name: 'home.page.booking.select_service_booking' }"
        ></router-link>
        <button type="submit" class="btn__submit">TIẾP THEO</button>
      </div>
    </form>
  </div>
</template>

<!-- MT-4 MB-2 -->
<script setup>
import { ref, onMounted } from "vue";
const currentYear = new Date().getFullYear();
// range job
const getMjRange = [
  "Lập trình viên",
  "Kiến trúc sư",
  "Kỹ sư xây dựng",
  "Giáo viên",
  "Nhân viên kinh doanh",
  "Nhân viên marketing",
  "Nhân viên IT",
  "Nhân viên tài chính",
  "Nhân viên nhân sự",
  "Nhân viên bán hàng",
  "Nội trợ",
  "Học sinh / Sinh viên",
  "Công viên chức nhà nước",
  "Bác sĩ",
  "Dược sĩ",
  "Khác...",
];

// Range Dtoc
const dtRange = [
  { ten: "Kinh" },
  { ten: "Tày" },
  { ten: "Thái" },
  { ten: "Mường" },
  { ten: "Hoa" },
  { ten: "Khơ Mú" },
  { ten: "Nùng" },
  { ten: "Dao" },
  { ten: "HMông" },
  { ten: "Gia Rai" },
  { ten: "Ê Đê" },
  { ten: "Ba Na" },
  { ten: "Xơ Đăng" },
  { ten: "Sán Chay" },
  { ten: "Chăm" },
  { ten: "Cơ Tu" },
  { ten: "Giáy" },
  { ten: "M'Nông" },
  { ten: "Tà Ôi" },
  { ten: "Chu Ru" },
  { ten: "Brau" },
  { ten: "Ro Măm" },
  { ten: "Hrê" },
  { ten: "Ra Glai" },
  { ten: "Xtiêng" },
  { ten: "Bru-Vân Kiều" },
  { ten: "Khác" },
];

// Range provinces
const provinces = ref([]);
const districts = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("/provinces.json");
    provinces.value = await response.json();
  } catch (error) {
    console.error("Lỗi khi tải danh sách tỉnh:", error);
  }
});
const handleChangeProvince = () => {
  const province = provinces.value.find(
    (p) => p.province === selectedProvince.value
  );
  districts.value = province ? province.districts : [];
};
// Range Year
const getYearRange = () => {
  const year = [];
  for (let i = currentYear; i >= 1900; i--) {
    year.push(i);
  }
  return year;
};

import { useStore } from "@/stores/value_new_booking.store";
import router from "@/router/index.router";
const store = useStore();
// Khai báo các biến và gán bằng ref()
const selectedDtoc = ref("");
const sub_name = ref("");
const first_name = ref("");
const name_mate = ref("");
const selectedRelate = ref("");
const phone_mate = ref("");
const selectedDay = ref("");
const selectedMonth = ref("");
const selectedYear = ref("");
const selectedGender = ref("");
const selectedMajor = ref("");
const selectedProvince = ref("");
const selectedDistrict = ref("");
const email = ref("");
const email_mate = ref("");
const number_phone = ref("");
const citizen_id = ref("");
const commune = ref("");
const address = ref("");
const updateValues = () => {
  if (sub_name.value == "") {
    alert("Vui lòng tên đệm");
    return;
  }
  if (first_name.value == "") {
    alert("Vui lòng tên");
    return;
  }

  if (number_phone.value == "") {
    alert("Vui lòng số điện thoại");
    return;
  }
  if (selectedDay.value == "") {
    alert("Vui lòng chọn ngày sinh");
    return;
  }
  if (selectedMonth.value == "") {
    alert("Vui lòng chọn tháng sinh");
    return;
  }
  if (selectedYear.value == "") {
    alert("Vui lòng chọn năm sinh");
    return;
  }
  if (citizen_id.value == "") {
    alert("Vui lòng nhập số CMND/CCCD");
    return;
  }
  if (selectedGender.value == "") {
    alert("Vui lòng chọn giới tính");
    return;
  }
  if (selectedMajor.value == "") {
    alert("Vui lòng chọn nghề nghiệp");
    return;
  }
  if (selectedProvince.value == "") {
    alert("Vui lòng chọn tỉnh/thành phố");
    return;
  }
  if (selectedDistrict.value == "") {
    alert("Vui lòng chọn quận/huyện");
    return;
  }
  if (commune.value == "") {
    alert("Vui lòng chọn xã/phường");
    return;
  }

  if (selectedDtoc.value == "") {
    alert("Vui lòng chọn dân tộc");
  }

  if (address.value == "") {
    alert("Vui lòng nhập địa chỉ");
    return;
  }

  const values = {
    selectedDtoc: selectedDtoc.value,
    sub_name: sub_name.value,
    first_name: first_name.value,
    name_mate: name_mate.value,
    selectedRelate: selectedRelate.value,
    phone_mate: phone_mate.value,
    selectedDay: selectedDay.value,
    selectedMonth: selectedMonth.value,
    selectedYear: selectedYear.value,
    selectedGender: selectedGender.value,
    selectedMajor: selectedMajor.value,
    selectedProvince: selectedProvince.value,
    selectedDistrict: selectedDistrict.value,
    email: email.value,
    email_mate: email_mate.value,
    number_phone: number_phone.value,
    citizen_id: citizen_id.value,
    commune: commune.value,
    address: address.value,
  };

  store.updateValues(values);
  router.push({ name: "home.page.booking.select_service_booking" });
};
</script>
<style scoped>
@import "@/assets/css/pages/booking_new.css";
</style>
