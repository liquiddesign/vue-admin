import gql from "graphql-tag";
import {DocumentNode} from "graphql/language";

export function gqlCreateMany(prefix:string, select: DocumentNode) {
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
