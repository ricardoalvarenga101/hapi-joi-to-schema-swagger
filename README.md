# hapi-joi-to-schema-swagger

 - Biblioteca para gerar os componentes swagger a partir de um validador [@hapi/joi](https://hapi.dev)

[![Build Status](https://travis-ci.org/ricardoalvarenga101/hapi-joi-to-schema-swagger.svg?branch=master)](https://travis-ci.org/ricardoalvarenga101/hapi-joi-to-schema-swagger)

## Conteúdo

- [Instalação para um projeto node](#Instalação)
  - [Configuração](#Configuração)
  - [Configurar script package.json](#package.json)
- [Utilização](#Utilização)
- [Dependências](#Dependências)

## Instalação
  - Para um projeto node

```
npm install --save hapi-to-schema-swagger
```

## Configuração

 - Importe a biblioteca em seu projeto e a configure:

```js
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

## Package.json
 - Configurar comando no package.json

Podemos também criar um script para ser chamado usando o npm, faça o seguinte no scripts de seu package.json

```js
  "scripts": {    
    "swagger-generator": "node ./utils/generateComponentSwagger.js"
  },
```

## Utilização

 Função que gera o arquivo com os components swagger e salva no local indicado

```js
joiToSwagger(config, schemas, commonSchemas)
```

Paramêtros da função:
 
 ```js
/**
 * Configuração para geração do arquivo
 * @param { string } apiPathComponent Caminho onde serão salvos os arquivos
 * @param { string } fileName Nome do arquivo que será gerado
 * @param { string } fileExtension Extensão do arquivo
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


(No momento a lib da suporte apenas as versões >= 15.0.0 e <= 15.1.1 do [@hapi/joi](https://github.com/hapijs/joi/releases), então, para evitar problemas, fique atento em estar a utilizando em seus projetos.)

