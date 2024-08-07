"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ClientInputs {
  name: string;
  gst: string;
  address: string;
  city: string;
  district: string;
  state: string;
}

interface ClientDialogProps {
  type: string;
  submitHandler: (data: ClientInputs) => Promise<any>;
}

const ClientDialog = ({ type, submitHandler }: ClientDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientInputs>();
  const onSubmit: SubmitHandler<ClientInputs> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await submitHandler(data);
      if (result) {
        reset();
        setOpen(false);
      }
    } catch (err) {
      setError("An error occurred while adding the product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-3 flex justify-between items-center">
        <h3 className="text-2xl font-semibold">All Clients</h3>
        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogTrigger
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add Client
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-gray-50 border-none">
            <DialogHeader>
              <DialogTitle>{type} Client</DialogTitle>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            <div aria-describedby="Client dialog">
              <form className="flex flex-col space-y-4 ">
                <div className="py-2 space-y-1">
                  <label htmlFor="name">Name</label>
                  <Input
                    {...register("name", { required: true })}
                    className="bg-gray-900 border-none text-gray-100"
                  />
                  {errors.name?.type === "required" && (
                    <p
                      role="alert"
                      className="text-sm text-red-500"
                    >
                      Name is required
                    </p>
                  )}
                </div>
                <div className="py-2 space-y-1  ">
                  <label htmlFor="gst">GST</label>
                  <Input
                    {...register("gst")}
                    className="bg-gray-900 border-none text-gray-100"
                  />
                </div>
                <div className="py-2 space-y-1  ">
                  <label htmlFor="address">Address</label>
                  <Input
                    {...register("address", { required: true })}
                    className="bg-gray-900 border-none text-gray-100"
                  />
                  {errors.address?.type === "required" && (
                    <p
                      role="alert"
                      className="text-sm text-red-500"
                    >
                      Address is required
                    </p>
                  )}
                </div>
                <div className="py-2 space-y-1  ">
                  <label htmlFor="city">City</label>
                  <Input
                    {...register("city", { required: true })}
                    className="bg-gray-900 border-none text-gray-100"
                  />
                  {errors.city?.type === "required" && (
                    <p
                      role="alert"
                      className="text-sm text-red-500"
                    >
                      City is required
                    </p>
                  )}
                </div>

                <div className="py-2 space-y-1  ">
                  <label htmlFor="district">District</label>
                  <Input
                    {...register("district", { required: true })}
                    className="bg-gray-900 border-none text-gray-100"
                  />
                  {errors.district?.type === "required" && (
                    <p
                      role="alert"
                      className="text-sm text-red-500"
                    >
                      District is required
                    </p>
                  )}
                </div>
                <div className="py-2 space-y-1  ">
                  <label htmlFor="state">State</label>
                  <Input
                    {...register("state", { required: true })}
                    className="bg-gray-900 border-none text-gray-100"
                  />
                  {errors.state?.type === "required" && (
                    <p
                      role="alert"
                      className="text-sm text-red-500"
                    >
                      State is required
                    </p>
                  )}
                </div>
              </form>
            </div>
            {error && (
              <p
                role="alert"
                className="text-sm text-red-500"
              >
                {error}
              </p>
            )}
            <DialogFooter>
              <Button onMouseDown={handleSubmit(onSubmit)}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ClientDialog;
