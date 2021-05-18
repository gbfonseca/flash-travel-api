import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { configLocalUpload } from 'src/configs/multer.config';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private userService: UsersService,
  ) {}

  @Post('update-image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', configLocalUpload))
  async uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const { user } = request;

    return await this.userService.uploadProfileImage(file, user as User);
  }

  @Get(':imgpath')
  showUploadImage(@Param('imgpath') image, @Res() res: Response) {
    return res.sendFile(image, { root: './tmp/uploads' });
  }
}
