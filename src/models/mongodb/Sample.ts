import { Mongoose } from '../../utilities/PackageWrapper';

const { Schema, model } = Mongoose;

/** This interface is utilized for data consistency and proper validation */
interface ISample {
    id: number;
    isActive: boolean;
    isDeleted: boolean;
    timeStamp: number;
    createdOn: Date;
    updatedOn: Date;
    name: string;
    email: string;
    avatar?: string;
    hidden?: boolean;
    metadata?: {
        votes: number;
        favorites: number;
    };
    arbitrary: any;
}

/** This is the schema utilized by the ORM to relate with the database connected */
const SampleSchema = new Schema<ISample>({
    // Model Required fields
    id: {
        type: Number,
        required: true,
        unique: true,
        default: 0,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    timeStamp: {
        type: Number,
        required: true,
        default: () => Date.now(),
    },
    createdOn: {
        type: Date,
        required: true,
        default: () => new Date(),
    },
    updatedOn: {
        type: Date,
        required: true,
        default: () => new Date(),
    },
    // Model Specific fields
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: String,
    hidden: Boolean,
    metadata: {
        type: Object,
        votes: Number,
        favorites: Number,
        default: {
            votes: 0,
            favorites: 0,
        },
        required: true,
    },
    arbitrary: Schema.Types.Mixed,
});

const Sample = model<ISample>('Sample', SampleSchema);

export { ISample, Sample };
