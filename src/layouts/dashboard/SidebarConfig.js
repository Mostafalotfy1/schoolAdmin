import { Icon, InlineIcon } from '@iconify/react';
import shieldFill from '@iconify-icons/eva/shield-fill';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import plusSquareFill from '@iconify-icons/eva/plus-square-fill';
import edit2Fill from '@iconify-icons/eva/edit-2-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import emailOutline from '@iconify-icons/eva/email-outline';
import personDoneFill from '@iconify-icons/eva/person-done-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'الرئيسية',
    path: '/dashboard',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'المستخدمين',
    path: '/dashboard/patients',
    icon: getIcon(peopleFill)
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon(shoppingBagFill)
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill)
  // },

  {
    title: 'الادارة',
    path: '/dashboard/AdminList',
    icon: getIcon(shieldFill)
  },
  // {
  //   title: 'Patient Drugs',
  //   path: '/dashboard/PatientDrugs',
  //   icon: getIcon(edit2Fill)
  // }
  // ,
  {
    title: 'رسائل',
    path: '/dashboard/Messages',
    icon: getIcon(emailOutline)
  }
  ,
  {
    title: 'الاعدادت',
    path: '/dashboard/DoctorList',
    icon: getIcon(plusSquareFill)
  }
  // ,
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
