import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 1. Setup the connection pool using the 'pg' library
    // This allows you to handle the URL in code rather than relying solely on the schema
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    
    // 2. Initialize the Postgres adapter
    const adapter = new PrismaPg(pool);

    // 3. Pass the adapter and your logging preferences to the super constructor
    // If you see the 'accelerateUrl' error again, it means you need to run 
    // 'npx prisma generate' with the 'driverAdapters' feature enabled.
    super({
      adapter,
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    // Connect to the database when the module initializes
    await this.$connect();
  }

  async onModuleDestroy() {
    // Gracefully disconnect when the application shuts down
    await this.$disconnect();
  }
}