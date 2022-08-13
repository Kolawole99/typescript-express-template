/**
 *
 * This handles the base logic for all services
 * @module SERVICE:Root
 */
import { Express } from '../utilities/PackageWrapper';

type Request = Express.Request;

/**
 * This is an abstract method that defines the core component of each services.
 * Each individual service is required to implement it own feature set for each method in this class
 */
abstract class RootService {
    serviceName!: string;
    controller!: Controller;

    constructor(controller: Controller) {
        this.setController(controller);
        this.setServiceName();
    }

    protected setServiceName(): void {
        this.serviceName = this.constructor.name;
    }

    protected setController(Controller: Controller): void {
        this.controller = Controller;
    }

    /**
     * This returns the name of the method that is passed as a parameter.
     */
    public getMethodName(method: any): string {
        return method.name;
    }

    /**
     * This fixes the error response from Joi to be more readable.
     */
    public filterJOIValidation(message: string): string {
        return message.replace(/["]+/g, '');
    }

    public abstract createRecord({ request }: { request: Request }): Promise<Request['payload']>;

    public abstract createRecords({ request }: { request: Request }): Promise<Request['payload']>;

    public abstract readRecords({ request }: { request: Request }): Promise<Request['payload']>;

    public abstract readRecord({ request }: { request: Request }): Promise<Request['payload']>;

    public abstract aggregateRecords({
        request,
    }: {
        request: Request;
    }): Promise<Request['payload']>;

    public abstract countRecords({ request }: { request: Request }): Promise<Request['payload']>;

    public abstract updateRecord({ request }: { request: Request }): Promise<Request['payload']>;

    public abstract updateRecords({ request }: { request: Request }): Promise<Request['payload']>;

    public abstract deleteRecord({ request }: { request: Request }): Promise<Request['payload']>;

    public abstract deleteRecords({ request }: { request: Request }): Promise<Request['payload']>;
}

export default RootService;
