import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import GiftButtons from './gift-buttons';
import { auth } from '@/auth.config';

const GiftSuggestionCard = async (
    { item }: { item: any }
) => {
    // console.log(item)
    const session = await auth();
    if (!session?.user) return null;

    return (
        <div className='flex gap-10 bg-slate-100 p-5'>
            <div>
                <Image src={item.imageUrl} width={200} height={350} alt={item.name} loading='eager' />
            </div>
            <div className='flex flex-col justify-between'>
                <div>
                    <h4 className="h3-bold">{item.name}</h4>
                    <p>Price: {formatCurrency(item.price)}</p>
                    <p className='text-red-500'>total votes: </p>
                    <p>Suggested By: {item.suggestedBy}</p>
                </div>
                <GiftButtons link={item.link} id={item.id} user={session?.user} />
            </div>
        </div>
    )
}

export default GiftSuggestionCard