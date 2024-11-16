import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to get all events
export const getEvents = async (request, reply) => {
  try {
    const events = await prisma.event.findMany();
    return reply.send(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    reply.status(500).send({ error: "An error occurred while fetching events." });
  }
};

// Function to create a new event
export const createEvent = async (request, reply) => {
  const { title, description, date, createdBy } = request.body;

  if (!title || !description || !date || !createdBy) {
    return reply.status(400).send({ message: 'All fields are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { name: createdBy },
    });

    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),  
        createdBy,
      },
    });

    return reply.status(201).send(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return reply.status(500).send({ error: 'An error occurred while creating the event.' });
  }
};


// Function to register a user for an event
export const registerForEvent = async (request, reply) => {
  const { userName, eventName } = request.body;

  if (!userName || !eventName) {
    return reply.status(400).send({ message: "User name and event name are required." });
  }

  try {
    // Check if the user and event exist
    const user = await prisma.user.findUnique({
      where: { name: userName },
    });

    const event = await prisma.event.findUnique({
      where: { title: eventName },
    });

    if (!user || !event) {
      return reply.status(404).send({ message: 'User or Event not found' });
    }

    // Check if the user is already registered for the event
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        userName,
        eventName,
      },
    });

    if (existingRegistration) {
      return reply.status(400).send({ message: 'User is already registered for this event.' });
    }

    // Register the user for the event
    const registration = await prisma.registration.create({
      data: {
        userName,
        eventName,
      },
    });

    return reply.send(registration);
  } catch (error) {
    console.error("Error registering for event:", error);
    reply.status(500).send({ error: "An error occurred during registration." });
  }
};


// Function to get registrations for an event
export const getEventRegistrations = async (request, reply) => {
  const { eventId } = request.params;

  try {
    // Fetch the event by ID to get its title (eventName)
    const event = await prisma.event.findUnique({
      where: {
        id: Number(eventId), // Ensure eventId is a number
      },
    });

    if (!event) {
      return reply.status(404).send({ message: 'Event not found' });
    }

    const registrations = await prisma.registration.findMany({
      where: {
        eventName: event.title, // Use the event's title as the eventName
      },
      include: {
        user: true, // Include user data for each registration
      },
    });

    return reply.send(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    reply.status(500).send({ error: "An error occurred while fetching registrations." });
  }
};


// Function to create a new user
export const createUser = async (request, reply) => {
  const { email, name } = request.body;

  if (!email || !name) {
    return reply.status(400).send({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists by email or name
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { name }],
      },
    });

    if (existingUser) {
      return reply.status(400).send({ message: 'User with this email or name already exists' });
    }

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return reply.send(user);
  } catch (error) {
    console.error("Error creating user:", error);
    reply.status(500).send({ error: "An error occurred while creating the user." });
  }
};

// Function to get all users
export const getAllUsers = async (request, reply) => {
  try {
    const users = await prisma.user.findMany();
    return reply.send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    reply.status(500).send({ error: 'An error occurred while fetching users' });
  }
};

export const getUserByName = async (request, reply) => {
  const { userName } = request.params;

  try {
    const user = await prisma.user.findUnique({
      where: { name: userName },
    });

    if (user) {
      return reply.send(user);
    } else {
      return reply.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    reply.status(500).send({ error: 'An error occurred while fetching user' });
  }
};

// Function to get the events an user regiterd for
export const getUserEvents = async (request, reply) => {
  const { name, email } = request.body;

  try {
    const user = await prisma.user.findFirst({
      where: { name, email },
      include: {
        registrations: {
          include: {
            event: true,
          },
        },
      },
    });

    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }

    const events = user.registrations.map((registration) => registration.event);
    return reply.send(events);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: 'Error retrieving events' });
  }
};