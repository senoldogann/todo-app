import pkg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pkg

dotenv.config()

const environment = process.env.NODE_ENV || 'development'

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: environment === "development" ? process.env.DB_NAME : process.env.TEST_DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT) || 5435
})
