import gql from "graphql-tag";
import {DocumentNode} from "graphql/language";
import {useQuery} from "@vue/apollo-composable";
import {Ref} from "vue";

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const omitTypename = (key: any, value: any) => (key === '__typename' ? undefined : value)

function objectAssign(target: any, source: any) {
    Object.keys(source).forEach(sourceKey => {
        if (typeof source[sourceKey] === "object" && source[sourceKey] !== null) {
            target[sourceKey] = objectAssign(target[sourceKey] || {}, source[sourceKey])
        } else {
            target[sourceKey] = source[sourceKey]
        }
    })

    return target;
}

export function gqlAssignInput(input: any, source: any) {
    objectAssign(input, JSON.parse(JSON.stringify(Object.assign({}, source)), omitTypename));
}

export function gqlTagMany(prefix:string, select: DocumentNode) {
    const mainQuery = gql`
      query ($input: ManyInput!) {
        result:${prefix}Many(manyInput: $input) {
          ...Select
        }
      }
      ${select}
    `;

    const pagingQuery = gql`
      query ($input: ManyInput!) {
        result:${prefix}ManyTotalCount(manyInput: $input)
      }
    `;

    const deleteMutation = gql`
          mutation ($uuid: [ID]!) {
            ${prefix}Delete(uuid: $uuid)
          }
    `;

    return {mainQuery, pagingQuery, deleteMutation};
}

export function gqlTagOne(prefix:string, select: DocumentNode) {
    return gql`
        query ($uuid: ID!) {
          data: ${prefix}One(uuid: $uuid) {
            ...Select
          }
        }
        ${select}
  `;
}

export function gqlTagCreate(prefix: string) {
    return gql`
      mutation ($input: ${capitalizeFirstLetter(prefix)}CreateInput!) {
        data: ${prefix}Create(input: $input) {
            uuid
        }
      }
    `;
}

export function gqlTagUpdate(prefix: string) {
    return gql`
      mutation ($input: ${capitalizeFirstLetter(prefix)}UpdateInput!) {
        data: ${prefix}Update(input: $input) {
            uuid
        }
      }
    `;
}

export function fetchInput(input: any, prefix: string, select: DocumentNode, variables: any) {
    const { onResult, onError, loading, refetch } = useQuery(gqlTagOne(prefix, select), variables);

    onResult(result => {
        objectAssign(input, JSON.parse(JSON.stringify(Object.assign({}, result.data.data)), omitTypename));
    });

    onError(error => {
       alert('x' + error.message);
    });

    return {onError, loading, refetch};
}
