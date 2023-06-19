import React from 'react'
import { AdminHeader } from './AdminPageComponents/AdminHeader'
import { useData } from '../../Context/Context'
import { TabBox } from './AdminPageComponents/TabBox';
import { AddModal } from './AdminPageComponents/TabBoxTabs.tsx/ProductsTabComponents/AddModal';

export const AdminPage = () => {

  let cookie = document.cookie;

  if (!cookie.includes(`adminLoggedIn=true`)){
    window.location.replace('/');
  }

  return (
    <div>
      <AdminHeader />
      <TabBox      />
    </div>
  )
}
