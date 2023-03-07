import { LoggerService } from "./services/logger.service";
import {BindingKey} from '@loopback/context'

export namespace LoggerBindings {
    export const LOGGER = BindingKey.create<LoggerService>('services.logger');
}