import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import FormRowComponent from "../../ui/FormRowComponent";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const isWorking = isCreating || isEditing;

  const onSubmit = (values) => {
    const image =
      typeof values.image === "string" ? values.image : values.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...values, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
    else {
      createCabin(
        { ...values, image: image },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
    }
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
            required: isEditSession ? false : "Please select a cabin photo!",
          })}
        />
      </FormRowComponent>

      {/* type is an HTML attribute! */}
      <div>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
