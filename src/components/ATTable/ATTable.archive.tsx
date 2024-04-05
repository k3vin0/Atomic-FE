import { ReactNode, FC } from "react";

const Table: FC<{ children: ReactNode }> = ({ children }) => (
  <table className="w-full">{children}</table>
);

const TableHead: FC<{ children: ReactNode }> = ({ children }) => (
  <thead className="w-full">{children}</thead>
);

const TableBody: FC<{ children: ReactNode }> = ({ children }) => (
  <tbody className="w-full flex-col">{children}</tbody>
);

const TableRow: FC<{ children: ReactNode }> = ({ children }) => (
  <tr className="w-full ">
    <div>
      <span>{children}</span>
    </div>
  </tr>
);

const TableHeader: FC<{ children: ReactNode }> = ({ children }) => (
  <th className="w-full">{children}</th>
);

const TableCell: FC<{ children: ReactNode }> = ({ children }) => (
  <td className="w-full">{children}</td>
);

export type RowData = {
  name: string;
  desc: string;
};

type TableProps = {
  columns: string[];
  data: RowData[];
};

// Example usage of your table components
const ATTable: FC<TableProps> = ({ data, columns }) => (
  <Table>
    <TableHead>
      <TableRow>
        {columns.map((label) => (
          <TableHeader>{label}</TableHeader>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {data?.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.desc}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ATTable;
