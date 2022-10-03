import { loadEnvConfig } from '@next/env'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (): Promise<void> => {
  loadEnvConfig(process.env.PWD || process.cwd())
}
