# hapi-joi-to-component-swagger (v0.0.1)

Biblioteca para gerar os componentes swagger a partir de um validador [@hapi/joi][https://hapi.dev]


# Instalação para um projeto node

```
npm install --save hapi-to-component-swagger
```

# Configuração

Importe a biblioteca em seu projeto e a configure:

```
// generateComponentSwagger.js

const { joiToSwagger } = require('hapi-joi-to-component-swagger')
const Joi = require('@hapi/joi')

const testSchema = Joi.object().keys({
    testId: Joi.number()
})

const commonSchema = Joi.object().keys({
    errorCode: Joi.number()
})

const config = { apiPathComponent: './lib', fileName: '_definitions', fileExtension: 'yaml' }

const schemas = [{ folderName: 'testSchema', schemas: { testSchema }}]

const commonSchemas = { commonSchema }

// Chamamos a função para gerar o arquivo
joiToSwagger(config, schemas, commonSchemas)

```

## Configurar comando no package.json

Podemos também criar um script para ser chamado usando o npm, faça o seguinte no scripts de seu package.json

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "swagger-generator": "node ./utils/generateComponentSwagger.js"
  },
```

## Api documentação

Função que gera um arquivo com os schemas swagger e salva no local indicado

```
joiToSwagger(config, schemas, commonSchemas)
```

Parametros da função:
 
 ```
/**
 * Configuração para geração do arquivo
 * @param { string } apiPathComponent Caminho onde serão salvos os arquivos
 * @param { string } fileName Nome do arquivo que será gerado
 * @param { object } fileExtension Extensão do arquivo
 */
 const config = {
     apiPathComponent,
     fileName,
     fileExtension
 }

/**
 * Lista com os schemas joi
 * @param { string } folderName Nome da pasta onde o arquivo será salvo
 * @param { object } schemas Objeto com todos os joi schemas referente aquela pasta 
 */
const schemas = [{ folderName: 'suaPasta', schemas: { seuSchema, seuSchema2, ...espalharMaisUmMonte }}]

/**
 * Objeto contendo os schemas padrões que apareceram em todos os arquivos gerado 
 */
const commonSchemas = { commonSchema }

 ```

# Dependências
 - No momento a lib da suporte apenas a versão 15.0.3 do [@hapi/joi][https://github.com/hapijs/joi/releases/tag/v15.0.3], então, para evitar problemas, fique atento em estar a utilizando em seus projetos.
