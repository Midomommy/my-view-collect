<script setup>
import { useUserInfoStore } from '/src/stores/main-store.js';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const $router = useRouter();
const email = ref("");
const password = ref("");

const store = useUserInfoStore();

const isLoginBoxShow = computed(() => store.isLoginBoxShow);
const closeLoginBox = computed(() => store.closeLoginBox);

const logIn = async () => {
    event.preventDefault();
    if (email.value.includes("@")) {
        try {
            const res = await axios.post("https://fake-auth-data.vercel.app/login", {
                email: email.value,
                password: password.value,
            });
            console.log("res", res);

            console.log("res.data", res.data);
            if (res.status !== 400) {
                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("email", res.data.user.email);
                localStorage.setItem("isLogin", true);
                store.updateEmail(email.value);
                store.updateLoginState(true);
                store.updateToken(res.data.accessToken);
                store.setUserId();
            }

            alert("您已成功登入！")
            store.closeLoginBox();
            $router.push(`/`);
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert("An error occurred. Please try again later.");
            }
        }
    } else {
        alert("email格式不正確");
    }
}

</script>

<template>
    <div id="login-box" v-if="isLoginBoxShow" class="overlay" style="display: block;">
        <div class="login-box-modal-dialog-centered">
            <div class="login-box-modal-body mx-auto">
                <div class="login-box-modal-content mx-auto">
                    <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                        <div class="d-flex justify-content-end mb-3">
                            <button @click="closeLoginBox" type="button" class="btn-close"></button>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                                v-model="email" autocomplete="email">
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                                v-model="password" autocomplete="current-password">
                            <label for="floatingPassword">Password</label>
                        </div>
                        <button @click="logIn" class="w-100 btn btn-lg btn-primary">Log In</button>
                        <hr class="my-4">
                        <small class="text-body-secondary">By clicking Log In, you agree to the terms of use.</small>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#login-box .login-box-modal-dialog-centered {
    width: 500px;
    margin: 100px auto;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    /* 灰色，透明度為0.7 */
    z-index: 1000;
    /* 確保遮罩在最上層 */
}

@media screen and(max-width: 768px) {
    #login-box .login-box-modal-dialog-centered {
        width: 200px;
        margin: 100px auto;
    }
}
</style>