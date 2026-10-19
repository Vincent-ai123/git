# 计算机实习岗位要求与学习路径

> 数据版本：2026-10-19。覆盖 6 类岗位、69 个技能节点、12 份官方 JD 样例。

岗位画像是通用准备模型，学习路径是遵循前置依赖的示例；两者均不是所有雇主的统一门槛。每个岗位单独列出官方 JD 对照，原文要求、加分项与本站建议分别归属。覆盖方向未按招聘数量排名，样本主要来自海外与香港岗位，不能推算中国市场热度。

## 投递前先检查资格

- 在读状态、学位阶段与专业限制
- 预计毕业年月、招聘批次与入职窗口
- 连续实习时长、每周到岗天数和现场/远程安排
- 工作地点、语言、签证/工作许可与岗位开放状态

技术准备不能替代申请资格。节点标记为已验证只代表个人学习记录，不是录用评分。

## 岗位拆解

### C++ 系统与量化开发

从现代 C++、Linux 与网络出发，构建可测试、可回放、可测量的交易与高性能系统。

**为什么选这个方向**

优先衔接已有 C++ 算法基础。先完成共同底座和订单簿项目，再投系统、行情、交易或量化开发；具体语言以目标 JD 为准。

**实习生常见交付**

- 实现行情解析、订单簿、事件回放或 C++ 系统模块
- 处理资源所有权、并发、网络异常和确定性
- 为正确性、延迟、吞吐和内存建立测试与基准

**通用准备建议：优先核心**

- 现代 C++
- 数据结构
- 算法与复杂度
- Linux
- 操作系统
- 计算机网络
- 并发与同步
- SQL 与关系数据
- 构建与依赖管理
- 测试设计
- 调试与故障定位

**通用加分 / 进阶能力**

- 性能分析
- 市场微观结构
- 订单簿与撮合状态
- 行情事件与确定性回放
- 分布式系统
- Python

**建议学习顺序**

默认技术栈：按本岗位基础选择；无额外替代组。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → 面向对象与接口设计 → 构建与依赖管理 → C 语言与内存基础 → 现代 C++ → 数据结构 → 测试设计 → 调试与故障定位。
2. 岗位核心：离散数学与逻辑 → 算法与复杂度 → Linux → 计算机组成与体系结构 → 操作系统 → 计算机网络 → 并发与同步 → SQL 与关系数据 → Socket 与 I/O 多路复用 → 数据库系统 → 金融市场与交易基础 → 市场微观结构 → 订单簿与撮合状态 → 行情事件与确定性回放 → 性能分析。
3. 项目验证：C++ 行情回放与订单簿实验室。
4. 进阶方向（可选）：分布式系统 / Python / 系统设计与可维护性。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- M1：固定事件格式、数据字典、序号和订单状态
- M2：实现新增、撤单和部分成交，验证数量守恒及异常输入
- M3：完成重复/乱序处理与确定性回放，再接入网络或 SQL
- M4：固定硬件、构建和数据，报告 P50/P95 延迟、吞吐与内存

**作品验收与简历证据**

- 支持新增、撤单、部分成交的 C++ 订单簿，具有数量守恒等不变量测试
- 乱序、重复、非法输入与确定性回放的测试记录
- 标明硬件、编译选项、输入规模和计时边界的延迟/吞吐报告

**面试关注点**

- 解释生命周期、RAII、STL、移动语义与资源所有权
- 解释线程同步、TCP 字节流、非阻塞 I/O 与 Linux 调试
- 讲清订单簿结构、事件顺序、测试边界与性能瓶颈

**官方 JD 对照**

