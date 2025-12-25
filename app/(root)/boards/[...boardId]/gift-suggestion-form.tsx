// 'use client';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { submitGiftSuggestionForm } from '@/lib/actions/gift-suggestions.actions';
// import { giftFormDefault } from '@/lib/constants';
// import { useActionState } from 'react';
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";

// const GiftSuggestionForm = ({ boardId }: { boardId: string }) => {
//     const [data, action] = useActionState(submitGiftSuggestionForm, {
//         success: false, message: ""
//     })
//     return (
//         <Dialog>
//             <form>
//                 <DialogTrigger asChild>
//                     <Button variant="default">Suggest a gift</Button>
//                 </DialogTrigger>
//                 <DialogContent className="w-sm">
//                     <DialogHeader>
//                         <DialogTitle>Suggest a gift</DialogTitle>
//                     </DialogHeader>
//                     <form action={action}>
//                         <div className='space-y-4'>
//                             <div className='space-y-3'>
//                                 <Label htmlFor='name'>Gift Name</Label>
//                                 <Input name='name' id='name' type='text' required defaultValue={giftFormDefault.name} autoComplete='true' />
//                             </div>
//                             <div className='space-y-3'>
//                                 <Label htmlFor='link'>Link (optional)</Label>
//                                 <Input name='link' id='link' type='text' defaultValue={giftFormDefault.link} />
//                             </div>
//                             <div className='space-y-3'>
//                                 <Label htmlFor='imageUrl'>Upload a image  (optional)</Label>
//                                 <Input name='imageUrl' id='imageUrl' type='text' defaultValue={giftFormDefault.imageUrl} />
//                             </div>
//                             <Input name='boardId' id='boardId' type='text' defaultValue={boardId} hidden />
//                             <Button type='submit' className='w-full'>Add suggestion</Button>
//                         </div>
//                     </form>
//                 </DialogContent>
//             </form>
//         </Dialog>

//     )
// }

// export default GiftSuggestionForm;



"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getLinkDetails, submitGiftSuggestionForm } from "@/lib/actions/gift-suggestions.actions";
import { useUploadThing } from "@/lib/uploadthing";

export default function GiftSuggestionDialog({ boardId }: { boardId: string }) {
  const [link, setLink] = useState("https://spacingstore.ca/collections/t-shirts/products/feral-raccoon-unisex-t-shirt");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  // Get product details from the link
  const fetchPreview = async () => {
    if (!link) return;

    setLoading(true);
    const data = await getLinkDetails(link);

    setName(data.shortTitle || "");
    setImage(data.image || "/placeholder.png");

    setLoading(false);
  }

  // Upload image to UploadThing
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      // console.log(res)
    },
    onUploadError: (error) => {
      alert(error.message);
    },
  });

  // Submit final form
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("link", link);
    formData.append("boardId", boardId);

    if (file) {
      const res = await startUpload([file]);

      if (!res) {
        formData.append('image', '');
        return;
      }
      formData.append("image", res[0].ufsUrl);
    }
    else if (image) {
      formData.append("image", image);
    }
    await submitGiftSuggestionForm(formData);

    // setName("");
    // setLink("");
    // setFile(null);
    // setImage(undefined);
  }

  return (
    <div className="space-y-4">

      {/* Step 1 - paste link */}
      <div className="space-y-2 my-10">
        <Label>Product link</Label>
        <Input
          value={link} type="text"
          onChange={(e) => setLink(e.target.value)}
          placeholder="Paste product link"
        />
        <Button onClick={() => fetchPreview()} disabled={loading}>
          {loading ? "Fetching…" : "Fetch details"}
        </Button>
      </div>

      {/* Step 2 - final form*/}
      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Gift name</Label>
          <Input
            value={name} type="text" required
            onChange={(e) => setName(e.target.value)}
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
    </div>
  );
}
