<script setup>
import { useUserInfoStore } from '/src/stores/main-store.js';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const $router = useRouter();
const email = ref("");
const password = ref("");

const store = useUserInfoStore();

const signUp = async () => {
    event.preventDefault();
    if (email.value.includes("@")) {
        try {
            const res = await axios.post("https://fake-auth-data.vercel.app/signup", {
                email: email.value,
                password: password.value,
            });

            const response = await axios.post("https://json-server-in.vercel.app/users", {
                email: email.value
            })
            console.log("res", res);

            console.log("res.data", res.data);
            if (res.status !== 400) {
                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("email", res.data.user.email);
                localStorage.setItem("isLogin", true);
                store.updateEmail(email.value);
                store.updateLoginState(true);
                store.updateToken(res.data.accessToken);
            }

            alert("您已成功註冊！現在幫您自動登入！")
            // window.location.href = "/";
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
};


</script>

<template>
    <div class="container col-xl-10 col-xxl-8 px-4 py-5">
        <div class="row align-items-center g-lg-5 py-5">
            <div class="col-lg-7 text-center text-lg-start">
                <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3">Vertically centered hero sign-up form</h1>
                <p class="col-lg-10 fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each
                    required form group has a validation state that can be triggered by attempting to submit the form
                    without completing it.</p>
            </div>
            <div class="col-md-10 mx-auto col-lg-5">
                <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
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
                    <!-- <div class="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"> Remember me
                        </label>
                    </div> -->
                    <button @click="signUp" class="w-100 btn btn-lg btn-primary">Sign up</button>
                    <hr class="my-4">
                    <small class="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
                </form>
            </div>
        </div>
    </div>
</template>