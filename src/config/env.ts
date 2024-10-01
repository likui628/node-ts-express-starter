import { z } from 'zod'

const envVarsSchema = z.object({
  PORT: z.string().default('5000'),
  ACCESS_TOKEN_SECRET: z.string(),
  TOKEN_SECRET: z.string(),
  DATABASE_URL: z.string(),
})

let envVars: z.infer<typeof envVarsSchema>
try {
  envVars = envVarsSchema.parse(process.env)
} catch (error) {
  if (error instanceof z.ZodError) {
    const formattedErrors = error.errors
      .map((err) => `${err.path.join('.')} - ${err.message}`)
      .join('\n')

    console.error('Environment variable validation errors:\n', formattedErrors)
  }
  process.exit(1)
}

export default envVars
