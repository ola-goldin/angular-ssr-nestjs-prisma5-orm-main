import { PrismaClient, TypeName } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const camerasData = [
    { name: 'Camera 1' },
    { name: 'Camera 2', connection: false },
    { name: 'Camera 1', connection: true },
    { name: 'Camera 2', connection: true },
  ];
  await prisma.camera.createMany({
    data: camerasData,
  });

  const cameras = await prisma.camera.findMany();

  const typesData = [
    { name: TypeName.Site },
    { name: TypeName.Zone },
    { name: TypeName.Layer },
    { name: TypeName.Placemark },
    { name: TypeName.Sensor },
  ];
  await prisma.type.createMany({
    data: typesData,
  });

  const types = await prisma.type.findMany();

  await prisma.entity.create({
    data: {
      typeId: types[2].id,
      name: types[2].name,
      children: {
        create: [
          {
            typeId: types[2].id,
            children: {
              create: {
                typeId: types[0].id,
                name: types[0].name,
                children: {
                  create: [
                    {
                      typeId: types[0].id,
                      name: `${types[0].name} 1`,
                      children: {
                        create: [
                          {
                            typeId: types[1].id,
                            name: types[1].name,
                            children: {
                              create: [
                                {
                                  typeId: types[1].id,
                                  name: `${types[1].name} 1`,
                                },
                                {
                                  typeId: types[1].id,
                                  name: `${types[1].name} 1`,
                                  children: {
                                    create: [
                                      {
                                        typeId: types[4].id,
                                        name: `${types[4].name} 1`,
                                        cameraId: cameras[0].id,
                                      },
                                      {
                                        typeId: types[4].id,
                                        name: `${types[4].name} 2`,
                                        cameraId: cameras[1].id,
                                      },
                                      {
                                        typeId: types[4].id,
                                        name: `${types[4].name} 1`,
                                        cameraId: cameras[2].id,
                                      },
                                      {
                                        typeId: types[4].id,
                                        name: `${types[4].name} 2`,
                                        cameraId: cameras[3].id,
                                      },
                                    ],
                                  },
                                },
                                {
                                  typeId: types[1].id,
                                  name: `${types[1].name} 1`,
                                },
                                {
                                  typeId: types[1].id,
                                  name: `${types[1].name} 1`,
                                },
                              ],
                            },
                          },
                          {
                            typeId: types[3].id,
                          },
                        ],
                      },
                    },
                    { typeId: types[0].id },
                  ],
                },
              },
            },
          },
          { typeId: types[2].id },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    console.log('Seed succefffull');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
