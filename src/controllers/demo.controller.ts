// Uncomment these imports to begin using these cool features!
import { intercept, service } from '@loopback/core';
import { get, post, requestBody } from '@loopback/rest';
import { jwtValidation } from '../interceptors';
import { Demomodel } from '../models';
import { DemoService } from '../services';

@intercept(jwtValidation)
export class DemoController {
  constructor(@service(DemoService) private demoService: DemoService) { }

  @post('/save')
  async saveDemo(@requestBody({content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          exist: { type: 'boolean' },
          // add more properties here
        },
        required: ['name', 'exist'], // set required properties
      },
    },
  },}) body: Demomodel): Promise<Demomodel> {
    return this.demoService.saveDemoData(body);
  }

  @get('/getAll')
  async getData(): Promise<Demomodel[]> {
    return this.demoService.getDemoData();
  }
}

