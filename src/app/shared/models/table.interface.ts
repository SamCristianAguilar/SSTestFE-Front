export interface Table {
  id: number;
  name: string;
}

export interface TableResponse {
  id: number;
  name: string;
  colums: ColumnsTable[];
}

export interface ColumnsTable {
  id: number;
  header: string;
  dataType: string;
  format?: string;
  required: boolean;
}

export interface Columns {
  titulo: string;
  name: string;
  format: string;
  dataType: string;
}
