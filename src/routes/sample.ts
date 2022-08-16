import { Express } from '../utilities/PackageWrapper';
import BaseController from '../controllers/Index';
import SampleService from '../services/sample/Sample';
import Constants from '../utilities/Constants';

const { DATABASE_TYPE, ENGINE } = process.env;

const SampleRouting = Express.Router();

const DatabaseController = new BaseController({
    databaseType: DATABASE_TYPE as string,
    databaseName: ENGINE as string,
});
const ModelController = DatabaseController.selectDatabase();
const sampleController = new ModelController(Constants.AppModels.MongoDB.Sample);

const sampleService = new SampleService(sampleController);

try {
    SampleRouting.post('/', async (request, _response, next) => {
        request.payload = await sampleService.createRecord({ request });
        next();
    })
        .get('/', async (request, _response, next) => {
            request.payload = await sampleService.createRecord({ request });
            next();
        })
        .get('/:id', async (request, _response, next) => {
            request.payload = await sampleService.createRecord({ request });
            next();
        })
        .put('/:id', async (request, _response, next) => {
            request.payload = await sampleService.createRecord({ request });
            next();
        })
        .patch('/:id', async (request, _response, next) => {
            request.payload = await sampleService.createRecord({ request });
            next();
        })
        .delete('/:id', async (request, _response, next) => {
            request.payload = await sampleService.createRecord({ request });
            next();
        });
} catch (error) {
    console.log(error);
}

export default SampleRouting;
