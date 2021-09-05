export type ColumnType = {
  column_name: string;
  column_type: string;
  column_comment: string;
  column_plop_comments: string[];
};

export type Table = {
  table_name: string;
  table_comment: string;
  table_plop_comments: string[];
};
