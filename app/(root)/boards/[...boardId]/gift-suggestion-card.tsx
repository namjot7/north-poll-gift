import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import GiftButtons from './gift-buttons';
import { auth } from '@/auth.config';
import { Gift } from '@/types';

const GiftSuggestionCard = async (
    { item }: { item: Gift }
) => {
    // console.log(item)
    const session = await auth();
    if (!session?.user) return null;
    const userId = session?.user.id;

    return (
        <div className='flex gap-10'>
            <div>
                <Image src={item.imageUrl} width={200} height={350} alt={item.name} loading='eager' />
            </div>
            <div className='flex flex-col justify-between'>
                <div>
                    <h4 className="h3-bold mb-2">{item.name}</h4>
                    <p>Price: {formatCurrency(item.price)}</p>
                    <p>Suggested By: {item.suggestedBy}</p>
                </div>
                <GiftButtons link={item.link} giftId={item.id} userId={userId} />
            </div>
        </div>
    )
}
export default GiftSuggestionCard