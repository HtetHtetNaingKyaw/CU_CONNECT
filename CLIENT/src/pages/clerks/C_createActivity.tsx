import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  useUploadActivity,
  useUploadActivityImage,
} from "../../react-query/clerk";
import toast from "react-hot-toast";

const C_Home = () => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [image, setImage] = useState<File[]>([]);

  const { register, handleSubmit, reset } = useForm({});

  //react drop zone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const urls = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    setImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const { mutate: uploadActivity } = useUploadActivity();
  const { mutate: uploadImage, isPending } = useUploadActivityImage();

  const onSubmit = (data: any) => {
    uploadActivity(data, {
      onSuccess: (res: any) => {
        uploadImage(
          { activityId: res.activity.id, image },
          {
            onSuccess: () => {
              toast.success("Images uploaded successfully!");
              reset();
              setImage([]);
              setPreviewUrls([]);
            },
            onError: (err: any) => {
              toast.error(
                err?.response?.data?.message || "Image upload failed"
              );
            },
          }
        );
        toast.success(res.message);
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center w-full px-4 py-6 gap-6"
    >
      <div className="w-full max-w-2xl border-2 border-dotted border-secondary rounded-lg bg-base-100 p-3">
        <div className="flex justify-center items-center flex-wrap gap-3 mb-3">
          {previewUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              className="w-40 h-40 object-cover rounded-lg border"
              alt={`preview-${index}`}
            />
          ))}
        </div>
        <div {...getRootProps()} className="cursor-pointer text-center">
          <input {...getInputProps()} multiple />
          <p className="text-gray-500 text-sm">
            {isDragActive || previewUrls.length > 0 ? (
              previewUrls.length > 0 ? (
                <span className="underline text-primary">
                  click to reselect image
                </span>
              ) : (
                <span className="text-primary">Drop file Here</span>
              )
            ) : (
              <>
                📎 Drag & drop or{" "}
                <span className="underline text-primary">click to select</span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="w-full max-w-2xl flex flex-col gap-4">
        <textarea
          {...register("title")}
          className="textarea textarea-secondary w-full"
          rows={2}
          placeholder="Title"
        />
        <textarea
          {...register("content")}
          className="textarea textarea-secondary w-full"
          rows={4}
          placeholder="Content"
        />
        <button className="btn btn-primary" type="submit" disabled={isPending}>
          {isPending ? "Uploading..." : "Upload Activity"}
        </button>
      </div>
    </form>
  );
};

export default C_Home;
