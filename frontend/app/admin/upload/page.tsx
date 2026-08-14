"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import {
  UploadCloud,
  File,
  FileText,
  Image,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { useRef, useState } from "react";

export default function FileUploadPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    setFiles((current) => [
      ...current,
      ...Array.from(selectedFiles),
    ]);
  };

  const removeFile = (index: number) => {
    setFiles((current) =>
      current.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  const getIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    if (type.includes("pdf")) return FileText;
    return File;
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminSidebar />

      <main className="ml-[240px]">
        <header className="border-b bg-white px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#087f87]">
            Content Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#172636]">
            File Upload
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Upload and manage documents, resources and media files.
          </p>
        </header>

        <div className="mx-auto max-w-5xl space-y-6 p-8">
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div
              onClick={() => inputRef.current?.click()}
              className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 px-6 py-16 text-center transition hover:border-[#087f87] hover:bg-[#f5fbfb]"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf7f7] text-[#087f87]">
                <UploadCloud size={28} />
              </div>

              <h2 className="mt-5 text-lg font-bold text-slate-900">
                Upload your files
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Click here to select files from your computer.
              </p>

              <button
                type="button"
                className="mt-5 rounded-lg bg-[#087f87] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Choose Files
              </button>

              <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
          </section>

          {files.length > 0 && (
            <section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="border-b p-6">
                <h2 className="font-bold text-slate-900">
                  Selected Files
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Review your files before uploading.
                </p>
              </div>

              <div className="divide-y">
                {files.map((file, index) => {
                  const Icon = getIcon(file.type);

                  return (
                    <div
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between p-5"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7f7] text-[#087f87]">
                          <Icon size={20} />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {file.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end border-t p-5">
                <button
                  type="button"
                  onClick={() =>
                    alert("Files uploaded successfully!")
                  }
                  className="flex items-center gap-2 rounded-lg bg-[#087f87] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#066b72]"
                >
                  <CheckCircle2 size={17} />
                  Upload Files
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}