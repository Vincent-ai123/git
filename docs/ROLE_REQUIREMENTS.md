# 计算机实习岗位要求与学习路径

> 数据版本：2026-10-18。覆盖 17 类岗位、83 个技能节点、18 份官方 JD 样例。

岗位画像是通用准备模型，学习路径是遵循前置依赖的示例；两者均不是所有雇主的统一门槛。每个岗位单独列出官方 JD 对照，原文要求、加分项与本站建议分别归属。覆盖方向未按招聘数量排名，样本主要来自海外与香港岗位，不能推算中国市场热度。

## 投递前先检查资格

- 在读状态、学位阶段与专业限制
- 预计毕业年月、招聘批次与入职窗口
- 连续实习时长、每周到岗天数和现场/远程安排
- 工作地点、语言、签证/工作许可与岗位开放状态

技术准备不能替代申请资格。节点标记为已验证只代表个人学习记录，不是录用评分。

## 岗位拆解

### 后端开发实习生

把业务需求变成可部署的服务接口、数据模型和后台逻辑。

**为什么选这个方向**

适合喜欢把需求拆成稳定接口、数据流和服务行为的人。

**实习生常见交付**

- 新增或维护 API、业务逻辑和数据库读写
- 修复缺陷，补充日志、监控和自动化测试
- 参与代码评审、接口联调和小型系统设计

**通用准备建议：优先核心**

- HTTP 与 API 设计
- 数据库系统
- SQL 与关系数据
- 测试设计
- Git 版本管理
- Linux

**技术栈替代路径**

- Java / Go / Python

每组按目标 JD 选择一条，不代表要掌握所有语言或平台。

**通用加分 / 进阶能力**

- 后端服务框架
- 缓存与消息队列
- 数据结构
- 算法与复杂度
- 计算机网络
- 分布式系统
- 容器与 Docker
- CI/CD 与发布
- 可观测性与 SRE
- 安全基础与隐私
- 系统设计与可维护性

**建议学习顺序**

默认技术栈：Java。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → SQL 与关系数据 → 测试设计 → 面向对象与接口设计 → Java。
2. 岗位核心：计算机网络 → HTTP 与 API 设计 → 数据库系统 → Linux → 后端服务设计 → 后端服务框架。
3. 项目验证：可部署的预约或订单服务。
4. 进阶方向（可选）：缓存与消息队列 / 分布式系统 / 可观测性与 SRE。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 定义资源、表结构、接口契约与迁移
- 实现鉴权、事务、错误处理和边界测试
- 部署并记录一次慢查询或故障的定位过程

**作品验收与简历证据**

- 一个有 API 文档、测试、错误处理和持久化的服务
- 清楚说明数据模型、索引和一次故障修复
- 可复现的构建与部署说明

**面试关注点**

- 用哈希表、队列等结构解决问题并分析复杂度
- 解释 HTTP、事务、索引和并发边界
- 讲清楚项目中的错误处理与取舍

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

### 前端开发实习生

把产品流程做成响应式、可访问、数据状态清晰的浏览器界面。

**为什么选这个方向**

适合关注用户交互、信息结构和界面工程质量的人。

**实习生常见交付**

- 开发页面、组件、表单、路由或可视化
- 接入 API，处理加载、错误、空数据和权限状态
- 修复兼容、性能、交互和可访问性问题

**通用准备建议：优先核心**

- JavaScript / TypeScript
- HTML、CSS 与浏览器
- 前端框架与状态管理
- HTTP 与 API 设计
- 测试设计
- Git 版本管理
- 前端可访问性

**通用加分 / 进阶能力**

- 算法与复杂度
- Node.js 服务开发
- 安全基础与隐私
- 性能分析
- 系统设计与可维护性

**建议学习顺序**

默认技术栈：按本岗位基础选择；无额外替代组。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → JavaScript / TypeScript → HTML、CSS 与浏览器 → 测试设计。
2. 岗位核心：前端框架与状态管理 → 计算机网络 → HTTP 与 API 设计 → 前端可访问性。
3. 项目验证：可访问的业务工作台。
4. 进阶方向（可选）：性能分析 / 安全基础与隐私 / 系统设计与可维护性。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 拆分页面、组件与状态归属，完成响应式布局
- 接入 API，覆盖表单、加载、空态与错误恢复
- 用键盘和自动化验证主要流程，记录性能改进

**作品验收与简历证据**

- 可访问的响应式应用，具有加载/错误/空态
- 组件与状态设计说明，附交互测试
- 性能或可访问性问题的修复记录

**面试关注点**

- 解释 JavaScript 异步、浏览器事件和渲染
- 拆分组件并管理状态与 API 失败
- 用键盘完成主要流程并说明语义结构

**官方 JD 对照**

