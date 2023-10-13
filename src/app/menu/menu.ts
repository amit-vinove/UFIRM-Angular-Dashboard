import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    type: 'item',
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: 'home',
    url: 'dashboard/analytics',
  },
  {
    id: 'taskManager',
    title: 'Task Manager',
    translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    type: 'item',
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: 'edit',
    url: 'dashboard/taskManager',
  },
  {
    id: 'facility',
    title: 'Facility Team',
    translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    type: 'item',
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: 'users',
    url: 'dashboard/facilityManager',
  },
  {
    id: 'spotVisits',
    title: 'Spot Visit',
    translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    type: 'item',
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: 'search',
    url: 'dashboard/spotVisits',
  },
];
