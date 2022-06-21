//Import the mongoose package

class MongoDBController implements DBController {
    model;

    constructor(model: any) {
        this.model = model;
    }
    async createRecord(request: any): Promise<any> {
        return await this.model.create(request.payload);
    }
    async createRecords(request: any): Promise<any> {}
    async readRecord(request: any): Promise<any> {}
    async readRecords(request: any): Promise<any> {}
    async countRecords(request: any): Promise<any> {}
    async updateRecord(request: any): Promise<any> {}
    async updateRecords(request: any): Promise<any> {}
    async deleteRecord(request: any): Promise<any> {}
    async deleteRecords(request: any): Promise<any> {}
}

export default MongoDBController;
