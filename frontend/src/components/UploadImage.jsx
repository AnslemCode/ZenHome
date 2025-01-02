/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Button, Group } from "@mantine/core";
const UploadImage = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) => {
  const [imageUrl, setImageUrl] = useState(propertyDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageUrl }));
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djy2kzdab",
        uploadPreset: "Zenhome",
        maxFiles: 1,
      },
      (error, result) => {
        if (result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  }, [imageUrl]);
  return (
    <>
      <div className="mt-12 flexCenter flex-col">
        {!imageUrl ? (
          <div
            onClick={() => widgetRef.current.open()}
            className="flexCenter flex-col w-3/4 h-[21rem] border-dashed border-2 cursor-pointer"
          >
            <MdOutlineCloudUpload size={44} color="grey" />
            <span>Upload Image</span>
          </div>
        ) : (
          <div
            onClick={() => widgetRef.current.open()}
            className="w-3/4 h-[22rem] rounded-xl overflow-hidden cursor-pointer"
          >
            <img
              src={imageUrl}
              alt="image upload"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!imageUrl}>
          Next step
        </Button>
      </Group>
    </>
  );
};

export default UploadImage;
