
export async function modelUpdate({ prismaModelInstance, instance, data, fields }) {
  let hasUpdated = false;
  for (const field of fields) {
    if (!(field in data)) {
      continue;
    }

    if (instance[field] === data[field]) {
      hasUpdated = true;
      delete data[field];
    }
  }

  if (hasUpdated) {
    instance = await prismaModelInstance.update({
      where: {
        id: instance.id,
      },
      data,
    });
  }

  return [instance, hasUpdated];
}
