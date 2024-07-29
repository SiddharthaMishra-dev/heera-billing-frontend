"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientInputs>();
  const onSubmit: SubmitHandler<ClientInputs> = (data) => {
    submitHandler(data);
  };

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type} Client</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div aria-describedby="Client dialog">
          <form className="flex flex-col space-y-4 ">
            <div className="py-2 space-y-1">
              <label htmlFor="name">Name</label>
              <Input {...register("name", { required: true })} />
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
              <Input {...register("gst")} />
            </div>
            <div className="py-2 space-y-1  ">
              <label htmlFor="address">Address</label>
              <Input {...register("address", { required: true })} />
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
              <Input {...register("city", { required: true })} />
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
              <Input {...register("district", { required: true })} />
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
              <Input {...register("state", { required: true })} />
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
        <DialogFooter>
          <Button onMouseDown={handleSubmit(onSubmit)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default ClientDialog;
