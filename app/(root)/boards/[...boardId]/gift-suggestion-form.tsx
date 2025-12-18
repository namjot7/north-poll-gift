'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { submitGiftSuggestionForm } from '@/lib/actions/gift-suggestions.actions';
import { giftFormDefault } from '@/lib/constants';
import { useActionState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const GiftSuggestionForm = ({ boardId }: { boardId: string }) => {
    const [data, action] = useActionState(submitGiftSuggestionForm, {
        success: false, message: ""
    })
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="default">Suggest a gift</Button>
                </DialogTrigger>
                <DialogContent className="w-sm">
                    <DialogHeader>
                        <DialogTitle>Suggest a gift</DialogTitle>
                    </DialogHeader>
                    <form action={action}>
                        <div className='space-y-4'>
                            <div className='space-y-3'>
                                <Label htmlFor='name'>Gift Name</Label>
                                <Input name='name' id='name' type='text' required defaultValue={giftFormDefault.name} autoComplete='true' />
                            </div>
                            <div className='space-y-3'>
                                <Label htmlFor='link'>Link (optional)</Label>
                                <Input name='link' id='link' type='text' defaultValue={giftFormDefault.link} />
                            </div>
                            <div className='space-y-3'>
                                <Label htmlFor='imageUrl'>Upload a image  (optional)</Label>
                                <Input name='imageUrl' id='imageUrl' type='text' defaultValue={giftFormDefault.imageUrl} />
                            </div>
                            <div className='space-y-3'>
                                <Label htmlFor='price'>Price Range (in CAD)</Label>
                                <Input name='price' id='price' type='number' defaultValue={giftFormDefault.price} />
                            </div>
                            <Input name='boardId' id='boardId' type='text' defaultValue={boardId} hidden />
                            <Button type='submit' className='w-full'>Add suggestion</Button>
                        </div>
                    </form>
                </DialogContent>
            </form>
        </Dialog>

    )
}

export default GiftSuggestionForm;