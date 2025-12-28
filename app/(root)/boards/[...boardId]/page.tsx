import { getBoardById } from '@/lib/actions/board.actions'
import { Metadata } from 'next'
import GiftSuggestionForm from './gift-suggestion-form';
import GiftSuggestionCard from './gift-suggestion-card';
import { getGiftSuggestions } from '@/lib/actions/gift-suggestions.actions';
import { Gift } from '@/types';

export const metadata: Metadata = {
    title: 'Board'
}
const BoardPage = async (
    { params }: { params: Promise<{ boardId: string }> }
) => {
    const { boardId } = await params;
    const board = await getBoardById(boardId[0]);
    // console.log(board)

    const giftSuggestions = await getGiftSuggestions({ boardId });
    // console.log(giftSuggestions)

    return (
        <div className='wrapper text-white'>
            <div className='flex-between mb-5'>
                <h2 className="h2-bold">{board?.owner.name}&apos;s Board</h2>
                <GiftSuggestionForm boardId={boardId} />
            </div>
            <div>
                <h3 className="h3-bold mb-5">Gift Suggestions</h3>
                <div className="card-container">
                    {giftSuggestions.length > 0 && giftSuggestions.map(item => (
                        <GiftSuggestionCard key={item.id} item={item as Gift} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BoardPage