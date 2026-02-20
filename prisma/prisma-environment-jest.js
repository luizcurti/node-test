const { TestEnvironment } = require("jest-environment-node");
const { v4: uuid } = require("uuid");
const { execSync } = require("child_process");
const { resolve } = require("path");
const { Client } = require("pg");

const prismaCli = "./node_modules/.bin/prisma";

require("dotenv").config({
  path: resolve(__dirname, "..", ".env.test"),
});

class CustomEnvironment extends TestEnvironment {
  constructor(config) {
    super(config);
    this.schema = `code_schema_${uuid().replace(/-/g, '_')}`;
    console.log("schema", this.schema);
    
    // Get base URL from environment or use default
    let baseUrl = process.env.DATABASE_URL;
    if (!baseUrl) {
      // Fallback for CI environment
      baseUrl = "postgresql://user:password@localhost:5432/backend";
    }
    
    // Build connection string: always strip any existing query params first
    const cleanUrl = baseUrl.split('?')[0];
    this.connectionString = `${cleanUrl}?schema=${this.schema}`;
    
    console.log("connection string:", this.connectionString);
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    try {
      // Connect to the base database to create schema
      const baseUrl = process.env.DATABASE_URL.split('?')[0]; // Remove schema part
      const client = new Client({
        connectionString: baseUrl,
      });

      await client.connect();
      await client.query(`CREATE SCHEMA IF NOT EXISTS "${this.schema}"`);
      await client.end();

      // Use Prisma db push to create tables in the schema
      execSync(`${prismaCli} db push --skip-generate --accept-data-loss`, { 
        stdio: 'pipe',
        timeout: 30000,
        env: { ...process.env, DATABASE_URL: this.connectionString }
      });
    } catch (error) {
      console.error('Failed to setup test database:', error.message);
      throw error;
    }
  }

  async teardown() {
    try {
      // Connect to base database to drop schema
      const baseUrl = process.env.DATABASE_URL.split('?')[0]; // Remove schema part
      const client = new Client({
        connectionString: baseUrl,
      });

      await client.connect();
      await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
      await client.end();
    } catch (error) {
      console.error('Failed to cleanup test database:', error.message);
    }
  }
}

module.exports = CustomEnvironment;
