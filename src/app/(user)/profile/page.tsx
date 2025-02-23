import { auth } from "@/auth";
import ProfilePage from "@/components/profile/ProfilePage"
import { fetchUserDetails } from "@/services/userService";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session) redirect('/auth')
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User ID is undefined");
  }
  const userDetails = await fetchUserDetails(parseInt(userId))
  if (!userDetails) {
    return <div>User details not found</div>;
  }
  return (
    <ProfilePage userDetails={userDetails} />
  )
}

export default page;