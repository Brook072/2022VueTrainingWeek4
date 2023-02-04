<script setup>
import axios from "axios";
import { ref } from "vue";
import DeleteModalVue from "./DeleteModal.vue";
import EditProductModalVue from "./EditProductModal.vue";
import AddProductModalVue from "./AddProductModal.vue";
const apiUrl = "https://vue3-course-api.hexschool.io";
const token = localStorage.getItem("token");
const goodsData = ref("");
const showData = ref("");
const modalTarget = ref("");
let products;
function goodsDataGet() {
  axios
    .get(`${apiUrl}/v2/api/thisisastore/admin/products/all`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      products = JSON.parse(JSON.stringify(res.data.products));
      goodsData.value = Object.values(res.data.products);
      showDataProcess();
    })
    .catch((err) => {
      console.log(err);
      alert(err.data.message);
    });
}
function showDataProcess() {
  showData.value = [];
  showData.value = Object.values(products);
}
function modalTargetProcess(id) {
  modalTarget.value = "";
  showData.value.find((item) => {
    if (item.id === id) modalTarget.value = item;
  });
}

goodsDataGet();
</script>
<template>
  <div class="container">
    <div class="text-end mt-4">
      <button
        @click.prevent="modalTargetProcess('')"
        data-bs-toggle="modal"
        data-bs-target="#addProductModal"
        class="btn btn-primary"
      >
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in showData" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-danger" v-if="!item.is_enabled">未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                @click.prevent="modalTargetProcess(item.id)"
                data-bs-toggle="modal"
                data-bs-target="#editProductModal"
                type="button"
                class="btn btn-outline-primary btn-sm"
              >
                編輯
              </button>
              <button
                @click.prevent="modalTargetProcess(item.id)"
                data-bs-toggle="modal"
                data-bs-target="#delProductModal"
                type="button"
                class="btn btn-outline-danger btn-sm"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <AddProductModalVue @send-data-get="goodsDataGet()" />
  <EditProductModalVue :modalTarget="modalTarget" />
  <DeleteModalVue :modalTarget="modalTarget" @send-data-get="goodsDataGet()" />
</template>

<style scoped>
html,
body {
  height: 100%;
  text-align: center;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
