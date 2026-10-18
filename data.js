/* Career Skill Atlas: source data and job-skill relationships. */
(function () {
  const skills = [
    ["programming-basics","程序设计基础","foundation","编程基础","理解变量、类型、控制流、函数、数据表示与程序状态。","语言可以更换，分解问题和追踪程序行为的能力可以复用。",[],"把一个需求拆成函数，处理输入边界，并手工追踪一段程序的状态变化。"],
    ["discrete-math","离散数学与逻辑","foundation","数学","理解集合、逻辑、关系、图、组合计数和基本证明方法。","算法正确性、数据建模和系统状态都依赖明确的离散结构。",[],"用不变量解释一个算法为何正确，并给出一个边界反例。"],
    ["computer-architecture","计算机组成与体系结构","foundation","计算机基础","理解指令执行、CPU、缓存、内存层次、数据表示与 I/O。","系统性能、内存错误和软硬件协作需要共同的机制解释。",["programming-basics"],"用缓存局部性或数据布局解释两段等价程序的性能差异。"],
    ["calculus","微积分与优化基础","foundation","数学","理解导数、偏导、链式法则、梯度和迭代优化。","深度学习训练和数值优化需要解释目标如何随参数变化。",[],"对一个小型损失函数推导梯度，用有限差分验证结果。"],
    ["c-language","C 语言与内存基础","foundation","编程语言","理解指针、数组、结构体、内存布局、位操作和手动资源管理。","嵌入式、驱动和底层接口常要求直接处理内存与硬件表示。",["programming-basics","build"],"实现并测试二进制协议解析器，检查越界、对齐与资源释放。"],
    ["collaboration","工程协作与技术表达","foundation","协作","理解需求澄清、任务拆分、代码评审、文档与进度沟通。","实习交付发生在团队与既有代码库中，需要让他人理解并验证你的改动。",["git"],"提交包含背景、改动、验证和限制的 PR，并回应一次有依据的评审意见。"],
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
      fit:"适合偏工程实现、同时对金融市场数据感兴趣的人。此画像以 C++ 系统路径为例；不同团队也可能使用 OCaml、Python、Java 等，按目标 JD 调整。",
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

  // Learning dependencies describe conceptual preparation, not a mandatory language stack.
  const prerequisites = {
    "data-structures":["programming-basics"], "algorithms":["data-structures","discrete-math"],
    "oop-design":["programming-basics"], "testing":["programming-basics","git"],
    "cpp":["programming-basics","oop-design","build"], "python":["programming-basics","shell"],
    "java":["programming-basics","oop-design"], "typescript":["programming-basics"],
    "go":["programming-basics","shell"], "os":["linux","computer-architecture"],
    "networking":["programming-basics"], "concurrency":["os","programming-basics"],
    "linear-algebra":[], "machine-learning":["python","statistics","linear-algebra"],
    "deep-learning":["machine-learning","calculus"], "data-quality":["programming-basics"],
    "llm-fundamentals":["programming-basics"], "mlops":["model-evaluation","containers","cicd"],
    "gpu-architecture":["computer-architecture","profiling"], "gpu-profiling":["gpu-architecture","profiling"],
    "embedded-c":["c-language","build"], "hardware-protocols":["embedded-c","computer-architecture"]
  };
  const topicMap = {
    "programming-basics":["变量、类型与值","条件、循环与控制流","函数、参数与作用域","输入校验与错误处理","程序状态与问题分解"],
    "discrete-math":["命题逻辑与集合","关系、函数与图","排列组合与计数","归纳法与循环不变量","反例与边界证明"],
    "computer-architecture":["二进制、补码与浮点表示","指令、流水线与分支","寄存器、缓存与主存","局部性、缓存行与伪共享","中断、DMA 与 I/O"],
    "calculus":["导数与偏导数","链式法则与梯度","梯度下降与学习率","凸性与局部极值","数值微分与梯度检查"],
    "c-language":["指针、数组与字符串","结构体、对齐与字节序","栈、堆与资源释放","位运算与寄存器表示","越界、悬空指针与未定义行为"],
    "collaboration":["需求澄清与验收标准","任务拆分与进度同步","PR 描述与代码评审","技术文档与口头表达","阅读陌生代码与验证 AI 生成改动"],
    "shell":["目录、路径与文件检索","标准输入输出、管道与重定向","进程、环境变量与退出码","脚本参数、引号与错误处理","远程登录与批处理"],
    "git":["工作区、暂存区与提交","差异、日志与分支","合并、变基与冲突解决","回退、撤销与问题定位","PR、忽略规则与协作约定"],
    "build":["预处理、编译与链接","头文件、静态库与动态库","CMake target 与依赖","包管理、锁文件与版本","Debug/Release 与可复现构建"],
    "testing":["正常、边界与异常用例","单元、集成与端到端测试","断言、fixture 与 Mock","确定性与测试隔离","GoogleTest/pytest 等框架与回归"],
    "debugging":["最小复现与假设排除","断点、调用栈与变量观察","日志与错误上下文","内存检查与 Sanitizer","根因记录与修复验证"],
    "data-structures":["数组、链表与队列","哈希表与冲突处理","堆、树与有序索引","图的表示与遍历","操作复杂度、内存布局与选型"],
    "algorithms":["时间与空间复杂度","排序、二分与双指针","递归、回溯与动态规划","BFS、DFS 与最短路","贪心、不变量与边界分析"],
    "oop-design":["封装与不变量","接口、组合与依赖方向","继承、多态与替换边界","职责划分与可测试性","设计模式的动机与代价"],
    "cpp":["对象生命周期与 RAII","值、引用、移动与所有权","智能指针与异常安全","模板、泛型与 STL","迭代器失效、const 与未定义行为"],
    "python":["容器、迭代器与生成器","函数、模块与类型标注","异常、上下文管理与文件 I/O","虚拟环境与依赖管理","NumPy/pandas 基础与测试"],
    "java":["集合、泛型与异常","接口、类与依赖组织","JVM、堆与垃圾回收","线程与并发集合","构建、单元测试与服务框架"],
    "typescript":["作用域、闭包与原型","Promise、异步与事件循环","模块与包管理","联合类型、泛型与类型收窄","运行时校验与编译期类型的边界"],
    "go":["切片、映射与接口","错误处理与 defer","goroutine 与 channel","context、超时与取消","模块、测试与数据竞争检查"],
    "sql":["过滤、排序与空值语义","JOIN 与重复行","分组聚合与子查询","窗口函数与时间口径","去重、约束与查询验证"],
    "linux":["文件、权限与用户","进程、信号与资源限制","服务、日志与系统工具","文件描述符与 I/O","网络排障与包管理"],
    "os":["进程、线程与调度","虚拟内存与地址空间","系统调用与用户态/内核态","文件系统、缓存与 I/O","阻塞、中断与资源管理"],
    "networking":["TCP/IP 分层与寻址","DNS 与连接建立","TCP 可靠传输、流量与拥塞控制","HTTP、TLS 与连接复用","超时、重试、分包与断连"],
    "concurrency":["线程、任务与共享状态","互斥锁、条件变量与信号量","原子操作与内存可见性","竞态、死锁与锁顺序","线程池、取消与背压"],
    "database":["B+ 树索引与查询计划","事务、ACID 与隔离级别","锁、MVCC 与并发异常","日志、恢复与持久性","约束、模式迁移与慢查询"],
    "api":["资源建模与 HTTP 语义","参数、分页与错误契约","鉴权、授权与会话","幂等、限流、超时与重试","版本兼容与接口文档"],
    "backend":["业务逻辑与分层","数据访问与事务边界","配置、日志与依赖注入","认证、授权与异常处理","后台任务、缓存与可测试性"],
    "service-frameworks":["路由与中间件","参数校验与统一错误处理","依赖注入与生命周期","ORM、事务与配置","框架集成测试与扩展点"],
    "cache-messaging":["缓存旁路、失效与淘汰","穿透、击穿与热点","消息确认、重试与死信","幂等消费者与顺序性","缓存一致性与故障降级"],
    "distributed":["部分失败与网络分区","复制、分片与一致性","幂等、重试与去重","共识、选主与故障检测","分布式事务与可观测性"],
    "architecture":["边界、模块与依赖方向","接口契约与兼容性","容量与非功能需求","演进、迁移与技术债","架构决策记录与取舍"],
    "profiling":["受控基准与测量误差","CPU 火焰图与热点","内存、分配与缓存","I/O、等待与锁争用","吞吐、延迟分位数与回归"],
    "web-fundamentals":["语义 HTML 与表单","CSS 盒模型、Flex 与 Grid","DOM、事件传播与默认行为","布局、绘制与浏览器加载","响应式与跨浏览器验证"],
    "react":["React/Vue/Angular 中选择一种","组件、属性与状态归属","表单、路由与异步数据","副作用、渲染与更新","加载/错误/空态与组件测试"],
    "node":["事件循环与异步 I/O","模块、npm 与版本管理","HTTP 服务与中间件","输入校验、日志与错误边界","阻塞任务、流与资源释放"],
    "mobile":["生命周期与页面导航","界面状态与异步任务","网络、缓存与离线恢复","设备权限与本地存储","启动、内存与设备兼容"],
    "android-kotlin":["Kotlin 类型、空安全与集合","Activity/Fragment 或 Compose","ViewModel 与生命周期","协程、Flow 与取消","网络、存储与单元/UI 测试"],
    "ios-swift":["Swift 类型、可选值与协议","SwiftUI/UIKit 与导航","ARC、引用环与生命周期","async/await 与主线程","网络、持久化与 XCTest"],
    "qa-automation":["API 与浏览器自动化","fixture、Mock 与测试数据","稳定定位与异步等待","并行执行与环境隔离","失败报告、CI 与不稳定用例"],
    "test-strategy":["需求分析与风险覆盖","等价类、边界与状态迁移","测试层次与成本取舍","缺陷复现、分级与根因","回归范围与发布准入"],
    "load-testing":["负载模型与容量假设","并发、吞吐与延迟分位数","预热、稳态与长稳测试","瓶颈、饱和与资源指标","压测隔离、结果复现与回归"],
    "cloud":["计算、对象存储与托管数据库","VPC、子网与安全组","IAM 与最小权限","可用区、备份与恢复","配额、成本与基础设施配置"],
    "containers":["镜像、分层与 Dockerfile","容器隔离与资源限制","网络、卷与持久化","配置、密钥与非 root 运行","健康检查、多阶段构建与 Compose"],
    "kubernetes":["Pod、Deployment 与 Service","配置、Secret 与资源限制","就绪/存活探针与滚动更新","调度、扩缩容与存储","排障、权限与故障恢复"],
    "cicd":["提交触发与检查门禁","构建、测试与制品","环境、配置与密钥","发布、回滚与数据库迁移","流水线故障与可追溯版本"],
    "observability":["结构化日志、指标与追踪","SLI、SLO 与错误预算","告警质量与故障分诊","容量、发布与性能回归","运行手册、复盘与恢复演练"],
    "security-basics":["威胁建模与攻击面","认证、授权与最小权限","输入校验与常见 Web 风险","密钥、依赖与供应链","隐私、日志脱敏与数据保留"],
    "security-analysis":["授权范围与测试计划","静态、动态与依赖分析","漏洞复现与利用条件","模糊测试与崩溃归因","影响评估、修复与回归"],
    "frontend-accessibility":["语义结构与可访问名称","键盘、焦点与跳转顺序","对比度与非颜色提示","表单标签与错误反馈","屏幕阅读器与减少动态效果"],
    "data-modeling":["实体、主键与关系","事实、维度与粒度","事件、时间与指标口径","规范化、宽表与取舍","数据字典与模式演进"],
    "etl":["抽取、清洗与转换","全量、增量与检查点","调度、依赖与重跑","幂等、去重与错误隔离","迟到数据与模式变化"],
    "warehouse":["ODS/DWD/DWS 等分层思路","星型与雪花模型","缓慢变化维与历史快照","分区、增量与回填","指标层、血缘与权限"],
    "streaming":["消息、分区与消费偏移","事件时间与处理时间","窗口、水位线与迟到数据","状态、检查点与恢复","重放、背压与交付语义"],
    "data-quality":["缺失、重复与模式校验","时间、一致性与及时性","异常检测与质量规则","血缘、版本与可追溯性","隐私、权限与敏感字段"],
    "analytics":["问题拆解与指标树","漏斗、留存与分群","抽样偏差与混杂因素","实验与因果解释边界","结论、建议与沟通"],
    "visualization":["趋势、分布与比较图型","坐标、尺度与误导风险","口径、标签与图例","不确定性与异常注释","看板交互与可访问表达"],
    "statistics":["条件概率与常见分布","期望、方差与抽样","估计、置信区间与检验","回归、相关与因果边界","实验设计、功效与多重比较"],
    "machine-learning":["监督/无监督与任务定义","线性模型、树与集成","损失、正则化与优化","切分、交叉验证与泛化","基线、偏差与误差分析"],
    "algorithm-research":["论文问题、假设与贡献","方法复现与公平基线","任务分支：推荐/搜索/视觉/NLP","消融、敏感性与错误分析","复现记录、负结果与局限"],
    "deep-learning":["张量、神经网络与计算图","链式法则与反向传播","优化器、初始化与正则化","CNN、注意力与 Transformer","训练稳定性与泛化诊断"],
    "pytorch":["张量、shape 与 device","Dataset/DataLoader 与批处理","autograd 与训练循环","训练/评估模式与随机种子","checkpoint、恢复与推理"],
    "feature-engineering":["缺失、类别与尺度处理","时间特征与窗口聚合","特征选择与编码","训练/推理一致性","数据泄漏与可复现流水线"],
    "model-evaluation":["时间/用户/样本切分","分类、回归与排序指标","基线、置信区间与统计比较","类别不平衡与错误分桶","离线/线上差异与漂移"],
    "mlops":["数据、代码与模型版本","实验记录与制品管理","批量/在线推理与接口","延迟、质量与漂移监控","灰度、回滚与一致性"],
    "llm-fundamentals":["token、上下文与生成","温度、采样与结构化输出","嵌入、注意力与模型概念","提示、示例与模型边界","能力、成本、隐私与失败模式"],
    "rag":["文档解析、切分与元数据","关键词、向量与混合检索","重排、上下文组装与引用","拒答、更新与权限过滤","召回、引用正确率与错误分桶"],
    "agent-tools":["工具 schema 与参数校验","状态、任务分解与停止条件","超时、取消与错误恢复","最小权限与副作用确认","重复执行防护与调用评测"],
    "llm-evaluation":["固定评测集与数据分层","事实、引用与工具正确率","检索与生成错误区分","提示注入与敏感信息测试","质量、成本、延迟与版本比较"],
    "vector-search":["embedding 与相似度","近似近邻与索引","召回、延迟与资源取舍","过滤、关键词与混合检索","重排与索引更新"],
    "linear-algebra":["向量、矩阵与张量维度","矩阵乘法与线性变换","范数、特征值与分解","浮点数、舍入与稳定性","条件数与误差传播"],
    "gpu-architecture":["SM、warp 与线程层次","全局/共享/寄存器内存","合并访存与 bank conflict","占用率、带宽与算术强度","主机传输、同步与 Roofline"],
    "cuda":["kernel、grid 与 block","内存分配、传输与合并访存","共享内存、同步与归约","stream、事件与异步执行","正确性、精度与性能测量"],
    "triton":["program 与块式张量计算","掩码、边界与内存访问","归约、广播与布局","分块、融合与自动调优","数值校验与基准测量"],
    "gpu-profiling":["GPU 时间线与 kernel 指标","计算、访存与通信瓶颈","占用率与寄存器压力","同步、传输与重叠","预热、精度与端到端收益"],
    "embedded-c":["裸机与 Embedded Linux 路径","内存映射、位操作与 volatile","中断、定时器与驱动接口","静态资源与缓冲管理","交叉编译、烧录与板端调试"],
    "rtos":["任务、调度与优先级","队列、信号量与互斥量","中断上下文与任务通信","优先级反转与时限","内存、看门狗与故障恢复"],
    "hardware-protocols":["UART、I2C 与 SPI","USB/CAN 等按设备选学","时序、校验与协议状态机","传感器、驱动与数据手册","逻辑分析、超时与重试"],
    "secure-coding":["输入、输出与参数化查询","访问控制与越权检查","内存与资源安全","密码、密钥与依赖管理","安全默认值与回归测试"],
    "network-security":["TLS、证书与信任链","网络分区与访问规则","流量、日志与异常分析","身份、边界与零信任概念","协议风险与安全配置"],
    "finance":["收益率、复利与风险","资产、订单与交易成本","概率、期望与风险敞口","价格/成交数据的时间语义","基准、可交易性与金融假设"],
    "market-microstructure":["订单簿、撮合与盘口","限价/市价单与订单生命周期","价差、流动性与冲击","行情事件、序号与延迟","交易规则与市场差异"],
    "backtesting":["事件驱动与时间推进","未来信息与幸存者偏差","滑点、费用与成交假设","样本外与滚动验证","基准、风控与实验复现"],
    "research-design":["假设、对照与研究日志","时间切分与样本外验证","多重检验与选择偏差","稳健性、成本与容量","统计显著性、负结果与研究限制"]
  };
  skills.forEach((skill) => {
    if (Object.prototype.hasOwnProperty.call(prerequisites, skill.id)) skill.prerequisites = prerequisites[skill.id];
    skill.topics = topicMap[skill.id];
    if (skill.id === "linear-algebra") skill.layer = "foundation";
    if (skill.id === "react") {
      skill.title = "前端框架与状态管理";
      skill.summary = "以 React 为例理解组件、状态、表单、路由、异步请求与渲染；可按目标 JD 选择 Vue 或 Angular。";
    }
  });
  const skillById = Object.fromEntries(skills.map((skill) => [skill.id, skill]));
  const pathSpecs = {
    "backend": {start:["sql","testing"], core:["backend","service-frameworks"], project:"可部署的预约或订单服务", steps:["定义资源、表结构、接口契约与迁移","实现鉴权、事务、错误处理和边界测试","部署并记录一次慢查询或故障的定位过程"], advance:["cache-messaging","distributed","observability"]},
    "frontend": {start:["typescript","web-fundamentals","testing"], core:["react","api","frontend-accessibility"], project:"可访问的业务工作台", steps:["拆分页面、组件与状态归属，完成响应式布局","接入 API，覆盖表单、加载、空态与错误恢复","用键盘和自动化验证主要流程，记录性能改进"], advance:["profiling","security-basics","architecture"]},
    "fullstack": {start:["typescript","web-fundamentals","sql","testing"], core:["node","react","database","api"], project:"包含账户与数据管理的完整小产品", steps:["定义用户流程、数据模型与前后端契约","完成前端操作、服务校验和数据持久化闭环","为关键路径编写端到端测试并提供部署说明"], advance:["containers","cicd","security-basics"]},
    "cpp-systems": {start:["cpp","data-structures","computer-architecture","testing"], core:["os","concurrency","debugging","profiling"], project:"有性能证据的 C++ 缓存或任务执行器", steps:["设计所有权、接口与边界，建立正确性测试","实现并发或资源管理，定位一次内存/线程缺陷","用固定输入与硬件记录比较基线和优化版本"], advance:["networking","distributed","cuda"]},
    "mobile": {start:["oop-design","api","testing"], core:["mobile","debugging"], project:"支持弱网与离线状态的移动应用", steps:["在 Android 或 iOS 中实现导航、列表与详情","连接 API，处理生命周期、取消、缓存与重试","在模拟器或设备验证功能、内存和可访问性"], advance:["concurrency","profiling","security-basics"]},
    "test-dev": {start:["testing","build","debugging"], core:["test-strategy","qa-automation","api"], project:"服务与界面的自动化质量流水线", steps:["从需求列出等价类、边界、状态与高风险失败","建立隔离的测试数据、API/UI 用例和缺陷报告","在 CI 运行回归，定位不稳定用例并记录取舍"], advance:["load-testing","cicd","linux"]},
    "data-engineer": {start:["python","sql","database","testing"], core:["data-modeling","etl","data-quality","warehouse"], project:"可重跑的业务数据管道", steps:["定义原始事件、粒度、主键和指标数据字典","实现增量 ETL，覆盖重复、迟到、缺失与重跑","生成分析表并展示质量检查、调度和血缘"], advance:["streaming","distributed","cloud"]},
    "data-analyst": {start:["python","sql","statistics"], core:["analytics","data-quality","visualization"], project:"从业务问题到建议的分析看板", steps:["明确业务问题、指标口径、样本范围和假设","用 SQL/Python 检查数据，分析漏斗、留存或实验","用图表陈述结论、偏差、置信程度和可执行建议"], advance:["data-modeling","warehouse","machine-learning"]},
    "ml-engineer": {start:["python","statistics","linear-algebra","testing"], core:["machine-learning","data-quality","feature-engineering","model-evaluation"], project:"可复现的预测模型与推理服务", steps:["定义任务与基线，固定数据版本和验证切分","建立特征、训练、评估和误差分析流水线","提供推理接口，校验版本、延迟和训练/服务一致性"], advance:["deep-learning","pytorch","mlops"]},
    "algorithm-engineer": {start:["python","statistics","linear-algebra","calculus"], core:["machine-learning","feature-engineering","model-evaluation"], project:"面向单一任务的算法基线与消融实验", steps:["选推荐、搜索、视觉或 NLP 中一个任务定义指标","复现基线和一种改进，保持数据与计算条件可比","报告消融、误差、负结果和部署约束"], advance:["pytorch","algorithm-research","research-design"]},
    "ai-app": {start:["api","testing","data-quality"], core:["llm-fundamentals","rag","llm-evaluation","security-basics"], project:"带引用、拒答与评测的知识助手", steps:["解析自有文档，建立切分、索引与来源引用","实现检索和回答，并为无证据或越权问题设置边界","固定问答集，比较召回、引用、成本和失败类型"], advance:["vector-search","agent-tools","cloud"]},
    "platform-sre": {start:["shell","linux","networking","testing"], core:["containers","cicd","cloud","observability"], project:"可发布、可观测、可恢复的服务环境", steps:["容器化一个服务，配置健康检查与最小权限","建立构建、测试、发布、回滚与配置流程","定义服务指标，演练依赖故障并提交复盘"], advance:["kubernetes","distributed","security-basics"]},
    "ai-infra": {start:["cpp","python","computer-architecture","linear-algebra","testing"], core:["os","concurrency","profiling","gpu-architecture"], project:"有正确性与端到端收益的 GPU 算子优化", steps:["从归约或矩阵运算建立 CPU/框架参考与误差标准","以 CUDA 或 Triton 实现，测量访存、同步和计算瓶颈","固定设备、形状、预热与精度，报告优化与失效范围"], advance:["gpu-profiling","distributed","mlops"]},
    "security": {start:["python","linux","networking","debugging"], core:["security-basics","secure-coding","security-analysis"], project:"自有应用的安全分析与修复闭环", steps:["确定授权范围，绘制数据流、权限与威胁模型","在隔离环境复现缺陷，给出利用条件和影响证据","实施修复并添加回归用例与安全配置检查"], advance:["network-security","cpp","database"]},
    "embedded": {start:["c-language","computer-architecture","build","testing","debugging"], core:["embedded-c","hardware-protocols"], project:"有异常恢复的设备采集或协议模块", steps:["选择开发板/模拟器，阅读数据手册并构建烧录流程","实现驱动或协议状态机，检查中断、超时与缓冲边界","测量时序、资源与恢复行为，记录设备和测试条件"], advance:["rtos","linux","concurrency"]},
    "quant-dev": {start:["cpp","data-structures","linux","testing"], core:["finance","market-microstructure","backtesting","concurrency","profiling"], project:"行情回放与订单簿事件引擎", steps:["定义行情事件、序号、订单状态与确定性回放","实现订单簿与边界测试，记录所有权和数据布局","对吞吐、延迟、内存与重放正确性建立受控基准"], advance:["distributed","networking","gpu-architecture"]},
    "quant-research": {start:["python","statistics","finance"], core:["backtesting","research-design","data-quality","model-evaluation"], project:"包含样本外验证与成本的研究报告", steps:["明确可证伪假设、数据时点、样本和基准","实现无未来信息的回测与滚动样本外评估","计入费用与滑点，报告稳健性、负结果和容量限制"], advance:["market-microstructure","machine-learning","feature-engineering"]}
  };
  roles.forEach((role) => {
    role.mustOneOf = role.mustOneOf || [];
    role.path = pathSpecs[role.id];
    role.skillIds = [...new Set([...role.must, ...role.mustOneOf.flat(), ...role.preferred])];
    role.skills = role.skillIds.map((id) => skillById[id]).filter(Boolean);
  });
  skills.forEach((skill) => {
    skill.directRoleIds = roles.filter((role) => role.skillIds.includes(skill.id)).map((role) => role.id);
    skill.roleIds = roles.filter((role) => {
      const required = new Set(["programming-basics","shell","git","collaboration",...role.skillIds,...role.path.start,...role.path.core]);
      function includes(id) { return id===skill.id || skillById[id].prerequisites.some(includes); }
      return [...required].some(includes);
    }).map((role) => role.id);
  });

  // A dependency-respecting example path. Alternatives are selected per group.
  function getLearningPath(roleId, choices = []) {
    const role = roles.find((item) => item.id === roleId);
    if (!role) throw new Error("Unknown role: " + roleId);
    const selected = role.mustOneOf.map((group,index) => group.includes(choices[index]) ? choices[index] : group[0]);
    function ordered(seeds) {
      const visited = new Set(), result = [];
      function visit(id) {
        if (visited.has(id)) return;
        visited.add(id);
        skillById[id].prerequisites.forEach(visit);
        result.push(id);
      }
      seeds.forEach(visit);
      return result;
    }
    const languages = selected.filter((id) => skillById[id].family === "编程语言");
    const foundation = ordered(["programming-basics","shell","git","collaboration",...role.path.start,...languages]);
    const foundationSet = new Set(foundation);
    const required = ordered([...foundation,...role.must,...selected,...role.path.core]);
    return { selected, foundation, core:required.filter((id) => !foundationSet.has(id)), required,
      project:{title:role.path.project, steps:role.path.steps, acceptance:role.evidence},
      advance:role.path.advance.filter((id) => !required.includes(id)) };
  }

  // Official JD snapshots. All technical summaries below are paraphrases except `quote`.
  // `source-readable` records that the source was readable, not that an offer or application is guaranteed.
  const jdEvidence = [
    {id:"databricks-6866534002",company:"Databricks",title:"Software Engineering Intern (2027 Start)",location:"Amsterdam, Netherlands",url:"https://databricks.com/company/careers/open-positions/job?gh_jid=6866534002",checked:"2026-10-18",status:"source-readable",roleIds:["backend","fullstack","cpp-systems"],
      eligibility:["计算机、工程或相关学位；预计 2027 年秋季至 2028 年夏季毕业","2027 暑期约 12 周；co-op 限在对应 co-op 项目就读的学生"],
      required:[{text:"具备 Python、Java、C++ 等通用语言的实现能力；示例语言按岗位选择",skillIds:["python","java","cpp"]},{text:"算法、数据结构、面向对象基础与团队解决不明确问题的能力",skillIds:["algorithms","data-structures","oop-design","collaboration"]}],preferred:[],
      quote:"You have good knowledge of algorithms, data structures, and OOP principles",note:"通用软件工程实习样例，不能据此认定所有后端岗位都要求某一语言。"},
    {id:"stripe-8130883",company:"Stripe",title:"Software Engineer, Intern",location:"Singapore",url:"https://stripe.com/jobs/search?gh_jid=8130883",checked:"2026-10-18",status:"source-readable",roleIds:["backend","fullstack","frontend"],
      eligibility:["通过计算机、数学或相关本科/硕士学习建立计算机基础","有课程/个人编程经历，以及实习或其他多人项目的协作经历；此记录未提取到统一毕业窗口"],
      required:[{text:"编程与计算机基础；团队使用 Ruby、Java、JavaScript、Go、Scala，强调语言可学习",skillIds:["programming-basics","java","typescript","go"]},{text:"理解陌生系统，参与代码评审与反馈；使用 AI 工具时能批判审查、修正并验证输出",skillIds:["collaboration","git","testing"]}],
      preferred:[{text:"专业方向能力、高质量 PR 与测试覆盖、阅读多语言代码库和清晰书面沟通",skillIds:["testing","collaboration","architecture"]}],
      quote:"We believe new programming languages can be learned if the fundamentals and general knowledge are present.",note:"跨技术栈软件工程样例；前端、后端和基础设施专长在原文列为加分方向。"},
    {id:"cloudflare-8199958",company:"Cloudflare",title:"Software Engineer Intern (2027)",location:"Austin, TX, US · 现场",url:"https://boards.greenhouse.io/cloudflare/jobs/8199958?gh_jid=8199958",checked:"2026-10-18",status:"source-readable",roleIds:["backend","fullstack","platform-sre"],
      eligibility:["就读计算机、工程、数学、统计或相关学位/项目","全职 40 小时/周，至少 12 周；项目通常 12—14 周，Austin 每周现场 3—5 天；不接受远程或兼职"],
      required:[{text:"交付项目、跨团队协作并进行最终展示；具备批判思考与快速学习能力",skillIds:["collaboration","architecture"]},{text:"原文技术背景列出 TypeScript/JavaScript、Go、Rust、C/C++、Python，未要求全部掌握",skillIds:["typescript","go","c-language","cpp","python"]}],
      preferred:[{text:"个人项目、开源贡献或 Cloudflare 开发平台经历",skillIds:["git","collaboration"]}],
      quote:"Ship and deliver projects over 12-14 weeks with autonomy and support.",note:"互联网规模系统的软件工程样例；平台/SRE 关联来自系统职责，原文不是专门的 SRE 职位。"},
    {id:"datadog-8181440",company:"Datadog",title:"Applied Science Intern",location:"Paris, France",url:"https://careers.datadoghq.com/detail/8181440/?gh_jid=8181440",checked:"2026-10-18",status:"source-readable",roleIds:["ml-engineer","algorithm-engineer"],
      eligibility:["2027 年毕业；机器学习、AI、统计、计算机或相关专业","连续 6 个月；开始时间仅限 2027 年 2、3、4、5 或 6 月；英文简历"],
      required:[{text:"通过课程、研究、实习或个人项目有机器学习建模经历与较强编程能力",skillIds:["machine-learning","programming-basics"]},{text:"参与模型评估、AI 系统部署监控，并能向不同背景受众解释复杂概念",skillIds:["model-evaluation","mlops","collaboration"]}],preferred:[],
      quote:"You have experience building machine learning models through coursework, research, internships, or personal projects",note:"应用科学岗位不等于全部算法岗位；实习时间窗口是该条 JD 的具体限制。"},
    {id:"stripe-8194291",company:"Stripe",title:"Data Analyst, Intern",location:"New York / Seattle / South San Francisco, US",url:"https://stripe.com/jobs/search?gh_jid=8194291",checked:"2026-10-18",status:"source-readable",roleIds:["data-analyst","data-engineer"],
      eligibility:["定量相关本科/硕士在读，如分析、统计、经济、数学","预计 2027 年 12 月或 2028 年春/夏毕业"],
      required:[{text:"有 SQL 经验，能用 AI 工具加快模型、分析和编码，并与多学科团队沟通",skillIds:["sql","analytics","collaboration"]},{text:"职责覆盖指标、数据资产、看板、分析建议及 A/B 测试",skillIds:["data-modeling","visualization","statistics","analytics"]}],
      preferred:[{text:"编写与调试数据管道、多人项目反馈经历，以及学习陌生系统的能力",skillIds:["etl","debugging","collaboration"]}],
      quote:"Experience with SQL",note:"数据分析直接样例；数据工程是相邻职责参考，原文中的管道经验属于加分项。"},
    {id:"databricks-7011263002",company:"Databricks",title:"PhD GenAI Research Scientist Intern",location:"San Francisco, CA, US",url:"https://databricks.com/company/careers/open-positions/job?gh_jid=7011263002",checked:"2026-10-18",status:"source-readable",roleIds:["algorithm-engineer","ai-app"],
      eligibility:["计算机或相关领域博士在读","此条是生成式 AI 研究实习；不是一般 AI 应用工程实习的学历门槛"],
      required:[{text:"有深度学习研究经验，具备软件工程和 PyTorch 实现能力",skillIds:["deep-learning","algorithm-research","pytorch"]},{text:"研究职责包括领域适配、文献方法改进、LLM/AI 系统评测、检索增强和高效推理",skillIds:["llm-fundamentals","rag","llm-evaluation","model-evaluation"]}],preferred:[],
      quote:"Research experience in and proficiency with the fundamentals of deep learning.",note:"AI 应用的相邻研究样例，用于说明应用工程与模型研究的分界；博士要求仅归属此职位。"},
    {id:"nvidia-JR2022645",company:"NVIDIA",title:"Software Engineering Intern, NCCL - 2026",location:"中国上海 / 北京",url:"https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite/job/China-Shanghai/Software-Engineering-Intern--NCCL---2026_JR2022645",checked:"2026-10-18",status:"needs-refresh",roleIds:["cpp-systems","ai-infra"],
      eligibility:["CE/CS/EE 博士在读；具有体系结构、OS、通信库和/或 AI/ML 背景","2026 批次；原文可读取，当前批次与可投递状态仍需核对"],
      required:[{text:"优秀的 C/C++ 编程与调试、较强 Linux 经验、并行编程接口和通信运行时经验",skillIds:["cpp","debugging","linux","concurrency","distributed"]},{text:"开发 GPU 集群通信运行时，与跨国家/时区团队有效协作",skillIds:["gpu-architecture","networking","collaboration"]}],
      preferred:[{text:"InfiniBand/RoCE、HPC、深度学习框架、分布式训练/推理、CUDA 优化与性能分析",skillIds:["pytorch","cuda","gpu-profiling","distributed"]}],
      quote:"Excellent C/C++ programming and debugging skills.",note:"专项博士实习样例；不能外推为所有 C++ 或 GPU 实习均要求博士。"},
    {id:"nvidia-JR2023492",company:"NVIDIA",title:"NVIDIA 2027 Internships: Systems Software Engineering",location:"Santa Clara, CA, US · 多方向汇总",url:"https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite/job/US-CA-Santa-Clara/NVIDIA-2027-Internships--Systems-Software-Engineering_JR2023492",checked:"2026-10-18",status:"direction-pool",roleIds:["cpp-systems","embedded","ai-infra"],
      eligibility:["实习全程为相关专业本科/硕士/博士在读","简历清楚列出预计毕业年月；这是方向汇总，具体团队要求可能不同"],
      required:[{text:"依具体岗位可能涉及 C/C++、Linux、OS、体系结构、网络、多线程或嵌入式开发",skillIds:["c-language","cpp","linux","os","computer-architecture","networking","concurrency","embedded-c"]}],preferred:[],
      quote:"Depending on the internship role, prior experience or knowledge requirements could include",note:"原文明确按岗位列举可能技术；不是要求一个人掌握整个列表。"},
    {id:"nvidia-JR2023497",company:"NVIDIA",title:"NVIDIA 2027 Internships: Deep Learning",location:"Santa Clara, CA, US · 多方向汇总",url:"https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite/job/US-CA-Santa-Clara/NVIDIA-2027-Internships--Deep-Learning_JR2023497-1",checked:"2026-10-18",status:"direction-pool",roleIds:["ml-engineer","algorithm-engineer","ai-infra"],
      eligibility:["实习全程为相关专业本科/硕士/博士在读","简历标明预计毕业年月；各团队的工作内容与先修知识不同"],
      required:[{text:"方向背景包括深度学习、线性代数、数值方法与 CPU/GPU 软件设计",skillIds:["deep-learning","linear-algebra","computer-architecture"]},{text:"按团队可能涉及 Python、C/C++、CUDA、Linux、框架、容器、云或数据技术",skillIds:["python","cpp","cuda","linux","pytorch","containers","cloud","streaming"]}],preferred:[],
      quote:"Depending on the internship role, prior experience or knowledge requirements could include",note:"候选方向汇总；框架、语言与基础设施条目是可变技术栈。"},
    {id:"nvidia-JR2023499",company:"NVIDIA",title:"NVIDIA Spring 2027 Internships: Developer and Performance Technology",location:"Santa Clara, CA, US · 多方向汇总",url:"https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite/job/US-CA-Santa-Clara/NVIDIA-Spring-2027-Internships--Developer-and-Performance-Technology_JR2023499",checked:"2026-10-18",status:"direction-pool",roleIds:["test-dev","ai-infra"],
      eligibility:["相关专业本科/硕士在读，实习全程保持在读","全职 8—12 个月；偏好 2027 年 2 月或 5 月开始"],
      required:[{text:"性能、图像质量、功耗或 HPC/DL 基准测试；搭建测试系统并分析结果",skillIds:["testing","profiling","gpu-architecture"]},{text:"按方向可能涉及 Linux、Python/Shell 自动化、调试、GPU 框架/编程和容器",skillIds:["linux","python","shell","debugging","cuda","pytorch","containers"]}],preferred:[],
      quote:"Developer and Performance Internship Preferred Start Dates: February 2027 or May 2027",note:"性能技术方向的长期实习样例；与通用测试开发存在交集，不能替代软件 QA 的完整要求。"},
    {id:"verkada-5210813007",company:"Verkada",title:"Backend Software Engineering Intern 2027",location:"San Mateo, CA, US · 现场",url:"https://job-boards.greenhouse.io/verkada/jobs/5210813007",checked:"2026-10-18",status:"source-readable",roleIds:["backend"],
      eligibility:["计算机或类似技术专业本科/硕士在读；2028 年 6 月前毕业","能在总部参加 2027 冬季或夏季实习；有产品开发与上线的实习经历"],
      required:[{text:"熟悉 Python 或 Go、分布式系统、OS、AWS、Docker 等，适应敏捷团队开发",skillIds:["python","go","distributed","os","cloud","containers","collaboration"]}],
      preferred:[{text:"REST API 与 Linux 服务经验",skillIds:["api","linux"]}],
      quote:"Familiar with: Python or Golang, Distributed Systems, Operating Systems, AWS, Docker, etc",note:"具体公司的后端技术栈样例；其既往实习经历要求不是所有公司共有的门槛。"},
    {id:"verkada-5210942007",company:"Verkada",title:"Frontend Software Engineering Intern 2027",location:"San Mateo, CA, US · 现场",url:"https://job-boards.greenhouse.io/verkada/jobs/5210942007",checked:"2026-10-18",status:"source-readable",roleIds:["frontend"],
      eligibility:["计算机或类似技术专业本科/硕士在读；2028 年 6 月前毕业","能参加总部 2027 冬季或夏季实习；有开发上线产品的实习经历"],
      required:[{text:"JavaScript 或 TypeScript，理解上下文、原型/类、闭包；有现代框架经验，如 Angular、React 或 Vue",skillIds:["typescript","react"]},{text:"可复用组件、CSS 预处理、精细界面实现与设计细节",skillIds:["web-fundamentals","react"]}],preferred:[],
      quote:"Experience working with a modern web framework such as Angular.js, React or Vue",note:"原文接受多种框架；地图用统一框架节点承载公共概念，并不要求同时学习三种框架。"},
    {id:"verkada-5219131007",company:"Verkada",title:"Mobile Software Engineering Intern 2027",location:"San Mateo, CA, US · 现场",url:"https://job-boards.greenhouse.io/verkada/jobs/5219131007",checked:"2026-10-18",status:"source-readable",roleIds:["mobile"],
      eligibility:["计算机或类似专业本科在读，预计 2028 年早期至年中毕业","可参加总部 2027 冬季或夏季实习"],
      required:[{text:"Swift/iOS SDK 或 Kotlin/Android SDK，并愿意学习另一平台",skillIds:["ios-swift","android-kotlin"]},{text:"多线程/异步代码、后端 API、UI 开发、单元测试和计算机基础",skillIds:["concurrency","api","mobile","testing","programming-basics"]}],preferred:[],
      quote:"Experience writing multi-threaded, asynchronous code",note:"平台是 OR 关系；学习路径允许切换 Android 和 iOS，依赖关系随之重算。"},
    {id:"verkada-5211595007",company:"Verkada",title:"Embedded Software Engineering Intern 2027",location:"San Mateo, CA, US · 现场",url:"https://job-boards.greenhouse.io/verkada/jobs/5211595007",checked:"2026-10-18",status:"source-readable",roleIds:["embedded"],
      eligibility:["计算机或类似技术专业本科/硕士在读；2028 年 6 月前毕业","可参加总部 2027 冬季或夏季实习；有开发上线产品的实习经历"],
      required:[{text:"Embedded Linux、C、USB、I2C、Yocto 的工作经验",skillIds:["embedded-c","c-language","hardware-protocols","linux"]},{text:"熟悉 Linux 服务、设备驱动、内核修改、安全系统与安全编程",skillIds:["os","linux","secure-coding","embedded-c"]}],preferred:[],
      quote:"Work experience with Embedded Linux, C, USB, I2C, and Yocto",note:"这是 Embedded Linux 路径；MCU/RTOS 团队的技能组合会不同。"},
    {id:"verkada-5213881007",company:"Verkada",title:"Security Software Engineering Intern 2027",location:"San Mateo, CA, US · 现场",url:"https://job-boards.greenhouse.io/verkada/jobs/5213881007",checked:"2026-10-18",status:"source-readable",roleIds:["security"],
      eligibility:["计算机或类似技术专业本科/硕士在读；2028 年 6 月前毕业","可参加总部 2027 冬季或夏季实习；有产品开发上线的实习经历"],
      required:[{text:"熟悉 Python 或 Go、分布式系统、OS、AWS、Docker，适应敏捷团队开发",skillIds:["python","go","distributed","os","cloud","containers","collaboration"]}],
      preferred:[{text:"REST API 与 Linux 服务经验",skillIds:["api","linux"]}],
      quote:"Familiar with REST APIs and Linux servers are a plus",note:"标题虽属安全软件，原文技能段偏通用工程；没有把 OWASP、渗透测试等通用建议冒充为其明示要求。"},
    {id:"janestreet-8625946002",company:"Jane Street",title:"Linux Engineer · Summer Internship",location:"中国香港",url:"https://www.janestreet.com/join-jane-street/apply/8625946002?gh_jid=8625946002",checked:"2026-10-18",status:"source-readable",roleIds:["platform-sre","cpp-systems"],
      eligibility:["官方职位元数据标记 Summer Internship；地点香港","原文没有统一毕业年月或固定实习周数，本记录不自行补设"],
      required:[{text:"OS 与体系结构、socket/虚拟内存/进程生命周期、基础网络协议与 Linux 命令行",skillIds:["os","computer-architecture","networking","linux","shell"]},{text:"基础设施、性能排障、监控、自动化与根因分析等项目职责",skillIds:["profiling","observability","debugging","collaboration"]}],preferred:[],
      quote:"Knowledgeable about operating system fundamentals and computer architecture",note:"基础设施系统方向样例；职位元数据是判断其实习性质的依据。"},
    {id:"janestreet-8617298002",company:"Jane Street",title:"Software Engineer · Summer Internship",location:"中国香港",url:"https://www.janestreet.com/join-jane-street/apply/8617298002?gh_jid=8617298002",checked:"2026-10-18",status:"source-readable",roleIds:["quant-dev","backend"],
      eligibility:["官方职位元数据标记 Summer Internship；地点香港","原文明示英语流利；没有在技能段要求先具备金融从业背景"],
      required:[{text:"优秀编程能力、好奇心、协作、学习意愿和英语沟通；工作中学习 OCaml，部分团队使用 Python",skillIds:["programming-basics","python","collaboration"]},{text:"项目覆盖高性能交易系统至语言设计，强调可维护、可生产交付的软件",skillIds:["architecture","testing"]}],preferred:[],
      quote:"A top-notch programmer with a love for technology",note:"金融公司的软件实习样例，用来展示技术栈差异；OCaml 是其主力语言，不能据此声称量化开发全部要求 C++。"},
    {id:"janestreet-8623868002",company:"Jane Street",title:"Quantitative Researcher · Summer Internship",location:"中国香港",url:"https://www.janestreet.com/join-jane-street/apply/8623868002?gh_jid=8623868002",checked:"2026-10-18",status:"source-readable",roleIds:["quant-research"],
      eligibility:["官方职位元数据标记 Summer Internship；英语流利","多数实习生为本科或研究生；原文也欢迎已毕业且考虑转入金融的申请者"],
      required:[{text:"逻辑与数学思考、较强 Python 编程、精确沟通、协作和学习能力",skillIds:["python","statistics","collaboration"]},{text:"职责涉及实验设计、数据集、时间序列、特征和金融数据建模",skillIds:["research-design","data-quality","feature-engineering","model-evaluation"]}],
      preferred:[{text:"研究经验加分；多数候选人有数据科学或 ML 经历，原文强调思考学习方式",skillIds:["machine-learning","algorithm-research"]}],
      quote:"A strong programmer who's comfortable with Python",note:"金融知识可在实习中学习；地图中的金融/回测准备是通用建议，不是这条 JD 的统一申请前提。"}
  ];
  jdEvidence.forEach((jd) => {
    const [board,id]=jd.id.split("-");
    jd.sourceApiUrl=board==="nvidia" ? jd.url.replace("/NVIDIAExternalCareerSite/","/wday/cxs/nvidia/NVIDIAExternalCareerSite/") : "https://boards-api.greenhouse.io/v1/boards/"+board+"/jobs/"+id;
  });

  window.ATLAS_DATA = {
    updated: "2026-10-18",
    skills,
    roles,
    sources,
    getLearningPath,
    jdEvidence,
    layers: {
      foundation: { label:"工具与基础", color:"#5d8ef5" },
      engineering: { label:"工程与系统", color:"#28b89b" },
      data: { label:"数据与 AI", color:"#bb82ee" },
      specialization: { label:"岗位分支", color:"#eea44b" }
    }
  };
})();
