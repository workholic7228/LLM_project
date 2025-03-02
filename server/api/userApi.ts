//后端api路由
//userApi.ts
var express = require('express');
var router = express.Router();

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
	  proxy:{
		  '/chat':{
				   target:"http://127.0.0.1:2024/",
				   changeOrigin: true,
		  },
	  }
  }
})

// TODO：
// 后端接口