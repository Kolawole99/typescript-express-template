import { Axios } from '../../utilities/PackageWrapper';

const getBreeds = async () => {
    try {
        return await Axios.get('https://dog.ceo/api/breeds/list/all', {
            params: {
                foo: 'bar',
            },
        });
    } catch (error) {
        console.error(error);
    }
};

const saveBreed = async () => {
    try {
        return await Axios.post('https://site.com/', {
            foo: 'bar',
        });
    } catch (error) {
        console.error(error);
    }
};
