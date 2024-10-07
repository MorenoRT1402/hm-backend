export const BookingInputSchema = {
    type: 'object',
    properties: {
      guest: {
        type: 'string',
        description: 'Nombre del huésped',
      },
      picture: {
        type: 'string',
        description: 'URL de la imagen del huésped',
      },
      orderDate: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de la orden',
      },
      checkIn: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de entrada',
      },
      checkOut: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de salida',
      },
      discount: {
        type: 'number',
        description: 'Porcentaje de descuento aplicado',
      },
      notes: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Notas sobre la reserva',
      },
      roomId: {
        type: 'integer',
        format: 'int64',
        description: 'ID de la habitación asociada',
      },
      status: {
        type: 'string',
        enum: ['Pending', 'Booked', 'Cancelled', 'Refund'],
        description: 'Estado de la reserva',
      },
    },
    required: ['guest', 'orderDate', 'checkIn', 'checkOut', 'roomId', 'status'], // Ajusta esto según tus requerimientos
  };
  