<script setup>
import { ref } from "vue";
import axios from "axios";
const apiUrl = "https://vue3-course-api.hexschool.io";
const username = ref("");
const password = ref("");
const emits = defineEmits(["sendLoginStatus"]);
function loginPost() {
  axios
    .post(`${apiUrl}/v2/admin/signin`, {
      username: username.value,
      password: password.value,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      emits("sendLoginStatus", true);
      alert(res.data.message);
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input
              v-model="username"
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              autocomplete="username"
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              autocomplete="current-password"
            />
            <label for="password">Password</label>
          </div>
          <button
            @click.prevent="loginPost()"
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
          >
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted text-center">&copy; 2021~∞ - 六角學院</p>
  </div>
</template>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
