"use client";
import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

export default function ImageUpload({ image }: { image?: string }) {
  const [imageUrl, setimageUrl] = useState("");
  return (
    <CldUploadWidget
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();
          //@ts-expect-error
          setimageUrl(result.info?.secure_url);
        }
      }}
      uploadPreset="b67wiqd0"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label htmlFor="" className="text-slate-800">
              Imagen Producto
            </label>
            <div
              onClick={() => open()}
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
            >
              <TbPhotoPlus size={50} className="inline-block ml-2" />
              <p className="text-lg font-semibold">
                Añadir Imagen del Producto
              </p>

              {imageUrl && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={imageUrl}
                    alt="Imagen del Producto"
                    style={{ objectFit: "contain" }}
                    fill
                  />
                </div>
              )}
            </div>
          </div>
          {image && !imageUrl &&(
            <div className="space-y-2 ">
              <label>Imagen Actual:</label>
              <div className="w-80 h-80 relative  bg-slate-100 p-4 mx-auto">
                <Image
                  src={getImagePath(image)}
                  alt="Imagen Actual del Producto"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          )}
          <input type="hidden" name="image" defaultValue={imageUrl ? imageUrl : image} />
        </>
      )}
    </CldUploadWidget>
  );
}
