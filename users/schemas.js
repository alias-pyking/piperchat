
export const userCreateSchema = {
  body: {
    type: 'object',
    required: ['name', 'email', 'username', 'password', 'confirmPassword'],
    properties: {
      name: { type: 'string', maxLength: 120 },
      email: { type: 'string', maxLength: 120 },
      about: { type: 'string', maxLength: 240 },
      username: { type: 'string', maxLength: 120 },
      password: {
        type: 'string',
        maxLength: 120,
        minLength: 6,
      },
      confirmPassword: { type: 'string', maxLength: 120, minLength: 6 },
      avatar: { type: 'string', nullable: true },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' },
        about: { type: 'string' },
        username: { type: 'string' },
        avatar: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  },
};

export const userLoginSchema = {
  body: {
    type: 'object',
    required: ['password'],
    properties: {
      username: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            username: { type: 'string' },
            email: { type: 'string' },
            bio: { type: 'string' },
            avatar: { type: 'string' },
            status: { type: 'string' },
            online: { type: 'boolean' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
  },
};
