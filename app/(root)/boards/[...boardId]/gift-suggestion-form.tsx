'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { submitGiftSuggestionForm } from '@/lib/actions/gift-suggestions.actions';
import { giftFormDefault } from '@/lib/constants';
import { useActionState } from 'react';

const GiftSuggestionForm = ({ boardId }: { boardId: string }) => {
    const [data, action] = useActionState(submitGiftSuggestionForm, {
        success: false, message: ""
    })
    return (
        <form action={action}>
            <div className='flex flex-col gap-6'>
                <div className='grid gap-2'>
                    <Label htmlFor='name'>Gift Name</Label>
                    <Input name='name' id='name' type='text' required defaultValue={giftFormDefault.name} autoComplete='true' />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor='link'>Link</Label>
                    <Input name='link' id='link' type='text' defaultValue={giftFormDefault.link} />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor='imageUrl'>Upload a image</Label>
                    <Input name='imageUrl' id='imageUrl' type='text' required defaultValue={giftFormDefault.imageUrl} />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor='price'>Price Range (in CAD)</Label>
                    <Input name='price' id='price' type='number' defaultValue={giftFormDefault.price} />
                </div>
                <Input name='boardId' id='boardId' type='text' defaultValue={boardId} hidden />
                <Button type='submit' className='w-full'>Add suggestion</Button>
            </div>
        </form>
    )
}

export default GiftSuggestionForm;