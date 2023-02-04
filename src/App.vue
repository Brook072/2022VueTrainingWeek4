<script setup>
import LoginView from "./components/LoginView.vue";
import BackstageView from "./components/BackstageView.vue";
import { ref } from "vue";
import axios from "axios";
const apiUrl = "https://vue3-course-api.hexschool.io";
const token = localStorage.getItem("token");
const loginIsValidated = ref(false);
function loginCheckPost() {
  axios
    .post(
      `${apiUrl}/v2/api/user/check`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    )
    .then((res) => {
      if (res.data.success === true) {
        loginIsValidated.value = true;
      } else {
        loginIsValidated.value = false;
      }
    })
    .catch((err) => {
      alert(err.data.message);
    });
}
if (token != null) loginCheckPost();
</script>

<template>
  <body>
    <main>
      <LoginView
        @send-login-status="loginIsValidated = true"
        v-if="!loginIsValidated"
      />
      <BackstageView v-if="loginIsValidated" />
    </main>
  </body>
</template>

<style scoped>
html,
body {
  height: 100vh;
  text-align: center;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
