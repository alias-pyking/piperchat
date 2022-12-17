
export const serverCreateSchema = {
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', maxLength: 128 },
      about: { type: 'string', maxLength: 512 },
      avatar: { type: 'string', maxLength: 256 },
      isPrivate: { type: 'boolean', maxLength: 256, default: false },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        about: { type: 'string' },
        avatar: { type: 'string' },
        isPrivate: { type: 'boolean' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
  },
};

export const serverDetailSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        about: { type: 'string' },
        avatar: { type: 'string' },
        isPrivate: { type: 'boolean' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
  },
};
