import { createRouter, createWebHistory } from 'vue-router'

import Overview from '@/views/Overview.vue'
const Datasource = () => import('@/views/datasource/index.vue')
const Extractor = () => import('@/views/extractor/index.vue')
const Crawlrule = () => import('@/views/crawlrule/index.vue')
const Robotflow = () => import('@/views/robotflow/index.vue')
const Landing = () => import('@/views/landing/index.vue')
const Schema = () => import('@/views/schema/index.vue')
const Cleaning = () => import('@/views/cleaning/index.vue')
const Dedup = () => import('@/views/dedup/index.vue')
const Partition = () => import('@/views/partition/index.vue')
const Transform = () => import('@/views/transform/index.vue')
const Dimension = () => import('@/views/dimension/index.vue')
const Factset = () => import('@/views/factset/index.vue')
const Quality = () => import('@/views/quality/index.vue')
const Lineage = () => import('@/views/lineage/index.vue')
const Backfill = () => import('@/views/backfill/index.vue')
const Metric = () => import('@/views/metric/index.vue')
const Analysis = () => import('@/views/analysis/index.vue')
const Delivery = () => import('@/views/delivery/index.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'overview', component: Overview },
    { path: '/datasource', name: 'datasource', component: Datasource },
    { path: '/extractor', name: 'extractor', component: Extractor },
    { path: '/crawlrule', name: 'crawlrule', component: Crawlrule },
    { path: '/robotflow', name: 'robotflow', component: Robotflow },
    { path: '/landing', name: 'landing', component: Landing },
    { path: '/schema', name: 'schema', component: Schema },
    { path: '/cleaning', name: 'cleaning', component: Cleaning },
    { path: '/dedup', name: 'dedup', component: Dedup },
    { path: '/partition', name: 'partition', component: Partition },
    { path: '/transform', name: 'transform', component: Transform },
    { path: '/dimension', name: 'dimension', component: Dimension },
    { path: '/factset', name: 'factset', component: Factset },
    { path: '/quality', name: 'quality', component: Quality },
    { path: '/lineage', name: 'lineage', component: Lineage },
    { path: '/backfill', name: 'backfill', component: Backfill },
    { path: '/metric', name: 'metric', component: Metric },
    { path: '/analysis', name: 'analysis', component: Analysis },
    { path: '/delivery', name: 'delivery', component: Delivery },
  ],
})

export default router
