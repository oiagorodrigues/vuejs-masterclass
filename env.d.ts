/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
