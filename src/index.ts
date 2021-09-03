import { ColumnType } from "./types";
import inflection from "inflection";
// Best way to do it is not found yet , so do it with the most practical way
const createElementFromColumn = ({ column_name }: ColumnType) => {
  const ComponentName = inflection.camelize(column_name);
  return `<${ComponentName}><hr/></${ComponentName}>`;
};

const createListFromResource = () => {
  const ListCode = `
  <List {...props}>
  </List>
    `;
};

export { createElementFromColumn };
