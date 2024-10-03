// src/schemas/roomInput.schema.ts
export const RoomInputSchema = {
    type: 'object',
    properties: {
      dateAdded: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de adición de la habitación',
      },
      roomType: {
        type: 'string',
        description: 'Tipo de habitación',
      },
      number: {
        type: 'integer',
        format: 'int64',
        description: 'Número de la habitación',
      },
      picture: {
        type: 'string',
        description: 'URL de la imagen de la habitación',
      },
      bedType: {
        type: 'string',
        description: 'Tipo de cama',
      },
      roomFloor: {
        type: 'string',
        description: 'Piso de la habitación',
      },
      facilities: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Facilidades disponibles en la habitación',
      },
      rate: {
        type: 'string',
        description: 'Tarifa de la habitación',
      },
      discount: {
        type: 'number',
        description: 'Porcentaje de descuento aplicado a la habitación',
      },
      status: {
        type: 'string',
        enum: ['Available', 'Booked'],
        description: 'Estado de la habitación',
      },
    },
    required: ['roomType', 'number', 'status'],
  };
  