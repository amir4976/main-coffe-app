import Table from "@/components/Template/p-admin/discounts/Table";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/Template/p-admin/discounts/table.module.css";
import ConnectToDb from "../../../../configs/db";
import DiscountModel from "@/models/Discount";
import Inputs from "@/components/Template/p-admin/discounts/inputs";
import ProductModel from "@/models/Product";
import product from "@/app/product/[id]/page";
const Discounts = async () => {

  ConnectToDb();
  const discounts = await DiscountModel.find({}).lean();
  const products = await ProductModel.find({}).lean();

  return (
    <Layout>
      <main>
        <Inputs products={JSON.parse(JSON.stringify(products))} />

        {discounts.length === 0 ? (
          <p className={styles.empty}>کد تخفیفی وجود ندارد</p>
        ) : (
          <Table
            discounts={JSON.parse(JSON.stringify(discounts))}
            title="لیست تخفیفات"
          />
        )}
      </main>
    </Layout>
  );
};

export default Discounts;
