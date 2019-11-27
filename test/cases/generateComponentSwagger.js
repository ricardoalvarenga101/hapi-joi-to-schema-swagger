const assert = require('assert');
const { joiToSwagger } = require('../../lib/index')

const Joi = require('@hapi/joi')

const testSchema = Joi.object().keys({
    id: Joi.number().integer().required()
})

const common = Joi.object().keys({
    errorCode: Joi.number().integer().required(),
    message: Joi.string()
})
const config = {
    apiPathComponent: './lib',
    fileName: '_definitions',
    fileExtension: 'yaml'
}
const schemas = [
    { folderName: 'testSchema', schemas: { testSchema } }
]
const commonSchema = { common }

describe('Basic Mocha String Test', function () {
 it('should return number of charachters in a string', function (done) {             
    joiToSwagger(config, schemas, commonSchema)
        .then(() => done())
    })
});