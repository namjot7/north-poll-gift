'use server'
import { prisma } from "@/db/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";
import { Group } from "@/types";

// To delete files from the UploadThing Database
const utapi = new UTApi();

export async function getGroups(
    session: { user?: { id?: string } } | null
): Promise<Group[]> {
    const groups = await prisma.group.findMany({
        where: {
            groupMembers: {
                some: { userId: session?.user?.id }
            }
        },
        include: {
            groupMembers: {
                include: { user: true }
            }
        },
    });
    // console.log(groups) // groups[0].groupMembers[0].user
    return groups;
}

export async function getGroupById(groupId: string) {
    const groups = await prisma.group.findFirst({
        where: { id: groupId as string },
        include: {
            groupMembers: {
                include: { user: true }
            },
            boards: {
                include: {
                    owner: true
                }
            }
        },
    });
    // console.log(groups)
    return groups;
}

export async function createGroup(
    prevState: { success: boolean, message: string },
    formData: FormData
): Promise<{ success: boolean, message: string }> {
    try {
        const session = await auth();
        const groupName = formData.get('groupName');

        await prisma.group.create({
            data: {
                name: groupName as string,
                createdBy: session?.user?.name as string,
                groupMembers: {
                    create: {
                        userId: session?.user?.id as string,
                    }
                },
                boards: {
                    create: {
                        ownerId: session?.user?.id as string
                    }
                }
            }
        })
        revalidatePath('/dashboard')
        return { success: true, message: "Group created successfully." }
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            return { success: false, message: err.message };
        }
        return { success: false, message: "Unknown error" };
    }
}

export async function joinGroup(
    prevState: { success: boolean, message: string },
    formData: FormData
) {
    try {
        const session = await auth();

        const groupMember = await prisma.groupMember.create({
            data: {
                groupId: formData.get('groupId') as string,
                userId: session?.user?.id as string
            }
        })
        await prisma.board.create({
            data: {
                groupId: groupMember.groupId,
                ownerId: groupMember.userId
            }
        })
        revalidatePath('/dashboard')
        return { success: true, message: "Group joined successfully." }
    }
    catch (error) {
        return { success: false, message: "group does not exist" };
    }
}

export async function renameGroup(
    prevState: { success: boolean; message: string },
    formData: FormData
) {
    const groupId = formData.get("groupId") as string;
    const groupName = formData.get("groupName") as string;

    await prisma.group.update({
        where: { id: groupId },
        data: { name: groupName }
    })
    revalidatePath('/dashboard')
    return { success: true, message: "Group renamed" };
}

export async function deleteGroup(groupId: string) {
    // get all the image keys
    const keysData = await prisma.giftSuggestion.findMany({
        where: {
            board: {
                groupId: groupId,
            }
        },
        select: {
            imageKey: true
        }
    })
    console.log(keysData)

    // create an array out of the keys and filter the empty string values "" 
    const keys = keysData.map(item => item.imageKey).filter((key): key is string => key !== "")
    console.log(keys);

    if (keys.length > 0) {
        await utapi.deleteFiles(keys);
    }


    await prisma.group.delete({ where: { id: groupId } })

    revalidatePath('/dashboard')
    return { success: true, message: "Group deleted" };
}

export async function leaveGroup(groupId: string) {
    await prisma.group.delete({ where: { id: groupId[0] } })
    return { success: true, message: "you have left the group successfully." };

}
