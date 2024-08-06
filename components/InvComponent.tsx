"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatPrice } from "@/lib/utils";
import { BillProduct, Client, Product } from "@/lib/schema";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import type { Option } from "./Autocomplete";
import AutoComplete from "./Autocomplete";
import { Input } from "./ui/input";
import { ToWords } from "to-words";
import { ApiSuffix, BaseUrl } from "@/lib/api-map";
import { toast } from "sonner";
import Invoice from "./Invoice";

const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      // can be used to override defaults for the selected locale
      name: "Rupee",
      plural: "Rupees",
      symbol: "₹",
      fractionalUnit: {
        name: "Paisa",
        plural: "Paise",
        symbol: "",
      },
    },
  },
});

interface InvComponentProps {
  clients: Client[];
  products: Product[];
}

const calculateTotalAndGst = (billProducts: BillProduct[]) => {
  let total = 0;
  let gst = 0;
  billProducts.forEach((product) => {
    total += product.price * product.quantity;
  });
  gst = total * 0.18;
  return { total, gst };
};

const InvComponent = ({ clients, products }: InvComponentProps) => {
  const [selectedClient, setSelectedClient] = useState<Option | null>();
  const [selectedProduct, setSelectedProduct] = useState<Option | null>();
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [rate, setRate] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [productTotal, setProductTotal] = useState<number | null>(null);
  const [billProducts, setBillProducts] = useState<BillProduct[]>([]);
  const [gst, setGst] = useState<number | null>(null);
  const [netTotal, setNetTotal] = useState<number | null>(null);
  const [savingData, setSavingData] = useState<boolean>(false);
  const [print, setPrint] = useState<boolean>(false);

  const productSchema = z.object({
    rate: z.number(),
    quantity: z.number().min(1, {
      message: "Quantity must be at least 1",
    }),
  });

  const handleAddProduct = async () => {
    const result = productSchema.safeParse({ rate, quantity });
    if (!result.success) {
      console.log("Invalid data: ", result.error);
      return;
    }
    const bProducts = [...billProducts];
    bProducts.push({
      id: selectedProduct?.id || "",
      name: selectedProduct?.name || "",
      hsncode: selectedProduct?.hsncode || "",
      price: rate || 0,
      quantity: quantity || 0,
    });
    const { total, gst } = calculateTotalAndGst(bProducts);
    setBillProducts(bProducts);
    setProductTotal(total);
    setGst(gst);
    setNetTotal(total + gst);
    setSelectedProduct(null);
    setRate(null);
    setQuantity(null);
  };

  const handleAddInvoice = async () => {
    const formData = {
      invNo: invoiceNumber,
      clientId: selectedClient?.id,
      totalAmount: netTotal,
      billItems: billProducts.map((product) => ({
        productId: product.id,
        price: product.price,
        quantity: product.quantity,
      })),
    };

    console.log(formData);

    const url = BaseUrl + ApiSuffix.createInvoice;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      if (data.error === false) {
        toast.success("Invoice Created");
      } else {
        toast.error(data.msg);
      }
      setSavingData(false);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  if (print) {
    return (
      <Invoice
        client={selectedClient!}
        invoiceNumber={invoiceNumber}
        gst={gst!}
        netTotal={netTotal!}
        billProducts={billProducts}
      />
    );
  } else {
    return (
      <>
        <section className="w-full py-3 px-4 text-gray-800">
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-4xl font-bold text-center">Invoice</h1>
            <div className="flex items-center gap-x-2">
              <Button
                className="text-lg"
                onMouseDown={handleAddInvoice}
                disabled={savingData}
              >
                {savingData ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Save
              </Button>
              <Button
                className="text-lg"
                onMouseDown={() => setPrint(true)}
                disabled={savingData}
              >
                Print
              </Button>
            </div>
          </div>
          <div className="mt-4 w-full max-w-7xl mx-auto border border-gray-300 rounded-xl p-2 flex flex-col gap-y-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-x-2 items-center">
                <AutoComplete
                  options={clients}
                  placeholder="Client"
                  value={selectedClient}
                  onValueChange={setSelectedClient}
                  emptyMessage="No clients found"
                />
                <Input
                  value={invoiceNumber}
                  placeholder="Invoice Number"
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="h-[1px] bg-slate-200 w-full" />
            {/*Add Products */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Add your products</h3>
              <div className="w-full flex justify-center items-center gap-x-3">
                <div className="w-full max-w-[500px]">
                  <Label htmlFor="product">Product</Label>
                  <AutoComplete
                    options={products}
                    placeholder="Products"
                    value={selectedProduct}
                    onValueChange={setSelectedProduct}
                    emptyMessage="No Products found"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-x-3 w-full">
                  <div className="w-full">
                    <Label htmlFor="hsncode">HSN Code </Label>
                    <Input
                      name="hsncode"
                      disabled
                      placeholder="HSN Code"
                      value={selectedProduct?.hsncode || ""}
                      onChange={(e) => {
                        setSelectedProduct({ ...selectedProduct!, hsncode: e.target.value });
                      }}
                      className="py-3"
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="rate">Rate</Label>
                    <Input
                      name="rate"
                      type="number"
                      placeholder="Rate"
                      value={rate ? rate : ""}
                      className="py-3"
                      onChange={(e) => {
                        setRate(parseFloat(e.target.value));
                        setProductTotal(parseFloat(e.target.value) * (quantity || 0));
                      }}
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      name="quantity"
                      type="number"
                      placeholder="Quantity"
                      value={quantity ? quantity : ""}
                      onChange={(e) => {
                        setQuantity(parseFloat(e.target.value));
                        setProductTotal(parseFloat(e.target.value) * (rate || 0));
                      }}
                    />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="product_total">Total</Label>
                    <Input
                      type="number"
                      name="product_total"
                      placeholder="Total"
                      value={productTotal ? productTotal : ""}
                      onChange={(e) => setProductTotal(parseFloat(e.target.value))}
                    />
                  </div>
                  <Button
                    onClick={handleAddProduct}
                    className="mt-auto"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full max-w-7xl mx-auto border border-gray-300 rounded-xl p-2 flex flex-col justify-between gap-y-3 h-[65vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Sr No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>HSN Code</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.hsncode}</TableCell>
                    <TableCell className="text-right">{product.price}</TableCell>
                    <TableCell className="text-right">{product.quantity}</TableCell>
                    <TableCell className="text-right">{product.price * product.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="border-t border-gray-300 ">
                <TableRow>
                  <TableCell colSpan={5}>SGST @9%</TableCell>
                  <TableCell className="text-right">{gst && gst / 2}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>CGST @9%</TableCell>
                  <TableCell className="text-right">{gst && gst / 2}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>Total</TableCell>
                  <TableCell className="text-right">{netTotal}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <div className="bg-gray-100 rounded-lg p-2">
              {toWords.convert(netTotal ? netTotal : 0)}
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default InvComponent;
