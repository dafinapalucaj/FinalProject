import { FastifyInstance } from 'fastify';
import { getEvents, createEvent, getUserEvents, registerForEvent, getEventRegistrations, createUser, getAllUsers , getUserByName} from '../controllers/eventController.js';

const routes = async (app: FastifyInstance) => {
  app.get('/events', getEvents);
  app.post('/events', createEvent);
  app.post('/registrations', registerForEvent);
  app.get('/events/:eventId/registrations', getEventRegistrations);
  app.post('/users', createUser); 
  app.get('/users', getAllUsers); 
  app.get('/users/:userName', getUserByName);
  app.post('/user/events', getUserEvents);
};

export default routes;
