"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  disabled?: boolean;
  className?: string;
}

export function ImageUploader({
  onFileSelect,
  accept = "image/*",
  maxSizeMB = 10,
  disabled = false,
  className,
}: ImageUploaderProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    setError(null);

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Image size must not exceed ${maxSizeMB} MB.`);
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  }

  function handleRemove() {
    setSelectedFile(null);
    setError(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onFileSelect(null);
  }

  return (
    <div className={cn("w-full space-y-3", className)}>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleFileChange}
        className="sr-only"
      />

      {previewUrl ? (
        <div className="relative overflow-hidden rounded-xl border border-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt={`Preview of ${selectedFile?.name ?? "selected image"}`}
            className="max-h-72 w-full object-contain"
          />

          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            aria-label="Remove selected image"
            className="absolute right-2 top-2 inline-flex size-9 items-center justify-center rounded-full bg-white text-gray-700 shadow transition-colors hover:bg-gray-100 disabled:opacity-50"
          >
            <X className="size-4" aria-hidden="true" />
          </button>

          <p className="truncate border-t border-gray-200 bg-white px-3 py-2 text-xs text-gray-500">
            {selectedFile?.name}
          </p>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className={cn(
            "flex min-h-40 cursor-pointer flex-col items-center justify-center",
            "rounded-xl border-2 border-dashed border-gray-300 px-4 py-8",
            "text-center transition-colors hover:border-emerald-500 hover:bg-emerald-50/50",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <ImagePlus
            className="mb-3 size-8 text-emerald-700"
            aria-hidden="true"
          />

          <span className="text-sm font-medium text-gray-800">
            Choose an image
          </span>

          <span className="mt-1 text-xs text-gray-500">
            Image files up to {maxSizeMB} MB
          </span>
        </label>
      )}

      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}