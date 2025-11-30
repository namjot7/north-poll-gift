import { auth } from "@/auth.config"
import { Button } from "@/components/ui/button"
import { getGroupById } from "@/lib/actions/group.actions"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Group'
}

const GroupPage = async (
  { params }: { params: Promise<{ groupId: string }> }
) => {
  const session = await auth()
  const { groupId } = await params;
  const group = await getGroupById(groupId[0]);
  const boards = await group?.boards;

  const filteredBoards = await group?.boards?.filter(board => {
    if (board.ownerId !== session?.user?.id) return board
  })
  // console.log({ filteredBoards })
  // console.log(group)
  // console.log(boards)

  return (
    <div className="wrapper">
      <h2 className="h1-bold mb-5">{group?.name} - All Boards</h2>

      <div>
        <p>Invite other people using this groupId</p>
        <p className="text-red-400 text-sm">add a copy to clipboard icon</p>
        <Button variant={'outline'}>{groupId}</Button>
        <p className="mt-5">Members: {group?.groupMembers.map(e => (
          <span key={e.id}>{e.user.name}, </span>
        ))} </p>
      </div>

      <div className="mt-5">
        <div className="grid grid-cols-2 gap-3">
          {filteredBoards?.map(board => (
            <div key={board.id} className="card">
              <h3 className="h3-bold mb-5">{board.owner.name}'s board</h3>
              <Link href={`/boards/${board.id}`} className="btn-default">
                See the suggestions
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GroupPage;