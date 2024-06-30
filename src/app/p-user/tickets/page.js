import Layout from "@/components/layouts/UserPanelLayout";
import Tickets from "@/components/Template/p-user/Tickets/Tickets";
import ConnectToDb from "../../../../configs/db";
import { authUser } from "@/utils/AuthUser";
import TicketModel from "@/models/Tickets";

const page = async () => {
  console.log('object')
  ConnectToDb();
  const user = await authUser();
  const userId = JSON.parse(JSON.stringify(user._id));
  const tickets = await TicketModel.find({ userID: userId }).populate(
    "department",
    "title"
  ).sort({_id:-1});
  console.log(tickets)
  return (
    <Layout>
      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </Layout>
  );
};

export default page;