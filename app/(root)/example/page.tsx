"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadButton, useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string | undefined>(undefined)

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            console.log(res)
            const url = res[0].ufsUrl;
        },
        onUploadError: (error) => {
            alert(error.message);
        },
    });
    const handleSubmit = async () => {
        if (!file) return;
        await startUpload([file]);
    }
    return (
        <main className=" text-white">
            <div className="bg-gray-900 p-10">
                <form action="">
                    <div className="min-h-10 bg-white">
                        <Input
                            type="file" accept="image/*"
                            onChange={e => setFile(e.target.files?.[0] ?? null)}
                        />
                        {file && <img src={URL.createObjectURL(file)} className="w-40" />}
                        <Button type="button" onClick={handleSubmit}>
                            {isUploading ? "Uploading..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
}
