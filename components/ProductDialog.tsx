"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitHandler, useForm } from "react-hook-form";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ProductInputs {
  name: string;
  hsncode: string;
  description: string;
}

interface ProductDialogProps {
  type: string;
  submitHandler: (data: ProductInputs) => Promise<any>;
}

const ProductDialog = ({ type, submitHandler }: ProductDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductInputs>();
  const onSubmit: SubmitHandler<ProductInputs> = async (data) => {
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
        <h3 className="text-2xl font-semibold">All Products</h3>
        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogTrigger
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add Product
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
                  <label htmlFor="hsncode">HSN code</label>
                  <Input
                    {...register("hsncode")}
                    className="bg-gray-900 border-none text-gray-100"
                  />
                  {errors.hsncode?.type === "required" && (
                    <p
                      role="alert"
                      className="text-sm text-red-500"
                    >
                      HSN code is required
                    </p>
                  )}
                </div>
                <div className="py-2 space-y-1  ">
                  <label htmlFor="description">Description</label>
                  <Input
                    {...register("description", { required: true })}
                    className="bg-gray-900 border-none text-gray-100"
                  />
                  {errors.description?.type === "required" && (
                    <p
                      role="alert"
                      className="text-sm text-red-500"
                    >
                      Description is required
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

export default ProductDialog;
