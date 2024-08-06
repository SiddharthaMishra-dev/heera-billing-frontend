import InvComponent from "@/components/InvComponent";
import Sidebar from "@/components/Sidebar";
import { ApiSuffix, BaseUrl } from "@/lib/api-map";

const Invoice = async () => {
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

  const fetchClients = async () => {
    let url = BaseUrl + ApiSuffix.getClients;
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

  const clients = await fetchClients();
  const products = await fetchProducts();

  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <InvComponent
        clients={clients.data}
        products={products.data}
      />
    </main>
  );
};

export default Invoice;
