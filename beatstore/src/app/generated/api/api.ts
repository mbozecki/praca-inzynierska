export * from './beat.service';
import { BeatAPIService } from './beat.service';
export * from './greetingResource.service';
import { GreetingResourceAPIService } from './greetingResource.service';
export * from './stripeController.service';
import { StripeControllerAPIService } from './stripeController.service';
export * from './users.service';
import { UsersAPIService } from './users.service';
export const APIS = [BeatAPIService, GreetingResourceAPIService, StripeControllerAPIService, UsersAPIService];
