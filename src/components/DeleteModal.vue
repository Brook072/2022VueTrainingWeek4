<script setup>
import axios from "axios";
import { Modal } from "bootstrap";
import { ref, onMounted } from "vue";
const props = defineProps(["modalTarget"]);
const apiUrl = "https://vue3-course-api.hexschool.io";
const token = localStorage.getItem("token");
const emit = defineEmits(["sendDataGet"]);
const productModalBS = ref("");
function goodDelete() {
  axios
    .delete(
      `${apiUrl}/v2/api/thisisastore/admin/product/${props.modalTarget.id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => {
      alert(res.data.message);
      emit("sendDataGet");
      productModalBS.value.hide();
    })
    .catch((err) => {
      alert(err.data.message);
    });
}
onMounted(() => {
  productModalBS.value = new Modal(document.getElementById("delProductModal"));
});
</script>
<template>
  <div
    id="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ props.modalTarget.title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            @click.prevent="goodDelete()"
            type="button"
            class="btn btn-danger"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
