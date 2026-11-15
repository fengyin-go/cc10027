import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'

type ModuleCase = {
  key: string
  fields: string[]
  actions: string[]
  actionTargets: string[]
  shape: string
}

const modules: ModuleCase[] = [
  {
    "key": "datasource",
    "fields": [
      "源端编号",
      "连接类型",
      "接入地址",
      "采样周期",
      "字符编码",
      "连接超时",
      "重试上限",
      "负责人"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "extractor",
    "fields": [
      "采集编号",
      "来源标识",
      "增量字段",
      "游标位置",
      "批次大小",
      "采集间隔",
      "起始水位",
      "截止水位"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "job-timeline"
  },
  {
    "key": "crawlrule",
    "fields": [
      "规则编号",
      "入口地址",
      "页面选择器",
      "正文选择器",
      "分页参数",
      "字符编码",
      "抓取间隔",
      "重试次数"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "robotflow",
    "fields": [
      "流程编号",
      "输入来源",
      "页面定位器",
      "等待条件",
      "动作顺序",
      "结果字段",
      "超时秒数",
      "运行批次"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "job-timeline"
  },
  {
    "key": "landing",
    "fields": [
      "区段编号",
      "来源名称",
      "落地路径",
      "文件格式",
      "批次标识",
      "接收时间",
      "原始行数",
      "校验摘要"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "schema",
    "fields": [
      "契约编号",
      "数据集名称",
      "字段名称",
      "字段类型",
      "可空标识",
      "默认取值",
      "契约版本",
      "生效批次"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "cleaning",
    "fields": [
      "清洗编号",
      "输入数据集",
      "空值策略",
      "格式表达式",
      "异常阈值",
      "输出字段",
      "规则版本",
      "生效日期"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "dedup",
    "fields": [
      "策略编号",
      "输入数据集",
      "业务键列",
      "排序字段",
      "保留顺序",
      "时间窗口",
      "重复阈值",
      "输出数据集"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "partition",
    "fields": [
      "方案编号",
      "数据表名",
      "分区字段",
      "分区粒度",
      "保留天数",
      "冷热阈值",
      "预建天数",
      "目录规则"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "transform",
    "fields": [
      "节点编号",
      "输入数据集",
      "输出数据集",
      "转换表达式",
      "执行顺序",
      "依赖节点",
      "失败策略",
      "调度周期"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "dag-graph"
  },
  {
    "key": "dimension",
    "fields": [
      "维度编号",
      "维度名称",
      "自然键列",
      "代理键列",
      "历史策略",
      "生效字段",
      "失效字段",
      "刷新周期"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "factset",
    "fields": [
      "事实编号",
      "事实名称",
      "粒度说明",
      "关联维度",
      "度量字段",
      "时间字段",
      "主键组合",
      "刷新水位"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "dag-graph"
  },
  {
    "key": "quality",
    "fields": [
      "规则编号",
      "校验数据集",
      "目标字段",
      "校验表达式",
      "阈值下界",
      "阈值上界",
      "采样比例",
      "阻断级别"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  },
  {
    "key": "lineage",
    "fields": [
      "关系编号",
      "上游节点",
      "下游节点",
      "来源字段",
      "目标字段",
      "转换说明",
      "采集批次",
      "关系版本"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "dag-graph"
  },
  {
    "key": "backfill",
    "fields": [
      "批次编号",
      "目标数据集",
      "开始日期",
      "结束日期",
      "并行数量",
      "覆盖策略",
      "完成水位",
      "失败区间"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "job-timeline"
  },
  {
    "key": "metric",
    "fields": [
      "指标编号",
      "指标名称",
      "计算公式",
      "统计粒度",
      "时间范围",
      "筛选条件",
      "精度位数",
      "口径版本"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "analysis-dashboard"
  },
  {
    "key": "analysis",
    "fields": [
      "方案编号",
      "分析数据集",
      "样本范围",
      "分组字段",
      "目标度量",
      "基准区间",
      "比较方法",
      "显著阈值"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "analysis-dashboard"
  },
  {
    "key": "delivery",
    "fields": [
      "服务编号",
      "输出数据集",
      "查询参数",
      "响应字段",
      "缓存秒数",
      "分页上限",
      "发布版本",
      "消费应用"
    ],
    "actions": [
      "提交校验",
      "启用配置",
      "停用配置"
    ],
    "actionTargets": [
      "待校验",
      "已启用",
      "已停用"
    ],
    "shape": "crud-table"
  }
]
const repoKind = 'fullstack'
const crudModules = modules.filter(m => m.shape === 'crud-table')
const dagModules = modules.filter(m => m.shape === 'dag-graph')
const timelineModules = modules.filter(m => m.shape === 'job-timeline')
const analysisModules = modules.filter(m => m.shape === 'analysis-dashboard')

function parseCsv(text: string): string[][] {
  const records: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  const input = text.replace(/^\uFEFF/, '')
  for (let index = 0; index < input.length; index++) {
    const char = input[index]
    if (quoted) {
      if (char === '"' && input[index + 1] === '"') { cell += '"'; index++ }
      else if (char === '"') { quoted = false }
      else { cell += char }
    } else if (char === '"' && cell === '') { quoted = true }
    else if (char === ',') { row.push(cell); cell = '' }
    else if (char === '\n') {
      row.push(cell.replace(/\r$/, ''))
      if (row.some(v => v !== '')) records.push(row)
      row = []; cell = ''
    } else { cell += char }
  }
  row.push(cell.replace(/\r$/, ''))
  if (row.some(v => v !== '')) records.push(row)
  return records
}

test('CRUD模块：筛选、导出、登记、动作、指标全链路', async ({ page }) => {
  test.setTimeout(300_000)
  const browserErrors: string[] = []
  page.on('pageerror', e => browserErrors.push(e.message))
  page.on('response', r => { if (r.url().includes('/api/') && r.status()>=400) browserErrors.push(`${r.status()} ${r.url()}`) })
  if (crudModules.length === 0) { test.skip(); return }

  for (const mod of crudModules) {
    await page.goto(`/${mod.key}`)
    const bodyRows = page.locator('tbody tr[data-testid^="row-"]')
    await expect(bodyRows).toHaveCount(3)
    const firstValue = await bodyRows.nth(0).locator('td').nth(0).innerText()

    await page.getByTestId(`filter-${mod.fields[0]}`).fill(firstValue)
    await page.getByTestId('query').click()
    await expect(bodyRows).toHaveCount(1)
    await page.getByTestId('reset').click()
    await expect(bodyRows).toHaveCount(3)

    const downloadPromise = page.waitForEvent('download')
    await page.getByTestId('export').click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe(`${mod.key}.csv`)

    const createdValues = mod.fields.map((f, i) => `验收-${mod.key}-${i+1}`)
    await page.getByTestId('open-create').click()
    await expect(page.getByTestId('create-modal')).toBeVisible()
    for (const [i, field] of mod.fields.entries()) {
      await page.getByTestId(`create-${field}`).fill(createdValues[i])
    }
    await page.getByTestId('submit-create').click()
    await expect(page.getByTestId('create-modal')).toHaveCount(0)
    await expect(bodyRows).toHaveCount(4)

    const createdRow = page.locator('tbody tr').filter({ hasText: createdValues[0] })
    for (const [i, action] of mod.actions.entries()) {
      await createdRow.getByRole('button', { name: action, exact: true }).click()
      await expect(createdRow).toHaveAttribute('data-status', mod.actionTargets[i])
    }
  }

  expect(browserErrors).toEqual([])
})

test('DAG拓扑模块：节点渲染、详情、动作、导出', async ({ page }) => {
  test.setTimeout(300_000)
  const browserErrors: string[] = []
  page.on('pageerror', e => browserErrors.push(e.message))
  page.on('response', r => { if (r.url().includes('/api/') && r.status()>=400) browserErrors.push(`${r.status()} ${r.url()}`) })
  if (dagModules.length === 0) { test.skip(); return }

  for (const mod of dagModules) {
    await page.goto(`/${mod.key}`)
    await expect(page.locator('svg.dag-svg')).toBeVisible()
    const nodes = page.locator('g.dag-node')
    const count = await nodes.count()
    expect(count).toBeGreaterThanOrEqual(3)

    await nodes.first().click()
    await expect(page.getByTestId('dag-detail')).toBeVisible()

    const downloadPromise = page.waitForEvent('download')
    await page.getByTestId('export').click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe(`${mod.key}.csv`)

    await page.getByTestId('open-create').click()
    await expect(page.getByTestId('create-modal')).toBeVisible()
    for (const [i, field] of mod.fields.slice(0,3).entries()) {
      await page.locator('.create-field input').nth(i).fill(`E2E-${mod.key}-${i}`)
    }
    await page.getByTestId('submit-create').click()
    await expect(page.getByTestId('create-modal')).toHaveCount(0)
  }

  expect(browserErrors).toEqual([])
})

test('时间线模块：甘特条渲染、日期筛选、日志查看、登记', async ({ page }) => {
  test.setTimeout(300_000)
  const browserErrors: string[] = []
  page.on('pageerror', e => browserErrors.push(e.message))
  page.on('response', r => { if (r.url().includes('/api/') && r.status()>=400) browserErrors.push(`${r.status()} ${r.url()}`) })
  if (timelineModules.length === 0) { test.skip(); return }

  for (const mod of timelineModules) {
    await page.goto(`/${mod.key}`)
    const bars = page.locator('.timeline-bar')
    const count = await bars.count()
    expect(count).toBeGreaterThanOrEqual(3)

    await bars.first().click()
    await expect(page.getByTestId('timeline-log')).toBeVisible()

    const downloadPromise = page.waitForEvent('download')
    await page.getByTestId('export').click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe(`${mod.key}.csv`)

    await page.getByTestId('open-create').click()
    await expect(page.getByTestId('create-modal')).toBeVisible()
    for (const [i, field] of mod.fields.slice(0,3).entries()) {
      await page.locator('.create-field input').nth(i).fill(`E2E-${mod.key}-${i}`)
    }
    await page.getByTestId('submit-create').click()
    await expect(page.getByTestId('create-modal')).toHaveCount(0)
  }

  expect(browserErrors).toEqual([])
})

test('分析看板模块：KPI卡片、运行分析、图表渲染', async ({ page }) => {
  test.setTimeout(300_000)
  const browserErrors: string[] = []
  page.on('pageerror', e => browserErrors.push(e.message))
  page.on('response', r => { if (r.url().includes('/api/') && r.status()>=400) browserErrors.push(`${r.status()} ${r.url()}`) })
  if (analysisModules.length === 0) { test.skip(); return }

  for (const mod of analysisModules) {
    await page.goto(`/${mod.key}`)
    const kpiCards = page.getByTestId('kpi-card')
    const kpiCount = await kpiCards.count()
    expect(kpiCount).toBeGreaterThanOrEqual(2)
    await expect(kpiCards.first().locator('strong')).toBeVisible()

    await page.getByTestId('run-analysis').click()
    await expect(page.locator('.analysis-bar').first()).toBeVisible({ timeout: 5000 })
    await expect(page.locator('.data-table tbody tr').first()).toBeVisible({ timeout: 5000 })
  }

  expect(browserErrors).toEqual([])
})

test('概览汇总', async ({ page }) => {
  test.setTimeout(300_000)
  const totalNew = modules.length * 3
  await page.goto('/')
  await expect(page.locator('.stat-value').nth(1)).toHaveText(String(totalNew))
})
