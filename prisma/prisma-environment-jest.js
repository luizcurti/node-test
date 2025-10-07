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
    this.schema = `code_schema_${uuid()}`;
    console.log("schema", this.schema);
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    try {
      // Create schema and run migrations directly
      const client = new Client({
        connectionString: process.env.DATABASE_URL,
      });

      await client.connect();
      await client.query(`CREATE SCHEMA IF NOT EXISTS "${this.schema}"`);
      await client.end();

      // Generate Prisma client for the test schema
      execSync(`${prismaCli} db push --skip-generate`, { 
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
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}

module.exports = CustomEnvironment;
