import Axios from "axios";
const headers = {
  "Content-Type": "application/json",
  "X-Hasura-Role": "admin",
  "x-hasura-admin-secret":
    "bzVu3Vj5YcCqqCMilt0oro4Dg1bWeMWVJQlazLaQiJRhxnfjFI2IdjHJjJzKaxug",
};

async function getTableFields(resource: string) {
  const sql = `
  SELECT
    cols.column_name,
    cols.data_type,
    (
      SELECT pg_catalog.col_description(c.oid, cols.ordinal_position::int)
      FROM pg_catalog.pg_class c WHERE c.oid = ( SELECT cols.table_name::regclass::oid )
      AND c.relname = cols.table_name
    ) as column_comment
    FROM information_schema.columns cols WHERE cols.table_name = '${resource}';
  `;
  const postData = {
    type: "run_sql",
    args: {
      sql,
    },
  };

  const { data } = await Axios.post(
    "https://caring-labrador-34.hasura.app/v2/query",
    postData,
    { headers }
  );
  return data;
}

async function getTableComments(resource: string) {
  const sql = `
    select obj_description('public.${resource}'::regclass);
  `;
  const postData = {
    type: "run_sql",
    args: {
      sql,
    },
  };

  const { data } = await Axios.post(
    "https://caring-labrador-34.hasura.app/v2/query",
    postData,
    { headers }
  );
  return data;
}

async function getTableForeignKeys(resource: string) {
  const sql = `
SELECT
    kcu.column_name AS column_name, 
    ccu.table_name AS foreign_table,
    ccu.column_name AS foreign_column 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name='${resource}';
  `;
  const postData = {
    type: "run_sql",
    args: {
      sql,
    },
  };

  const { data } = await Axios.post(
    "https://caring-labrador-34.hasura.app/v2/query",
    postData,
    { headers }
  );
  return data;
}
export { getTableFields, getTableForeignKeys, getTableComments };
