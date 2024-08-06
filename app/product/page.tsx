import ProductDialog from "@/components/ProductDialog";
import Datatable from "@/components/ProductTable";
import Sidebar from "@/components/Sidebar";
import { ApiSuffix, BaseUrl } from "@/lib/api-map";
import { Loader2 } from "lucide-react";
import { revalidatePath } from "next/cache";

interface ProductProps {
  name: string;
  hsncode: string;
  description: string;
}

const Product = async () => {
  const fetchProducts = async () => {
    let url = BaseUrl + ApiSuffix.getProducts;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  };

  const handleAddProduct = async (data: ProductProps) => {
    "use server";
    let url = BaseUrl + ApiSuffix.addProduct;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();
      if (result.error === true) {
        return false;
      } else {
        revalidatePath("/product");
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token == null || token == undefined) {
      revalidatePath("/login");
    }
  }

  const products = await fetchProducts();

  return (
    <main className="flex min-h-screen">
      <Sidebar />
      {/* <section className="w-full py-3 px-4 text-gray-800">
        <h1 className="text-4xl font-bold">Products</h1>
        <div className="w-full max-w-7xl py-3 ">
          <ProductDialog
            type="Add"
            submitHandler={handleAddProduct}
          />
          <section className="mt-2 w-full">
            <Datatable data={products.data} />
          </section>
        </div>
      </section> */}

      {typeof window !== "undefined" ? (
        <section className="w-full py-3 px-4 text-gray-800">
          <h1 className="text-4xl font-bold">Products</h1>
          <div className="w-full max-w-7xl py-3 ">
            <ProductDialog
              type="Add"
              submitHandler={handleAddProduct}
            />
            <section className="mt-2 w-full">
              <Datatable data={products.data} />
            </section>
          </div>
        </section>
      ) : (
        <div className="min-h-screen w-full flex justify-center items-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      )}
    </main>
  );
};

export default Product;
