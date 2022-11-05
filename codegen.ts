import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    documents: ['src/**/*.vue'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './src/gql/': {
            preset: 'client',
            config: {
                useTypeImports: true
            },
            plugins: []
        }
    }
}

export default config