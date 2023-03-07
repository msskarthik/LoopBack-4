
import {repository} from '@loopback/repository';
import {Demomodel} from '../models';
import { WinstonLoggerService } from './logger.service';
import {DemomodelRepository} from '../repositories';
import { inject } from '@loopback/context';

export class DemoService {
  constructor(@inject('services.logger') private logger:WinstonLoggerService, @repository(DemomodelRepository) private demomodelRepos: DemomodelRepository) { }

  async saveDemoData(data: Partial<Demomodel>): Promise<Demomodel> {
    try {
      const result = new Demomodel(data);
      return this.demomodelRepos.create(result);
    } catch (err) {
      this.logger.logger.error(err);
      return err;
    }
  }

  async getDemoData(): Promise<Demomodel[]> {
    try {
      this.logger.logger.info('data retrieved');
      return this.demomodelRepos.find();
    } catch (err) {
      this.logger.logger.error(err);
      return err;
    }
  }
}
