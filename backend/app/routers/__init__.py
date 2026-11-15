"""业务模块路由汇总。

这里统一按别名导入再暴露 ROUTERS：模块名有可能和内置名撞车（某个业务模块就叫 dict、list
这种名字时），按名字直接 import 会把内置类型覆盖掉，函数注解在运行时求值就会报
'module' object is not subscriptable。
"""
from __future__ import annotations

from app.routers import datasource as router_datasource
from app.routers import extractor as router_extractor
from app.routers import crawlrule as router_crawlrule
from app.routers import robotflow as router_robotflow
from app.routers import landing as router_landing
from app.routers import schema as router_schema
from app.routers import cleaning as router_cleaning
from app.routers import dedup as router_dedup
from app.routers import partition as router_partition
from app.routers import transform as router_transform
from app.routers import dimension as router_dimension
from app.routers import factset as router_factset
from app.routers import quality as router_quality
from app.routers import lineage as router_lineage
from app.routers import backfill as router_backfill
from app.routers import metric as router_metric
from app.routers import analysis as router_analysis
from app.routers import delivery as router_delivery

ROUTERS = [router_datasource, router_extractor, router_crawlrule, router_robotflow, router_landing, router_schema, router_cleaning, router_dedup, router_partition, router_transform, router_dimension, router_factset, router_quality, router_lineage, router_backfill, router_metric, router_analysis, router_delivery]
