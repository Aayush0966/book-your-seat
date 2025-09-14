import { auth } from "@/auth";
import ProfilePage from "@/components/profile/ProfilePage"
import { fetchUserDetails } from "@/services/userService";
import { redirect } from "next/navigation";
import { Metadata } from "next";

// Force dynamic rendering to prevent build-time database queries
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "My Profile - Book Your Seat",
  description: "Manage your profile, view booking history, and update your personal information. Access all your movie bookings and account settings in one place.",
  keywords: ["profile", "account", "booking history", "user settings", "my bookings", "account management"],
  authors: [{ name: "Book Your Seat" }],
  openGraph: {
    title: "My Profile - Book Your Seat",
    description: "Manage your profile and view your booking history on Book Your Seat.",
    url: "/profile",
    siteName: "Book Your Seat",
    type: "website",
  },
  robots: {
    index: false, // Profile pages should not be indexed
    follow: false,
  },
};

const page = async () => {
  const session = await auth();
  if (!session) redirect('/auth')
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User ID is undefined");
  }
  
  let userDetails = null;
  try {
    userDetails = await fetchUserDetails(parseInt(userId));
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
  
  if (!userDetails) {
    return <div>User details not found</div>;
  }
  return (
    <ProfilePage userDetails={userDetails} />
  )
}

export default page;