/* Career Skill Atlas: source data and job-skill relationships. */
(function () {
  const skills = [
    ["shell","Shell 与命令行","foundation","工作流","在终端中定位项目、组合命令、批处理文件并运行开发工具。","它让构建、调试、自动化和远程 Linux 工作变得可重复。",[],"独立完成一次文件检索、管道处理和脚本化运行。"],
    ["git","Git 版本管理","foundation","工作流","通过提交、分支、差异和回退管理代码变化。","团队协作和安全迭代都依赖清晰的版本历史。",["shell"],"把一个功能拆成可读提交，并能解释如何撤销错误改动。"],
    ["build","构建与依赖管理","foundation","工作流","理解编译、链接、依赖和项目构建配置。","真实项目由多个模块和外部依赖组成，能构建才谈得上交付。",["shell"],"从干净目录构建多文件项目；记录工具版本和步骤。"],
    ["testing","测试设计","foundation","质量","设计覆盖正常路径、边界、失败路径的自动化检查。","测试能快速反馈回归问题，也是可靠改动的证据。",["git"],"为一个有状态模块写单元与边界测试，并在 CI 运行。"],
    ["debugging","调试与故障定位","foundation","质量","使用日志、断点、调用栈和内存检查工具缩小问题范围。","实习任务常从复现和修复既有缺陷开始。",["shell","build"],"提交一个包含复现步骤、根因和修复验证的问题记录。"],
    ["data-structures","数据结构","foundation","计算机基础","理解数组、哈希表、堆、树、队列、图等结构及操作成本。","数据结构影响服务延迟、内存占用和代码复杂度。",[],"为一个任务比较两种结构并说明复杂度与取舍。"],
    ["algorithms","算法与复杂度","foundation","计算机基础","能分析时间/空间复杂度，选择合适的排序、搜索、图和动态规划方法。","面试常用于检验推理与编码基本功，工程中也用于估算扩展性。",["data-structures"],"独立完成中等难度题，写出不变量、边界和复杂度。"],
    ["oop-design","面向对象与接口设计","foundation","编程基础","使用抽象、组合、封装与接口组织可维护模块。","需求会变化；良好接口降低模块间修改成本。",[],"把一个小程序拆成清楚的模块并为接口写测试。"],
    ["cpp","现代 C++","foundation","编程语言","掌握对象生命周期、RAII、值语义、移动、智能指针、模板与标准库。","高性能和系统岗位常需要精确控制资源、并发与延迟。",["oop-design","testing"],"实现并测试缓存或订单簿，解释所有权与对象生命周期。"],
    ["python","Python","foundation","编程语言","使用 Python 编写脚本、服务、数据处理或模型实验。","它是数据分析、机器学习、自动化和 AI 应用的常见工作语言。",["shell"],"完成带类型/测试/依赖说明的数据处理或小服务项目。"],
    ["java","Java","foundation","编程语言","掌握集合、异常、泛型、面向对象和 JVM 基本概念。","许多企业后端团队以 Java 作为主力服务语言。",["oop-design","testing"],"实现一个有分层、测试和持久化的 API 服务。"],
    ["typescript","JavaScript / TypeScript","foundation","编程语言","掌握异步、模块、类型、浏览器运行时与 Node.js 基础。","前端、全栈和部分 AI 应用的常见开发栈。",["oop-design"],"实现有类型约束、错误状态和测试的小型 Web 功能。"],
    ["go","Go","foundation","编程语言","理解 Go 的并发模型、接口、错误处理与工具链。","云原生、平台和基础设施团队常用 Go 开发服务与工具。",["shell","testing"],"实现并发安全的 HTTP 服务并添加可运行测试。"],
    ["sql","SQL 与关系数据","foundation","数据基础","能编写查询、连接、聚合、子查询和窗口函数。","业务后端、分析和数据工程都需要准确读写结构化数据。",[],"对有重复、空值和时间边界的数据写正确查询。"],
    ["linux","Linux","engineering","系统","熟悉进程、权限、文件、日志、包管理和基础系统工具。","服务通常运行在 Linux 环境，线上排障也依赖它。",["shell"],"把程序部署到 Linux 环境，并用日志和系统工具定位故障。"],
    ["os","操作系统","engineering","系统","理解进程/线程、虚拟内存、调度、文件与 I/O 的基本机制。","帮助解释崩溃、资源争用、阻塞和服务性能现象。",["linux"],"解释一次内存或线程问题，并通过实验观测其表现。"],
    ["networking","计算机网络","engineering","系统","掌握 TCP/IP、DNS、连接、超时、重传和常见网络边界。","客户端与服务端故障常发生在网络与协议边界。",["os"],"写 TCP/HTTP 客户端并正确处理超时、断连与分段数据。"],
    ["concurrency","并发与同步","engineering","系统","理解线程安全、锁、原子操作、条件变量、竞态与死锁。","高并发服务和系统程序需要并行处理且保持状态正确。",["os","cpp"],"复现并修复竞态；解释同步策略和吞吐量代价。"],
    ["database","数据库系统","engineering","数据系统","理解索引、事务、隔离、约束、缓冲和查询计划。","数据正确性和服务响应时间都受数据库设计影响。",["sql"],"用 EXPLAIN 比较索引前后的执行计划，说明事务边界。"],
    ["api","HTTP 与 API 设计","engineering","服务开发","设计资源、请求/响应、状态码、分页、鉴权和错误契约。","服务需要让调用方以稳定且可理解的方式集成。",["networking"],"做一个有输入校验、分页和一致错误格式的 API。"],
    ["backend","后端服务设计","engineering","服务开发","组织业务逻辑、接口、持久层、缓存、配置和错误处理。","后端实习通常围绕需求实现、接口维护和缺陷修复。",["api","database"],"交付一个有 API 文档、测试和数据迁移说明的小服务。"],
    ["service-frameworks","后端服务框架","engineering","服务开发","掌握至少一个常见服务框架的路由、中间件、依赖管理和错误处理。","真实岗位通常围绕团队现有技术栈交付功能，理解框架扩展点比背语法更实用。",["backend","testing"],"在目标语言框架中实现带校验、持久化和测试的 API。"],
    ["cache-messaging","缓存与消息队列","engineering","服务开发","理解缓存一致性、过期/淘汰、队列消费、幂等和重试边界。","Redis、消息队列等常用于提高吞吐并解耦服务，但引入后也增加一致性和故障处理工作。",["backend","distributed"],"构建带幂等消费者的示例，并用故障场景验证重试和重复消息处理。"],
    ["distributed","分布式系统","engineering","系统设计","理解复制、分区、消息、幂等、重试、一致性和故障边界。","服务规模扩大后，单机假设不再成立。",["networking","database"],"设计幂等消费者或重试机制并用故障注入验证。"],
    ["architecture","系统设计与可维护性","engineering","工程实践","能按职责划分模块，处理配置、扩展点、兼容和迁移。","团队会关注改动是否易于评审、扩展和长期维护。",["oop-design","testing"],"提交架构图、关键取舍和一次小范围演进记录。"],
    ["profiling","性能分析","engineering","工程实践","使用 profiler、基准和资源指标定位 CPU、内存、I/O 或延迟瓶颈。","优化应基于测量，避免凭感觉增加复杂度。",["debugging","testing"],"保存基线，做一次可复现优化，并解释测量条件。"],
    ["web-fundamentals","HTML、CSS 与浏览器","engineering","Web","理解语义化 HTML、布局、响应式、DOM、事件和浏览器加载。","浏览器行为是前端功能、兼容与性能问题的基础。",["typescript"],"实现响应式、键盘可用的页面并检查不同屏幕。"],
    ["react","React 与前端状态","engineering","Web","理解组件、状态、表单、路由、异步请求和渲染更新。","前端岗位常需要独立交付数据驱动的界面。",["web-fundamentals","testing"],"构建带加载、空态、错误态和交互测试的页面。"],
    ["node","Node.js 服务开发","engineering","Web","掌握 Node 运行时、异步 I/O、包管理和服务端接口。","可支撑全栈开发与 AI 应用的轻量服务层。",["typescript","api"],"实现带输入校验、日志和测试的服务接口。"],
    ["mobile","移动端工程","engineering","客户端","理解移动 UI 生命周期、导航、网络、缓存和平台交互。","移动端实习通常围绕页面、组件和真实设备问题交付。",["oop-design","api"],"完成一个有离线/加载状态和接口错误处理的功能页。"],
    ["android-kotlin","Android / Kotlin 基础","specialization","移动端","掌握 Android 页面、Kotlin 语法、生命周期和常见异步模式。","安卓岗位通常要求能在对应平台开发、调试和验证功能。",["mobile","oop-design"],"实现一个带网络状态处理的 Android 功能页。"],
    ["ios-swift","iOS / Swift 基础","specialization","移动端","掌握 Swift、SwiftUI/UIKit 基础和 iOS 应用生命周期。","iOS 岗位通常要求能在 Apple 平台实现和调试用户功能。",["mobile","oop-design"],"实现一个带加载/错误状态的 iOS 功能页。"],
    ["qa-automation","自动化测试工程","engineering","质量","使用测试框架、Mock、端到端工具和持续集成运行回归。","测试开发岗位要把人工重复验证转化为稳定自动化。",["testing","build"],"实现一个稳定的 API 或 UI 回归测试流水线。"],
    ["test-strategy","测试策略与质量分析","engineering","质量","设计测试层次、风险覆盖、边界用例、缺陷分类与复现步骤。","测试工作的价值在于高效发现重要风险，而非追求数字。",["testing","debugging"],"从需求推导测试矩阵，报告缺陷影响和复现证据。"],
    ["load-testing","性能与负载测试","engineering","质量","测量吞吐、延迟分位数、资源消耗和并发下的稳定性。","服务上线和扩容前要了解容量与性能退化模式。",["api","profiling"],"用可重复负载场景提交 p50/p95/p99 与瓶颈分析。"],
    ["cloud","云计算基础","engineering","平台","理解计算、网络、存储、身份权限和按需资源的基本模型。","服务部署、数据系统与 AI 工作负载通常依赖云资源。",["linux","networking"],"部署一个最小服务，说明网络、权限与成本配置。"],
    ["containers","容器与 Docker","engineering","平台","编写镜像、管理配置与数据卷，理解容器和镜像的作用。","让开发、测试和部署环境更一致。",["linux","build"],"构建可复现镜像，控制体积并通过健康检查启动。"],
    ["kubernetes","Kubernetes","engineering","平台","理解 Pod、Deployment、Service、配置、扩缩容和探针。","云平台岗位常通过编排管理服务生命周期。",["containers","cloud"],"部署一个多副本服务，并验证滚动更新和自愈。"],
    ["cicd","CI/CD 与发布","engineering","平台","把代码检查、构建、测试和部署串成自动化流程。","团队需要快速反馈，同时降低发布引入回归的风险。",["git","build","testing"],"为项目建立自动检查流程，并说明失败时如何阻断发布。"],
    ["observability","可观测性与 SRE","engineering","平台","使用日志、指标、追踪、告警和 SLI/SLO 观察系统健康。","在线故障需要快速发现、定位和评估用户影响。",["linux","backend"],"定义关键服务指标，构建告警并演练一次故障分析。"],
    ["security-basics","安全基础与隐私","engineering","安全","理解最小权限、机密管理、输入验证、数据保护和常见攻击面。","每个软件岗位都可能处理敏感数据或暴露接口。",["networking","api"],"在项目中清点威胁、限制权限并安全处理密钥。"],
    ["security-analysis","安全测试与漏洞分析","specialization","安全方向","运用静态/动态分析、模糊测试或授权渗透测试发现漏洞。","安全实习常要求把问题复现、评级并协助修复。",["security-basics","debugging"],"在自有靶场复现漏洞，写清影响、证据和修复建议。"],
    ["frontend-accessibility","前端可访问性","engineering","Web","理解语义、键盘焦点、颜色对比、表单标签和屏幕阅读器基本需求。","可访问性提升交互可用性，也减少真实用户被界面阻挡。",["web-fundamentals"],"只用键盘完成主要流程，并修复语义和焦点问题。"],
    ["data-modeling","数据建模","engineering","数据系统","设计事实/维度、主键、事件口径、时间粒度和模式演进。","清楚的数据定义减少重复、歧义和分析口径冲突。",["sql","database"],"为业务事件建立数据字典、表结构和口径说明。"],
    ["etl","ETL 与数据管道","engineering","数据系统","实现抽取、清洗、转换、调度、重跑和错误隔离。","数据工程实习常交付稳定的数据导入与加工流程。",["python","sql","data-modeling"],"构建可重跑的批处理任务，处理重复和坏数据。"],
    ["warehouse","数据仓库与建模","data","数据系统","了解分层仓库、维度建模、增量更新和历史数据处理。","分析和模型训练都依赖可信、可维护的数据层。",["data-modeling","etl"],"建一条从原始表到分析宽表的可验证数据链路。"],
    ["streaming","流式与分布式数据","data","数据系统","理解消息队列、事件时间、窗口、消费偏移和重复处理。","实时看板、风控和服务事件需要处理持续到达的数据。",["distributed","etl"],"实现可重放消费者，验证顺序、重复和失败恢复。"],
    ["data-quality","数据质量与治理","data","数据系统","检查完整性、唯一性、及时性、血缘、权限与敏感字段。","坏数据会污染报表、模型和业务决策。",["data-modeling","testing"],"为数据管道增加质量规则、异常报告和血缘说明。"],
    ["analytics","分析与可视化","data","分析","使用统计摘要、SQL、图表和指标口径解释业务数据。","分析岗位要从问题出发形成可验证、能行动的结论。",["sql","statistics"],"提供可复现分析、口径说明和支持结论的图表。"],
    ["visualization","数据可视化","data","分析","选择合适图表表达趋势、分布、比较和异常，并处理图例、颜色和交互。","图表是分析结论与他人决策之间的解释界面。",["analytics"],"做一张有清晰口径、可读图例和异常说明的可复现图表。"],
    ["statistics","概率统计","data","数学","理解分布、抽样、估计、不确定性、假设检验和相关性边界。","帮助判断数据结论是否稳健，避免把随机波动当规律。",[],"解释估计不确定性并指出一个分析结论的局限。"],
    ["machine-learning","机器学习","data","机器学习","掌握监督学习、特征、损失、基线、验证和泛化。","AI/数据实习常要求理解模型训练与评估的完整链条。",["python","statistics"],"做有基线、有切分、有指标的可复现实验。"],
    ["algorithm-research","算法建模与论文复现","specialization","算法研究","把业务问题抽象成模型目标，复现论文方法并用消融/基线验证改进。","算法类实习更关注实验、建模和结果解释，不只是调用训练框架。",["machine-learning","statistics"],"复现一个基线方法，比较消融并说明失败案例和适用边界。"],
    ["deep-learning","深度学习","data","机器学习","理解神经网络、反向传播、优化、正则化和训练诊断。","视觉、语言和推荐系统的许多模型以深度学习为基础。",["machine-learning"],"复现实验并分析训练曲线、错误样例和泛化差距。"],
    ["pytorch","PyTorch","data","机器学习","使用张量、数据集、自动微分、训练循环和 checkpoint。","ML 实习要求把算法实验可靠地实现并复现。",["deep-learning"],"完成训练、验证、保存和加载的实验脚本。"],
    ["feature-engineering","特征工程","data","机器学习","处理缺失、类别、尺度、时间特征和训练/推理一致性。","特征质量直接影响模型效果，也容易造成数据泄漏。",["machine-learning","data-quality"],"建立训练/推理共用特征流程，测试时间边界。"],
    ["model-evaluation","模型评估与实验","data","机器学习","选择合适指标、切分方案、基线、置信区间和错误分析。","漂亮的单一指标可能掩盖泛化差、类别偏置或数据泄漏。",["machine-learning","statistics"],"对比基线与模型，解释指标、误差和适用范围。"],
    ["mlops","模型服务与 MLOps","data","机器学习","管理数据/模型版本、部署、监控、回滚和训练/服务一致性。","模型实验必须转化为可监控、可更新的生产能力。",["pytorch","containers","cicd"],"部署模型 API，记录版本、延迟、质量和回滚方案。"],
    ["llm-fundamentals","大语言模型基础","data","生成式 AI","理解 token、上下文窗口、生成、采样、嵌入与模型限制。","AI 应用工程需要知道模型能做什么、会在哪些任务上失败。",["python","machine-learning"],"用固定输入比较生成参数，记录能力和失败边界。"],
    ["rag","RAG 与信息检索","data","生成式 AI","处理文档、切分、检索、排序、上下文和来源引用。","检索质量决定知识型助手能否找到证据并降低编造。",["llm-fundamentals","data-quality"],"构建带引用的检索应用，测召回、相关性和引用正确率。"],
    ["agent-tools","Agent 与工具调用","specialization","生成式 AI","设计工具 schema、状态、循环、停止条件、权限和错误恢复。","Agent 是带副作用的工作流，可靠性来自受控工具而不是多轮提示。",["llm-fundamentals","api","security-basics"],"实现只读工具助手，覆盖超时、无效参数和重复调用。"],
    ["llm-evaluation","LLM 评测与安全","specialization","生成式 AI","建立固定用例，测事实性、引用、拒答、工具正确率、延迟和成本。","仅凭演示样例无法判断模型更新后系统是否退化。",["rag","testing"],"维护小型评测集，展示基线、失败分桶和改进幅度。"],
    ["vector-search","向量检索","data","生成式 AI","理解嵌入、相似度、索引、召回/精度和混合检索。","向量检索需要与业务过滤和关键词搜索协作，不能盲目套库。",["llm-fundamentals","database"],"比较关键词、向量与混合检索，并解释错误案例。"],
    ["linear-algebra","线性代数与数值基础","specialization","数学与计算","掌握向量、矩阵、乘法、范数、数值精度和基础概率表达。","理解模型计算、GPU 算子和数值误差的共同底层。",["statistics"],"手算小矩阵运算并验证数值误差如何传播。"],
    ["gpu-architecture","GPU 并行与内存层次","specialization","GPU 系统","理解线程层次、warp、内存访问、带宽、占用率和数据传输。","GPU 优化取决于并行划分与访存，不只是使用 GPU API。",["linear-algebra","profiling"],"用 profiler 判断一个算子受计算还是内存带宽限制。"],
    ["cuda","CUDA 编程","specialization","GPU 系统","用 CUDA C++ 编写 kernel、管理设备内存和同步。","GPU 系统岗位需要将计算映射到硬件并保持结果正确。",["cpp","gpu-architecture"],"实现并校验简单算子，分别计量传输和 kernel 时间。"],
    ["triton","Triton GPU 编程","specialization","GPU 系统","使用 Python DSL 编写 GPU kernel，理解程序块映射和张量内存访问。","Triton 是探索 GPU kernel 优化的另一条工具路径，能与 CUDA 互补。",["python","gpu-architecture"],"实现一个可测试算子，并与 PyTorch 和基线比较端到端时间。"],
    ["gpu-profiling","GPU 性能分析","specialization","GPU 系统","测量 kernel、访存、并发和端到端执行，避免错误计时。","只有可复现测量才能支持性能优化结论。",["cuda","profiling"],"与基线对照并提交 profiler 证据和完整测量条件。"],
    ["embedded-c","嵌入式 C/C++","specialization","嵌入式","理解静态内存、寄存器、编译链、启动流程和资源限制。","设备端开发必须考虑有限内存、功耗和确定性。",["cpp","build"],"在模拟器或开发板上实现带资源限制的模块。"],
    ["rtos","实时操作系统","specialization","嵌入式","理解任务、优先级、调度、定时器、中断和实时约束。","嵌入式系统常要求及时响应并避免任务相互阻塞。",["embedded-c","concurrency"],"实现周期任务与同步通信，测量最坏响应情况。"],
    ["hardware-protocols","硬件接口与通信协议","specialization","嵌入式","掌握 UART、SPI、I2C、CAN 等接口和协议数据解析。","设备实习常要把软件状态与真实硬件通信连接起来。",["embedded-c","networking"],"解析有噪声/不完整输入的协议帧并处理超时。"],
    ["secure-coding","安全编码","specialization","安全","理解注入、越权、内存安全、鉴权、密钥与安全依赖更新。","修复漏洞需要将攻击路径转化为代码级防护和回归测试。",["security-basics","testing"],"修复一个自建靶场漏洞，加入回归测试和威胁说明。"],
    ["network-security","网络安全","specialization","安全","理解协议分析、访问控制、DNS/TLS、流量特征和常见攻击面。","安全工程岗位常需定位服务和网络层的暴露风险。",["security-basics","networking"],"对授权实验环境做流量分析并给出风险证据。"],
    ["finance","金融与概率基础","specialization","量化","理解收益、风险、概率统计、市场机制和基本金融产品。","量化任务要把市场数据和策略结果放进正确的经济语境。",["statistics","python"],"说明收益、波动和回撤等指标的定义与边界。"],
    ["market-microstructure","市场微观结构","specialization","量化","理解订单簿、撮合、价差、流动性、成交与时间优先规则。","交易系统和高频策略的结果受市场机制及数据口径影响。",["finance","data-structures"],"实现简化订单簿并验证新增、撤单和部分成交不变量。"],
    ["backtesting","回测与事件驱动模拟","specialization","量化","处理时间顺序、交易成本、滑点、仓位、基准和样本外评估。","忽略执行成本或时间泄漏会产生虚假策略收益。",["finance","data-quality"],"做事件驱动回测，记录成本、基准、样本外结果和限制。"],
    ["research-design","量化研究设计","specialization","量化","提出可证伪假设，控制多重检验、数据泄漏和参数过拟合。","研究岗评估的是结论可信度，而非一次漂亮回测。",["statistics","model-evaluation","backtesting"],"提交可复现研究报告，包含负结果和稳健性检验。"]
  ].map(([id, title, layer, family, summary, why, prerequisites, proof]) => ({ id, title, layer, family, summary, why, prerequisites, proof }));

  const sources = [
    { id:"onet", name:"O*NET：职业任务与技能词典", type:"职业分类参考", url:"https://www.onetonline.org/", note:"用于理解职业任务和技能分类，不是实习招聘门槛。" },
    { id:"bls", name:"U.S. Bureau of Labor Statistics：职业展望", type:"职业趋势参考", url:"https://www.bls.gov/ooh/computer-and-information-technology/home.htm", note:"提供职业定义和趋势背景，地域与实习要求不等同于中国招聘。" },
    { id:"google-careers", name:"Google Careers 招聘搜索", type:"公司招聘入口", url:"https://www.google.com/about/careers/applications/jobs/results/", note:"搜索 Software Engineering / Data / AI Intern，并逐条确认地区、年级和时间。" },
    { id:"microsoft-careers", name:"Microsoft Careers 学生与毕业生", type:"公司招聘入口", url:"https://careers.microsoft.com/v2/global/en/students", note:"核对岗位资格、毕业时间、工作地点与申请窗口。" },
    { id:"amazon-jobs", name:"Amazon Jobs：Software Development", type:"公司招聘入口", url:"https://www.amazon.jobs/en/job_categories/software-development", note:"按 Intern 与地区筛选；不同团队和年份要求会变化。" },
    { id:"nvidia-careers", name:"NVIDIA Careers 学生岗位", type:"公司招聘入口", url:"https://www.nvidia.com/en-us/about-nvidia/careers/", note:"可检索软件、GPU、系统和研究实习岗位。" },
    { id:"bytedance-careers", name:"字节跳动招聘", type:"公司招聘入口", url:"https://jobs.bytedance.com/", note:"按研发、数据、算法、基础架构等岗位检索实习信息。" },
    { id:"alibaba-careers", name:"阿里巴巴招聘", type:"公司招聘入口", url:"https://talent.alibaba.com/", note:"按职位方向和实习招聘批次确认要求。" },
    { id:"tencent-careers", name:"腾讯招聘", type:"公司招聘入口", url:"https://careers.tencent.com/", note:"按岗位类别、地点和实习项目搜索具体招聘描述。" },
    { id:"mit-missing", name:"MIT Missing Semester", type:"工具学习参考", url:"https://missing.csail.mit.edu/", note:"Shell、Git、调试与开发工具。" },
    { id:"cmu-db", name:"CMU 15-445 Database Systems", type:"技术学习参考", url:"https://15445.courses.cs.cmu.edu/", note:"数据库系统、索引、事务和并发控制。" },
    { id:"mdn", name:"MDN Web Docs", type:"技术学习参考", url:"https://developer.mozilla.org/", note:"Web 平台、HTML、CSS、JavaScript 与浏览器 API。" },
    { id:"pytorch", name:"PyTorch Tutorials", type:"技术学习参考", url:"https://pytorch.org/tutorials/", note:"机器学习工程实现与训练流程。" },
    { id:"cuda-guide", name:"NVIDIA CUDA Programming Guide", type:"技术学习参考", url:"https://docs.nvidia.com/cuda/cuda-c-programming-guide/", note:"CUDA 执行模型、内存和编程接口。" },
    { id:"owasp", name:"OWASP Top 10", type:"安全学习参考", url:"https://owasp.org/www-project-top-ten/", note:"Web 应用安全风险分类与防护背景。" },
    { id:"github-octoverse", name:"GitHub Octoverse", type:"生态趋势参考", url:"https://github.blog/news-insights/octoverse/", note:"开发生态与语言使用趋势，不能直接推导岗位录用要求。" }
  ];

  const roles = [
    {
      id:"backend", title:"后端开发实习生", group:"software", code:"SWE / BACKEND", color:"#4f86f7",
      summary:"把业务需求变成可部署的服务接口、数据模型和后台逻辑。",
      internWork:["新增或维护 API、业务逻辑和数据库读写","修复缺陷，补充日志、监控和自动化测试","参与代码评审、接口联调和小型系统设计"],
      must:["api","database","sql","testing","git","linux"],
      mustOneOf:[["java","go","python"]],
      preferred:["service-frameworks","cache-messaging","data-structures","algorithms","networking","distributed","containers","cicd","observability","security-basics","architecture"],
      evidence:["一个有 API 文档、测试、错误处理和持久化的服务","清楚说明数据模型、索引和一次故障修复","可复现的构建与部署说明"],
      interview:["用哈希表、队列等结构解决问题并分析复杂度","解释 HTTP、事务、索引和并发边界","讲清楚项目中的错误处理与取舍"],
      fit:"适合喜欢把需求拆成稳定接口、数据流和服务行为的人。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","bytedance-careers","alibaba-careers","tencent-careers"]
    },
    {
      id:"frontend", title:"前端开发实习生", group:"software", code:"WEB / FRONTEND", color:"#25a98a",
      summary:"把产品流程做成响应式、可访问、数据状态清晰的浏览器界面。",
      internWork:["开发页面、组件、表单、路由或可视化","接入 API，处理加载、错误、空数据和权限状态","修复兼容、性能、交互和可访问性问题"],
      must:["typescript","web-fundamentals","react","api","testing","git","frontend-accessibility"],
      preferred:["algorithms","node","security-basics","profiling","architecture"],
      evidence:["可访问的响应式应用，具有加载/错误/空态","组件与状态设计说明，附交互测试","性能或可访问性问题的修复记录"],
      interview:["解释 JavaScript 异步、浏览器事件和渲染","拆分组件并管理状态与 API 失败","用键盘完成主要流程并说明语义结构"],
      fit:"适合关注用户交互、信息结构和界面工程质量的人。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","bytedance-careers","tencent-careers","mdn"]
    },
    {
      id:"fullstack", title:"全栈开发实习生", group:"software", code:"PRODUCT / FULL STACK", color:"#00a3c7",
      summary:"跨越浏览器、服务接口和数据持久层，交付完整的小型产品功能。",
      internWork:["实现页面与服务端 API 的端到端功能","设计表结构、验证数据并接入外部服务","补齐测试、部署流程和用户可见的错误状态"],
      must:["typescript","web-fundamentals","react","node","api","sql","database","testing"],
      preferred:["data-structures","algorithms","python","containers","cicd","security-basics","cloud"],
      evidence:["完整前后端功能，含表结构、API 契约和部署方式","关键用户路径自动化测试","说明自己负责的范围和未解决风险"],
      interview:["从用户需求设计端到端数据流","解释前后端校验、认证和数据库事务","定位一次跨层错误并描述复现过程"],
      fit:"适合希望快速构建完整产品闭环、对前后端都感兴趣的人。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","bytedance-careers","alibaba-careers","github-octoverse"]
    },
    {
      id:"cpp-systems", title:"C++ / 系统软件实习生", group:"software", code:"C++ / SYSTEMS", color:"#5969db",
      summary:"实现高性能或底层模块，精确处理资源、并发、延迟和接口行为。",
      internWork:["参与 C++ 模块、组件或基础库开发","分析崩溃、内存问题、CPU 热点或线程问题","为既有功能增加测试、性能基线和文档"],
      must:["cpp","data-structures","algorithms","os","linux","concurrency","build","testing","debugging"],
      preferred:["networking","profiling","distributed","gpu-architecture","cuda"],
      evidence:["有边界测试的 C++ 项目，展示 RAII 和资源所有权","基准脚本与硬件/编译条件记录","用调试器或 profiler 定位并修复问题的说明"],
      interview:["解释对象生命周期、移动语义和线程安全","分析复杂度、内存布局和常见并发缺陷","调试小型 C++ 崩溃或性能问题"],
      fit:"适合愿意深入语言机制、系统行为和性能证据的人。",
      sourceIds:["google-careers","amazon-jobs","nvidia-careers","bytedance-careers","tencent-careers"]
    },
    {
      id:"mobile", title:"移动端开发实习生", group:"software", code:"MOBILE / CLIENT", color:"#be72d1",
      summary:"实现稳定的 iOS 或 Android 功能，并处理生命周期、网络和设备环境。",
      internWork:["开发产品页面、控件、导航或端侧功能","对接服务 API，处理缓存、离线和错误恢复","修复兼容、启动、内存或交互问题"],
      must:["mobile","api","oop-design","testing","git","debugging"],
      mustOneOf:[["android-kotlin","ios-swift"]],
      preferred:["os","networking","profiling","security-basics","architecture","algorithms"],
      evidence:["可运行的端侧功能，包含加载/失败/重试行为","说明生命周期和状态管理策略","在模拟器或设备上的测试与缺陷记录"],
      interview:["解释异步网络和生命周期管理","分析列表/图片等场景的性能或内存问题","讨论接口失败时用户体验与重试策略"],
      fit:"适合关注设备体验、应用生命周期和端侧性能的人。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","bytedance-careers","tencent-careers"]
    },
    {
      id:"test-dev", title:"测试开发 / 质量工程实习生", group:"software", code:"TEST / QUALITY", color:"#e58b45",
      summary:"用系统化测试和自动化工具帮助团队尽早发现回归与质量风险。",
      internWork:["为服务或客户端编写自动化测试","设计边界、异常、兼容和回归用例","分析缺陷根因并维护测试环境或 CI"],
      must:["testing","test-strategy","git","debugging","build","qa-automation"],
      mustOneOf:[["python","java","typescript"]],
      preferred:["api","load-testing","cicd","linux","algorithms"],
      evidence:["从需求推导的测试矩阵与用例","在 CI 可重复运行的自动化套件","一份包含根因、影响和复现步骤的缺陷报告"],
      interview:["将需求转化为风险优先级和边界测试","诊断不稳定测试并控制环境依赖","说明单元、集成、端到端测试的取舍"],
      fit:"适合擅长拆边界、复现问题并用自动化降低重复劳动的人。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","bytedance-careers","tencent-careers"]
    },
    {
      id:"data-engineer", title:"数据工程实习生", group:"data-ai", code:"DATA / ENGINEERING", color:"#d69436",
      summary:"把异构原始数据变成准确、可追踪、可重跑的分析与模型数据集。",
      internWork:["开发批处理或流式 ETL 与调度任务","维护仓库表、数据模型、质量检查和血缘","排查延迟、重复、缺失和上游模式变更"],
      must:["python","sql","data-modeling","etl","database","data-quality","git"],
      preferred:["warehouse","streaming","distributed","cloud","testing","data-structures"],
      evidence:["可重跑管道，覆盖重复/坏数据/迟到数据","从原始到分析表的模型和口径说明","质量检查、告警或血缘报告"],
      interview:["写 SQL 连接、聚合和窗口函数","讨论增量加载、幂等和数据质量","解释批处理与流式处理的边界"],
      fit:"适合喜欢数据流、自动化管道和严格数据口径的人。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","bytedance-careers","alibaba-careers","tencent-careers"]
    },
    {
      id:"data-analyst", title:"数据分析 / BI 实习生", group:"data-ai", code:"DATA / ANALYTICS", color:"#28a69b",
      summary:"将业务问题转化为正确指标、可复现查询和支持决策的解释。",
      internWork:["编写 SQL、整理指标和建立分析看板","检查实验、漏斗、留存或运营变化","向产品/业务说明结论、假设和限制"],
      must:["sql","analytics","statistics","python","data-quality"],
      preferred:["data-modeling","warehouse","visualization","machine-learning"],
      evidence:["问题—口径—查询—结论完整的分析案例","可复现 notebook 或 dashboard","说明混杂因素、样本偏差与结论限制"],
      interview:["写分组、去重、留存或窗口查询","解释指标口径和统计不确定性","用证据区分相关与因果"],
      fit:"适合乐于从数据中回答明确业务问题并沟通结论的人。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","bytedance-careers","alibaba-careers","tencent-careers"]
    },
    {
      id:"ml-engineer", title:"机器学习工程实习生", group:"data-ai", code:"ML / ENGINEERING", color:"#8b75d9",
      summary:"把数据、特征、模型训练与评估组织成可靠、可复现的实验或服务。",
      internWork:["清洗数据、构建特征和训练/评估模型","复现实验，分析错误样本和模型指标","协助模型推理、部署、监控或训练工具"],
      must:["python","statistics","machine-learning","feature-engineering","model-evaluation"],
      preferred:["deep-learning","pytorch","mlops","sql","data-quality","linear-algebra"],
      evidence:["有基线、切分、指标和误差分析的实验","没有时间泄漏的特征流程","可复现训练脚本与模型服务原型"],
      interview:["解释过拟合、验证切分和合适评估指标","排查数据泄漏或训练/推理不一致","说明模型效果与工程成本的取舍"],
      fit:"适合同时喜欢实验、数据处理和软件实现的人。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","nvidia-careers","bytedance-careers","alibaba-careers","pytorch"]
    },
    {
      id:"algorithm-engineer", title:"算法 / 机器学习算法实习生", group:"data-ai", code:"ML / ALGORITHM", color:"#a77be0",
      summary:"围绕推荐、搜索、广告、视觉或语言任务做特征、模型、实验和效果分析。",
      internWork:["梳理数据与目标指标，建立可比较的算法基线","实现或复现模型/论文，开展训练、消融和错误分析","与工程团队协作，评估离线收益和线上部署约束"],
      must:["python","statistics","machine-learning","feature-engineering","model-evaluation"],
      mustOneOf:[["deep-learning","algorithm-research"]],
      preferred:["pytorch","linear-algebra","data-quality","sql","research-design"],
      evidence:["从基线到改进的可复现实验和误差分析","清楚的时间/用户/样本切分与泄漏排查","论文方法实现、消融实验或领域问题分析"],
      interview:["解释模型假设、损失、特征和评估指标","讨论过拟合、数据偏差和实验设计","分析如何把离线结果转化为线上可验证改进"],
      fit:"适合对模型机制、数学推理和反复实验有兴趣的人。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","nvidia-careers","bytedance-careers","alibaba-careers","tencent-careers","pytorch"]
    },
    {
      id:"ai-app", title:"AI 应用 / Agent 实习生", group:"data-ai", code:"LLM / APPLICATION", color:"#d96e9d",
      summary:"构建可测量、可控、能处理失败的检索增强或工具型 AI 产品。",
      internWork:["搭建文档解析、检索、生成和引用链路","集成外部工具、模型 API 和业务服务","建设评测集，追踪质量、延迟、成本和安全问题"],
      must:["api","llm-fundamentals","rag","llm-evaluation","testing","security-basics"],
      mustOneOf:[["python","typescript"]],
      preferred:["agent-tools","vector-search","node","data-quality","cloud"],
      evidence:["带来源引用的检索助手及固定评测集","工具有 schema、超时、权限和错误恢复","记录召回、引用正确率、成本和失败案例"],
      interview:["解释检索失败和模型幻觉如何区分","设计受限工具调用与重复调用防护","提出可复现的质量评测与成本优化方法"],
      fit:"适合愿意把模型能力做成可靠产品，而不只调用 API 的人。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","nvidia-careers","bytedance-careers","alibaba-careers","tencent-careers"]
    },
    {
      id:"platform-sre", title:"云平台 / DevOps / SRE 实习生", group:"infra", code:"PLATFORM / SRE", color:"#3c9ac9",
      summary:"让服务可构建、可发布、可观测，并在故障时恢复到可接受状态。",
      internWork:["维护 CI/CD、容器、集群和内部开发工具","编写自动化脚本、部署配置与运行手册","分析告警、容量、日志或发布导致的故障"],
      must:["linux","shell","networking","containers","cicd","git"],
      mustOneOf:[["go","python"]],
      preferred:["cloud","kubernetes","observability","distributed","security-basics"],
      evidence:["部署到云或本地集群的服务与自动发布流程","定义关键指标/探针并演练恢复","清楚记录权限、成本和故障处理过程"],
      interview:["解释进程、网络、DNS、容器和健康检查","分析服务不可用或发布回滚场景","区分可靠性、容量与成本问题"],
      fit:"适合关注运行环境、自动化、稳定性与团队开发效率的人。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","nvidia-careers","bytedance-careers","alibaba-careers","tencent-careers"]
    },
    {
      id:"ai-infra", title:"AI 基础设施 / GPU 系统实习生", group:"infra", code:"AI / INFRA & GPU", color:"#5c9dd6",
      summary:"优化训练或推理系统的吞吐、延迟、内存和资源利用率。",
      internWork:["分析模型服务、训练作业或算子中的性能瓶颈","实现系统工具、运行时集成、并行通信或 GPU kernel","用 profiler 和受控 benchmark 验证改动，记录精度影响"],
      must:["cpp","python","linux","os","concurrency","profiling"],
      mustOneOf:[["cuda","triton"]],
      preferred:["distributed","containers","gpu-profiling","mlops","linear-algebra"],
      evidence:["CPU/GPU 或基线/优化对比，包含测量条件","Profiler 证据与计算、访存、通信瓶颈解释","正确性、数值精度和端到端指标均有测试"],
      interview:["讨论线程、访存、通信和资源利用率","读性能数据，定位瓶颈并设计可验证实验","解释 kernel 正确性、同步和数值精度"],
      fit:"适合喜欢 C++、并行计算和性能诊断的人；这是系统方向的专项岗位。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","nvidia-careers","bytedance-careers","pytorch","cuda-guide"]
    },
    {
      id:"security", title:"网络安全 / 安全工程实习生", group:"security", code:"SECURITY / APPSEC", color:"#e36a61",
      summary:"在授权范围内识别、复现、评估并推动修复软件与网络风险。",
      internWork:["开展代码审计、依赖检查或授权测试","分析协议、日志和漏洞报告，复现问题","为修复建议增加回归用例并跟踪风险关闭"],
      must:["security-basics","networking","linux","python","secure-coding","debugging"],
      preferred:["security-analysis","network-security","cpp","testing","database"],
      evidence:["合法靶场或自有项目中的漏洞分析报告","复现步骤、影响、证据和修复建议","修复后回归测试或安全配置检查"],
      interview:["解释常见漏洞的成因、影响与修复","区分已验证风险和理论猜测","说明授权边界与安全测试方法"],
      fit:"适合擅长从攻击者视角推理并严谨描述风险的人。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","bytedance-careers","tencent-careers","owasp"]
    },
    {
      id:"embedded", title:"嵌入式 / IoT 实习生", group:"software", code:"EMBEDDED / IOT", color:"#65a764",
      summary:"在受限设备上实现可靠程序，连接传感器、通信协议和实时任务。",
      internWork:["编写驱动、设备逻辑或协议解析模块","在开发板/模拟器上调试中断、内存和时序问题","验证功耗、响应时间、兼容和异常恢复"],
      must:["cpp","embedded-c","hardware-protocols","os","debugging","build"],
      preferred:["rtos","networking","concurrency","testing","security-basics"],
      evidence:["可复现设备/模拟器 demo 和构建步骤","处理不完整数据帧、超时和资源限制","逻辑分析或日志支撑的故障定位记录"],
      interview:["解释中断、任务优先级和资源约束","解析协议边界并讨论超时处理","定位设备端内存或时序缺陷"],
      fit:"适合喜欢软硬件结合、资源约束和真实设备调试的人。",
      sourceIds:["google-careers","microsoft-careers","amazon-jobs","nvidia-careers","bytedance-careers"]
    },
    {
      id:"quant-dev", title:"量化开发实习生", group:"software", code:"QUANT / ENGINEERING", color:"#d5a134",
      summary:"构建行情、交易、回测或研究基础设施，重视逻辑正确、可复现与性能。",
      internWork:["实现行情解析、订单簿、回测或研究工具","处理高吞吐数据、并发、低延迟和日志","验证交易逻辑、数据口径、异常输入与回归"],
      must:["cpp","python","data-structures","algorithms","linux","concurrency","testing","sql"],
      preferred:["networking","profiling","finance","market-microstructure","backtesting"],
      evidence:["事件回放/订单簿项目，验证撮合不变量","测量条件完整的性能报告","解释重复事件、时间顺序和异常处理"],
      interview:["算法与数据结构、C++ 生命周期与并发","市场事件处理、时间边界和测试策略","分析延迟数据并说明优化证据"],
      fit:"适合偏工程实现、同时对金融市场数据感兴趣的人。",
      sourceIds:["google-careers","amazon-jobs","nvidia-careers","bytedance-careers","alibaba-careers","tencent-careers"]
    },
    {
      id:"quant-research", title:"量化研究实习生", group:"data-ai", code:"QUANT / RESEARCH", color:"#b47a3b",
      summary:"提出可证伪假设，用统计与严谨回测判断策略是否有样本外价值。",
      internWork:["探索市场数据并提出研究假设","构建信号、评估基准、成本和样本外表现","做稳健性分析并记录未成功的实验"],
      must:["python","statistics","finance","research-design","backtesting","model-evaluation","data-quality"],
      preferred:["market-microstructure","machine-learning","sql","feature-engineering"],
      evidence:["可复现实验报告，包含假设、基准、交易成本","按时间切分的样本外评估与稳健性检验","记录负结果、参数敏感性和研究限制"],
      interview:["解释统计显著性与实际收益的差别","识别未来函数、过拟合和多重检验风险","说明为何实验能或不能支持研究假设"],
      fit:"适合喜欢概率、数据研究和反复验证假设的人；与量化开发的工程侧重点不同。",
      sourceIds:["google-careers","amazon-jobs","nvidia-careers","bytedance-careers","alibaba-careers"]
    }
  ];

  const skillById = Object.fromEntries(skills.map((skill) => [skill.id, skill]));
  roles.forEach((role) => {
    role.mustOneOf = role.mustOneOf || [];
    role.skillIds = [...new Set([...role.must, ...role.mustOneOf.flat(), ...role.preferred])];
    role.skills = role.skillIds.map((id) => skillById[id]).filter(Boolean);
  });
  skills.forEach((skill) => {
    skill.roleIds = roles.filter((role) => role.skillIds.includes(skill.id)).map((role) => role.id);
  });

  window.ATLAS_DATA = {
    updated: "2026-10-18",
    skills,
    roles,
    sources,
    layers: {
      foundation: { label:"工具与基础", color:"#5d8ef5" },
      engineering: { label:"工程与系统", color:"#28b89b" },
      data: { label:"数据与 AI", color:"#bb82ee" },
      specialization: { label:"岗位分支", color:"#eea44b" }
    }
  };
})();
