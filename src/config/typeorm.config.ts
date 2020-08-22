import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'danil',
  password: 'Hendra0711',
  database: 'task-management',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

export default typeOrmConfig;
