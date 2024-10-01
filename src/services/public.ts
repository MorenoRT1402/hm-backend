import fs from 'fs';
import path from 'path';

export const getBasicData = (): string => {
    const filePath = path.join(__dirname, '../docs/routes.md');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error('Error al leer el archivo routes.md:', err);
        return 'Error: No se pudo cargar el archivo de rutas.';
    }
};
