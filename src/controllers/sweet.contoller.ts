import { Controller, Post, Body, Param, UseInterceptors, UploadedFile, Req } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { SweetService } from "src/services/sweet/sweet.service";
import { Sweet } from "src/entities/sweet.entity";
import { AddSweetDto } from "src/dtos/sweet/add.sweet.dto";
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { StorageConfig } from "config/storage.config";
import { PhotoService } from "src/services/photo/photo.service";
import { Photo } from "src/entities/photo.entity";
import { ApiResponse } from "src/misc/api.response.class";

@Controller('api/sweet')
@Crud({
    model: { type: Sweet },
    params: {
        id: { field: 'sweetId', type: 'number', primary: true }
    },
    query: {
        join: {
          color: {
              eager: true
          },
          origin: {
              eager: true
          },
          photos: {
              eager: true
          },
          sweetKinds: {
              eager: true
          },
          sweetIngredients: {
              eager: true
          },
          kinds: {
              eager: true
          },
          ingredients: {
              eager: true
          }
        },
    },
})
export class SweetController {
    constructor(
        public service: SweetService,
        public photoService: PhotoService
        ) { }

    @Post('create')
    createSweet(@Body() data: AddSweetDto) {
        return this.service.createSweet(data)
    }

    @Post(':id/uploadPhoto')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: StorageConfig.photos,
                filename: (req, file, cb) => {

                    let original = file.originalname

                    let normalized = original.toLowerCase().replace(/\s+/g, '-')
                    normalized = normalized.replace(/[^a-z0-9\.\-]/g, '');
                    let now = new Date()
                    let datePart = ''
                    datePart += now.getFullYear().toString()
                    datePart += (now.getMonth() + 1).toString()
                    datePart += now.getDate().toString()

                    const randomPart: string = new Array(10).fill(0).map(e => (Math.random() * 9).toFixed(0).toString()).join('');

                    let fileName = datePart + '-' + randomPart + '-' + normalized

                    cb(null, fileName)
                },
                limits: {
                    fileSize: StorageConfig.photoMaxFileSize
                }
            }),
            fileFilter: (req, file, cb) => {

                if (!file.originalname.toLowerCase().match(/\.(jpg|png)$/)) {
                    req.fileFilterError = 'Wrong file extension';
                    cb(null, false)
                    return
                }

                if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
                    req.fileFilterError = 'Wrong file content';
                    cb(null, false)
                    return
                }

                cb(null, true)
            }
        })
    )
    async uploadPhoto(@Param('id') sweetId: number, @UploadedFile() photo, @Req() req): Promise<Photo | ApiResponse> {

        if (req.fileFilterError !== undefined) {
            return new ApiResponse('error', -4002, req.fileFilterError);
        }

        if (!photo) {
            return new ApiResponse('error', -4001, 'no photo');
        }

        const newPhoto: Photo = new Photo()
        newPhoto.sweetId = sweetId
        newPhoto.imagePath = photo.filename

        const savedPhoto = await this.photoService.add(newPhoto)

        if (!savedPhoto) {
            return new ApiResponse('error', -4003, 'photo not saved')
        }

        return savedPhoto
    }
}
