import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDTO } from '../dto/user.dto';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  transform(
    { name, email, password, username }: CreateUserDTO,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metadata: ArgumentMetadata,
  ) {
    if (!name || !email || !password || !username) {
      throw new HttpException(
        `[name, email, password, username] are required`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return { name, email, password, username };
  }
}
