import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getBoardById } from '@/lib/actions/board.actions'
import { Metadata } from 'next'
import GiftSuggestionForm from './gift-suggestion-form';
import GiftSuggestionCard from './gift-suggestion-card';
import { getGiftSuggestions } from '@/lib/actions/gift-suggestions.actions';

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
        <div className='wrapper'>
            <h3 className="h1-bold my-10">{board?.owner.name}'s Board</h3>
            {/* <Card className='max-w-xl'>
                <CardHeader className='text-2xl font-medium'>
                    Suggest a gift for {board?.owner.name}
                </CardHeader>
                <CardContent>
                    <GiftSuggestionForm boardId={boardId} />
                </CardContent>
            </Card> */}
            <div>
                <h2 className="h2-bold">Gift Suggestions</h2>
                {giftSuggestions.length > 0 && giftSuggestions.map(item => (
                    <GiftSuggestionCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default BoardPage