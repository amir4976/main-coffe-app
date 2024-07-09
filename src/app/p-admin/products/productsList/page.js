import React from 'react'
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import ProductList from '@/components/Template/p-admin/Products/ProductList'
function page() {
  return (
    <div>
      <AdminPanelLayout>
          <ProductList/>
      </AdminPanelLayout>
    </div>
  )
}

export default page
