<template>
  <section class="page">
    <header class="page-head">
      <div>
        <h2>运营概览</h2>
        <p class="page-desc">汇总各业务模块的关键指标，先看总量再看异常。</p>
      </div>
    </header>
    <div class="stat-row">
      <article v-for="card in cards" :key="card.label" class="stat-card">
        <span class="stat-label">{{ card.label }}</span>
        <strong class="stat-value">{{ card.value }}</strong>
      </article>
    </div>
    <table class="data-table">
      <thead>
        <tr><th>业务模块</th><th>今日新增</th><th>待处理</th><th>异常量</th></tr>
      </thead>
      <tbody>
        <tr v-for="row in moduleRows" :key="row.name">
          <td>{{ row.name }}</td>
          <td>{{ row.created }}</td>
          <td>{{ row.pending }}</td>
          <td>{{ row.abnormal }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { fetchJson } from '@/api/client'

type Overview = {
  cards: { label: string; value: number }[]
  modules: { name: string; created: number; pending: number; abnormal: number }[]
}

const cards = ref<Overview['cards']>([])
const moduleRows = ref<Overview['modules']>([])

onMounted(async () => {
  try {
    const payload = await fetchJson<Overview>('/api/overview')
    cards.value = payload.cards
    moduleRows.value = payload.modules
  } catch {
    cards.value = [{"label": "业务模块", "value": 0}, {"label": "今日新增", "value": 0}]
    moduleRows.value = [{"name": "数据源接入", "created": 0, "pending": 0, "abnormal": 0}, {"name": "增量采集", "created": 0, "pending": 0, "abnormal": 0}, {"name": "网页抽取", "created": 0, "pending": 0, "abnormal": 0}, {"name": "自动化采集", "created": 0, "pending": 0, "abnormal": 0}, {"name": "原始数据落地", "created": 0, "pending": 0, "abnormal": 0}, {"name": "结构契约", "created": 0, "pending": 0, "abnormal": 0}, {"name": "数据清洗", "created": 0, "pending": 0, "abnormal": 0}, {"name": "重复消除", "created": 0, "pending": 0, "abnormal": 0}, {"name": "分区规划", "created": 0, "pending": 0, "abnormal": 0}, {"name": "转换编排", "created": 0, "pending": 0, "abnormal": 0}, {"name": "维度建模", "created": 0, "pending": 0, "abnormal": 0}, {"name": "事实建模", "created": 0, "pending": 0, "abnormal": 0}, {"name": "质量校验", "created": 0, "pending": 0, "abnormal": 0}, {"name": "数据血缘", "created": 0, "pending": 0, "abnormal": 0}, {"name": "历史补数", "created": 0, "pending": 0, "abnormal": 0}, {"name": "指标口径", "created": 0, "pending": 0, "abnormal": 0}, {"name": "分析实验", "created": 0, "pending": 0, "abnormal": 0}, {"name": "数据服务发布", "created": 0, "pending": 0, "abnormal": 0}]
  }
})
</script>
