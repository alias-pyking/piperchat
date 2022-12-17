import { errorCodes } from '../common/constants.js';
import { InvalidRequestError, ResourceMissing } from '../common/errors.js';
import { serverCreate, serverGet } from './services.js';

export async function serverCreateApi(request, reply) {
  let server = await serverGet({ where: { name: request.body.name } });
  if (server) {
    throw new InvalidRequestError('Server with this name already exists', 400, errorCodes.resourceAlreadyExists);
  }

  server = await serverCreate({ ...request.body });
  reply.status(201).send(server);
}

export async function serverDetailApi(request, reply) {
  const server = await serverGet({ where: { id: BigInt(request.params.pk) } });
  if (!server) {
    throw new ResourceMissing(`No such server: ${request.params.pk}`);
  }

  reply.send(server);
}
