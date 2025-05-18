// Debug utility functions

/**
 * Log debug information with optional data
 */
export function debugLog(source: string, message: string, data?: any) {
  console.log(`[${source}] ${message}`, data ? JSON.stringify(data, null, 2) : "")
}

/**
 * Log environment variable configuration (without exposing secrets)
 */
export function logEnvConfig() {
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "[SET]" : "[NOT SET]",
    GITHUB_ID: process.env.GITHUB_ID ? "[SET]" : "[NOT SET]",
    GITHUB_SECRET: process.env.GITHUB_SECRET ? "[SET]" : "[NOT SET]",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "[SET]" : "[NOT SET]",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "[SET]" : "[NOT SET]",
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER ? "[SET]" : "[NOT SET]",
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD ? "[SET]" : "[NOT SET]",
    EMAIL_FROM: process.env.EMAIL_FROM,
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "[SET]" : "[NOT SET]",
    MONGODB_URI: process.env.MONGODB_URI ? "[SET]" : "[NOT SET]",
    MONGODB_DB: process.env.MONGODB_DB,
  }

  debugLog("Config", "Environment variables", envVars)
}
