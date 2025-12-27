import { auth } from "@/auth.config";
import { getGroupById } from "@/lib/actions/group.actions";
import { Metadata } from "next";
import Link from "next/link";
import ShareBtn from "./share-leave-btns";

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
      <div className="flex-between">
        <h2 className="h2-bold text-white">{group?.name}</h2>
        <ShareBtn groupId={groupId} />
      </div>

      <p className="mt-5 text-white">
        {group?.groupMembers.map(e => (
          <span className="capitalize" key={e.id}>{e.user.name}, </span>
        ))}
      </p>

      <div className="card-container mt-5">
        {filteredBoards?.map(board => (
          <div key={board.id} className="card">
            <h3 className="h3-bold">{board.owner.name}'s board</h3>
            <p className="my-3">Assigned to: </p>
            <Link href={`/boards/${board.id}`} className="btn-default">
              See the suggestions
            </Link>
          </div>
        ))}
        {filteredBoards?.length == 0 && <div className="text-white">Invite others to share, plan, and celebrate together.</div>}
      </div>
    </div>
  )
}

export default GroupPage;