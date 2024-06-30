import UserPanelLayout from "@/components/layouts/UserPanelLayout"
// import Ticket from "@/components/Template/p-user/Tickets/Tickets";
import SendTickets from "@/components/Template/p-user/Tickets/SendTickets";
function page() {
  return (
    <>
    <UserPanelLayout>
      <SendTickets/>
    </UserPanelLayout>
    </>
  )
}

export default page
