import { ref, computed, onMounted, watch } from "vue";
import { defineStore } from "pinia";

export const useUserInfoStore = defineStore("userInfo", () => {
  const isLogin = ref(false);
  const email = ref("");
  const accessToken = ref("");
  const isLoginBoxShow = ref(false);
  const userId = ref("");

  // watch(email, () => {
  //   setUserId();
  // });

  const updateEmail = (val) => {
    email.value = val;
  };
  const updateToken = (val) => {
    accessToken.value = val;
  };
  const updateLoginState = (val) => {
    isLogin.value = val;
  };

  const openLoginBox = () => {
    isLoginBoxShow.value = true;
  };

  const closeLoginBox = () => {
    isLoginBoxShow.value = false;
  };

  const initUserData = () => {
    isLogin.value = JSON.parse(localStorage.getItem("isLogin")) || false;
    accessToken.value = localStorage.getItem("accessToken") || "";
    email.value = localStorage.getItem("email") || "";
    userId.value = localStorage.getItem("userId") || "";
    setUserId();
  };

  const setUserId = async () => {
    if (email.value) {
      try {
        const res = await axios.get("http://localhost:3000/users");

        if (res.status === 200) {
          const datas = res.data;
          datas.forEach((data) => {
            if (data.email === email.value) {
              userId.value = data.id;
              localStorage.setItem("userId", userId.value);
            }
          });
        }
      } catch (err) {
        if (err) {
          console.log(err);
          alert(err.message);
        } else {
          alert("An error occurred. Please try again later.");
        }
      }
    }
  };

  onMounted(initUserData);

  return {
    isLogin,
    userId,
    email,
    accessToken,
    isLoginBoxShow,
    openLoginBox,
    closeLoginBox,
    setUserId,
    updateEmail,
    updateToken,
    updateLoginState,
  };
});
