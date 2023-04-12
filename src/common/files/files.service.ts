import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse/sync';

@Injectable()
export class FilesService {

    uploadFile(file: Express.Multer.File, fileType: String) {
        if (fileType === 'csv') {
            return file.originalname
        }
        if (fileType === 'img') {
            return file.originalname
        }
    }

    // uploadFile(file: Express.Multer.File, fileType: String) {

    //     if(fileType==='csv'){

    //         const csvData = file.buffer.toLocaleString();

    //         try {
    //             const csvParsed = parse(csvData, {
    //                 delimiter: ';', 
    //                 columns: true,
    //                 skip_empty_lines: true
    //             }) 
    //             console.log(csvParsed);
    //             return csvParsed
    //         }

    //         catch (error) {
    //             console.log(error);
    //             return error;
    //         }
    //     }

    //     if(fileType==='img'){


    //         return file.originalname
    //     }

    // }
}
