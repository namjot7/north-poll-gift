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
                <img src={item.image} className='w-40' alt='product image' />
            </div>
            <div className=''>
                <div className='space-y-1 mb-3'>
                    <h4 className="text-xl font-medium">{item.name}</h4>
                    <p>Suggested By: {item.suggestedBy}</p>
                </div>
                <GiftButtons link={item.link} giftId={item.id} userId={userId as string} />
            </div>
        </div>
    )
}
export default GiftSuggestionCard