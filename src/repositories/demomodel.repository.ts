import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {Demomodel, DemomodelRelations} from '../models/demomodel.model';

export class DemomodelRepository extends DefaultCrudRepository<
  Demomodel,
  typeof Demomodel.prototype.Id,
  DemomodelRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Demomodel, dataSource);
  }
}
