import { auth } from '@/auth.config';
import { Gift } from '@/types';
import { FaExternalLinkAlt } from "react-icons/fa";
import GiftActions from './gift-buttons';

const GiftSuggestionCard = async ({ item, boardId }: {
    item: Gift, boardId: string
}
) => {
    // console.log(item)
    const session = await auth();
    const userId = session?.user.id;

    return (
        <div className='card'>
            <div className='h-44 w-full flex-center'>
                <img src={item.image} className='w-44 max-h-full object-cover' alt='product image' />
            </div>
            <div>
                <div className='my-2'>
                    <div className="flex-between gap-2">
                        <h4 className='font-medium'>{item.name}</h4>
                        <div className="">
                            {item.link && <a href={item.link} target="_blank"><FaExternalLinkAlt /></a>}
                        </div>
                    </div>
                    <p className='text-sm text-muted-foreground'>Suggested By: {item.suggestedBy}</p>
                </div>
                <GiftActions giftId={item.id} userId={userId as string} boardId={boardId} />
            </div>
        </div>

    )
}
export default GiftSuggestionCard