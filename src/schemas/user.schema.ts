export const UserSchema = {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
        description: 'Identificador único del usuario',
      },
      name: {
        type: 'string',
        description: 'Nombre del usuario',
      },
      picture: {
        type: 'string',
        description: 'URL de la imagen del usuario',
      },
      position: {
        type: 'string',
        description: 'Posición del usuario en la empresa',
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'Correo electrónico del usuario',
      },
      contact: {
        type: 'string',
        description: 'Número de contacto del usuario',
      },
      joined: {
        type: 'string',
        format: 'date-time',
        description: 'Fecha de ingreso del usuario',
      },
      jobDesk: {
        type: 'string',
        description: 'Descripción del trabajo del usuario',
      },
      schedule: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: 'Horarios del usuario',
      },
      status: {
        type: 'string',
        enum: ['Active', 'Inactive'],
        description: 'Estado del usuario',
      },
      password: {
        type: 'string',
        description: 'Contraseña del usuario',
      },
    },
    required: ['id', 'name', 'email', 'status'],
  };
  