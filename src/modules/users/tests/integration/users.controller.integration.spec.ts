import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { APP_GUARD } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../../app.module';
import { DatabaseService } from '../../../../db/db.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { JwtAuthGuardMock } from '../../../auth/__mocks__/JwtAuthGuardMock';
import { RoleFactory } from '../../../roles/entities/role.factory';
import { User } from '../../entities/user.entity';
import { UserFactory } from '../../entities/user.factory';

describe('UsersController (e2e)', () => {
  let em: EntityManager;
  let httpServer: any;
  let app: any;
  let orm: MikroORM;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(JwtAuthGuardMock)
      .overrideGuard(APP_GUARD)
      .useClass(JwtAuthGuardMock)
      .overrideProvider(JwtAuthGuard)
      .useClass(JwtAuthGuardMock)
      .compile();

    app = module.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
    em = module.get(DatabaseService).getEm().fork();
    orm = module.get(DatabaseService).getORM();
    await orm.getMigrator().up();
  });

  afterAll(async () => {
    await em.nativeDelete(User, {});

    await orm.close();
    await app.close();
  });

  describe('get /users', () => {
    let user;
    beforeEach(async () => {
      const role = await new RoleFactory(em).createOne();
      user = await new UserFactory(em).makeOne();
      user.roles.set([role]);
      em.flush();
    });

    it('should return a list of users', async () => {
      const response = await request(httpServer).get('/users');
      expect(response.status).toBe(200);
      expect(response.body[0].id).toBe(user.id);
    });
  });
});
