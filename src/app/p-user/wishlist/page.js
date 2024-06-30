import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/Template/p-user/wishlist/Product";
import ConnectToDb from "../../../../configs/db";
import { authUser } from "@/utils/AuthUser";
import WishlistModel from "../../../models/WishList";

const page = async () => {
    ConnectToDb();
  const user = await authUser();
  const wishlist = await WishlistModel.find({ user: user._id }).populate(
    "product"
  );
  console.log(wishlist)
  return (
    <UserPanelLayout>
      <main>
        <h1 className={styles.title}>
          <span>علاقه مندی ها</span>
        </h1>
        <div className={styles.container}>
          {wishlist.length && wishlist.map((wish) => <Product key={wish._id} data={JSON.parse(JSON.stringify(wish))} />)}
        </div>

        {wishlist.length === 0 && (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        )}
      </main>
    </UserPanelLayout>
  );
};

export default page;
