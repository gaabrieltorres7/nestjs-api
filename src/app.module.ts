import { Module } from '@nestjs/common';
import { LoginModule } from './modules/login/login.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [UserModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
