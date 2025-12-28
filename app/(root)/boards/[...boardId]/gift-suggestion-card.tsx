import { auth } from '@/auth.config';
import { Gift } from '@/types';
import GiftActions from './gift-buttons';
import { SquareArrowOutUpRight } from 'lucide-react';

const GiftSuggestionCard = async ({ item }: {
    item: Gift
}
) => {
    // console.log(item)
    const session = await auth();
    const userId = session?.user.id;

    return (
        <div className='card'>
            <div className='h-44 w-full flex-center'>
                <img src={item.image || '/placeholder.png'} className='w-44 max-h-full object-cover' alt='product image' />
            </div>
            <div>
                <div className='my-2'>
                    <div className="flex-between">
                        <h4 className='font-medium'>{item.name}</h4>
                        <div className="mr-2">
                            {item.link && <a href={item.link} target="_blank"> <SquareArrowOutUpRight className='w-5 h-5' /></a>}
                        </div>
                    </div>
                    <p className='text-sm text-muted-foreground'>Suggested By: {item.suggestedBy}</p>
                </div>
                <GiftActions gift={item} userId={userId as string} />
            </div>
        </div>

    )
}
export default GiftSuggestionCard