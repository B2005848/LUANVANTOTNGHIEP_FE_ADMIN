const admin = [
  // Router for admin login page (separated from admin routes).
  {
    path: "/login",
    name: "admin.login",
    component: () => import("../layouts/account.login.vue"),
    meta: {
      title: "CTU CLINIC - Login",
    },
  },
  // -----------------------------------Router for admin pages
  {
    path: "/admin",
    name: "admin.page",
    component: () => import("../layouts/index.vue"),
    meta: {
      title: "CTU CLINIC - Administrators",
    },
    children: [
      //------------------------------------------ Router for admin dashboard page
      {
        path: "dashboard",
        name: "admin.dashboard",
        component: () => import("../pages/dashbroad/index.vue"),
        meta: {
          title: "CTU CLINIC - Dashboard",
        },
      },
      //------------------------------- Router for admin employee managements page
      {
        path: "emp_managements",
        name: "admin.emp",
        component: () => import("../pages/emp_management/index.vue"),
        meta: {
          title: "CTU CLINIC - Quản lí nhân viên",
        },
      },
      // Show employee details
      {
        path: "emp_details/:id",
        name: "admin.emp_details",
        component: () => import("../pages/emp_management/emp_detail_info.vue"),
        meta: {
          title: "CTU CLINIC - Chi tiết nhân viên",
        },
      },
      // --------------------------------------Router for admin patients managements page
      {
        path: "patients_managements",
        name: "admin.patients",
        component: () => import("../pages/patient_managements/index.vue"),
        meta: {
          title: "CTU CLINIC - Quản lí bệnh nhân",
        },
      },
      // Show patient details
      {
        path: "patient_details/:username",
        name: "admin.patient_details",
        component: () =>
          import("../pages/patient_managements/patient_detail_info.vue"),
        meta: {
          title: "CTU CLINIC - Chi tiết bệnh nhân",
        },
      },
      // Add a new patient
      {
        path: "add_a_newpatient",
        name: "admin.add.patient",
        component: () =>
          import("../pages/patient_managements/add_patient_detail_info.vue"),
        meta: {
          title: "CTU CLINIC - Thêm bệnh nhân mới",
        },
      },

      //------------------------------------------------Router for admin department managements page
      {
        path: "department_managements",
        name: "admin.departments",
        component: () => import("../pages/departments_managements/index.vue"),
        meta: {
          title: "CTU CLINIC - Quản lí phòng khám bệnh",
        },
      },

      //---------------------------------------------- Router for admin services managements page
      {
        path: "services_managements",
        name: "admin.services",
        component: () => import("../pages/service_managements/index.vue"),
        meta: {
          title: "CTU CLINIC - Quản lí dịch vụ",
        },
      },
      //-------------------------------------------------- Router for admin booking managements page
      {
        path: "booking_managements",
        name: "admin.booking",
        component: () => import("../pages/booking_managements/index.vue"),
        meta: {
          title: "CTU CLINIC - Quản lí lịch hẹn",
        },
      },

      //---------------------------------------------------------Router for admin request managements page
      {
        path: "request_managements",
        name: "admin.requests",
        component: () => import("../pages/request_managements/index.vue"),
        meta: {
          title: "CTU CLINIC - Các yêu cầu",
        },
      },

      //----------------------------------------------------- Router for admin shift management page
      {
        path: "shift_managements",
        name: "admin.shifts",
        component: () => import("../pages/shifts_managements/index.vue"),
        meta: {
          title: "CTU CLINIC - Quản lí ca làm việc",
        },
      },

      // Get list staff by shift_id
      {
        path: "staff_shitf/:shift_id",
        name: "admin.staff_shifts",
        component: () =>
          import("../pages/shifts_managements/listStaffBy_shitfId.vue"),
        meta: {
          title: "CTU CLINIC - Danh sách nhân viên theo ca",
        },
      },

      //------------------------------------------------------- Router for admin setting page
      {
        path: "settings",
        name: "admin.settings",
        component: () => import("../pages/setting_page/index.vue"),
        meta: {
          title: "CTU CLINIC - Cài đặt hệ thống",
        },
      },
    ],
  },
];
export default admin;
