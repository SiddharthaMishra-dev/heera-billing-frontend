import ClientDialog from "@/components/ClientDialog";
import Datatable from "@/components/Datatable";
import {} from "@/components/ui/dialog";
import { ApiSuffix, BaseUrl } from "@/utils/api-map";
import { revalidatePath } from "next/cache";

interface ClientProps {
  name: string;
  gst: string;
  address: string;
  city: string;
  district: string;
  state: string;
}

const Client = async () => {
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

  const handleAddClient = async (data: ClientProps) => {
    "use server";
    try {
      let url = BaseUrl + ApiSuffix.addClient;
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
        revalidatePath("/client");
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clients = await fetchClients();

  return (
    <>
      <main className=" min-h-screen w-full py-3 px-2 text-gray-400">
        <h1 className="text-4xl font-bold">Clients</h1>
        <div className="w-full max-w-7xl p-2 mx-auto">
          <ClientDialog
            type="Add"
            submitHandler={handleAddClient}
          />
          <section className="mt-2 w-full">
            <Datatable data={clients.data} />
          </section>
        </div>
      </main>
    </>
  );
};

export default Client;
