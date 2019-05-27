const mongoose = require('mongoose');
const { Schema } = mongoose;

const ownersSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    _id: false
});

const schema = new Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true
    },
    description: {
        type: String,
        maxlength: 300
    },
    access: {
        type: String,
        enum: ['private', 'public'],
        default: 'private'
    },
    descriptor: {
        type: Schema.Types.Mixed
    },
    distribution: {
        type: {
            type: String,
            enum: ['docker', 'slug'],
            default: 'docker',
            required: true
        },
        image: {
            type: String,
            maxlength: 300,
            required: function () {
                return this.distribution.type === 'docker';
            }
        },
        registrySecretId: {
            type: Schema.Types.ObjectId
        },
        slugUrl: {
            type: String,
            maxlength: 300,
            required: function () {
                return this.distribution.type === 'slug';
            }
        }
    },
    owners: {
        type: [ownersSchema],
        required: true
    }
}, {
    timestamps: true
});



schema.set('toJSON', {
    transform(doc, ret) {
        ret.id = doc.id;
        delete ret._id;
        delete ret.__v;

        return ret;
    }
});

module.exports = mongoose.model('Component', schema);