type Env = Partial<Readonly<typeof import('./env.local')>>

declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
  }
}
