import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { createCabins } from "../../services/apiCapins";
import FormRowComponent from "../../ui/FormRowComponent";

function CreateCabinForm({ cabinToEdit }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabins,
    onSuccess: () => {
      toast.success("New cabin Succssfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (error) => {
      toast.error("Can't create the cabin, please try again");
    },
  });

  const onSubmit = (values) => {
    mutate({ ...values, image: values.image[0] });
    console.log(values);
  };
  const onError = (errors) => {
    console.error("errors", errors);
    console.log("values", Number(getValues().regularPrice));
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRowComponent
        label="Cabin name"
        error={formState?.errors?.name?.message}
      >
        <Input
          disabled={isCreating}
          type="text"
          id="name"
          {...register("name", {
            required: "Please enter a cabin name!",
          })}
        />
      </FormRowComponent>

      <FormRowComponent
        label="Maximum capacity"
        error={formState?.errors?.maxCapacity?.message}
      >
        <Input
          disabled={isCreating}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            max: {
              value: 10,
              message: "Miximum capacity should be less than 10",
            },
            min: {
              value: 1,
              message: "Minimum capacity should be at least 1",
            },
          })}
        />
      </FormRowComponent>

      <FormRowComponent
        label="Regular price"
        error={formState?.errors?.regularPrice?.message}
      >
        <Input
          type="number"
          disabled={isCreating}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 10,
              message: "Minimum price should be at least $10",
            },
          })}
        />
      </FormRowComponent>

      <FormRowComponent
        label="Discount"
        error={formState?.errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "The Discount value should be less than the regular Price",
          })}
        />
      </FormRowComponent>

      <FormRowComponent
        label="Description for website"
        error={formState?.errors?.description?.message}
      >
        <Textarea
          disabled={isCreating}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRowComponent>

      <FormRowComponent
        label="Cabin photo"
        error={formState?.errors?.image?.message}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "Please select a cabin photo!",
          })}
        />
      </FormRowComponent>

      {/* type is an HTML attribute! */}
      <div>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
