import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port);
  console.log('\n' + 'finished, listening at ' + '\x1B[4m\u001b[32m' +  'http://localhost:' + port + '\u001b[0m\x1B[0m' + '\n')
}
bootstrap();
