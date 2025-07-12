import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: Number(process.env.VITE_PORT) || 5173, // Use environment port or default to 5173
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // SEO and Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: ["@radix-ui/react-accordion", "@radix-ui/react-dialog"],
        },
      },
    },
    // Generate source maps for better debugging
    sourcemap: mode === "development",
    // Minify for production
    minify: mode === "production" ? "esbuild" : false,
    // Target modern browsers for better performance
    target: "esnext",
    // Optimize chunks
    chunkSizeWarningLimit: 1000,
  },
  // Add HTML meta tags and SEO optimizations
  define: {
    __BUSINESS_NAME__: JSON.stringify("MJ Fabrication"),
    __BUSINESS_LOCATION__: JSON.stringify("Naroda, Ahmedabad, Gujarat"),
    __BUSINESS_SERVICES__: JSON.stringify(
      "MS Fabrication, Doors, Windows, Shades, Railings"
    ),
  },
  // Performance optimizations
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
}));
