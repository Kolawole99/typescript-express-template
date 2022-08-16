/**
 *
 * This handles the base logic for all services
 * @module SERVICE:Root
 */

/**
 * This is an abstract method that defines the core component of each services.
 * Each individual service is required to implement it own feature set for each method in this class
 */
abstract class RootService {
    serviceName!: string;
    controller!: IDBController;

    constructor(controller: IDBController) {
        this.setController(controller);
        this.setServiceName();
    }

    protected setServiceName(): void {
        this.serviceName = this.constructor.name;
    }

    protected setController(Controller: IDBController): void {
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

    public abstract createRecord({ request }: { request: ERequest }): Promise<ERequest['payload']>;

    public abstract createRecords({ request }: { request: ERequest }): Promise<ERequest['payload']>;

    public abstract readRecords({ request }: { request: ERequest }): Promise<ERequest['payload']>;

    public abstract readRecord({ request }: { request: ERequest }): Promise<ERequest['payload']>;

    public abstract aggregateRecords({
        request,
    }: {
        request: ERequest;
    }): Promise<ERequest['payload']>;

    public abstract countRecords({ request }: { request: ERequest }): Promise<ERequest['payload']>;

    public abstract updateRecord({ request }: { request: ERequest }): Promise<ERequest['payload']>;

    public abstract updateRecords({ request }: { request: ERequest }): Promise<ERequest['payload']>;

    public abstract deleteRecord({ request }: { request: ERequest }): Promise<ERequest['payload']>;

    public abstract deleteRecords({ request }: { request: ERequest }): Promise<ERequest['payload']>;
}

export default RootService;
