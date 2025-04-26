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

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
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
      successMessage: "",
    };
  },
  methods: {
    handleSubmit() {
      // Here you would usually send the form to your backend
      console.log("Registering user:", this.form);
      this.successMessage = "Registration successful!";
      this.resetForm();
    },
    resetForm() {
      this.form.username = "";
      this.form.email = "";
      this.form.password = "";
    },
  },
};
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
}
.success {
  color: green;
  margin-top: 10px;
}
</style>