- [Databricks · Software Engineering Intern (2027 Start)](JD_EVIDENCE.md#databricks-6866534002)：通用软件工程实习样例，不能据此认定所有后端岗位都要求某一语言。（核查 2026-10-18）
- [NVIDIA · Software Engineering Intern, NCCL - 2026](JD_EVIDENCE.md#nvidia-JR2022645)：专项博士实习样例；不能外推为所有 C++ 或 GPU 实习均要求博士。（核查 2026-10-18）
- [NVIDIA · NVIDIA 2027 Internships: Systems Software Engineering](JD_EVIDENCE.md#nvidia-JR2023492)：原文明确按岗位列举可能技术；不是要求一个人掌握整个列表。 本路线仅展开系统与 GPU 相关知识，原文中的嵌入式方向不再作为岗位入口。（核查 2026-10-18）
- [Jane Street · Linux Engineer · Summer Internship](JD_EVIDENCE.md#janestreet-8625946002)：基础设施系统方向样例；职位元数据是判断其实习性质的依据。（核查 2026-10-18）
- [Jane Street · Software Engineer · Summer Internship](JD_EVIDENCE.md#janestreet-8617298002)：金融公司的软件实习样例，用来展示技术栈差异；OCaml 是其主力语言，不能据此声称量化开发全部要求 C++。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [NVIDIA Careers 学生岗位](https://www.nvidia.com/en-us/about-nvidia/careers/)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）

### 金融科技后端

把金融事件与持仓数据做成可靠 API，重点验证事务、幂等、错误处理和运行可观测性。

**为什么选这个方向**

以 Python/FastAPI 为默认项目入口，复用 C++ 事件项目和数据库基础；Java/Go 按目标 JD 再补，不同时铺开。

**实习生常见交付**

- 维护行情、交易、组合或风控查询 API 与数据库
- 处理重复请求、事务、鉴权、缓存和依赖失败
- 补齐 API 测试、健康检查、延迟指标和部署说明

**通用准备建议：优先核心**

- HTTP 与 API 设计
- 后端服务设计
- SQL 与关系数据
- 数据库系统
- 测试设计
- Linux
- 安全基础与隐私
- 容器与 Docker

**技术栈替代路径**

- Python / Java / Go

每组按目标 JD 选择一条，不代表要掌握所有语言或平台。

**通用加分 / 进阶能力**

- 缓存与消息队列
- 分布式系统
- 日志、指标与可观测性
- 数据建模
- 数据质量与治理
- 金融市场与交易基础

**建议学习顺序**

默认技术栈：Python。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → SQL 与关系数据 → 测试设计 → Python。
2. 岗位核心：计算机网络 → HTTP 与 API 设计 → 数据库系统 → 后端服务设计 → Linux → 安全基础与隐私 → 构建与依赖管理 → 容器与 Docker → 后端服务框架 → 分布式系统 → 缓存与消息队列 → 日志、指标与可观测性。
3. 项目验证：行情与组合查询服务。
4. 进阶方向（可选）：CI/CD 与发布 / 系统设计与可维护性。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 定义 instruments、quotes、trades、portfolio 的数据口径和查询 API
- 实现分页、鉴权、事务与幂等，区分 4xx/5xx 错误
- 注入重复请求、断连、超时和非法参数，验证错误恢复
- 用 Docker Compose 启动服务与数据库，记录延迟及错误率

**作品验收与简历证据**

- 行情与组合查询服务，具有清晰的数据口径和 API 契约
- 覆盖重复写入、数据库断连、超时和非法参数的测试
- Docker Compose 启动服务与数据库，记录延迟与错误率

**面试关注点**

- 解释重试为何可能重复写入，以及幂等键和事务边界
- 分析索引、连接池、缓存失效和消息重复消费
- 沿 SQL、序列化、网络与依赖链排查接口延迟

**官方 JD 对照**

- [Stripe · Software Engineer, Intern](JD_EVIDENCE.md#stripe-8130883)：跨技术栈软件工程样例；前端、后端和基础设施专长在原文列为加分方向。（核查 2026-10-18）
- [Jane Street · Software Engineer · Summer Internship](JD_EVIDENCE.md#janestreet-8617298002)：金融公司的软件实习样例，用来展示技术栈差异；OCaml 是其主力语言，不能据此声称量化开发全部要求 C++。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [阿里巴巴招聘](https://talent.alibaba.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）

### 通用后端与数据平台

复用系统和数据库底座交付服务；按具体 JD 再深入数据管道、质量检查与批流处理。

**为什么选这个方向**

与金融科技共用大部分基础。先选一门后端语言完成服务；目标是数据平台时，再补 Python 数据处理和管道分支。

**实习生常见交付**

- 维护 API、业务逻辑、数据库查询与数据模型
- 编写可重跑的增量数据管道和质量检查
- 排查慢查询、坏数据、迟到事件与服务故障

**通用准备建议：优先核心**

- HTTP 与 API 设计
- 数据库系统
- SQL 与关系数据
- Linux
- 测试设计
- 数据结构
- 算法与复杂度

**技术栈替代路径**

- Python / Java / Go / 现代 C++

每组按目标 JD 选择一条，不代表要掌握所有语言或平台。

**通用加分 / 进阶能力**

- 后端服务设计
- 后端服务框架
- 数据建模
- ETL 与数据管道
- 数据质量与治理
- 数据仓库与建模
- 流式与分布式数据
- 分布式系统
- 容器与 Docker
- CI/CD 与发布
- 日志、指标与可观测性
- 系统设计与可维护性

**建议学习顺序**

默认技术栈：Python。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → SQL 与关系数据 → 测试设计 → Python。
2. 岗位核心：计算机网络 → HTTP 与 API 设计 → 数据库系统 → Linux → 数据结构 → 离散数学与逻辑 → 算法与复杂度 → 计算机组成与体系结构 → 操作系统 → 后端服务设计 → 后端服务框架 → 数据建模 → 数据质量与治理 → 构建与依赖管理 → 容器与 Docker。
3. 项目验证：可部署的数据查询服务与可重跑数据管道。
4. 进阶方向（可选）：ETL 与数据管道 / 数据仓库与建模 / 流式与分布式数据 / 缓存与消息队列 / 分布式系统 / 日志、指标与可观测性。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 定义事件粒度、主键、表结构和查询 API
- 实现校验、事务、迁移与边界测试，完成服务部署
- 数据平台扩展：用 Python 处理重复、缺失和迟到事件，支持增量重跑
- 保存 EXPLAIN、质量报告和一次故障定位记录

**作品验收与简历证据**

- 有持久化、输入校验、测试和部署方式的服务
- 可重跑管道或增量任务，覆盖重复、缺失与迟到数据
- 索引/查询计划、数据字典和一次故障分析报告

**面试关注点**

- 数据结构与算法、OS/网络/数据库基础
- 解释索引、事务、数据口径、增量加载和幂等
- 说明批处理/流式处理以及服务设计的取舍

**官方 JD 对照**

- [Databricks · Software Engineering Intern (2027 Start)](JD_EVIDENCE.md#databricks-6866534002)：通用软件工程实习样例，不能据此认定所有后端岗位都要求某一语言。（核查 2026-10-18）
- [Stripe · Software Engineer, Intern](JD_EVIDENCE.md#stripe-8130883)：跨技术栈软件工程样例；前端、后端和基础设施专长在原文列为加分方向。（核查 2026-10-18）
- [Cloudflare · Software Engineer Intern (2027)](JD_EVIDENCE.md#cloudflare-8199958)：互联网规模系统的软件工程样例；平台/SRE 关联来自系统职责，原文不是专门的 SRE 职位。（核查 2026-10-18）
- [Verkada · Backend Software Engineering Intern 2027](JD_EVIDENCE.md#verkada-5210813007)：具体公司的后端技术栈样例；其既往实习经历要求不是所有公司共有的门槛。（核查 2026-10-18）
- [Jane Street · Software Engineer · Summer Internship](JD_EVIDENCE.md#janestreet-8617298002)：金融公司的软件实习样例，用来展示技术栈差异；OCaml 是其主力语言，不能据此声称量化开发全部要求 C++。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [阿里巴巴招聘](https://talent.alibaba.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）

### AI 应用 / Agent / RAG

在 Python 与 API 底座上构建有引用、可评测、可追踪、能控制工具权限的金融文档助手。

**为什么选这个方向**

先完成 Python、API 与数据质量基础，再做金融文档助手。此路线偏应用工程，预训练和前沿算法研究暂不列为短期求职目标。

**实习生常见交付**

- 搭建文档解析、检索、生成和引用链路
- 集成外部工具、模型 API 和业务服务
- 建设评测集，追踪质量、延迟、成本和安全问题

**通用准备建议：优先核心**

- Python
- HTTP 与 API 设计
- 大语言模型基础
- RAG 与信息检索
- LLM 评测与安全
- 测试设计
- 安全基础与隐私

**通用加分 / 进阶能力**

- Agent 与工具调用
- 向量检索
- 数据质量与治理
- 容器与 Docker
- 日志、指标与可观测性

**建议学习顺序**

默认技术栈：按本岗位基础选择；无额外替代组。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → Python → 计算机网络 → HTTP 与 API 设计 → 测试设计 → 数据质量与治理。
2. 岗位核心：大语言模型基础 → RAG 与信息检索 → LLM 评测与安全 → 安全基础与隐私 → SQL 与关系数据 → 数据库系统 → 向量检索 → Agent 与工具调用。
3. 项目验证：金融公告 / 年报研究助手。
4. 进阶方向（可选）：容器与 Docker / 日志、指标与可观测性 / 模型服务与 MLOps。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 建立模型 API、结构化输出、流式响应和异常处理
- 解析授权文档，比较关键词、向量、混合检索与重排，并返回引用
- 实现受限工具调用、参数 schema、超时、幂等与终止条件
- 用至少 30 个固定问题评测召回、引用、拒答、延迟与成本，整理失败表

**作品验收与简历证据**

- 金融公告/年报助手，答案返回文档名及页码/段落引用
- 至少 30 个固定问题，覆盖答案、证据和不可回答问题
- 比较关键词、向量与混合检索，报告引用正确率、拒答、延迟、成本和失败类型

**面试关注点**

- 解释检索失败和模型幻觉如何区分
- 设计受限工具调用与重复调用防护
- 提出可复现的质量评测与成本优化方法

**官方 JD 对照**

- [Databricks · PhD GenAI Research Scientist Intern](JD_EVIDENCE.md#databricks-7011263002)：AI 应用的相邻研究样例，用于说明应用工程与模型研究的分界；博士要求仅归属此职位。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [NVIDIA Careers 学生岗位](https://www.nvidia.com/en-us/about-nvidia/careers/)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [阿里巴巴招聘](https://talent.alibaba.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）

### 量化研究

提出可证伪假设，用统计与严谨回测判断策略是否有样本外价值。

**为什么选这个方向**

作为长期补充，与工程主线并行积累概率、统计和实证研究能力；先用基线和样本外证据验证假设，不以回测收益替代研究过程。

**实习生常见交付**

- 探索市场数据并提出研究假设
- 构建信号、评估基准、成本和样本外表现
- 做稳健性分析并记录未成功的实验

**通用准备建议：优先核心**

- Python
- 概率统计
- 线性代数与数值基础
- 回归与时间序列
- 金融市场与交易基础
- 量化研究设计
- 回测与事件驱动模拟
- 模型评估与实验
- 数据质量与治理

**通用加分 / 进阶能力**

- 市场微观结构
- 机器学习
- SQL 与关系数据
- 特征工程
- 实验复现与研究表达

**建议学习顺序**

默认技术栈：按本岗位基础选择；无额外替代组。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → Python → SQL 与关系数据 → NumPy / Pandas 数据实验 → 概率统计 → 线性代数与数值基础。
2. 岗位核心：回归与时间序列 → 金融市场与交易基础 → 机器学习 → 模型评估与实验 → 数据质量与治理 → 回测与事件驱动模拟 → 量化研究设计。
3. 项目验证：含基线、样本外、成本与稳健性的量化研究报告。
4. 进阶方向（可选）：特征工程 / 市场微观结构 / 实验复现与研究表达。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 提出可证伪假设，固定数据版本、时点与样本范围
- 建立简单基准，按时间切分训练/验证/测试并做滚动评估
- 计入手续费、滑点、换手与容量，排查未来信息和选择偏差
- 报告参数敏感性、子样本稳健性、负结果与限制

**作品验收与简历证据**

- 可复现实验报告，包含假设、基准、交易成本
- 按时间切分的样本外评估与稳健性检验
- 记录负结果、参数敏感性和研究限制

**面试关注点**

- 解释统计显著性与实际收益的差别
- 识别未来函数、过拟合和多重检验风险
- 说明为何实验能或不能支持研究假设

**官方 JD 对照**

- [Jane Street · Quantitative Researcher · Summer Internship](JD_EVIDENCE.md#janestreet-8623868002)：金融知识可在实习中学习；地图中的金融/回测准备是通用建议，不是这条 JD 的统一申请前提。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [NVIDIA Careers 学生岗位](https://www.nvidia.com/en-us/about-nvidia/careers/)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [阿里巴巴招聘](https://talent.alibaba.com/)（公司招聘入口）

### AI 基础设施 / GPU 系统

优化训练或推理系统的吞吐、延迟、内存和资源利用率。

**为什么选这个方向**

完成 C++、体系结构与性能分析主线后再探索。先做可测量的小算子或推理服务，区分会调用 GPU 与会定位性能瓶颈。

**实习生常见交付**

- 分析模型服务、训练作业或算子中的性能瓶颈
- 实现系统工具、运行时集成、并行通信或 GPU kernel
- 用 profiler 和受控 benchmark 验证改动，记录精度影响

**通用准备建议：优先核心**

- 现代 C++
- Python
- Linux
- 操作系统
- 并发与同步
- 性能分析

**技术栈替代路径**

- CUDA 编程 / Triton GPU 编程

每组按目标 JD 选择一条，不代表要掌握所有语言或平台。

**通用加分 / 进阶能力**

- 分布式系统
- 容器与 Docker
- GPU 性能分析
- 模型服务与 MLOps
- 推理服务与系统指标
- 线性代数与数值基础
- 云计算基础

**建议学习顺序**

默认技术栈：CUDA 编程。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → 面向对象与接口设计 → 构建与依赖管理 → C 语言与内存基础 → 现代 C++ → Python → 计算机组成与体系结构 → 线性代数与数值基础 → 测试设计。
2. 岗位核心：Linux → 操作系统 → 并发与同步 → 调试与故障定位 → 性能分析 → GPU 并行与内存层次 → CUDA 编程 → 概率统计 → 机器学习 → 微积分与优化基础 → 深度学习 → PyTorch。
3. 项目验证：CPU / PyTorch / CUDA 或 Triton 算子对照实验。
4. 进阶方向（可选）：GPU 性能分析 / 推理服务与系统指标 / 模型服务与 MLOps / 分布式系统。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 选择归约、softmax 或矩阵乘法，先建立 CPU/PyTorch 参考和精度测试
- 用 CUDA 或 Triton 实现简单算子，再用 profiler 判断计算/访存/同步瓶颈
- 区分传输、kernel、同步和端到端计时，固定形状、dtype、硬件和重复次数
- 报告优化适用范围；无 GPU 时先完成 CPU 参考、profiler 学习和代码阅读

**作品验收与简历证据**

- CPU/GPU 或基线/优化对比，包含测量条件
- Profiler 证据与计算、访存、通信瓶颈解释
- 正确性、数值精度和端到端指标均有测试

**面试关注点**

- 讨论线程、访存、通信和资源利用率
- 读性能数据，定位瓶颈并设计可验证实验
- 解释 kernel 正确性、同步和数值精度

**官方 JD 对照**

- [NVIDIA · Software Engineering Intern, NCCL - 2026](JD_EVIDENCE.md#nvidia-JR2022645)：专项博士实习样例；不能外推为所有 C++ 或 GPU 实习均要求博士。（核查 2026-10-18）
- [NVIDIA · NVIDIA 2027 Internships: Systems Software Engineering](JD_EVIDENCE.md#nvidia-JR2023492)：原文明确按岗位列举可能技术；不是要求一个人掌握整个列表。 本路线仅展开系统与 GPU 相关知识，原文中的嵌入式方向不再作为岗位入口。（核查 2026-10-18）
- [NVIDIA · NVIDIA 2027 Internships: Deep Learning](JD_EVIDENCE.md#nvidia-JR2023497)：候选方向汇总；框架、语言与基础设施条目是可变技术栈。（核查 2026-10-18）
- [NVIDIA · NVIDIA Spring 2027 Internships: Developer and Performance Technology](JD_EVIDENCE.md#nvidia-JR2023499)：性能技术方向的长期实习样例；与通用测试开发存在交集，不能替代软件 QA 的完整要求。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [NVIDIA Careers 学生岗位](https://www.nvidia.com/en-us/about-nvidia/careers/)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [PyTorch Tutorials](https://pytorch.org/tutorials/)（技术学习参考）
- [NVIDIA CUDA Programming Guide](https://docs.nvidia.com/cuda/cuda-c-programming-guide/)（技术学习参考）

## 继续使用这份体系

完整知识点与双向依赖见 [SKILL_NETWORK.md](SKILL_NETWORK.md)；分层与关系语义见 [KNOWLEDGE_ARCHITECTURE.md](KNOWLEDGE_ARCHITECTURE.md)；逐条招聘证据见 [JD_EVIDENCE.md](JD_EVIDENCE.md)。
