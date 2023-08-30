import { createRouter, createWebHistory } from '@ionic/vue-router';
import Auth from './modules/auth'
import SupplierTab from '../views/supplier/index'
import StockTab from '../views/stock/index'
import TabsPage from '../views/dashboard/index'
import OrdersPage from '../views/orders/index'

const routes = [
    ...Auth,
    {
        path: '/',
        component: () => import('@/views/landing-page/index'),
    },
    {
        path: '/dash_board/',
        component: TabsPage,
        children: [
            {
                path: '',
                redirect: '/dash_board/plants'
            },
            {
                path: 'plants',
                component: () => import('@/views/dashboard/dashboard/index')
            },
            {
                path: 'plants/single_plant',
                component: () => import('@/views/dashboard/dashboard/modules/single_plant')
            },
            {
                path: 'scan_plant',
                component: () => import('@/views/dashboard/scans/index')
            },
            {
                path: 'staff',
                component: () => import('@/views/dashboard/staff/index')
            },
        ]
    },
    {
        path: '/supplier/',
        component: SupplierTab,
        children: [
            {
                path: 'home',
                component: () => import('@/views/supplier/items/index')
            },
            {
                path: 'request',
                component: () => import('@/views/supplier/request/index')
            }
        ]
    },
    {
        path: '/stock/',
        component: StockTab,
        children: [
            {
                path: 'home',
                component: () => import('@/views/stock/stocks/index')
            },
            {
                path: 'purchaseorder',
                component: () => import('@/views/supplier/request/index')
            },
            {
                path: 'supplyrequest',
                component: () => import('@/views/stock/request/index')
            }
        ]
    },
    {
        path: '/orders/',
        component: OrdersPage,
        children: [
            {
                path: 'home',
                component: () => import('@/views/orders/orders/index')
            },
            {
                path: 'canceledOrders',
                component: () => import('@/views/orders/canceledOrders/index')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
