/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import multer from 'multer';

export function imageMiddleware(directory: string) {
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'src/public/' + directory)// Directorio donde se guardarán las imágenes
        },
        filename(req, file, cb) {
            // Construye el nombre del archivo con su extensión original
            cb(null, file.fieldname + '-' + Date.now() + "." +file.mimetype.split('/')[1])
        }
    });

    // Filtrado de archivos para aceptar solo imágenes en formatos específicos
    const fileFilter = (req, file, cb) => {
        // Aceptar solo ciertos tipos de imagen
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
            cb(null, true)
        } else {
            // Rechaza el archivo
            cb(new Error('Only images in JPG, PNG y GIF'), false)
        }
    };

    // Crea una instancia de multer con la configuración de almacenamiento y el filtro de archivo
    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: 1024 * 1024 * 20 // Límite de tamaño de archivo de 20MB
        }
    });
    return upload
}