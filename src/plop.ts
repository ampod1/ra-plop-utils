import { NodePlopAPI } from "plop";
import {
  getTableComments,
  getTableFields,
  getTableForeignKeys,
} from "./hasuraTableInfo";
import { createElementFromColumn } from "./index";
import { ColumnType } from "./types";
export default function (plop: NodePlopAPI) {
  plop.setGenerator("list", {
    description: "this is a skeleton plop react admin list file",
    prompts: [
      { type: "input", name: "resource", message: "Enter resource name" },
    ],
    actions: [
      async function getResource(answers: any) {
        const { resource } = answers;
        /*
       const client = createApolloClient();
       const { data } = await client.query({ query: GET_RESOURCE_FIELDS });
              //console.log("data", data);
       if (data?.__type?.fields) {
         // Do
       }
       */
        // TODO ts types is a must

        const { result: fieldsResult } = await getTableFields(resource);
        const { result: commentResult } = await getTableComments(resource);
        const { result: foreignResult } = await getTableForeignKeys(resource);

        const [_ignore_cols, ...cols] = fieldsResult;
        const [_ignore_tableComments, tableComments] = commentResult;
        const [_ignore_foreign, ...foreignKeys] = foreignResult;

        console.log(cols, tableComments, foreignKeys);

        console.log(
          createElementFromColumn({ column_name: cols[1][0] } as ColumnType)
        );
        return "getResource";
      },
    ],
  });
}
