import Image from 'next/image'
import GiftButtons from './gift-buttons';
import { auth } from '@/auth.config';
import { Gift } from '@/types';

const GiftSuggestionCard = async (
    { item }: { item: Gift }
) => {
    // console.log(item)
    const session = await auth();
    const userId = session?.user.id;

    return (
        <div className='flex gap-10'>
            <div>
                <img src={item.image ? item.image : '/placeholder.png'} alt={item.name} className='w-40 h-40' />
            </div>
            <div className='flex flex-col justify-between'>
                <div>
                    <h4 className="h3-bold mb-2">{item.name}</h4>
                    <p>Suggested By: {item.suggestedBy}</p>
                </div>
                {/* <GiftButtons link={item.link} giftId={item.id} userId={userId} /> */}
            </div>
        </div>
    )
}
export default GiftSuggestionCard