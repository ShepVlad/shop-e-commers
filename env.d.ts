/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    readonly VITE_ECWID_STORE_ID: string
    readonly VITE_ECWID_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}