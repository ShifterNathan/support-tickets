import { BadRequestException } from '@nestjs/common';


export const fileFilter = ( req: Express.Request, file: Express.Multer.File, callback: Function) => {
     
    if ( !file ) return callback( new Error('file is empty'), false)

    let validExtensions = []
    
    if(file.fieldname === 'csv'){
        validExtensions = ['csv'] 
    } 

    if(file.fieldname === 'img'){
        validExtensions = ['jpg', 'jpeg', 'png']
    } 
    const fileExtension = file.mimetype.split('/')[1];

    if (validExtensions.includes( fileExtension )){
        return(callback(null, true))
    }
    callback(new BadRequestException(`El archivo en ${file.fieldname} no cumple con el formato`), false);

}