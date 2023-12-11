import UserInfoView from "@/view/UserInfoView"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"

function UserInfo() {
    return (
     <UserInfoView />
    )
}

export default UserInfo