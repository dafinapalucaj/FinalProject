import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import eventRoutes from './routes/eventRoutes.js';  
const fastify = Fastify({ logger: true });

const prisma = new PrismaClient();

fastify.register(cors);

fastify.register(eventRoutes); 

fastify.get('/', async (request, reply) => {
  return { message: 'Welcome to the Event Management System API!' };
});

const startServer = async () => {
  try {
    await prisma.$connect();
    await fastify.listen({ port: 3000, host: 'localhost' }); 
    console.log(`Server is running on http://localhost:3000`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};


startServer();

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
