// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // You can set this to your LAN IP if you want to test on another device:
    // host: "192.168.100.55",
    host: true, // allows access from network devices
    proxy: {
      "/api": {
        target: "http://localhost:3000", // your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
});
