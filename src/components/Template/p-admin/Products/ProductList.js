import React from 'react'
import styles from '@/styles/p-admin/productList.module.css'
import ProductCard from '@/components/modules/p-admin/ProductCard'
import Product from '@/models/Product'
async function ProductList() {
  const getALLProduct = await Product.find({})
  console.log(getALLProduct) 
  return (
    <div className={styles.PorudctList}>
        <div className={styles.ProductListTitle}>
            <h1>محصولات موجود</h1>
        </div>

        <div className={styles.products}>
            {
              getALLProduct.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))
            }
            {/* <ProductCard /> */}
        </div>
    </div>
  )
}

export default ProductList
