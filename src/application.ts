import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import { AuthenticationComponent } from '@loopback/authentication';
import { JWTAuthenticationComponent } from '@loopback/authentication-jwt';
import { CrudRestComponent } from '@loopback/rest-crud';
import {RepositoryMixin} from '@loopback/repository';
import { WinstonLoggerService } from './services/logger.service';
import {RestApplication, SecuritySchemeObject, RestBindings} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer'; 
import {ServiceMixin} from '@loopback/service-proxy';
import { LoggerBindings } from './keys';
import {LogErrorProvider} from './services/error-log.service';
import path from 'path';
import {MySequence} from './sequence';
export {ApplicationConfig};

export class LoopbackPocApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));


    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);

    // Mount OpenAPI (Swagger) spec related components
    this.component(RestExplorerComponent);
    this.component(CrudRestComponent);
    this.bind(RestExplorerBindings.CONFIG).to({path: '/explorer'});

    // Logbindings
    this.bind(LoggerBindings.LOGGER).toClass(WinstonLoggerService);
    this.bind(RestBindings.SequenceActions.LOG_ERROR).toProvider(LogErrorProvider);

    // Configure security scheme for JWT authentication
    this.addSecuritySpec();

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  private addSecuritySpec(): void {
    const securitySchemeSpec: SecuritySchemeObject = {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    };
    this.api({
      openapi: '3.0.0',
      info: { title: 'My API', version: '1.0.0' },
      paths: {},
      components: { securitySchemes: { jwt: securitySchemeSpec } },
      security: [{ jwt: [] }],
    });
  }
}
