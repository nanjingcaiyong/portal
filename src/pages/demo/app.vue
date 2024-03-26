<template>
  <a-row
    justify="center"
    align="middle"
    class="flex-1 h-[100vh]"
  >
    <a-col :span="6">
      <a-row justify="center">
        <h1>统一门户系统</h1>
      </a-row>
      <a-form
        :model="store"
        autocomplete="off"
        @submit="onSubmit"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="store.username" />
        </a-form-item>
        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input v-model:value="store.password" />
        </a-form-item>
        <a-form-item
          name="remember"
        >
          <a-row
            justify="space-between"
            align="middle"
          >
            <a-checkbox v-model:checked="store.remember">
              自动登录
            </a-checkbox>

            <a-button
              type="link"
            >
              忘记密码？
            </a-button>
          </a-row>
        </a-form-item>

        <a-form-item>
          <a-button
            block
            type="primary"
            html-type="submit"
          >
            登陆
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import { reactive } from 'vue';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
} 
const store = reactive<FormState>({
  username: 'admin',
  password: 'admin123',
  remember: false
});

const onSubmit = () => {
  $API.AUTH.login({
    account: store.username,
    password: store.password
  });
};
</script>
