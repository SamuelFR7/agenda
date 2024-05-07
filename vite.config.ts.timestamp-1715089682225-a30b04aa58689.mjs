// vite.config.ts
import { vitePlugin as remix } from "file:///Users/samuelfr/www/acs/agenda/node_modules/.pnpm/@remix-run+dev@2.9.1_@remix-run+react@2.9.1_react-dom@18.3.1_react@18.3.1__react@18.3.1_types_knuxsb5r6cxrsmklbiojpatet4/node_modules/@remix-run/dev/dist/index.js";
import { defineConfig } from "file:///Users/samuelfr/www/acs/agenda/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.10/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///Users/samuelfr/www/acs/agenda/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.4.5_vite@5.2.11_@types+node@20.12.10_/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { flatRoutes } from "file:///Users/samuelfr/www/acs/agenda/node_modules/.pnpm/remix-flat-routes@0.6.4_@remix-run+dev@2.9.1_@remix-run+react@2.9.1_react-dom@18.3.1_react@18_ydj6jyetydn362prsae6yhtura/node_modules/remix-flat-routes/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*"],
      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes);
      }
    }),
    tsconfigPaths()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvc2FtdWVsZnIvd3d3L2Fjcy9hZ2VuZGFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zYW11ZWxmci93d3cvYWNzL2FnZW5kYS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc2FtdWVsZnIvd3d3L2Fjcy9hZ2VuZGEvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luIGFzIHJlbWl4IH0gZnJvbSBcIkByZW1peC1ydW4vZGV2XCJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCJcbmltcG9ydCB7IGZsYXRSb3V0ZXMgfSBmcm9tIFwicmVtaXgtZmxhdC1yb3V0ZXNcIlxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVtaXgoe1xuICAgICAgaWdub3JlZFJvdXRlRmlsZXM6IFtcIioqLypcIl0sXG4gICAgICByb3V0ZXM6IGFzeW5jIChkZWZpbmVSb3V0ZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIGZsYXRSb3V0ZXMoXCJyb3V0ZXNcIiwgZGVmaW5lUm91dGVzKVxuICAgICAgfSxcbiAgICB9KSxcbiAgICB0c2NvbmZpZ1BhdGhzKCksXG4gIF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0USxTQUFTLGNBQWMsYUFBYTtBQUNoVCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLG1CQUFtQjtBQUMxQixTQUFTLGtCQUFrQjtBQUUzQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixtQkFBbUIsQ0FBQyxNQUFNO0FBQUEsTUFDMUIsUUFBUSxPQUFPLGlCQUFpQjtBQUM5QixlQUFPLFdBQVcsVUFBVSxZQUFZO0FBQUEsTUFDMUM7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQSxFQUNoQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
