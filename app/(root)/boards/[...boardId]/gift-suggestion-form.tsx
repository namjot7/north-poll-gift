"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getLinkDetails, submitGiftSuggestionForm } from "@/lib/actions/gift-suggestions.actions";
import { useUploadThing } from "@/lib/uploadthing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { toast } from "sonner";

export default function GiftSuggestionDialog({ boardId }: { boardId: string }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  // Upload image to UploadThing
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      // console.log(res)
    },
    onUploadError: (error) => {
      alert(error.message);
    },
  });

  // Get product details from the link
  const fetchPreview = async () => {
    if (!link) return;

    setLoading(true);
    const data = await getLinkDetails(link);

    setName(data.shortTitle || "");
    setImage(data.image || "/placeholder.png");

    setLoading(false);
  }
  // Submit final form
  const handleSubmit = async () => {
    if (!file && !image) {
      alert("Please select an image");
      return;
    }
    const formData = new FormData();

    formData.append("name", name);
    formData.append("link", link);
    formData.append("boardId", boardId);

    let imageUrl = image;

    if (file) {
      const res = await startUpload([file]);
      if (!res) return;
      // console.log(res)
      imageUrl = res[0].ufsUrl;
      formData.append('imageKey', res[0].key);
    }
    formData.append("image", imageUrl!); // tells TypeScript - imageUrl is never null or undefined

    const res = await submitGiftSuggestionForm(formData, boardId);

    if (res.success) {
      toast.success('Suggestion added')
      setOpen(false);
      setName("");
      setLink("");
      setFile(null);
      setImage(undefined);
    }
  }

  return (
    <div className="space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Suggest a gift</Button>
        </DialogTrigger>
        <DialogContent className="w-sm">
          <DialogHeader>
            <DialogTitle>Suggest a gift</DialogTitle>
          </DialogHeader>
          <DialogDescription />
          {/* Step 1 - paste link */}
          <div className="space-y-2 mb-3">
            <Label>Product link</Label>
            <Input
              value={link} type="text"
              onChange={(e) => setLink(e.target.value)}
              placeholder="Paste product link"
            />
            <Button onClick={fetchPreview} disabled={loading}>
              {loading ? "Fetching…" : "Fetch details"}
            </Button>
          </div>

          {/* Step 2 - final form*/}
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Gift name</Label>
              <Input
                value={name} type="text" required
                onChange={e => setName(e.target.value)}
              />
            </div>

            {/* Image preview */}
            <div className="space-y-2">
              <Label>Image</Label>

              {/* Get image from the link */}
              {image && !file && (
                <img src={image} className="w-32 rounded-md" />
              )}

              {/* Upload image and show it */}
              {file && <img src={URL.createObjectURL(file)} className="w-32" />}
              <Input
                type="file" accept="image/*"
                onChange={e => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <Button type="submit" className="w-full">
              {isUploading ? "Uploading..." : "Add suggestion"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
