import Datatable from "@/components/Datatable";
import ProductDialog from "@/components/ProductDialog";
import { ApiSuffix, BaseUrl } from "@/utils/api-map";
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

  const products = await fetchProducts();

  return (
    <>
      <main className=" min-h-screen w-full py-3 px-2 text-gray-400">
        <h1 className="text-4xl font-bold">Products</h1>
        <div className="w-full max-w-7xl p-2 mx-auto">
          <ProductDialog
            type="Add"
            submitHandler={handleAddProduct}
          />
          <section className="mt-2 w-full">
            <Datatable data={products.data} />
          </section>
        </div>
      </main>
    </>
  );
};

export default Product;
