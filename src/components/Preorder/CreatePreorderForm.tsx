/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { preordersService } from "@/app/services/preorders.service";

type PreorderWhen =
  | "regardless-of-stock"
  | "out-of-stock";

const preorderSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Maximum 100 characters"),

  products: z
    .number()
    .min(1, "At least 1 product is required"),

  preorderWhen: z.enum([
    "regardless-of-stock",
    "out-of-stock",
  ]),

  startsAt: z.string().min(
    1,
    "Start date is required"
  ),

  endsAt: z.string(),

  status: z.enum([
    "Active",
    "Inactive",
  ]),
});

export default function CreatePreorderForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      products: 1,
      preorderWhen: "regardless-of-stock" as
        | "regardless-of-stock"
        | "out-of-stock",
      startsAt: "",
      endsAt: "",
      status: "",
    },

    validators: {
      onSubmit: preorderSchema,
    },

    onSubmit: async ({ value }) => {

      const preorderData = {
        name: value?.name,
        products: value?.products,
        preorderWhen: value?.preorderWhen,
        startsAt: new Date(value.startsAt).toISOString(),
        endsAt: value.endsAt
          ? new Date(value.endsAt).toISOString()
          : null,
        status: value?.status
      }

      try {
        const res = await preordersService.createPreorders(preorderData);

        if (res?.data?.success === true) {
          toast.success("Preorder Created");
        }
        else if (!res?.data?.success === true) {
          toast.error("Something went wrong");
        }
      } catch (err: any) {
        toast.error(
          "Something went wrong"
        );
      }
    },
  });

  return (
    <form
      className="overflow-hidden "
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {/* Name */}
      <form.Field
        name="name"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched &&
            !field.state.meta.isValid;

          return (
            <div className="md:grid grid-cols-12 border-b p-6">
              <div className="col-span-4">
                <FieldLabel>
                  Name *
                </FieldLabel>

                <FieldDescription>
                  A label to recognize this
                  preorder by.
                </FieldDescription>
              </div>

              <div className="col-span-8">
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value
                    )
                  }
                  placeholder="Multi variant 3"
                  className="md:w-120 py-5"
                />

                {isInvalid && (
                  <FieldError
                    errors={
                      field.state.meta.errors
                    }
                  />
                )}
              </div>
            </div>
          );
        }}
      />

      {/* Products */}
      <form.Field
        name="products"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched &&
            !field.state.meta.isValid;

          return (
            <div className="md:grid grid-cols-12 border-b p-6">
              <div className="col-span-4">
                <FieldLabel>
                  Products
                </FieldLabel>

                <FieldDescription>
                  Number of products covered
                  by this preorder.
                </FieldDescription>
              </div>

              <div className="col-span-8">
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    min={1}
                    className="w-50 py-5"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                  <span className="text-sm text-muted-foreground">
                    product(s)
                  </span>
                </div>

                {isInvalid && (
                  <FieldError
                    errors={
                      field.state.meta.errors
                    }
                  />
                )}
              </div>
            </div>
          );
        }}
      />

      {/* Preorder When */}
      <form.Field
        name="preorderWhen"
        children={(field) => (
          <div className="md:grid grid-cols-12 border-b p-6">
            <div className="col-span-4">
              <FieldLabel>
                Preorder when
              </FieldLabel>

              <FieldDescription>
                When customers are allowed
                to preorder.
              </FieldDescription>
            </div>

            <div className="col-span-8">
              <Select
                value={field.state.value}
                onValueChange={(value) =>
                  field.handleChange(
                    value as PreorderWhen
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="regardless-of-stock">
                    Regardless of stock
                  </SelectItem>

                  <SelectItem value="out-of-stock">
                    Out of stock
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      />

      {/* Starts At */}
      <form.Field
        name="startsAt"
        children={(field) => {
          const isInvalid =
            field.state.meta.isTouched &&
            !field.state.meta.isValid;

          return (
            <div className="md:grid grid-cols-12 border-b p-6">
              <div className="col-span-4">
                <FieldLabel>
                  Starts at
                </FieldLabel>

                <FieldDescription>
                  When the preorder window
                  opens.
                </FieldDescription>
              </div>

              <div className="col-span-8">
                <Input
                  type="datetime-local"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value
                    )
                  }
                  className="md:w-120 py-5"
                />

                {isInvalid && (
                  <FieldError
                    errors={
                      field.state.meta.errors
                    }
                  />
                )}
              </div>
            </div>
          );
        }}
      />

      {/* Ends At */}
      <form.Field
        name="endsAt"
        children={(field) => (
          <div className="md:grid grid-cols-12 border-b p-6">
            <div className="col-span-4">
              <FieldLabel>
                Ends at
              </FieldLabel>

              <FieldDescription>
                Leave empty for no end
                date.
              </FieldDescription>
            </div>

            <div className="col-span-8">
              <Input
                type="datetime-local"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) =>
                  field.handleChange(
                    e.target.value
                  )
                }
                className="md:w-120 py-5"
              />
            </div>
          </div>
        )}
      />

      {/* Status */}
      <form.Field
        name="status"
        children={(field) => (
          <div className="grid grid-cols-12 p-6">
            <div className="col-span-4">
              <FieldLabel>
                Status
              </FieldLabel>

              <FieldDescription>
                Active preorders are visible
                to customers.
              </FieldDescription>
            </div>

            <div className="col-span-8">
              <div className="flex items-center gap-3">
                <Switch
                  checked={field.state.value === "Active"}
                  onCheckedChange={(checked) =>
                    field.handleChange(
                      checked ? "Active" : "Inactive"
                    )
                  }
                />
                <span>{field.state.value}</span>
              </div>
            </div>
          </div>
        )}
      />

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t p-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
        >
          Reset
        </Button>

        <Button type="submit">
          Save Preorder
        </Button>
      </div>
    </form>
  );
}