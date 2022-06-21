// Import the node-oracledb package
// This does not work for Arm64, I am on an M1 Macbook Pro

class OracleController implements DBController {
    constructor() {}
    async createRecord(request: any): Promise<any> {}
    async createRecords(request: any): Promise<any> {}
    async readRecord(request: any): Promise<any> {}
    async readRecords(request: any): Promise<any> {}
    async countRecords(request: any): Promise<any> {}
    async updateRecord(request: any): Promise<any> {}
    async updateRecords(request: any): Promise<any> {}
    async deleteRecord(request: any): Promise<any> {}
    async deleteRecords(request: any): Promise<any> {}
}

export default OracleController;
