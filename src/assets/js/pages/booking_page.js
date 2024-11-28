import { ref } from "vue";

export const corlorButtonCursor1 = ref("background-color: #fff");
export const corlorButtonCursor2 = ref("background-color: #fff");

export const buttonCorsor1 = () => {
  if (corlorButtonCursor1.value === "background-color: #fff") {
    corlorButtonCursor1.value = "background-color: #307be7; color: #fff; ";
    corlorButtonCursor2.value = "background-color: #fff";
  }
};

export const buttonCorsor2 = () => {
  if (corlorButtonCursor2.value === "background-color: #fff") {
    corlorButtonCursor2.value = "background-color: #307be7; color: #fff";
    corlorButtonCursor1.value = "background-color: #fff";
  }
};
