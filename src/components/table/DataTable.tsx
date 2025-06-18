import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableProps } from "@/lib/types/table";
import { cn } from "@/lib/utils";

export function DataTable<T>({ data, columns, className }: DataTableProps<T>) {
  return (
    <div className={cn("rounded-lg border", className)}>
      <Table>
        <TableHeader>
          <TableRow className="border-b">
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={cn(
                  "py-4 text-gray-600 font-medium",
                  column.className
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="border-b hover:bg-gray-50">
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className="py-4">
                  {column.cell
                    ? column.cell(row)
                    : column.accessorKey
                    ? String(row[column.accessorKey])
                    : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