- [Stripe · Software Engineer, Intern](JD_EVIDENCE.md#stripe-8130883)：跨技术栈软件工程样例；前端、后端和基础设施专长在原文列为加分方向。（核查 2026-10-18）
- [Verkada · Frontend Software Engineering Intern 2027](JD_EVIDENCE.md#verkada-5210942007)：原文接受多种框架；地图用统一框架节点承载公共概念，并不要求同时学习三种框架。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）
- [MDN Web Docs](https://developer.mozilla.org/)（技术学习参考）

### 全栈开发实习生

跨越浏览器、服务接口和数据持久层，交付完整的小型产品功能。

**为什么选这个方向**

适合希望快速构建完整产品闭环、对前后端都感兴趣的人。

**实习生常见交付**

- 实现页面与服务端 API 的端到端功能
- 设计表结构、验证数据并接入外部服务
- 补齐测试、部署流程和用户可见的错误状态

**通用准备建议：优先核心**

- JavaScript / TypeScript
- HTML、CSS 与浏览器
- 前端框架与状态管理
- Node.js 服务开发
- HTTP 与 API 设计
- SQL 与关系数据
- 数据库系统
- 测试设计

**通用加分 / 进阶能力**

- 数据结构
- 算法与复杂度
- Python
- 容器与 Docker
- CI/CD 与发布
- 安全基础与隐私
- 云计算基础

**建议学习顺序**

默认技术栈：按本岗位基础选择；无额外替代组。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → JavaScript / TypeScript → HTML、CSS 与浏览器 → SQL 与关系数据 → 测试设计。
2. 岗位核心：前端框架与状态管理 → 计算机网络 → HTTP 与 API 设计 → Node.js 服务开发 → 数据库系统。
3. 项目验证：包含账户与数据管理的完整小产品。
4. 进阶方向（可选）：容器与 Docker / CI/CD 与发布 / 安全基础与隐私。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 定义用户流程、数据模型与前后端契约
- 完成前端操作、服务校验和数据持久化闭环
- 为关键路径编写端到端测试并提供部署说明

**作品验收与简历证据**

- 完整前后端功能，含表结构、API 契约和部署方式
- 关键用户路径自动化测试
- 说明自己负责的范围和未解决风险

**面试关注点**

- 从用户需求设计端到端数据流
- 解释前后端校验、认证和数据库事务
- 定位一次跨层错误并描述复现过程

**官方 JD 对照**

- [Databricks · Software Engineering Intern (2027 Start)](JD_EVIDENCE.md#databricks-6866534002)：通用软件工程实习样例，不能据此认定所有后端岗位都要求某一语言。（核查 2026-10-18）
- [Stripe · Software Engineer, Intern](JD_EVIDENCE.md#stripe-8130883)：跨技术栈软件工程样例；前端、后端和基础设施专长在原文列为加分方向。（核查 2026-10-18）
- [Cloudflare · Software Engineer Intern (2027)](JD_EVIDENCE.md#cloudflare-8199958)：互联网规模系统的软件工程样例；平台/SRE 关联来自系统职责，原文不是专门的 SRE 职位。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [阿里巴巴招聘](https://talent.alibaba.com/)（公司招聘入口）
- [GitHub Octoverse](https://github.blog/news-insights/octoverse/)（生态趋势参考）

### C++ / 系统软件实习生

实现高性能或底层模块，精确处理资源、并发、延迟和接口行为。

**为什么选这个方向**

适合愿意深入语言机制、系统行为和性能证据的人。

**实习生常见交付**

- 参与 C++ 模块、组件或基础库开发
- 分析崩溃、内存问题、CPU 热点或线程问题
- 为既有功能增加测试、性能基线和文档

**通用准备建议：优先核心**

- 现代 C++
- 数据结构
- 算法与复杂度
- 操作系统
- Linux
- 并发与同步
- 构建与依赖管理
- 测试设计
- 调试与故障定位

**通用加分 / 进阶能力**

- 计算机网络
- 性能分析
- 分布式系统
- GPU 并行与内存层次
- CUDA 编程

**建议学习顺序**

默认技术栈：按本岗位基础选择；无额外替代组。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → 面向对象与接口设计 → 构建与依赖管理 → 现代 C++ → 数据结构 → 计算机组成与体系结构 → 测试设计。
2. 岗位核心：离散数学与逻辑 → 算法与复杂度 → Linux → 操作系统 → 并发与同步 → 调试与故障定位 → 性能分析。
3. 项目验证：有性能证据的 C++ 缓存或任务执行器。
4. 进阶方向（可选）：计算机网络 / 分布式系统 / CUDA 编程。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 设计所有权、接口与边界，建立正确性测试
- 实现并发或资源管理，定位一次内存/线程缺陷
- 用固定输入与硬件记录比较基线和优化版本

**作品验收与简历证据**

- 有边界测试的 C++ 项目，展示 RAII 和资源所有权
- 基准脚本与硬件/编译条件记录
- 用调试器或 profiler 定位并修复问题的说明

**面试关注点**

- 解释对象生命周期、移动语义和线程安全
- 分析复杂度、内存布局和常见并发缺陷
- 调试小型 C++ 崩溃或性能问题

**官方 JD 对照**

- [Databricks · Software Engineering Intern (2027 Start)](JD_EVIDENCE.md#databricks-6866534002)：通用软件工程实习样例，不能据此认定所有后端岗位都要求某一语言。（核查 2026-10-18）
- [NVIDIA · Software Engineering Intern, NCCL - 2026](JD_EVIDENCE.md#nvidia-JR2022645)：专项博士实习样例；不能外推为所有 C++ 或 GPU 实习均要求博士。（核查 2026-10-18）
- [NVIDIA · NVIDIA 2027 Internships: Systems Software Engineering](JD_EVIDENCE.md#nvidia-JR2023492)：原文明确按岗位列举可能技术；不是要求一个人掌握整个列表。（核查 2026-10-18）
- [Jane Street · Linux Engineer · Summer Internship](JD_EVIDENCE.md#janestreet-8625946002)：基础设施系统方向样例；职位元数据是判断其实习性质的依据。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [NVIDIA Careers 学生岗位](https://www.nvidia.com/en-us/about-nvidia/careers/)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）

### 移动端开发实习生

实现稳定的 iOS 或 Android 功能，并处理生命周期、网络和设备环境。

**为什么选这个方向**

适合关注设备体验、应用生命周期和端侧性能的人。

**实习生常见交付**

- 开发产品页面、控件、导航或端侧功能
- 对接服务 API，处理缓存、离线和错误恢复
- 修复兼容、启动、内存或交互问题

**通用准备建议：优先核心**

- 移动端工程
- HTTP 与 API 设计
- 面向对象与接口设计
- 测试设计
- Git 版本管理
- 调试与故障定位

**技术栈替代路径**

- Android / Kotlin 基础 / iOS / Swift 基础

每组按目标 JD 选择一条，不代表要掌握所有语言或平台。

**通用加分 / 进阶能力**

- 操作系统
- 计算机网络
- 性能分析
- 安全基础与隐私
- 系统设计与可维护性
- 算法与复杂度

**建议学习顺序**

默认技术栈：Android / Kotlin 基础。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → 面向对象与接口设计 → 计算机网络 → HTTP 与 API 设计 → 测试设计。
2. 岗位核心：移动端工程 → 构建与依赖管理 → 调试与故障定位 → Android / Kotlin 基础。
3. 项目验证：支持弱网与离线状态的移动应用。
4. 进阶方向（可选）：并发与同步 / 性能分析 / 安全基础与隐私。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 在 Android 或 iOS 中实现导航、列表与详情
- 连接 API，处理生命周期、取消、缓存与重试
- 在模拟器或设备验证功能、内存和可访问性

**作品验收与简历证据**

- 可运行的端侧功能，包含加载/失败/重试行为
- 说明生命周期和状态管理策略
- 在模拟器或设备上的测试与缺陷记录

**面试关注点**

- 解释异步网络和生命周期管理
- 分析列表/图片等场景的性能或内存问题
- 讨论接口失败时用户体验与重试策略

**官方 JD 对照**

- [Verkada · Mobile Software Engineering Intern 2027](JD_EVIDENCE.md#verkada-5219131007)：平台是 OR 关系；学习路径允许切换 Android 和 iOS，依赖关系随之重算。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）

### 测试开发 / 质量工程实习生

用系统化测试和自动化工具帮助团队尽早发现回归与质量风险。

**为什么选这个方向**

适合擅长拆边界、复现问题并用自动化降低重复劳动的人。

**实习生常见交付**

- 为服务或客户端编写自动化测试
- 设计边界、异常、兼容和回归用例
- 分析缺陷根因并维护测试环境或 CI

**通用准备建议：优先核心**

- 测试设计
- 测试策略与质量分析
- Git 版本管理
- 调试与故障定位
- 构建与依赖管理
- 自动化测试工程

**技术栈替代路径**

- Python / Java / JavaScript / TypeScript

每组按目标 JD 选择一条，不代表要掌握所有语言或平台。

**通用加分 / 进阶能力**

- HTTP 与 API 设计
- 性能与负载测试
- CI/CD 与发布
- Linux
- 算法与复杂度

**建议学习顺序**

默认技术栈：Python。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → 测试设计 → 构建与依赖管理 → 调试与故障定位 → Python。
2. 岗位核心：测试策略与质量分析 → 自动化测试工程 → 计算机网络 → HTTP 与 API 设计。
3. 项目验证：服务与界面的自动化质量流水线。
4. 进阶方向（可选）：性能与负载测试 / CI/CD 与发布 / Linux。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 从需求列出等价类、边界、状态与高风险失败
- 建立隔离的测试数据、API/UI 用例和缺陷报告
- 在 CI 运行回归，定位不稳定用例并记录取舍

**作品验收与简历证据**

- 从需求推导的测试矩阵与用例
- 在 CI 可重复运行的自动化套件
- 一份包含根因、影响和复现步骤的缺陷报告

**面试关注点**

- 将需求转化为风险优先级和边界测试
- 诊断不稳定测试并控制环境依赖
- 说明单元、集成、端到端测试的取舍

**官方 JD 对照**

- [NVIDIA · NVIDIA Spring 2027 Internships: Developer and Performance Technology](JD_EVIDENCE.md#nvidia-JR2023499)：性能技术方向的长期实习样例；与通用测试开发存在交集，不能替代软件 QA 的完整要求。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）

### 数据工程实习生

把异构原始数据变成准确、可追踪、可重跑的分析与模型数据集。

**为什么选这个方向**

适合喜欢数据流、自动化管道和严格数据口径的人。

**实习生常见交付**

- 开发批处理或流式 ETL 与调度任务
- 维护仓库表、数据模型、质量检查和血缘
- 排查延迟、重复、缺失和上游模式变更

**通用准备建议：优先核心**

- Python
- SQL 与关系数据
- 数据建模
- ETL 与数据管道
- 数据库系统
- 数据质量与治理
- Git 版本管理

**通用加分 / 进阶能力**

- 数据仓库与建模
- 流式与分布式数据
- 分布式系统
- 云计算基础
- 测试设计
- 数据结构

**建议学习顺序**

默认技术栈：按本岗位基础选择；无额外替代组。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → Python → SQL 与关系数据 → 数据库系统 → 测试设计。
2. 岗位核心：数据建模 → ETL 与数据管道 → 数据质量与治理 → 数据仓库与建模。
3. 项目验证：可重跑的业务数据管道。
4. 进阶方向（可选）：流式与分布式数据 / 分布式系统 / 云计算基础。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 定义原始事件、粒度、主键和指标数据字典
- 实现增量 ETL，覆盖重复、迟到、缺失与重跑
- 生成分析表并展示质量检查、调度和血缘

**作品验收与简历证据**

- 可重跑管道，覆盖重复/坏数据/迟到数据
- 从原始到分析表的模型和口径说明
- 质量检查、告警或血缘报告

**面试关注点**

- 写 SQL 连接、聚合和窗口函数
- 讨论增量加载、幂等和数据质量
- 解释批处理与流式处理的边界

**官方 JD 对照**

- [Stripe · Data Analyst, Intern](JD_EVIDENCE.md#stripe-8194291)：数据分析直接样例；数据工程是相邻职责参考，原文中的管道经验属于加分项。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [阿里巴巴招聘](https://talent.alibaba.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）

### 数据分析 / BI 实习生

将业务问题转化为正确指标、可复现查询和支持决策的解释。

**为什么选这个方向**

适合乐于从数据中回答明确业务问题并沟通结论的人。

**实习生常见交付**

- 编写 SQL、整理指标和建立分析看板
- 检查实验、漏斗、留存或运营变化
- 向产品/业务说明结论、假设和限制

**通用准备建议：优先核心**

- SQL 与关系数据
- 分析与可视化
- 概率统计
- Python
- 数据质量与治理

**通用加分 / 进阶能力**

- 数据建模
- 数据仓库与建模
- 数据可视化
- 机器学习

**建议学习顺序**

默认技术栈：按本岗位基础选择；无额外替代组。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → Python → SQL 与关系数据 → 概率统计。
2. 岗位核心：分析与可视化 → 数据质量与治理 → 数据可视化。
3. 项目验证：从业务问题到建议的分析看板。
4. 进阶方向（可选）：数据建模 / 数据仓库与建模 / 机器学习。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 明确业务问题、指标口径、样本范围和假设
- 用 SQL/Python 检查数据，分析漏斗、留存或实验
- 用图表陈述结论、偏差、置信程度和可执行建议

**作品验收与简历证据**

- 问题—口径—查询—结论完整的分析案例
- 可复现 notebook 或 dashboard
- 说明混杂因素、样本偏差与结论限制

**面试关注点**

- 写分组、去重、留存或窗口查询
- 解释指标口径和统计不确定性
- 用证据区分相关与因果

**官方 JD 对照**

- [Stripe · Data Analyst, Intern](JD_EVIDENCE.md#stripe-8194291)：数据分析直接样例；数据工程是相邻职责参考，原文中的管道经验属于加分项。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [阿里巴巴招聘](https://talent.alibaba.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）

### 机器学习工程实习生

把数据、特征、模型训练与评估组织成可靠、可复现的实验或服务。

**为什么选这个方向**

适合同时喜欢实验、数据处理和软件实现的人。

**实习生常见交付**

- 清洗数据、构建特征和训练/评估模型
- 复现实验，分析错误样本和模型指标
- 协助模型推理、部署、监控或训练工具

**通用准备建议：优先核心**

- Python
- 概率统计
- 机器学习
- 特征工程
- 模型评估与实验

**通用加分 / 进阶能力**

- 深度学习
- PyTorch
- 模型服务与 MLOps
- SQL 与关系数据
- 数据质量与治理
- 线性代数与数值基础

**建议学习顺序**

默认技术栈：按本岗位基础选择；无额外替代组。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → Python → 概率统计 → 线性代数与数值基础 → 测试设计。
2. 岗位核心：机器学习 → 数据质量与治理 → 特征工程 → 模型评估与实验。
3. 项目验证：可复现的预测模型与推理服务。
4. 进阶方向（可选）：深度学习 / PyTorch / 模型服务与 MLOps。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 定义任务与基线，固定数据版本和验证切分
- 建立特征、训练、评估和误差分析流水线
- 提供推理接口，校验版本、延迟和训练/服务一致性

**作品验收与简历证据**

- 有基线、切分、指标和误差分析的实验
- 没有时间泄漏的特征流程
- 可复现训练脚本与模型服务原型

**面试关注点**

- 解释过拟合、验证切分和合适评估指标
- 排查数据泄漏或训练/推理不一致
- 说明模型效果与工程成本的取舍

**官方 JD 对照**

- [Datadog · Applied Science Intern](JD_EVIDENCE.md#datadog-8181440)：应用科学岗位不等于全部算法岗位；实习时间窗口是该条 JD 的具体限制。（核查 2026-10-18）
- [NVIDIA · NVIDIA 2027 Internships: Deep Learning](JD_EVIDENCE.md#nvidia-JR2023497)：候选方向汇总；框架、语言与基础设施条目是可变技术栈。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [NVIDIA Careers 学生岗位](https://www.nvidia.com/en-us/about-nvidia/careers/)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [阿里巴巴招聘](https://talent.alibaba.com/)（公司招聘入口）
- [PyTorch Tutorials](https://pytorch.org/tutorials/)（技术学习参考）

### 算法 / 机器学习算法实习生

围绕推荐、搜索、广告、视觉或语言任务做特征、模型、实验和效果分析。

**为什么选这个方向**

适合对模型机制、数学推理和反复实验有兴趣的人。

**实习生常见交付**

- 梳理数据与目标指标，建立可比较的算法基线
- 实现或复现模型/论文，开展训练、消融和错误分析
- 与工程团队协作，评估离线收益和线上部署约束

**通用准备建议：优先核心**

- Python
- 概率统计
- 机器学习
- 特征工程
- 模型评估与实验

**技术栈替代路径**

- 深度学习 / 算法建模与论文复现

每组按目标 JD 选择一条，不代表要掌握所有语言或平台。

**通用加分 / 进阶能力**

- PyTorch
- 线性代数与数值基础
- 数据质量与治理
- SQL 与关系数据
- 量化研究设计

**建议学习顺序**

默认技术栈：深度学习。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → Python → 概率统计 → 线性代数与数值基础 → 微积分与优化基础。
2. 岗位核心：机器学习 → 数据质量与治理 → 特征工程 → 模型评估与实验 → 深度学习。
3. 项目验证：面向单一任务的算法基线与消融实验。
4. 进阶方向（可选）：PyTorch / 算法建模与论文复现 / 量化研究设计。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 选推荐、搜索、视觉或 NLP 中一个任务定义指标
- 复现基线和一种改进，保持数据与计算条件可比
- 报告消融、误差、负结果和部署约束

**作品验收与简历证据**

- 从基线到改进的可复现实验和误差分析
- 清楚的时间/用户/样本切分与泄漏排查
- 论文方法实现、消融实验或领域问题分析

**面试关注点**

- 解释模型假设、损失、特征和评估指标
- 讨论过拟合、数据偏差和实验设计
- 分析如何把离线结果转化为线上可验证改进

**官方 JD 对照**

- [Datadog · Applied Science Intern](JD_EVIDENCE.md#datadog-8181440)：应用科学岗位不等于全部算法岗位；实习时间窗口是该条 JD 的具体限制。（核查 2026-10-18）
- [Databricks · PhD GenAI Research Scientist Intern](JD_EVIDENCE.md#databricks-7011263002)：AI 应用的相邻研究样例，用于说明应用工程与模型研究的分界；博士要求仅归属此职位。（核查 2026-10-18）
- [NVIDIA · NVIDIA 2027 Internships: Deep Learning](JD_EVIDENCE.md#nvidia-JR2023497)：候选方向汇总；框架、语言与基础设施条目是可变技术栈。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [NVIDIA Careers 学生岗位](https://www.nvidia.com/en-us/about-nvidia/careers/)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [阿里巴巴招聘](https://talent.alibaba.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）
- [PyTorch Tutorials](https://pytorch.org/tutorials/)（技术学习参考）

### AI 应用 / Agent 实习生

构建可测量、可控、能处理失败的检索增强或工具型 AI 产品。

**为什么选这个方向**

适合愿意把模型能力做成可靠产品，而不只调用 API 的人。

**实习生常见交付**

- 搭建文档解析、检索、生成和引用链路
- 集成外部工具、模型 API 和业务服务
- 建设评测集，追踪质量、延迟、成本和安全问题

**通用准备建议：优先核心**

- HTTP 与 API 设计
- 大语言模型基础
- RAG 与信息检索
- LLM 评测与安全
- 测试设计
- 安全基础与隐私

**技术栈替代路径**

- Python / JavaScript / TypeScript

每组按目标 JD 选择一条，不代表要掌握所有语言或平台。

**通用加分 / 进阶能力**

- Agent 与工具调用
- 向量检索
- Node.js 服务开发
- 数据质量与治理
- 云计算基础

**建议学习顺序**

默认技术栈：Python。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → 计算机网络 → HTTP 与 API 设计 → 测试设计 → 数据质量与治理 → Python。
2. 岗位核心：大语言模型基础 → RAG 与信息检索 → LLM 评测与安全 → 安全基础与隐私。
3. 项目验证：带引用、拒答与评测的知识助手。
4. 进阶方向（可选）：向量检索 / Agent 与工具调用 / 云计算基础。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 解析自有文档，建立切分、索引与来源引用
- 实现检索和回答，并为无证据或越权问题设置边界
- 固定问答集，比较召回、引用、成本和失败类型

**作品验收与简历证据**

- 带来源引用的检索助手及固定评测集
- 工具有 schema、超时、权限和错误恢复
- 记录召回、引用正确率、成本和失败案例

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

### 云平台 / DevOps / SRE 实习生

让服务可构建、可发布、可观测，并在故障时恢复到可接受状态。

**为什么选这个方向**

适合关注运行环境、自动化、稳定性与团队开发效率的人。

**实习生常见交付**

- 维护 CI/CD、容器、集群和内部开发工具
- 编写自动化脚本、部署配置与运行手册
- 分析告警、容量、日志或发布导致的故障

**通用准备建议：优先核心**

- Linux
- Shell 与命令行
- 计算机网络
- 容器与 Docker
- CI/CD 与发布
- Git 版本管理

**技术栈替代路径**

- Go / Python

每组按目标 JD 选择一条，不代表要掌握所有语言或平台。

**通用加分 / 进阶能力**

- 云计算基础
- Kubernetes
- 可观测性与 SRE
- 分布式系统
- 安全基础与隐私

**建议学习顺序**

默认技术栈：Go。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → Linux → 计算机网络 → 测试设计 → Go。
2. 岗位核心：构建与依赖管理 → 容器与 Docker → CI/CD 与发布 → 云计算基础 → HTTP 与 API 设计 → SQL 与关系数据 → 数据库系统 → 后端服务设计 → 可观测性与 SRE。
3. 项目验证：可发布、可观测、可恢复的服务环境。
4. 进阶方向（可选）：Kubernetes / 分布式系统 / 安全基础与隐私。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 容器化一个服务，配置健康检查与最小权限
- 建立构建、测试、发布、回滚与配置流程
- 定义服务指标，演练依赖故障并提交复盘

**作品验收与简历证据**

- 部署到云或本地集群的服务与自动发布流程
- 定义关键指标/探针并演练恢复
- 清楚记录权限、成本和故障处理过程

**面试关注点**

- 解释进程、网络、DNS、容器和健康检查
- 分析服务不可用或发布回滚场景
- 区分可靠性、容量与成本问题

**官方 JD 对照**

- [Cloudflare · Software Engineer Intern (2027)](JD_EVIDENCE.md#cloudflare-8199958)：互联网规模系统的软件工程样例；平台/SRE 关联来自系统职责，原文不是专门的 SRE 职位。（核查 2026-10-18）
- [Jane Street · Linux Engineer · Summer Internship](JD_EVIDENCE.md#janestreet-8625946002)：基础设施系统方向样例；职位元数据是判断其实习性质的依据。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [NVIDIA Careers 学生岗位](https://www.nvidia.com/en-us/about-nvidia/careers/)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [阿里巴巴招聘](https://talent.alibaba.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）

### AI 基础设施 / GPU 系统实习生

优化训练或推理系统的吞吐、延迟、内存和资源利用率。

**为什么选这个方向**

适合喜欢 C++、并行计算和性能诊断的人；这是系统方向的专项岗位。

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
- 线性代数与数值基础

**建议学习顺序**

默认技术栈：CUDA 编程。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → 面向对象与接口设计 → 构建与依赖管理 → 现代 C++ → Python → 计算机组成与体系结构 → 线性代数与数值基础 → 测试设计。
2. 岗位核心：Linux → 操作系统 → 并发与同步 → 调试与故障定位 → 性能分析 → GPU 并行与内存层次 → CUDA 编程。
3. 项目验证：有正确性与端到端收益的 GPU 算子优化。
4. 进阶方向（可选）：GPU 性能分析 / 分布式系统 / 模型服务与 MLOps。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 从归约或矩阵运算建立 CPU/框架参考与误差标准
- 以 CUDA 或 Triton 实现，测量访存、同步和计算瓶颈
- 固定设备、形状、预热与精度，报告优化与失效范围

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
- [NVIDIA · NVIDIA 2027 Internships: Systems Software Engineering](JD_EVIDENCE.md#nvidia-JR2023492)：原文明确按岗位列举可能技术；不是要求一个人掌握整个列表。（核查 2026-10-18）
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

### 网络安全 / 安全工程实习生

在授权范围内识别、复现、评估并推动修复软件与网络风险。

**为什么选这个方向**

适合擅长从攻击者视角推理并严谨描述风险的人。

**实习生常见交付**

- 开展代码审计、依赖检查或授权测试
- 分析协议、日志和漏洞报告，复现问题
- 为修复建议增加回归用例并跟踪风险关闭

**通用准备建议：优先核心**

- 安全基础与隐私
- 计算机网络
- Linux
- Python
- 安全编码
- 调试与故障定位

**通用加分 / 进阶能力**

- 安全测试与漏洞分析
- 网络安全
- 现代 C++
- 测试设计
- 数据库系统

**建议学习顺序**

默认技术栈：按本岗位基础选择；无额外替代组。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → Python → Linux → 计算机网络 → 构建与依赖管理 → 调试与故障定位。
2. 岗位核心：HTTP 与 API 设计 → 安全基础与隐私 → 测试设计 → 安全编码 → 安全测试与漏洞分析。
3. 项目验证：自有应用的安全分析与修复闭环。
4. 进阶方向（可选）：网络安全 / 现代 C++ / 数据库系统。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 确定授权范围，绘制数据流、权限与威胁模型
- 在隔离环境复现缺陷，给出利用条件和影响证据
- 实施修复并添加回归用例与安全配置检查

**作品验收与简历证据**

- 合法靶场或自有项目中的漏洞分析报告
- 复现步骤、影响、证据和修复建议
- 修复后回归测试或安全配置检查

**面试关注点**

- 解释常见漏洞的成因、影响与修复
- 区分已验证风险和理论猜测
- 说明授权边界与安全测试方法

**官方 JD 对照**

- [Verkada · Security Software Engineering Intern 2027](JD_EVIDENCE.md#verkada-5213881007)：标题虽属安全软件，原文技能段偏通用工程；没有把 OWASP、渗透测试等通用建议冒充为其明示要求。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)（安全学习参考）

### 嵌入式 / IoT 实习生

在受限设备上实现可靠程序，连接传感器、通信协议和实时任务。

**为什么选这个方向**

适合喜欢软硬件结合、资源约束和真实设备调试的人。

**实习生常见交付**

- 编写驱动、设备逻辑或协议解析模块
- 在开发板/模拟器上调试中断、内存和时序问题
- 验证功耗、响应时间、兼容和异常恢复

**通用准备建议：优先核心**

- 现代 C++
- 嵌入式 C/C++
- 硬件接口与通信协议
- 操作系统
- 调试与故障定位
- 构建与依赖管理

**通用加分 / 进阶能力**

- 实时操作系统
- 计算机网络
- 并发与同步
- 测试设计
- 安全基础与隐私

**建议学习顺序**

默认技术栈：按本岗位基础选择；无额外替代组。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → 构建与依赖管理 → C 语言与内存基础 → 计算机组成与体系结构 → 测试设计 → 调试与故障定位。
2. 岗位核心：面向对象与接口设计 → 现代 C++ → 嵌入式 C/C++ → 硬件接口与通信协议 → Linux → 操作系统。
3. 项目验证：有异常恢复的设备采集或协议模块。
4. 进阶方向（可选）：实时操作系统 / 并发与同步。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 选择开发板/模拟器，阅读数据手册并构建烧录流程
- 实现驱动或协议状态机，检查中断、超时与缓冲边界
- 测量时序、资源与恢复行为，记录设备和测试条件

**作品验收与简历证据**

- 可复现设备/模拟器 demo 和构建步骤
- 处理不完整数据帧、超时和资源限制
- 逻辑分析或日志支撑的故障定位记录

**面试关注点**

- 解释中断、任务优先级和资源约束
- 解析协议边界并讨论超时处理
- 定位设备端内存或时序缺陷

**官方 JD 对照**

- [NVIDIA · NVIDIA 2027 Internships: Systems Software Engineering](JD_EVIDENCE.md#nvidia-JR2023492)：原文明确按岗位列举可能技术；不是要求一个人掌握整个列表。（核查 2026-10-18）
- [Verkada · Embedded Software Engineering Intern 2027](JD_EVIDENCE.md#verkada-5211595007)：这是 Embedded Linux 路径；MCU/RTOS 团队的技能组合会不同。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Microsoft Careers 学生与毕业生](https://careers.microsoft.com/v2/global/en/students)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [NVIDIA Careers 学生岗位](https://www.nvidia.com/en-us/about-nvidia/careers/)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）

### 量化开发实习生

构建行情、交易、回测或研究基础设施，重视逻辑正确、可复现与性能。

**为什么选这个方向**

适合偏工程实现、同时对金融市场数据感兴趣的人。此画像以 C++ 系统路径为例；不同团队也可能使用 OCaml、Python、Java 等，按目标 JD 调整。

**实习生常见交付**

- 实现行情解析、订单簿、回测或研究工具
- 处理高吞吐数据、并发、低延迟和日志
- 验证交易逻辑、数据口径、异常输入与回归

**通用准备建议：优先核心**

- 现代 C++
- Python
- 数据结构
- 算法与复杂度
- Linux
- 并发与同步
- 测试设计
- SQL 与关系数据

**通用加分 / 进阶能力**

- 计算机网络
- 性能分析
- 金融与概率基础
- 市场微观结构
- 回测与事件驱动模拟

**建议学习顺序**

默认技术栈：按本岗位基础选择；无额外替代组。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → 面向对象与接口设计 → 构建与依赖管理 → 现代 C++ → 数据结构 → Linux → 测试设计。
2. 岗位核心：Python → 离散数学与逻辑 → 算法与复杂度 → 计算机组成与体系结构 → 操作系统 → 并发与同步 → SQL 与关系数据 → 概率统计 → 金融与概率基础 → 市场微观结构 → 数据质量与治理 → 回测与事件驱动模拟 → 调试与故障定位 → 性能分析。
3. 项目验证：行情回放与订单簿事件引擎。
4. 进阶方向（可选）：分布式系统 / 计算机网络 / GPU 并行与内存层次。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 定义行情事件、序号、订单状态与确定性回放
- 实现订单簿与边界测试，记录所有权和数据布局
- 对吞吐、延迟、内存与重放正确性建立受控基准

**作品验收与简历证据**

- 事件回放/订单簿项目，验证撮合不变量
- 测量条件完整的性能报告
- 解释重复事件、时间顺序和异常处理

**面试关注点**

- 算法与数据结构、C++ 生命周期与并发
- 市场事件处理、时间边界和测试策略
- 分析延迟数据并说明优化证据

**官方 JD 对照**

- [Jane Street · Software Engineer · Summer Internship](JD_EVIDENCE.md#janestreet-8617298002)：金融公司的软件实习样例，用来展示技术栈差异；OCaml 是其主力语言，不能据此声称量化开发全部要求 C++。（核查 2026-10-18）

**招聘搜索与技术参考入口**

- [Google Careers 招聘搜索](https://www.google.com/about/careers/applications/jobs/results/)（公司招聘入口）
- [Amazon Jobs：Software Development](https://www.amazon.jobs/en/job_categories/software-development)（公司招聘入口）
- [NVIDIA Careers 学生岗位](https://www.nvidia.com/en-us/about-nvidia/careers/)（公司招聘入口）
- [字节跳动招聘](https://jobs.bytedance.com/)（公司招聘入口）
- [阿里巴巴招聘](https://talent.alibaba.com/)（公司招聘入口）
- [腾讯招聘](https://careers.tencent.com/)（公司招聘入口）

### 量化研究实习生

提出可证伪假设，用统计与严谨回测判断策略是否有样本外价值。

**为什么选这个方向**

适合喜欢概率、数据研究和反复验证假设的人；与量化开发的工程侧重点不同。

**实习生常见交付**

- 探索市场数据并提出研究假设
- 构建信号、评估基准、成本和样本外表现
- 做稳健性分析并记录未成功的实验

**通用准备建议：优先核心**

- Python
- 概率统计
- 金融与概率基础
- 量化研究设计
- 回测与事件驱动模拟
- 模型评估与实验
- 数据质量与治理

**通用加分 / 进阶能力**

- 市场微观结构
- 机器学习
- SQL 与关系数据
- 特征工程

**建议学习顺序**

默认技术栈：按本岗位基础选择；无额外替代组。站点可切换替代组，路径会重算。

1. 先修基础：程序设计基础 → Shell 与命令行 → Git 版本管理 → 工程协作与技术表达 → Python → 概率统计 → 金融与概率基础。
2. 岗位核心：线性代数与数值基础 → 机器学习 → 模型评估与实验 → 数据质量与治理 → 回测与事件驱动模拟 → 量化研究设计。
3. 项目验证：包含样本外验证与成本的研究报告。
4. 进阶方向（可选）：市场微观结构 / 特征工程。

编号遵守显式依赖，不表示必须完成整门课程后才能开始项目。同阶段可交叉练习；可用已有能力跳过对应练习。

**项目里程碑**

- 明确可证伪假设、数据时点、样本和基准
- 实现无未来信息的回测与滚动样本外评估
- 计入费用与滑点，报告稳健性、负结果和容量限制

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

## 继续使用这份体系

完整知识点与双向依赖见 [SKILL_NETWORK.md](SKILL_NETWORK.md)；分层与关系语义见 [KNOWLEDGE_ARCHITECTURE.md](KNOWLEDGE_ARCHITECTURE.md)；逐条招聘证据见 [JD_EVIDENCE.md](JD_EVIDENCE.md)。
