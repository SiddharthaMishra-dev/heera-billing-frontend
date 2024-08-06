import { BillProduct } from "@/lib/schema";
import { Option } from "./Autocomplete";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "./ui/button";

interface InvoiceProps {
  invoiceNumber: number | string;
  client: Option;
  billProducts: BillProduct[];
  gst: number | null;
  netTotal: number | string;
}
const Invoice = ({ invoiceNumber, client, billProducts, gst, netTotal }: InvoiceProps) => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="w-full flex flex-col items-center">
      <Button
        onClick={handlePrint}
        className="text-center mx-auto"
      >
        Print
      </Button>
      <div
        className="w-full max-w-7xl mx-auto"
        ref={componentRef}
      >
        <div className="flex justify-between items-end pb-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Invoice {invoiceNumber}</h1>
            <p className="text-xs">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="p-0 mb-1">
            <b>Heera Engineering Works</b>
          </p>
          <p className="p-0 mb-1">Rae Bareily Road, Telibagh</p>
          <p className="p-0 mb-1">Lucknow - 226002</p>
          <p className="p-0 mb-1">Uttar Pradesh</p>
          <p className="p-0 mb-1">Lucknow</p>
        </div>
        <div className="h-px bg-gray-300 my-4" />
        <div>
          <p className="p-0 mb-1">
            <b>Bill to:</b>
          </p>
          <p className="p-0 mb-1">{client?.name}</p>
          <p className="p-0 mb-1">{client?.address}</p>
          <p className="p-0 mb-1">
            {client?.city} {client?.district}
          </p>
          <p className="p-0 mb-1">India</p>
        </div>
        <div className="h-px bg-gray-300 my-4" />
        <p className="p-0 leading-5"></p>
        <table className="w-full my-12">
          <tbody>
            <tr className="border-b border-gray-300">
              <th className="text-left font-bold py-2">Item</th>
              <th className="text-left font-bold py-2">Name</th>
              <th className="text-left font-bold py-2">Unit Price</th>
              <th className="text-left font-bold py-2">Quantity</th>
              <th className="text-left font-bold py-2">Amount</th>
            </tr>
            {billProducts.map((product, index) => (
              <tr
                className="border-b border-gray-300"
                key={index}
              >
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{product.name}</td>
                <td className="py-2">{product.price}</td>
                <td className="py-2">{product.quantity}</td>
                <td className="py-2">{product.quantity * product.price}</td>
              </tr>
            ))}
            <tr className="border-b border-gray-300">
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2">SGST @9%</th>
              <th className="text-left font-bold py-2">{gst && gst / 2}</th>
            </tr>
            <tr className="border-b border-gray-300">
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2">CGST @9%</th>
              <th className="text-left font-bold py-2">{gst && gst / 2}</th>
            </tr>
            <tr className="border-b border-gray-300">
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2"></th>
              <th className="text-left font-bold py-2">Total</th>
              <th className="text-left font-bold py-2">{netTotal}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoice;
