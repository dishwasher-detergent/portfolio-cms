"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ENDPOINT, PORTFOLIO_BUCKET_ID, PROJECT_ID } from "@/lib/constants";
import { LucideImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface ImageInputProps {
  form: UseFormReturn<any>;
  label: string;
}

export const ImageInput = ({ form, label }: ImageInputProps) => {
  const [preview, setPreview] = useState<any>(null);

  const handleUploadedFile = (event: React.FormEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (!file) {
      return;
    }

    const urlImage = URL.createObjectURL(file);
    setPreview(urlImage);
  };

  useEffect(() => {
    const image = form.getValues("image");

    if (typeof image === "string" && image !== "") {
      const image_url = `${ENDPOINT}/storage/buckets/${PORTFOLIO_BUCKET_ID}/files/${image}/view?project=${PROJECT_ID}`;
      setPreview(image_url);
    }
  }, []);

  return (
    <div>
      <Label>
        <p className="pb-2">{label}</p>
      </Label>
      <Card className="p-2">
        <Label className="cursor-pointer">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            {...form.register("image", {
              onChange: (e: React.FormEvent<HTMLInputElement>) =>
                handleUploadedFile(e),
            })}
          />
          {preview ? (
            <img
              src={preview}
              alt="Site title image."
              className="h-24 w-24 rounded-lg"
            />
          ) : (
            <div className="grid h-24 w-24 place-items-center rounded-lg bg-slate-100 text-slate-950 hover:bg-slate-200">
              <LucideImagePlus className="h-4 w-4" />
            </div>
          )}
        </Label>
      </Card>
    </div>
  );
};
