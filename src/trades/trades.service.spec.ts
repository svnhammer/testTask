import { Test, TestingModule } from '@nestjs/testing';
import { TradesService } from './trades.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { TradeEntry } from 'src/repository/repository.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('TradesService', () => {
  let service: TradesService;
  let repositoryModel: Model<TradeEntry>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TradesService,
        {
          provide: getModelToken(TradeEntry.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
      imports: [
        repositoryModel
      ]
    }).compile();

    service = module.get<TradesService>(TradesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
