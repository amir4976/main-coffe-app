import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import React from 'react'
import AddProduct from '@/components/Template/p-admin/Products/AddProduct';
async function page() {
  return (
    <AdminPanelLayout>
    <div>
         <AddProduct/>
    </div>
    </AdminPanelLayout>
  )
}

export default page
