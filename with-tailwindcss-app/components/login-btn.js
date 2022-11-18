import { useSession, signIn, signOut } from "next-auth/react"
import {UserCircleIcon} from "@heroicons/react/solid"



export default function LogInOutButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
     <UserCircleIcon className="h-6 cursor-pointer"/>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}