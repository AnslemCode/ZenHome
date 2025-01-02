/* eslint-disable react/prop-types */
import { useForm } from "@mantine/form";
import { validateString } from "../utils/common";
import { Select, Textarea, Button, Group } from "@mantine/core";
import useCountries from "../hooks/useCountries";
import Map from "./Map";
const AddLocation = ({ nextStep, propertyDetails, setPropertyDetails }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const { country, city, address } = form.values;

  const handleSubmit = () => {
    const { hasError } = form.validate();
    if (!hasError) {
      setPropertyDetails((prev) => ({ ...prev, country, city, address }));
      nextStep();
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flexCenter">
        {/* LEFT SIDE */}
        <div className="flexCenter flex-1">
          {/* INPUTS */}
          <div>
            <Select
              w={"100%"}
              withAsterisk
              label="Country"
              clearable
              searchable
              data={getAll()}
              {...form.getInputProps("country", { type: "input" })}
            />
            <Textarea
              w={"100%"}
              withAsterisk
              label="City"
              {...form.getInputProps("city", { type: "input" })}
            />
            <Textarea
              w={"100%"}
              withAsterisk
              label="Address"
              {...form.getInputProps("address", { type: "input" })}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1">
          <Map address={address} city={city} country={country} />
        </div>
      </div>
      <Group justify="center" mt="xl">
        <Button type="submit" onClick={nextStep}>
          Next step
        </Button>
      </Group>
    </form>
  );
};

export default AddLocation;