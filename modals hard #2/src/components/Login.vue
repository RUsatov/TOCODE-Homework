<template>
  <modal title="Login" @close="clearField">
    <!-- body -->
    <div slot="body">
      <form @submit.prevent="onSubmit">
        <!-- email -->
        <div class="form-item" :class="{ errorInput: $v.email.$error }">
          <label>Email:</label>
          <p class="errorText" v-if="!$v.email.required">Filed is required!</p>
          <p class="errorText" v-if="!$v.email.email">Email is not correct!</p>
          <input v-model="email" :class="{ error: $v.email.$error }" @change="$v.email.$touch()">
        </div>

        <!-- Password -->
        <div class="form-item" :class="{ errorInput: $v.password.$error }">
          <label>Password:</label>
          <p class="errorText" v-if="!$v.password.required">Filed is required!</p>
          <p
            class="errorText"
            v-if="!$v.password.minLength"
          >Password must have at least {{ $v.password.$params.minLength.min }} !</p>
          <input
            type="password"
            v-model="password"
            :class="{ error: $v.password.$error }"
            @change="$v.password.$touch()"
          >
        </div>

        <!-- button -->
        <button class="btn btnPrimary">Submit!</button> <br>
        <a class="btn btnWhite" click.prevent="" @click="$emit('changeModal'), clearField">Registration</a>
      </form>
    </div>
  </modal>
</template>

<script>
import { required, minLength, email} from "vuelidate/lib/validators";

import modal from "@/components/UI/Modal.vue";

export default {
  components: { modal },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    // ф-ия очистки
    clearField() {
        this.email = "";
        this.password = "";
        this.$v.$reset();
        this.$emit("close");
    },
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = {
          email: this.email,
          password: this.password
        };
        console.log(user);

        // DONE!
        this.clearField()
      }
    }
  }
};
</script>

<style lang="scss">
.form-item .errorText {
  display: none;
  margin-bottom: 8px;
  font-size: 13.4px;
  color: #de4040;
}
.form-item {
  &.errorInput .errorText {
    display: block;
  }
}
input.error {
  border-color: #de4040;
}
</style>
