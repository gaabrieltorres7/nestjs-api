import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { SignInUseCase } from './use-cases/sign-in';

@Controller('/signIn')
export class LoginController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post()
  async signIn(@Body() data: SignInDTO) {
    const token = await this.signInUseCase.execute(data);

    return token;
  }
}
