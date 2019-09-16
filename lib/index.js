const fs = require('fs')

const j2s = require('hapi-joi-to-swagger')
const jsyaml = require('json2yaml')
const { map } = require('lodash')

const joiToSwagger = (config, schemas, commonSchemas) => {
    const API_PATH_COMPONENT = config.apiPathComponent
    const FILE_NAME = config.fileName || '_definitions'
    const EXTENSION_FILE = config.fileExtension || 'yaml'
    const allSchemas = {
        ...schemas
    }
    const allCommonSchemas = {
        ...commonSchemas
    }
    let definitions
    const commonDefinition = {}
    let childrenSchema = {}
    readDir(API_PATH_COMPONENT)
        .then((dirs) => {
            map(allSchemas, (item) => {
                generateCommonSchema(allCommonSchemas, commonDefinition)
                generateChildrenSchema(item.schemas, childrenSchema)
                definitions = jsyaml.stringify({ components: { schemas: { ...childrenSchema, ...commonDefinition } } })
                if (dirs.includes(item.folderName)) {
                    generateYAML(definitions, `${API_PATH_COMPONENT}/${item.folderName}`, FILE_NAME, EXTENSION_FILE)
                }
                childrenSchema = {}
            })
        })
    return definitions
}

const generateChildrenSchema = (schemas, childrenSchema) => {
    map(schemas, (joiSchema, joiKey) => {
        Object.assign(childrenSchema, { [joiKey]: j2s(joiSchema).swagger })
    })   
}

const generateCommonSchema = (commonSchemas, componentDefinition) => {
    map(commonSchemas, (common, key) => {        
        Object.assign(componentDefinition, { [key]: j2s(common).swagger })
    })
}

const generateYAML = (definitions, path, filename, extensionFile) => {
    fs.writeFile(`${path}/${filename}.${extensionFile}`, definitions, (err) => {
        if (err) throw err
        console.log(`\x1b[92m[✔]${path} File swagger definitions is created successfully.`)
    })
}

const readDir = (apiPathComponent) => new Promise((resolve, reject) => {
    fs.readdir(apiPathComponent, (err, items) => {
        if (err) {
            reject()
        }
        resolve(items)
    })
})

module.exports = {
    joiToSwagger
}
