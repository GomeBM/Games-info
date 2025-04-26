<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="form.username" required />
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>

      <button type="submit">Register</button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Dispatch the register action directly
        await this.$store.dispatch("users/register", this.form);
        this.$router.push("/login"); // Redirect to login page on success
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Registration failed.";
      }
    },
  },
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
