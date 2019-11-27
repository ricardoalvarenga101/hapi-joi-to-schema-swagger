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
    return readDir(API_PATH_COMPONENT)
        .then((dirs) => {
            return Promise.all(map(allSchemas, (item) => {
                generateCommonSchema(allCommonSchemas, commonDefinition)
                generateChildrenSchema(item.schemas, childrenSchema)
                definitions = jsyaml.stringify({ components: { schemas: { ...childrenSchema, ...commonDefinition } } })
                if (dirs.includes(item.folderName)) {
                    return generateYAML(definitions, `${API_PATH_COMPONENT}/${item.folderName}`, FILE_NAME, EXTENSION_FILE)
                }
                childrenSchema = {}
                return Promise.resolve()
            }))
        })
        .then(() => definitions)
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
    return new Promise((resolve, reject) => {
        fs.writeFile(`${path}/${filename}.${extensionFile}`, definitions, (err) => {
            if (err) throw reject(err)            
            console.log(`\x1b[92m[✔]${path}\x1b[0m File swagger definitions is created successfully.`)
            resolve()
        })
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
