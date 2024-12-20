/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix, {
    exclude: [{ path: '', method: RequestMethod.GET }], // Exclude root route from prefix
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const getUnauthorizedResponse = (req: any): string => {
    return req.auth
        ? 'Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected'
        : 'No credentials provided';
  };

  const config = new DocumentBuilder()
      .setTitle('Loadway')
      .setVersion('0.0.1')
      .addBearerAuth(
          {
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Enter JWT Token',
          },
          'Bearer',
      )
      .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
      '/api/doc',
      basicAuth({
        challenge: true,
        users: { [`${process.env.SWAGGER_USERNAME}`]: `${process.env.SWAGGER_PASS}` },
        unauthorizedResponse: getUnauthorizedResponse,
      }),
  );

  SwaggerModule.setup('/api/doc', app, document);

  const port = process.env.PORT || 3007;

  await app.listen(port);

  Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
