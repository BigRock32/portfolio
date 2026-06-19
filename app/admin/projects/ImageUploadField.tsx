"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./[id]/page.module.css";

type ImageUploadFieldProps = {
   currentImageUrl?: string | null;
   currentImageAlt?: string;
   error?: string;
   inputLabel?: string;
   inputRequired?: boolean;
   onFileChange?: () => void;
};

export function ImageUploadField({
   currentImageUrl,
   currentImageAlt = "Current project image",
   error,
   inputLabel = "Image",
   inputRequired = false,
   onFileChange,
}: ImageUploadFieldProps) {
   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

   useEffect(() => {
      return () => {
         if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
         }
      };
   }, [previewUrl]);

   return (
      <div className={styles.imageField}>
         <span>Current image</span>

         {currentImageUrl ? (
            <Image
               src={currentImageUrl}
               alt={currentImageAlt}
               width={480}
               height={300}
               className={styles.currentImage}
               unoptimized
            />
         ) : (
            <p className={styles.emptyImage}>No image uploaded yet.</p>
         )}

         <label className={styles.fileField}>
            <span>{inputLabel}</span>
            <input
               name="image_file"
               type="file"
               accept="image/*"
               required={inputRequired}
               onChange={(event) => {
                  const file = event.currentTarget.files?.[0];

                  if (previewUrl) {
                     URL.revokeObjectURL(previewUrl);
                  }

                  setPreviewUrl(file ? URL.createObjectURL(file) : null);
                  onFileChange?.();
               }}
            />
            {error ? <small className={styles.fieldError}>{error}</small> : null}
         </label>

         {previewUrl ? (
            <div className={styles.imageField}>
               <span>New image preview</span>
               <Image
                  src={previewUrl}
                  alt="New project image preview"
                  width={480}
                  height={300}
                  className={styles.currentImage}
                  unoptimized
               />
            </div>
         ) : null}
      </div>
   );
}
