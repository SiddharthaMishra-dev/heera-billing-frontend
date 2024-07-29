import ClientDialog from "@/components/ClientDialog";
import Datatable from "@/components/Datatable";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ApiSuffix, BaseUrl } from "@/utils/api-map";

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
      throw new Error(result.message);
    } else {
    }
    return result;
  };

  const clients = await fetchClients();

  return (
    <>
      <main className=" min-h-screen w-full py-3 px-2 text-gray-400">
        <h1 className="text-4xl font-bold">Clients</h1>
        <div className="w-full max-w-7xl p-2 mx-auto">
          <div className="mt-3 flex justify-between items-center">
            <h3 className="text-2xl font-semibold">All Clients</h3>
            <Dialog>
              <DialogTrigger
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Add Client
              </DialogTrigger>
              <ClientDialog
                type="Add"
                submitHandler={handleAddClient}
              />
            </Dialog>
          </div>
          <section className="mt-2 w-full">
            <Datatable data={clients.data} />
          </section>
        </div>
      </main>
    </>
  );
};

export default Client;
