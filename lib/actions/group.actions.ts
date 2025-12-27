'use server'
import { prisma } from "@/db/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";

export async function getGroups(session: any) {
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
    prevState: any,
    formData: FormData
) {
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
    catch (error: any) {
        if (error.errors) {
            return { success: false, message: error.errors[0].message };
        }
        return { success: false, message: "Failed to create group. Try again.", error };
    }
}

export async function joinGroup(
    prevState: any,
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
        return { success: false, message: "Failed to create group. Try again.", error };
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
    await prisma.group.delete({ where: { id: groupId } })
    revalidatePath('/dashboard')
    return { success: true, message: "Group deleted" };
}

export async function leaveGroup(groupId: string) {
    const res = await prisma.group.delete({ where: { id: groupId[0] } })
    return { success: true, message: "you have left the group successfully." };

}
