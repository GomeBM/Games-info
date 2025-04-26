<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>

      <button type="submit">Login</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Dispatch the login action directly
        await this.$store.dispatch("users/login", this.form);
        this.$router.push("/"); // Redirect to home page on success
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Login failed.";
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
