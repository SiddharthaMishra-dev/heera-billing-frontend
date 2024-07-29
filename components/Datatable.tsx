import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DatatableProps {
  data: {
    id: string;
    name: string;
    gst: string;
    address: string;
    city: string;
    district: string;
    state: string;
  }[];
}

const Datatable = (dataTable: DatatableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-muted/10">
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead className="text-right">City</TableHead>
          <TableHead className="text-right">District</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataTable.data &&
          dataTable.data.map((row) => (
            <TableRow
              key={row.id}
              className="hover:bg-muted/10"
            >
              <TableCell className="font-medium truncate overflow-hidden max-w-[120px]">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell className="text-right">{row.city}</TableCell>
              <TableCell className="text-right">{row.district}</TableCell>
            </TableRow>
          ))}
        {dataTable.data.length === 0 && (
          <TableRow className="hover:bg-muted/10">
            <TableCell
              colSpan={4}
              className="text-center font-semibold"
            >
              No data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Datatable;
