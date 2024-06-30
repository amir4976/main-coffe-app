import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/Template/p-user/index/Box";
import Tickets from "@/components/Template/p-user/index/Tickets";
import Orders from "@/components/Template/p-user/index/Orders";
import TicketsModel from "@/models/Tickets";
import ConnectToDb from "../../../configs/db";
import { authUser } from "@/utils/AuthUser";
import CommentModle from "@/models/Comments";
import FavoritesModel from "@/models/WishList";
const page =async () => {
  // get all tickets of the user
  ConnectToDb()
  const user = await authUser()
  const UserID = JSON.parse(JSON.stringify(user._id))
  const findTickets = await TicketsModel.find({userID:UserID}).populate('department')
  // console.log(JSON.parse(JSON.stringify(findTickets)))

  // GET all comment for card 
  const findComments = await CommentModle.find({user:UserID})

  // get all favorite for card 
  const findFavorites = await FavoritesModel.find({user:UserID})


  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={findTickets.length} />
          <Box title="مجموع کامنت ها " value={findComments.length} />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value={findFavorites.length} />
        </section>
        <section className={styles.contents}>
          <Tickets Tickets={JSON.parse(JSON.stringify(findTickets))} />
          <Orders />
        </section>
      </main>
    </Layout>
  );
};

export default page;
