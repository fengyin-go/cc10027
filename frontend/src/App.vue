<template>
  <div class="app-shell">
    <aside class="app-side">
      <h1 class="app-title">数据工程链路开发平台</h1>
      <nav class="nav-list">
        <RouterLink v-for="item in navItems" :key="item.path" :to="item.path" class="nav-item">
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>
    <main class="app-main">
      <header class="app-head">
        <span class="head-desc">面向数据接入、原始落地、清洗转换、分层建模、质量校验、血缘追踪与数据服务发布的数据工程开发平台。</span>
        <span class="head-user">当前值班：{{ store.operator }} · {{ store.shiftLabel }}</span>
      </header>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/session'

const store = useSessionStore()

const navItems = [{ label: "运营概览", path: "/" }, { label: "数据源接入", path: "/datasource" }, { label: "增量采集", path: "/extractor" }, { label: "网页抽取", path: "/crawlrule" }, { label: "自动化采集", path: "/robotflow" }, { label: "原始数据落地", path: "/landing" }, { label: "结构契约", path: "/schema" }, { label: "数据清洗", path: "/cleaning" }, { label: "重复消除", path: "/dedup" }, { label: "分区规划", path: "/partition" }, { label: "转换编排", path: "/transform" }, { label: "维度建模", path: "/dimension" }, { label: "事实建模", path: "/factset" }, { label: "质量校验", path: "/quality" }, { label: "数据血缘", path: "/lineage" }, { label: "历史补数", path: "/backfill" }, { label: "指标口径", path: "/metric" }, { label: "分析实验", path: "/analysis" }, { label: "数据服务发布", path: "/delivery" }]
</script>
