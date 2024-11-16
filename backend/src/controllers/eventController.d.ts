import { FastifyRequest, FastifyReply } from 'fastify';

export const getEvents: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
export const createEvent: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
export const registerForEvent: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
export const getEventRegistrations: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
export const createUser: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
export const getAllUsers: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
export const getUserByName: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
export const getUserEvents: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
