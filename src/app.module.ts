import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Task } from './tasks/task.entity';
import { User } from './auth/user.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_SERVER,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Task, User, Category, Role],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      maxQueryExecutionTime: 1000
    }),
    CategoryModule,
    RolesModule,
    AuthModule,
    TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
