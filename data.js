/* Personal internship atlas. Stable skill IDs preserve existing learning progress. */
(function () {
  const skills = [
    {
      "id": "programming-basics",
      "title": "程序设计基础",
      "layer": "foundation",
      "family": "编程基础",
      "summary": "理解变量、类型、控制流、函数、数据表示与程序状态。",
      "why": "语言可以更换，分解问题和追踪程序行为的能力可以复用。",
      "prerequisites": [],
      "proof": "把一个需求拆成函数，处理输入边界，并手工追踪一段程序的状态变化。",
      "topics": [
        "变量、类型与值",
        "条件、循环与控制流",
        "函数、参数与作用域",
        "输入校验与错误处理",
        "程序状态与问题分解"
      ],
      "domainId": "cpp-foundations",
      "moduleId": "program-design"
    },
    {
      "id": "discrete-math",
      "title": "离散数学与逻辑",
      "layer": "foundation",
      "family": "数学",
      "summary": "理解集合、逻辑、关系、图、组合计数和基本证明方法。",
      "why": "算法正确性、数据建模和系统状态都依赖明确的离散结构。",
      "prerequisites": [],
      "proof": "用不变量解释一个算法为何正确，并给出一个边界反例。",
      "topics": [
        "命题逻辑与集合",
        "关系、函数与图",
        "排列组合与计数",
        "归纳法与循环不变量",
        "反例与边界证明"
      ],
      "domainId": "cpp-foundations",
      "moduleId": "algorithms-structures"
    },
    {
      "id": "computer-architecture",
      "title": "计算机组成与体系结构",
      "layer": "foundation",
      "family": "计算机基础",
      "summary": "理解指令执行、CPU、缓存、内存层次、数据表示与 I/O。",
      "why": "系统性能、内存错误和软硬件协作需要共同的机制解释。",
      "prerequisites": [
        "programming-basics"
      ],
      "proof": "用缓存局部性或数据布局解释两段等价程序的性能差异。",
      "topics": [
        "二进制、补码与浮点表示",
        "指令、流水线与分支",
        "寄存器、缓存与主存",
        "局部性、缓存行与伪共享",
        "中断、DMA 与 I/O"
      ],
      "domainId": "cpp-foundations",
      "moduleId": "cpu-architecture"
    },
    {
      "id": "calculus",
      "title": "微积分与优化基础",
      "layer": "foundation",
      "family": "数学",
      "summary": "理解导数、偏导、链式法则、梯度和迭代优化。",
      "why": "深度学习训练和数值优化需要解释目标如何随参数变化。",
      "prerequisites": [],
      "proof": "对一个小型损失函数推导梯度，用有限差分验证结果。",
      "topics": [
        "导数与偏导数",
        "链式法则与梯度",
        "梯度下降与学习率",
        "凸性与局部极值",
        "数值微分与梯度检查"
      ],
      "domainId": "python-math",
      "moduleId": "math-stats"
    },
    {
      "id": "c-language",
      "title": "C 语言与内存基础",
      "layer": "foundation",
      "family": "编程语言",
      "summary": "理解指针、数组、结构体、内存布局、位操作和手动资源管理。",
      "why": "补足现代 C++ 与协议解析中的指针、字节表示和内存边界基础。",
      "prerequisites": [
        "programming-basics",
        "build"
      ],
      "proof": "实现并测试二进制协议解析器，检查越界、对齐与资源释放。",
      "topics": [
        "指针、数组与字符串",
        "结构体、对齐与字节序",
        "栈、堆与资源释放",
        "位运算与寄存器表示",
        "越界、悬空指针与未定义行为"
      ],
      "domainId": "cpp-foundations",
      "moduleId": "cpp-memory"
    },
    {
      "id": "collaboration",
      "title": "工程协作与技术表达",
      "layer": "foundation",
      "family": "协作",
      "summary": "理解需求澄清、任务拆分、代码评审、文档与进度沟通。",
      "why": "实习交付发生在团队与既有代码库中，需要让他人理解并验证你的改动。",
      "prerequisites": [
        "git"
      ],
      "proof": "提交包含背景、改动、验证和限制的 PR，并回应一次有依据的评审意见。",
      "topics": [
        "需求澄清与验收标准",
        "任务拆分与进度同步",
        "PR 描述与代码评审",
        "技术文档与口头表达",
        "阅读陌生代码与验证 AI 生成改动"
      ],
      "domainId": "workflow",
      "moduleId": "build-collaboration"
    },
    {
      "id": "shell",
      "title": "Shell 与命令行",
      "layer": "foundation",
      "family": "工作流",
      "summary": "在终端中定位项目、组合命令、批处理文件并运行开发工具。",
      "why": "它让构建、调试、自动化和远程 Linux 工作变得可重复。",
      "prerequisites": [],
      "proof": "独立完成一次文件检索、管道处理和脚本化运行。",
      "topics": [
        "目录、路径与文件检索",
        "标准输入输出、管道与重定向",
        "进程、环境变量与退出码",
        "脚本参数、引号与错误处理",
        "远程登录与批处理"
      ],
      "domainId": "workflow",
      "moduleId": "terminal-git"
    },
    {
      "id": "git",
      "title": "Git 版本管理",
      "layer": "foundation",
      "family": "工作流",
      "summary": "通过提交、分支、差异和回退管理代码变化。",
      "why": "团队协作和安全迭代都依赖清晰的版本历史。",
      "prerequisites": [
        "shell"
      ],
      "proof": "把一个功能拆成可读提交，并能解释如何撤销错误改动。",
      "topics": [
        "工作区、暂存区与提交",
        "差异、日志与分支",
        "合并、变基与冲突解决",
        "回退、撤销与问题定位",
        "PR、忽略规则与协作约定"
      ],
      "domainId": "workflow",
      "moduleId": "terminal-git"
    },
    {
      "id": "build",
      "title": "构建与依赖管理",
      "layer": "foundation",
      "family": "工作流",
      "summary": "理解编译、链接、依赖和项目构建配置。",
      "why": "真实项目由多个模块和外部依赖组成，能构建才谈得上交付。",
      "prerequisites": [
        "shell"
      ],
      "proof": "从干净目录构建多文件项目；记录工具版本和步骤。",
      "topics": [
        "预处理、编译与链接",
        "头文件、静态库与动态库",
        "CMake target 与依赖",
        "包管理、锁文件与版本",
        "Debug/Release 与可复现构建"
      ],
      "domainId": "workflow",
      "moduleId": "build-collaboration"
    },
    {
      "id": "testing",
      "title": "测试设计",
      "layer": "foundation",
      "family": "质量",
      "summary": "设计覆盖正常路径、边界、失败路径的自动化检查。",
      "why": "测试能快速反馈回归问题，也是可靠改动的证据。",
      "prerequisites": [
        "programming-basics",
        "git"
      ],
      "proof": "为一个有状态模块写单元与边界测试，并在 CI 运行。",
      "topics": [
        "正常、边界与异常用例",
        "单元、集成与端到端测试",
        "断言、fixture 与 Mock",
        "确定性与测试隔离",
        "GoogleTest/pytest 等框架与回归"
      ],
      "domainId": "workflow",
      "moduleId": "quality-debug"
    },
    {
      "id": "debugging",
      "title": "调试与故障定位",
      "layer": "foundation",
      "family": "质量",
      "summary": "使用日志、断点、调用栈和内存检查工具缩小问题范围。",
      "why": "实习任务常从复现和修复既有缺陷开始。",
      "prerequisites": [
        "shell",
        "build"
      ],
      "proof": "提交一个包含复现步骤、根因和修复验证的问题记录。",
      "topics": [
        "最小复现与假设排除",
        "断点、调用栈与变量观察",
        "日志与错误上下文",
        "内存检查与 Sanitizer",
        "根因记录与修复验证"
      ],
      "domainId": "workflow",
      "moduleId": "quality-debug"
    },
    {
      "id": "data-structures",
      "title": "数据结构",
      "layer": "foundation",
      "family": "计算机基础",
      "summary": "理解数组、哈希表、堆、树、队列、图等结构及操作成本。",
      "why": "数据结构影响服务延迟、内存占用和代码复杂度。",
      "prerequisites": [
        "programming-basics"
      ],
      "proof": "为一个任务比较两种结构并说明复杂度与取舍。",
      "topics": [
        "数组、链表与队列",
        "哈希表与冲突处理",
        "堆、树与有序索引",
        "图的表示与遍历",
        "操作复杂度、内存布局与选型"
      ],
      "domainId": "cpp-foundations",
      "moduleId": "algorithms-structures"
    },
    {
      "id": "algorithms",
      "title": "算法与复杂度",
      "layer": "foundation",
      "family": "计算机基础",
      "summary": "能分析时间/空间复杂度，选择合适的排序、搜索、图和动态规划方法。",
      "why": "面试常用于检验推理与编码基本功，工程中也用于估算扩展性。",
      "prerequisites": [
        "data-structures",
        "discrete-math"
      ],
      "proof": "独立完成中等难度题，写出不变量、边界和复杂度。",
      "topics": [
        "时间与空间复杂度",
        "排序、二分与双指针",
        "递归、回溯与动态规划",
        "BFS、DFS 与最短路",
        "贪心、不变量与边界分析"
      ],
      "domainId": "cpp-foundations",
      "moduleId": "algorithms-structures"
    },
    {
      "id": "oop-design",
      "title": "面向对象与接口设计",
      "layer": "foundation",
      "family": "编程基础",
      "summary": "使用抽象、组合、封装与接口组织可维护模块。",
      "why": "需求会变化；良好接口降低模块间修改成本。",
      "prerequisites": [
        "programming-basics"
      ],
      "proof": "把一个小程序拆成清楚的模块并为接口写测试。",
      "topics": [
        "封装与不变量",
        "接口、组合与依赖方向",
        "继承、多态与替换边界",
        "职责划分与可测试性",
        "设计模式的动机与代价"
      ],
      "domainId": "cpp-foundations",
      "moduleId": "program-design"
    },
    {
      "id": "cpp",
      "title": "现代 C++",
      "layer": "foundation",
      "family": "编程语言",
      "summary": "掌握对象生命周期、RAII、值语义、移动、智能指针、模板与标准库。",
      "why": "高性能和系统岗位常需要精确控制资源、并发与延迟。",
      "prerequisites": [
        "programming-basics",
        "oop-design",
        "build",
        "c-language"
      ],
      "proof": "实现并测试缓存或订单簿，解释所有权与对象生命周期。",
      "topics": [
        "对象生命周期与 RAII",
        "值、引用、移动与所有权",
        "智能指针与异常安全",
        "模板、泛型与 STL",
        "迭代器失效、const 与未定义行为"
      ],
      "domainId": "cpp-foundations",
      "moduleId": "cpp-memory"
    },
    {
      "id": "python",
      "title": "Python",
      "layer": "foundation",
      "family": "编程语言",
      "summary": "使用 Python 编写脚本、服务、数据处理或模型实验。",
      "why": "它是数据分析、机器学习、自动化和 AI 应用的常见工作语言。",
      "prerequisites": [
        "programming-basics",
        "shell"
      ],
      "proof": "完成带类型/测试/依赖说明的数据处理或小服务项目。",
      "topics": [
        "容器、迭代器与生成器",
        "函数、模块与类型标注",
        "异常、上下文管理与文件 I/O",
        "虚拟环境与依赖管理",
        "NumPy/pandas 基础与测试"
      ],
      "domainId": "python-math",
      "moduleId": "python-data"
    },
    {
      "id": "java",
      "title": "Java",
      "layer": "foundation",
      "family": "编程语言",
      "summary": "掌握集合、异常、泛型、面向对象和 JVM 基本概念。",
      "why": "许多企业后端团队以 Java 作为主力服务语言。",
      "prerequisites": [
        "programming-basics",
        "oop-design"
      ],
      "proof": "实现一个有分层、测试和持久化的 API 服务。",
      "topics": [
        "集合、泛型与异常",
        "接口、类与依赖组织",
        "JVM、堆与垃圾回收",
        "线程与并发集合",
        "构建、单元测试与服务框架"
      ],
      "domainId": "data-backend",
      "moduleId": "service-api"
    },
    {
      "id": "go",
      "title": "Go",
      "layer": "foundation",
      "family": "编程语言",
      "summary": "理解 Go 的并发模型、接口、错误处理与工具链。",
      "why": "云原生、平台和基础设施团队常用 Go 开发服务与工具。",
      "prerequisites": [
        "programming-basics",
        "shell"
      ],
      "proof": "实现并发安全的 HTTP 服务并添加可运行测试。",
      "topics": [
        "切片、映射与接口",
        "错误处理与 defer",
        "goroutine 与 channel",
        "context、超时与取消",
        "模块、测试与数据竞争检查"
      ],
      "domainId": "data-backend",
      "moduleId": "service-api"
    },
    {
      "id": "sql",
      "title": "SQL 与关系数据",
      "layer": "foundation",
      "family": "数据基础",
      "summary": "能编写查询、连接、聚合、子查询和窗口函数。",
      "why": "业务后端、分析和数据工程都需要准确读写结构化数据。",
      "prerequisites": [],
      "proof": "对有重复、空值和时间边界的数据写正确查询。",
      "topics": [
        "过滤、排序与空值语义",
        "JOIN 与重复行",
        "分组聚合与子查询",
        "窗口函数与时间口径",
        "去重、约束与查询验证"
      ],
      "domainId": "data-backend",
      "moduleId": "sql-storage"
    },
    {
      "id": "linux",
      "title": "Linux",
      "layer": "engineering",
      "family": "系统",
      "summary": "熟悉进程、权限、文件、日志、包管理和基础系统工具。",
      "why": "服务通常运行在 Linux 环境，线上排障也依赖它。",
      "prerequisites": [
        "shell"
      ],
      "proof": "把程序部署到 Linux 环境，并用日志和系统工具定位故障。",
      "topics": [
        "文件、权限与用户",
        "进程、信号与资源限制",
        "服务、日志与系统工具",
        "文件描述符与 I/O",
        "网络排障与包管理"
      ],
      "domainId": "systems-network",
      "moduleId": "linux-os"
    },
    {
      "id": "os",
      "title": "操作系统",
      "layer": "engineering",
      "family": "系统",
      "summary": "理解进程/线程、虚拟内存、调度、文件与 I/O 的基本机制。",
      "why": "帮助解释崩溃、资源争用、阻塞和服务性能现象。",
      "prerequisites": [
        "linux",
        "computer-architecture"
      ],
      "proof": "解释一次内存或线程问题，并通过实验观测其表现。",
      "topics": [
        "进程、线程与调度",
        "虚拟内存与地址空间",
        "系统调用与用户态/内核态",
        "文件系统、缓存与 I/O",
        "阻塞、中断与资源管理"
      ],
      "domainId": "systems-network",
      "moduleId": "linux-os"
    },
    {
      "id": "networking",
      "title": "计算机网络",
      "layer": "engineering",
      "family": "系统",
      "summary": "掌握 TCP/IP、DNS、连接、超时、重传和常见网络边界。",
      "why": "客户端与服务端故障常发生在网络与协议边界。",
      "prerequisites": [
        "programming-basics"
      ],
      "proof": "写 TCP/HTTP 客户端并正确处理超时、断连与分段数据。",
      "topics": [
        "TCP/IP 分层与寻址",
        "DNS 与连接建立",
        "TCP 可靠传输、流量与拥塞控制",
        "HTTP、TLS 与连接复用",
        "超时、重试、分包与断连"
      ],
      "domainId": "systems-network",
      "moduleId": "tcp-io"
    },
    {
      "id": "concurrency",
      "title": "并发与同步",
      "layer": "engineering",
      "family": "系统",
      "summary": "理解线程安全、锁、原子操作、条件变量、竞态与死锁。",
      "why": "高并发服务和系统程序需要并行处理且保持状态正确。",
      "prerequisites": [
        "os",
        "programming-basics"
      ],
      "proof": "复现并修复竞态；解释同步策略和吞吐量代价。",
      "topics": [
        "线程、任务与共享状态",
        "互斥锁、条件变量与信号量",
        "原子操作与内存可见性",
        "竞态、死锁与锁顺序",
        "线程池、取消与背压"
      ],
      "domainId": "systems-network",
      "moduleId": "parallel-cpu"
    },
    {
      "id": "database",
      "title": "数据库系统",
      "layer": "engineering",
      "family": "数据系统",
      "summary": "理解索引、事务、隔离、约束、缓冲和查询计划。",
      "why": "数据正确性和服务响应时间都受数据库设计影响。",
      "prerequisites": [
        "sql"
      ],
      "proof": "用 EXPLAIN 比较索引前后的执行计划，说明事务边界。",
      "topics": [
        "B+ 树索引与查询计划",
        "事务、ACID 与隔离级别",
        "锁、MVCC 与并发异常",
        "日志、恢复与持久性",
        "约束、模式迁移与慢查询"
      ],
      "domainId": "data-backend",
      "moduleId": "sql-storage"
    },
    {
      "id": "api",
      "title": "HTTP 与 API 设计",
      "layer": "engineering",
      "family": "服务开发",
      "summary": "设计资源、请求/响应、状态码、分页、鉴权和错误契约。",
      "why": "服务需要让调用方以稳定且可理解的方式集成。",
      "prerequisites": [
        "networking"
      ],
      "proof": "做一个有输入校验、分页和一致错误格式的 API。",
      "topics": [
        "资源建模与 HTTP 语义",
        "参数、分页与错误契约",
        "鉴权、授权与会话",
        "幂等、限流、超时与重试",
        "版本兼容与接口文档"
      ],
      "domainId": "data-backend",
      "moduleId": "service-api"
    },
    {
      "id": "backend",
      "title": "后端服务设计",
      "layer": "engineering",
      "family": "服务开发",
      "summary": "组织业务逻辑、接口、持久层、缓存、配置和错误处理。",
      "why": "后端实习通常围绕需求实现、接口维护和缺陷修复。",
      "prerequisites": [
        "api",
        "database"
      ],
      "proof": "交付一个有 API 文档、测试和数据迁移说明的小服务。",
      "topics": [
        "业务逻辑与分层",
        "数据访问与事务边界",
        "配置、日志与依赖注入",
        "认证、授权与异常处理",
        "后台任务、缓存与可测试性"
      ],
      "domainId": "data-backend",
      "moduleId": "service-api"
    },
    {
      "id": "service-frameworks",
      "title": "后端服务框架",
      "layer": "engineering",
      "family": "服务开发",
      "summary": "掌握至少一个常见服务框架的路由、中间件、依赖管理和错误处理。",
      "why": "真实岗位通常围绕团队现有技术栈交付功能，理解框架扩展点比背语法更实用。",
      "prerequisites": [
        "backend",
        "testing"
      ],
      "proof": "在目标语言框架中实现带校验、持久化和测试的 API。",
      "topics": [
        "路由与中间件",
        "参数校验与统一错误处理",
        "依赖注入与生命周期",
        "ORM、事务与配置",
        "框架集成测试与扩展点"
      ],
      "domainId": "data-backend",
      "moduleId": "service-api"
    },
    {
      "id": "cache-messaging",
      "title": "缓存与消息队列",
      "layer": "engineering",
      "family": "服务开发",
      "summary": "理解缓存一致性、过期/淘汰、队列消费、幂等和重试边界。",
      "why": "Redis、消息队列等常用于提高吞吐并解耦服务，但引入后也增加一致性和故障处理工作。",
      "prerequisites": [
        "backend",
        "distributed"
      ],
      "proof": "构建带幂等消费者的示例，并用故障场景验证重试和重复消息处理。",
      "topics": [
        "缓存旁路、失效与淘汰",
        "穿透、击穿与热点",
        "消息确认、重试与死信",
        "幂等消费者与顺序性",
        "缓存一致性与故障降级"
      ],
      "domainId": "data-backend",
      "moduleId": "reliable-messaging"
    },
    {
      "id": "distributed",
      "title": "分布式系统",
      "layer": "engineering",
      "family": "系统设计",
      "summary": "理解复制、分区、消息、幂等、重试、一致性和故障边界。",
      "why": "服务规模扩大后，单机假设不再成立。",
      "prerequisites": [
        "networking",
        "database"
      ],
      "proof": "设计幂等消费者或重试机制并用故障注入验证。",
      "topics": [
        "部分失败与网络分区",
        "复制、分片与一致性",
        "幂等、重试与去重",
        "共识、选主与故障检测",
        "分布式事务与可观测性"
      ],
      "domainId": "data-backend",
      "moduleId": "reliable-messaging"
    },
    {
      "id": "architecture",
      "title": "系统设计与可维护性",
      "layer": "engineering",
      "family": "工程实践",
      "summary": "能按职责划分模块，处理配置、扩展点、兼容和迁移。",
      "why": "团队会关注改动是否易于评审、扩展和长期维护。",
      "prerequisites": [
        "oop-design",
        "testing"
      ],
      "proof": "提交架构图、关键取舍和一次小范围演进记录。",
      "topics": [
        "边界、模块与依赖方向",
        "接口契约与兼容性",
        "容量与非功能需求",
        "演进、迁移与技术债",
        "架构决策记录与取舍"
      ],
      "domainId": "data-backend",
      "moduleId": "deploy-deliver"
    },
    {
      "id": "profiling",
      "title": "性能分析",
      "layer": "engineering",
      "family": "工程实践",
      "summary": "使用 profiler、基准和资源指标定位 CPU、内存、I/O 或延迟瓶颈。",
      "why": "优化应基于测量，避免凭感觉增加复杂度。",
      "prerequisites": [
        "debugging",
        "testing"
      ],
      "proof": "保存基线，做一次可复现优化，并解释测量条件。",
      "topics": [
        "受控基准与测量误差",
        "CPU 火焰图与热点",
        "内存、分配与缓存",
        "I/O、等待与锁争用",
        "吞吐、延迟分位数与回归"
      ],
      "domainId": "systems-network",
      "moduleId": "cpu-profiling"
    },
    {
      "id": "cloud",
      "title": "云计算基础",
      "layer": "engineering",
      "family": "平台",
      "summary": "理解计算、网络、存储、身份权限和按需资源的基本模型。",
      "why": "服务部署、数据系统与 AI 工作负载通常依赖云资源。",
      "prerequisites": [
        "linux",
        "networking"
      ],
      "proof": "部署一个最小服务，说明网络、权限与成本配置。",
      "topics": [
        "计算、对象存储与托管数据库",
        "VPC、子网与安全组",
        "IAM 与最小权限",
        "可用区、备份与恢复",
        "配额、成本与基础设施配置"
      ],
      "domainId": "data-backend",
      "moduleId": "deploy-deliver"
    },
    {
      "id": "containers",
      "title": "容器与 Docker",
      "layer": "engineering",
      "family": "平台",
      "summary": "编写镜像、管理配置与数据卷，理解容器和镜像的作用。",
      "why": "让开发、测试和部署环境更一致。",
      "prerequisites": [
        "linux",
        "build"
      ],
      "proof": "构建可复现镜像，控制体积并通过健康检查启动。",
      "topics": [
        "镜像、分层与 Dockerfile",
        "容器隔离与资源限制",
        "网络、卷与持久化",
        "配置、密钥与非 root 运行",
        "健康检查、多阶段构建与 Compose"
      ],
      "domainId": "data-backend",
      "moduleId": "deploy-deliver"
    },
    {
      "id": "cicd",
      "title": "CI/CD 与发布",
      "layer": "engineering",
      "family": "平台",
      "summary": "把代码检查、构建、测试和部署串成自动化流程。",
      "why": "团队需要快速反馈，同时降低发布引入回归的风险。",
      "prerequisites": [
        "git",
        "build",
        "testing"
      ],
      "proof": "为项目建立自动检查流程，并说明失败时如何阻断发布。",
      "topics": [
        "提交触发与检查门禁",
        "构建、测试与制品",
        "环境、配置与密钥",
        "发布、回滚与数据库迁移",
        "流水线故障与可追溯版本"
      ],
      "domainId": "data-backend",
      "moduleId": "deploy-deliver"
    },
    {
      "id": "observability",
      "title": "日志、指标与可观测性",
      "layer": "engineering",
      "family": "平台",
      "summary": "使用日志、指标、追踪、告警和 SLI/SLO 观察系统健康。",
      "why": "这是后端、金融科技和 AI 服务的共享运行能力，帮助定位超时、失败和性能回归。",
      "prerequisites": [
        "linux",
        "backend"
      ],
      "proof": "定义关键服务指标，构建告警并演练一次故障分析。",
      "topics": [
        "结构化日志、指标与追踪",
        "SLI、SLO 与错误预算",
        "告警质量与故障分诊",
        "容量、发布与性能回归",
        "运行手册、复盘与恢复演练"
      ],
      "domainId": "data-backend",
      "moduleId": "operate-secure"
    },
    {
      "id": "security-basics",
      "title": "安全基础与隐私",
      "layer": "engineering",
      "family": "安全",
      "summary": "理解最小权限、机密管理、输入验证、数据保护和常见攻击面。",
      "why": "每个软件岗位都可能处理敏感数据或暴露接口。",
      "prerequisites": [
        "networking",
        "api"
      ],
      "proof": "在项目中清点威胁、限制权限并安全处理密钥。",
      "topics": [
        "威胁建模与攻击面",
        "认证、授权与最小权限",
        "输入校验与常见 Web 风险",
        "密钥、依赖与供应链",
        "隐私、日志脱敏与数据保留"
      ],
      "domainId": "data-backend",
      "moduleId": "operate-secure"
    },
    {
      "id": "data-modeling",
      "title": "数据建模",
      "layer": "engineering",
      "family": "数据系统",
      "summary": "设计事实/维度、主键、事件口径、时间粒度和模式演进。",
      "why": "清楚的数据定义减少重复、歧义和分析口径冲突。",
      "prerequisites": [
        "sql",
        "database"
      ],
      "proof": "为业务事件建立数据字典、表结构和口径说明。",
      "topics": [
        "实体、主键与关系",
        "事实、维度与粒度",
        "事件、时间与指标口径",
        "规范化、宽表与取舍",
        "数据字典与模式演进"
      ],
      "domainId": "data-backend",
      "moduleId": "sql-storage"
    },
    {
      "id": "etl",
      "title": "ETL 与数据管道",
      "layer": "engineering",
      "family": "数据系统",
      "summary": "实现抽取、清洗、转换、调度、重跑和错误隔离。",
      "why": "数据工程实习常交付稳定的数据导入与加工流程。",
      "prerequisites": [
        "python",
        "sql",
        "data-modeling"
      ],
      "proof": "构建可重跑的批处理任务，处理重复和坏数据。",
      "topics": [
        "抽取、清洗与转换",
        "全量、增量与检查点",
        "调度、依赖与重跑",
        "幂等、去重与错误隔离",
        "迟到数据与模式变化"
      ],
      "domainId": "data-backend",
      "moduleId": "data-pipelines"
    },
    {
      "id": "warehouse",
      "title": "数据仓库与建模",
      "layer": "data",
      "family": "数据系统",
      "summary": "了解分层仓库、维度建模、增量更新和历史数据处理。",
      "why": "分析和模型训练都依赖可信、可维护的数据层。",
      "prerequisites": [
        "data-modeling",
        "etl"
      ],
      "proof": "建一条从原始表到分析宽表的可验证数据链路。",
      "topics": [
        "ODS/DWD/DWS 等分层思路",
        "星型与雪花模型",
        "缓慢变化维与历史快照",
        "分区、增量与回填",
        "指标层、血缘与权限"
      ],
      "domainId": "data-backend",
      "moduleId": "data-pipelines"
    },
    {
      "id": "streaming",
      "title": "流式与分布式数据",
      "layer": "data",
      "family": "数据系统",
      "summary": "理解消息队列、事件时间、窗口、消费偏移和重复处理。",
      "why": "实时看板、风控和服务事件需要处理持续到达的数据。",
      "prerequisites": [
        "distributed",
        "etl"
      ],
      "proof": "实现可重放消费者，验证顺序、重复和失败恢复。",
      "topics": [
        "消息、分区与消费偏移",
        "事件时间与处理时间",
        "窗口、水位线与迟到数据",
        "状态、检查点与恢复",
        "重放、背压与交付语义"
      ],
      "domainId": "data-backend",
      "moduleId": "data-pipelines"
    },
    {
      "id": "data-quality",
      "title": "数据质量与治理",
      "layer": "data",
      "family": "数据系统",
      "summary": "检查完整性、唯一性、及时性、血缘、权限与敏感字段。",
      "why": "坏数据会污染报表、模型和业务决策。",
      "prerequisites": [
        "programming-basics"
      ],
      "proof": "为数据管道增加质量规则、异常报告和血缘说明。",
      "topics": [
        "缺失、重复与模式校验",
        "时间、一致性与及时性",
        "异常检测与质量规则",
        "血缘、版本与可追溯性",
        "隐私、权限与敏感字段"
      ],
      "domainId": "data-backend",
      "moduleId": "data-pipelines"
    },
    {
      "id": "statistics",
      "title": "概率统计",
      "layer": "data",
      "family": "数学",
      "summary": "理解分布、抽样、估计、不确定性、假设检验和相关性边界。",
      "why": "帮助判断数据结论是否稳健，避免把随机波动当规律。",
      "prerequisites": [],
      "proof": "解释估计不确定性并指出一个分析结论的局限。",
      "topics": [
        "条件概率与常见分布",
        "期望、方差与抽样",
        "估计、置信区间与检验",
        "回归、相关与因果边界",
        "实验设计、功效与多重比较"
      ],
      "domainId": "python-math",
      "moduleId": "math-stats"
    },
    {
      "id": "machine-learning",
      "title": "机器学习",
      "layer": "data",
      "family": "机器学习",
      "summary": "掌握监督学习、特征、损失、基线、验证和泛化。",
      "why": "AI/数据实习常要求理解模型训练与评估的完整链条。",
      "prerequisites": [
        "python",
        "statistics",
        "linear-algebra"
      ],
      "proof": "做有基线、有切分、有指标的可复现实验。",
      "topics": [
        "监督/无监督与任务定义",
        "线性模型、树与集成",
        "损失、正则化与优化",
        "切分、交叉验证与泛化",
        "基线、偏差与误差分析"
      ],
      "domainId": "python-math",
      "moduleId": "ml-experiments"
    },
    {
      "id": "algorithm-research",
      "title": "实验复现与研究表达",
      "layer": "specialization",
      "family": "算法研究",
      "summary": "把研究假设、基线、消融、数据版本与负结果组织为可复现实验。",
      "why": "量化研究与 AI 系统实验都需要区分方法有效、数据偏差和实现误差。",
      "prerequisites": [
        "machine-learning",
        "statistics"
      ],
      "proof": "复现一个基线方法，比较消融并说明失败案例和适用边界。",
      "topics": [
        "论文问题、假设与贡献",
        "方法复现与公平基线",
        "任务分支：推荐/搜索/视觉/NLP",
        "消融、敏感性与错误分析",
        "复现记录、负结果与局限"
      ],
      "domainId": "python-math",
      "moduleId": "ml-experiments"
    },
    {
      "id": "deep-learning",
      "title": "深度学习",
      "layer": "data",
      "family": "机器学习",
      "summary": "理解神经网络、反向传播、优化、正则化和训练诊断。",
      "why": "视觉、语言和推荐系统的许多模型以深度学习为基础。",
      "prerequisites": [
        "machine-learning",
        "calculus"
      ],
      "proof": "复现实验并分析训练曲线、错误样例和泛化差距。",
      "topics": [
        "张量、神经网络与计算图",
        "链式法则与反向传播",
        "优化器、初始化与正则化",
        "CNN、注意力与 Transformer",
        "训练稳定性与泛化诊断"
      ],
      "domainId": "python-math",
      "moduleId": "dl-pytorch"
    },
    {
      "id": "pytorch",
      "title": "PyTorch",
      "layer": "data",
      "family": "机器学习",
      "summary": "使用张量、数据集、自动微分、训练循环和 checkpoint。",
      "why": "ML 实习要求把算法实验可靠地实现并复现。",
      "prerequisites": [
        "deep-learning"
      ],
      "proof": "完成训练、验证、保存和加载的实验脚本。",
      "topics": [
        "张量、shape 与 device",
        "Dataset/DataLoader 与批处理",
        "autograd 与训练循环",
        "训练/评估模式与随机种子",
        "checkpoint、恢复与推理"
      ],
      "domainId": "python-math",
      "moduleId": "dl-pytorch"
    },
    {
      "id": "feature-engineering",
      "title": "特征工程",
      "layer": "data",
      "family": "机器学习",
      "summary": "处理缺失、类别、尺度、时间特征和训练/推理一致性。",
      "why": "特征质量直接影响模型效果，也容易造成数据泄漏。",
      "prerequisites": [
        "machine-learning",
        "data-quality"
      ],
      "proof": "建立训练/推理共用特征流程，测试时间边界。",
      "topics": [
        "缺失、类别与尺度处理",
        "时间特征与窗口聚合",
        "特征选择与编码",
        "训练/推理一致性",
        "数据泄漏与可复现流水线"
      ],
      "domainId": "python-math",
      "moduleId": "ml-experiments"
    },
    {
      "id": "model-evaluation",
      "title": "模型评估与实验",
      "layer": "data",
      "family": "机器学习",
      "summary": "选择合适指标、切分方案、基线、置信区间和错误分析。",
      "why": "漂亮的单一指标可能掩盖泛化差、类别偏置或数据泄漏。",
      "prerequisites": [
        "machine-learning",
        "statistics"
      ],
      "proof": "对比基线与模型，解释指标、误差和适用范围。",
      "topics": [
        "时间/用户/样本切分",
        "分类、回归与排序指标",
        "基线、置信区间与统计比较",
        "类别不平衡与错误分桶",
        "离线/线上差异与漂移"
      ],
      "domainId": "python-math",
      "moduleId": "ml-experiments"
    },
    {
      "id": "mlops",
      "title": "模型服务与 MLOps",
      "layer": "data",
      "family": "机器学习",
      "summary": "管理数据/模型版本、部署、监控、回滚和训练/服务一致性。",
      "why": "模型实验必须转化为可监控、可更新的生产能力。",
      "prerequisites": [
        "model-evaluation",
        "containers",
        "cicd"
      ],
      "proof": "部署模型 API，记录版本、延迟、质量和回滚方案。",
      "topics": [
        "数据、代码与模型版本",
        "实验记录与制品管理",
        "批量/在线推理与接口",
        "延迟、质量与漂移监控",
        "灰度、回滚与一致性"
      ],
      "domainId": "gpu-systems",
      "moduleId": "ai-serving"
    },
    {
      "id": "llm-fundamentals",
      "title": "大语言模型基础",
      "layer": "data",
      "family": "生成式 AI",
      "summary": "理解 token、上下文窗口、生成、采样、嵌入与模型限制。",
      "why": "AI 应用工程需要知道模型能做什么、会在哪些任务上失败。",
      "prerequisites": [
        "programming-basics"
      ],
      "proof": "用固定输入比较生成参数，记录能力和失败边界。",
      "topics": [
        "消息格式、token 与上下文预算",
        "模型 API、结构化输出与 schema",
        "流式输出、超时、限流与重试",
        "Embedding 与生成参数",
        "Transformer/微调概念与应用边界"
      ],
      "domainId": "ai-application",
      "moduleId": "model-api"
    },
    {
      "id": "rag",
      "title": "RAG 与信息检索",
      "layer": "data",
      "family": "生成式 AI",
      "summary": "处理文档、切分、检索、排序、上下文和来源引用。",
      "why": "检索质量决定知识型助手能否找到证据并降低编造。",
      "prerequisites": [
        "llm-fundamentals",
        "data-quality"
      ],
      "proof": "构建带引用的检索应用，测召回、相关性和引用正确率。",
      "topics": [
        "文档解析、切分与元数据",
        "关键词、向量与混合检索",
        "重排、上下文组装与引用",
        "拒答、更新与权限过滤",
        "召回、引用正确率与错误分桶"
      ],
      "domainId": "ai-application",
      "moduleId": "retrieval-rag"
    },
    {
      "id": "agent-tools",
      "title": "Agent 与工具调用",
      "layer": "specialization",
      "family": "生成式 AI",
      "summary": "设计工具 schema、状态、循环、停止条件、权限和错误恢复。",
      "why": "Agent 是带副作用的工作流，可靠性来自受控工具而不是多轮提示。",
      "prerequisites": [
        "llm-fundamentals",
        "api",
        "security-basics"
      ],
      "proof": "实现只读工具助手，覆盖超时、无效参数和重复调用。",
      "topics": [
        "Tool calling 与参数 schema",
        "只读工具、最小权限与访问范围",
        "超时、重试、幂等与重复调用防护",
        "Agent 状态机、上下文/记忆预算",
        "循环终止、人工确认与失败 trace"
      ],
      "domainId": "ai-application",
      "moduleId": "agent-evaluation"
    },
    {
      "id": "llm-evaluation",
      "title": "LLM 评测与安全",
      "layer": "specialization",
      "family": "生成式 AI",
      "summary": "建立固定用例，测事实性、引用、拒答、工具正确率、延迟和成本。",
      "why": "仅凭演示样例无法判断模型更新后系统是否退化。",
      "prerequisites": [
        "rag",
        "testing"
      ],
      "proof": "维护小型评测集，展示基线、失败分桶和改进幅度。",
      "topics": [
        "固定评测集与数据分层",
        "事实、引用与工具正确率",
        "检索与生成错误区分",
        "提示注入与敏感信息测试",
        "质量、成本、延迟与版本比较"
      ],
      "domainId": "ai-application",
      "moduleId": "agent-evaluation"
    },
    {
      "id": "vector-search",
      "title": "向量检索",
      "layer": "data",
      "family": "生成式 AI",
      "summary": "理解嵌入、相似度、索引、召回/精度和混合检索。",
      "why": "向量检索需要与业务过滤和关键词搜索协作，不能盲目套库。",
      "prerequisites": [
        "llm-fundamentals",
        "database"
      ],
      "proof": "比较关键词、向量与混合检索，并解释错误案例。",
      "topics": [
        "embedding 与相似度",
        "近似近邻与索引",
        "召回、延迟与资源取舍",
        "过滤、关键词与混合检索",
        "重排与索引更新"
      ],
      "domainId": "ai-application",
      "moduleId": "retrieval-rag"
    },
    {
      "id": "linear-algebra",
      "title": "线性代数与数值基础",
      "layer": "foundation",
      "family": "数学与计算",
      "summary": "掌握向量、矩阵、乘法、范数、数值精度和基础概率表达。",
      "why": "理解模型计算、GPU 算子和数值误差的共同底层。",
      "prerequisites": [],
      "proof": "手算小矩阵运算并验证数值误差如何传播。",
      "topics": [
        "向量、矩阵与张量维度",
        "矩阵乘法与线性变换",
        "范数、特征值与分解",
        "浮点数、舍入与稳定性",
        "条件数与误差传播"
      ],
      "domainId": "python-math",
      "moduleId": "math-stats"
    },
    {
      "id": "gpu-architecture",
      "title": "GPU 并行与内存层次",
      "layer": "specialization",
      "family": "GPU 系统",
      "summary": "理解线程层次、warp、内存访问、带宽、占用率和数据传输。",
      "why": "GPU 优化取决于并行划分与访存，不只是使用 GPU API。",
      "prerequisites": [
        "computer-architecture",
        "profiling"
      ],
      "proof": "用 profiler 判断一个算子受计算还是内存带宽限制。",
      "topics": [
        "SM、warp 与线程层次",
        "全局/共享/寄存器内存",
        "合并访存与 bank conflict",
        "占用率、带宽与算术强度",
        "主机传输、同步与 Roofline"
      ],
      "domainId": "gpu-systems",
      "moduleId": "gpu-hardware"
    },
    {
      "id": "cuda",
      "title": "CUDA 编程",
      "layer": "specialization",
      "family": "GPU 系统",
      "summary": "用 CUDA C++ 编写 kernel、管理设备内存和同步。",
      "why": "GPU 系统岗位需要将计算映射到硬件并保持结果正确。",
      "prerequisites": [
        "cpp",
        "gpu-architecture"
      ],
      "proof": "实现并校验简单算子，分别计量传输和 kernel 时间。",
      "topics": [
        "kernel、grid 与 block",
        "内存分配、传输与合并访存",
        "共享内存、同步与归约",
        "stream、事件与异步执行",
        "正确性、精度与性能测量"
      ],
      "domainId": "gpu-systems",
      "moduleId": "gpu-kernels"
    },
    {
      "id": "triton",
      "title": "Triton GPU 编程",
      "layer": "specialization",
      "family": "GPU 系统",
      "summary": "使用 Python DSL 编写 GPU kernel，理解程序块映射和张量内存访问。",
      "why": "Triton 是探索 GPU kernel 优化的另一条工具路径，能与 CUDA 互补。",
      "prerequisites": [
        "python",
        "gpu-architecture"
      ],
      "proof": "实现一个可测试算子，并与 PyTorch 和基线比较端到端时间。",
      "topics": [
        "program 与块式张量计算",
        "掩码、边界与内存访问",
        "归约、广播与布局",
        "分块、融合与自动调优",
        "数值校验与基准测量"
      ],
      "domainId": "gpu-systems",
      "moduleId": "gpu-kernels"
    },
    {
      "id": "gpu-profiling",
      "title": "GPU 性能分析",
      "layer": "specialization",
      "family": "GPU 系统",
      "summary": "测量 kernel、访存、并发和端到端执行，避免错误计时。",
      "why": "只有可复现测量才能支持性能优化结论。",
      "prerequisites": [
        "gpu-architecture",
        "profiling"
      ],
      "proof": "与基线对照并提交 profiler 证据和完整测量条件。",
      "topics": [
        "GPU 时间线与 kernel 指标",
        "计算、访存与通信瓶颈",
        "占用率与寄存器压力",
        "同步、传输与重叠",
        "预热、精度与端到端收益"
      ],
      "domainId": "gpu-systems",
      "moduleId": "gpu-kernels"
    },
    {
      "id": "finance",
      "title": "金融市场与交易基础",
      "layer": "specialization",
      "family": "量化",
      "summary": "理解标的、报价、订单、成交、持仓与常见风险术语。",
      "why": "先读懂行情和订单事件的含义，再分别走交易系统实现或统计研究分支。",
      "prerequisites": [],
      "proof": "说明收益、波动和回撤等指标的定义与边界。",
      "topics": [
        "股票、期货等标的与报价单位",
        "买卖、订单类型、成交与持仓",
        "收益、风险、流动性与交易成本",
        "行情字段、时间戳与数据口径",
        "开发、研究、回测与真实交易的边界"
      ],
      "domainId": "trading-research",
      "moduleId": "market-basics"
    },
    {
      "id": "market-microstructure",
      "title": "市场微观结构",
      "layer": "specialization",
      "family": "量化",
      "summary": "理解订单簿、撮合、价差、流动性、成交与时间优先规则。",
      "why": "交易系统和高频策略的结果受市场机制及数据口径影响。",
      "prerequisites": [
        "finance"
      ],
      "proof": "实现简化订单簿并验证新增、撤单和部分成交不变量。",
      "topics": [
        "订单簿、撮合与盘口",
        "限价/市价单与订单生命周期",
        "价差、流动性与冲击",
        "行情事件、序号与延迟",
        "交易规则与市场差异"
      ],
      "domainId": "trading-research",
      "moduleId": "market-basics"
    },
    {
      "id": "backtesting",
      "title": "回测与事件驱动模拟",
      "layer": "specialization",
      "family": "量化",
      "summary": "处理时间顺序、交易成本、滑点、仓位、基准和样本外评估。",
      "why": "忽略执行成本或时间泄漏会产生虚假策略收益。",
      "prerequisites": [
        "finance",
        "data-quality"
      ],
      "proof": "做事件驱动回测，记录成本、基准、样本外结果和限制。",
      "topics": [
        "事件驱动与时间推进",
        "未来信息与幸存者偏差",
        "滑点、费用与成交假设",
        "样本外与滚动验证",
        "基准、风控与实验复现"
      ],
      "domainId": "trading-research",
      "moduleId": "quant-method"
    },
    {
      "id": "research-design",
      "title": "量化研究设计",
      "layer": "specialization",
      "family": "量化",
      "summary": "提出可证伪假设，控制多重检验、数据泄漏和参数过拟合。",
      "why": "研究岗评估的是结论可信度，而非一次漂亮回测。",
      "prerequisites": [
        "statistics",
        "model-evaluation",
        "backtesting"
      ],
      "proof": "提交可复现研究报告，包含负结果和稳健性检验。",
      "topics": [
        "假设、对照与研究日志",
        "时间切分与样本外验证",
        "多重检验与选择偏差",
        "稳健性、成本与容量",
        "统计显著性、负结果与研究限制"
      ],
      "domainId": "trading-research",
      "moduleId": "quant-method"
    },
    {
      "id": "socket-io",
      "title": "Socket 与 I/O 多路复用",
      "layer": "engineering",
      "family": "系统",
      "summary": "从 TCP 字节流、阻塞模式到 select/poll/epoll，处理多连接与关闭边界。",
      "why": "把网络概念变成可运行服务，支撑行情接收、后端并发与故障定位。",
      "prerequisites": [
        "networking",
        "os"
      ],
      "proof": "实现 echo client/server，再改为多连接服务，复现半包、断连、超时与优雅关闭。",
      "topics": [
        "Socket 生命周期与 TCP 字节流",
        "半包、粘包与消息定界",
        "阻塞 / 非阻塞与部分读写",
        "select、poll、epoll 与就绪事件",
        "超时、断连、背压与优雅关闭"
      ],
      "domainId": "systems-network",
      "moduleId": "tcp-io"
    },
    {
      "id": "orderbook",
      "title": "订单簿与撮合状态",
      "layer": "specialization",
      "family": "交易系统",
      "summary": "用价格层级与订单状态管理新增、撤单、成交和剩余数量。",
      "why": "把 C++ 容器、所有权和复杂度放进金融事件场景，是第一份核心作品的主体。",
      "prerequisites": [
        "cpp",
        "data-structures",
        "market-microstructure",
        "testing"
      ],
      "proof": "实现新增、撤单和部分成交，验证数量守恒、空簿、非法订单与边界价格。",
      "topics": [
        "订单 ID、买卖方向、价格与数量",
        "价格层级、FIFO 与数据结构选型",
        "新增、撤单、部分成交与状态迁移",
        "数量守恒、负数量与重复订单不变量",
        "空簿、极值价格、无效撤单与回归测试"
      ],
      "domainId": "trading-research",
      "moduleId": "event-engine"
    },
    {
      "id": "event-replay",
      "title": "行情事件与确定性回放",
      "layer": "specialization",
      "family": "交易系统",
      "summary": "定义带时间戳与序号的事件流，处理重复、乱序和可重复执行。",
      "why": "相同输入应得到相同状态；事件口径和确定性先于并发优化。",
      "prerequisites": [
        "orderbook",
        "sql",
        "debugging"
      ],
      "proof": "固定输入重复回放得到一致摘要，记录错误策略、输入版本与计时边界。",
      "topics": [
        "事件 schema、时间戳与序号",
        "文件读取、校验与错误记录",
        "重复、缺失、乱序与重放策略",
        "确定性、状态摘要与一致性检查",
        "数据字典、SQL 导出与性能计时边界"
      ],
      "domainId": "trading-research",
      "moduleId": "event-engine"
    },
    {
      "id": "numerical-data",
      "title": "NumPy / Pandas 数据实验",
      "layer": "data",
      "family": "数据实验",
      "summary": "使用向量化、表格与时间索引构建可复现的数据清洗和实验输入。",
      "why": "服务于研究、回测、数据管道与模型评测，先控制数据口径再选择模型。",
      "prerequisites": [
        "python",
        "sql"
      ],
      "proof": "清洗重复、缺失和乱序事件，保存数据版本、时间范围及质量检查。",
      "topics": [
        "NumPy 数组、广播、向量化与 dtype",
        "Pandas 索引、连接、分组与缺失值",
        "时间戳、时区、重采样与滚动窗口",
        "重复、缺失、异常值与质量断言",
        "种子、数据版本、简单图表与复现实验"
      ],
      "domainId": "python-math",
      "moduleId": "python-data"
    },
    {
      "id": "time-series",
      "title": "回归与时间序列",
      "layer": "data",
      "family": "研究方法",
      "summary": "建立回归基线，分析残差、时序相关、平稳性与滚动预测。",
      "why": "金融时间序列不能把未来信息随机混入训练，需要解释基线与误差。",
      "prerequisites": [
        "statistics",
        "linear-algebra",
        "numerical-data"
      ],
      "proof": "比较线性回归与一个时序基线，按时间切分并报告残差、误差和失效场景。",
      "topics": [
        "最小二乘、回归假设与正则化",
        "自相关、滞后、平稳性与差分",
        "ARIMA、波动率与残差诊断",
        "按时间切分、滚动窗口与样本外预测",
        "基准比较、预测误差与交易价值边界"
      ],
      "domainId": "trading-research",
      "moduleId": "quant-method"
    },
    {
      "id": "inference-serving",
      "title": "推理服务与系统指标",
      "layer": "data",
      "family": "AI 系统",
      "summary": "把 PyTorch 模型服务化，度量 batch、吞吐、尾延迟、显存与数据传输。",
      "why": "连接后端工程与 GPU 性能，避免只报 kernel 时间却忽略端到端瓶颈。",
      "prerequisites": [
        "pytorch",
        "api",
        "containers",
        "profiling"
      ],
      "proof": "交付可复现推理服务，给出并发/batch 对照、显存与端到端 profile。",
      "topics": [
        "模型加载、预热、推理与版本",
        "batch、并发、队列与吞吐",
        "P50 / P95 延迟、超时与背压",
        "显存、主机传输与计算瓶颈",
        "服务健康检查、精度与可复现压测"
      ],
      "domainId": "gpu-systems",
      "moduleId": "ai-serving"
    }
  ];
  const roles = [
    {
      "id": "cpp-systems",
      "title": "C++ 系统与量化开发",
      "group": "software",
      "code": "01 / C++ & TRADING",
      "color": "#5969db",
      "summary": "从现代 C++、Linux 与网络出发，构建可测试、可回放、可测量的交易与高性能系统。",
      "internWork": [
        "实现行情解析、订单簿、事件回放或 C++ 系统模块",
        "处理资源所有权、并发、网络异常和确定性",
        "为正确性、延迟、吞吐和内存建立测试与基准"
      ],
      "must": [
        "cpp",
        "data-structures",
        "algorithms",
        "linux",
        "os",
        "networking",
        "concurrency",
        "sql",
        "build",
        "testing",
        "debugging"
      ],
      "preferred": [
        "profiling",
        "market-microstructure",
        "orderbook",
        "event-replay",
        "distributed",
        "python"
      ],
      "evidence": [
        "支持新增、撤单、部分成交的 C++ 订单簿，具有数量守恒等不变量测试",
        "乱序、重复、非法输入与确定性回放的测试记录",
        "标明硬件、编译选项、输入规模和计时边界的延迟/吞吐报告"
      ],
      "interview": [
        "解释生命周期、RAII、STL、移动语义与资源所有权",
        "解释线程同步、TCP 字节流、非阻塞 I/O 与 Linux 调试",
        "讲清订单簿结构、事件顺序、测试边界与性能瓶颈"
      ],
      "fit": "优先衔接已有 C++ 算法基础。先完成共同底座和订单簿项目，再投系统、行情、交易或量化开发；具体语言以目标 JD 为准。",
      "sourceIds": [
        "google-careers",
        "amazon-jobs",
        "nvidia-careers",
        "bytedance-careers",
        "tencent-careers"
      ],
      "mustOneOf": [],
      "path": {
        "start": [
          "cpp",
          "data-structures",
          "testing",
          "debugging"
        ],
        "core": [
          "linux",
          "os",
          "networking",
          "socket-io",
          "concurrency",
          "sql",
          "database",
          "market-microstructure",
          "orderbook",
          "event-replay",
          "profiling"
        ],
        "project": "C++ 行情回放与订单簿实验室",
        "steps": [
          "M1：固定事件格式、数据字典、序号和订单状态",
          "M2：实现新增、撤单和部分成交，验证数量守恒及异常输入",
          "M3：完成重复/乱序处理与确定性回放，再接入网络或 SQL",
          "M4：固定硬件、构建和数据，报告 P50/P95 延迟、吞吐与内存"
        ],
        "advance": [
          "distributed",
          "python",
          "architecture"
        ]
      },
      "priority": "主修方向",
      "skillIds": [
        "cpp",
        "data-structures",
        "algorithms",
        "linux",
        "os",
        "networking",
        "concurrency",
        "sql",
        "build",
        "testing",
        "debugging",
        "profiling",
        "market-microstructure",
        "orderbook",
        "event-replay",
        "distributed",
        "python"
      ]
    },
    {
      "id": "fintech-backend",
      "title": "金融科技后端",
      "group": "software",
      "code": "02 / FINTECH BACKEND",
      "color": "#2ab89a",
      "summary": "把金融事件与持仓数据做成可靠 API，重点验证事务、幂等、错误处理和运行可观测性。",
      "internWork": [
        "维护行情、交易、组合或风控查询 API 与数据库",
        "处理重复请求、事务、鉴权、缓存和依赖失败",
        "补齐 API 测试、健康检查、延迟指标和部署说明"
      ],
      "must": [
        "api",
        "backend",
        "sql",
        "database",
        "testing",
        "linux",
        "security-basics",
        "containers"
      ],
      "mustOneOf": [
        [
          "python",
          "java",
          "go"
        ]
      ],
      "preferred": [
        "cache-messaging",
        "distributed",
        "observability",
        "data-modeling",
        "data-quality",
        "finance"
      ],
      "evidence": [
        "行情与组合查询服务，具有清晰的数据口径和 API 契约",
        "覆盖重复写入、数据库断连、超时和非法参数的测试",
        "Docker Compose 启动服务与数据库，记录延迟与错误率"
      ],
      "interview": [
        "解释重试为何可能重复写入，以及幂等键和事务边界",
        "分析索引、连接池、缓存失效和消息重复消费",
        "沿 SQL、序列化、网络与依赖链排查接口延迟"
      ],
      "fit": "以 Python/FastAPI 为默认项目入口，复用 C++ 事件项目和数据库基础；Java/Go 按目标 JD 再补，不同时铺开。",
      "sourceIds": [
        "google-careers",
        "microsoft-careers",
        "amazon-jobs",
        "bytedance-careers",
        "alibaba-careers",
        "tencent-careers"
      ],
      "path": {
        "start": [
          "sql",
          "testing"
        ],
        "core": [
          "api",
          "backend",
          "service-frameworks",
          "database",
          "security-basics",
          "cache-messaging",
          "containers",
          "observability"
        ],
        "project": "行情与组合查询服务",
        "steps": [
          "定义 instruments、quotes、trades、portfolio 的数据口径和查询 API",
          "实现分页、鉴权、事务与幂等，区分 4xx/5xx 错误",
          "注入重复请求、断连、超时和非法参数，验证错误恢复",
          "用 Docker Compose 启动服务与数据库，记录延迟及错误率"
        ],
        "advance": [
          "cicd",
          "distributed",
          "architecture"
        ]
      },
      "priority": "主修第二方向",
      "skillIds": [
        "api",
        "backend",
        "sql",
        "database",
        "testing",
        "linux",
        "security-basics",
        "containers",
        "python",
        "java",
        "go",
        "cache-messaging",
        "distributed",
        "observability",
        "data-modeling",
        "data-quality",
        "finance"
      ]
    },
    {
      "id": "backend",
      "title": "通用后端与数据平台",
      "group": "software",
      "code": "03 / BACKEND & DATA",
      "color": "#4f86f7",
      "summary": "复用系统和数据库底座交付服务；按具体 JD 再深入数据管道、质量检查与批流处理。",
      "internWork": [
        "维护 API、业务逻辑、数据库查询与数据模型",
        "编写可重跑的增量数据管道和质量检查",
        "排查慢查询、坏数据、迟到事件与服务故障"
      ],
      "must": [
        "api",
        "database",
        "sql",
        "linux",
        "testing",
        "data-structures",
        "algorithms"
      ],
      "mustOneOf": [
        [
          "python",
          "java",
          "go",
          "cpp"
        ]
      ],
      "preferred": [
        "backend",
        "service-frameworks",
        "data-modeling",
        "etl",
        "data-quality",
        "warehouse",
        "streaming",
        "distributed",
        "containers",
        "cicd",
        "observability",
        "architecture"
      ],
      "evidence": [
        "有持久化、输入校验、测试和部署方式的服务",
        "可重跑管道或增量任务，覆盖重复、缺失与迟到数据",
        "索引/查询计划、数据字典和一次故障分析报告"
      ],
      "interview": [
        "数据结构与算法、OS/网络/数据库基础",
        "解释索引、事务、数据口径、增量加载和幂等",
        "说明批处理/流式处理以及服务设计的取舍"
      ],
      "fit": "与金融科技共用大部分基础。先选一门后端语言完成服务；目标是数据平台时，再补 Python 数据处理和管道分支。",
      "sourceIds": [
        "google-careers",
        "microsoft-careers",
        "amazon-jobs",
        "bytedance-careers",
        "alibaba-careers",
        "tencent-careers"
      ],
      "path": {
        "start": [
          "sql",
          "testing"
        ],
        "core": [
          "os",
          "networking",
          "backend",
          "service-frameworks",
          "data-modeling",
          "data-quality",
          "containers"
        ],
        "project": "可部署的数据查询服务与可重跑数据管道",
        "steps": [
          "定义事件粒度、主键、表结构和查询 API",
          "实现校验、事务、迁移与边界测试，完成服务部署",
          "数据平台扩展：用 Python 处理重复、缺失和迟到事件，支持增量重跑",
          "保存 EXPLAIN、质量报告和一次故障定位记录"
        ],
        "advance": [
          "etl",
          "warehouse",
          "streaming",
          "cache-messaging",
          "distributed",
          "observability"
        ]
      },
      "priority": "主修第二方向",
      "skillIds": [
        "api",
        "database",
        "sql",
        "linux",
        "testing",
        "data-structures",
        "algorithms",
        "python",
        "java",
        "go",
        "cpp",
        "backend",
        "service-frameworks",
        "data-modeling",
        "etl",
        "data-quality",
        "warehouse",
        "streaming",
        "distributed",
        "containers",
        "cicd",
        "observability",
        "architecture"
      ]
    },
    {
      "id": "ai-app",
      "title": "AI 应用 / Agent / RAG",
      "group": "data-ai",
      "code": "04 / AI APPLICATION",
      "color": "#d96e9d",
      "summary": "在 Python 与 API 底座上构建有引用、可评测、可追踪、能控制工具权限的金融文档助手。",
      "internWork": [
        "搭建文档解析、检索、生成和引用链路",
        "集成外部工具、模型 API 和业务服务",
        "建设评测集，追踪质量、延迟、成本和安全问题"
      ],
      "must": [
        "python",
        "api",
        "llm-fundamentals",
        "rag",
        "llm-evaluation",
        "testing",
        "security-basics"
      ],
      "mustOneOf": [],
      "preferred": [
        "agent-tools",
        "vector-search",
        "data-quality",
        "containers",
        "observability"
      ],
      "evidence": [
        "金融公告/年报助手，答案返回文档名及页码/段落引用",
        "至少 30 个固定问题，覆盖答案、证据和不可回答问题",
        "比较关键词、向量与混合检索，报告引用正确率、拒答、延迟、成本和失败类型"
      ],
      "interview": [
        "解释检索失败和模型幻觉如何区分",
        "设计受限工具调用与重复调用防护",
        "提出可复现的质量评测与成本优化方法"
      ],
      "fit": "先完成 Python、API 与数据质量基础，再做金融文档助手。此路线偏应用工程，预训练和前沿算法研究暂不列为短期求职目标。",
      "sourceIds": [
        "google-careers",
        "microsoft-careers",
        "amazon-jobs",
        "nvidia-careers",
        "bytedance-careers",
        "alibaba-careers",
        "tencent-careers"
      ],
      "path": {
        "start": [
          "python",
          "api",
          "testing",
          "data-quality"
        ],
        "core": [
          "llm-fundamentals",
          "vector-search",
          "rag",
          "agent-tools",
          "llm-evaluation",
          "security-basics"
        ],
        "project": "金融公告 / 年报研究助手",
        "steps": [
          "建立模型 API、结构化输出、流式响应和异常处理",
          "解析授权文档，比较关键词、向量、混合检索与重排，并返回引用",
          "实现受限工具调用、参数 schema、超时、幂等与终止条件",
          "用至少 30 个固定问题评测召回、引用、拒答、延迟与成本，整理失败表"
        ],
        "advance": [
          "containers",
          "observability",
          "mlops"
        ]
      },
      "priority": "主修第二方向",
      "jdScope": "当前保留的是相邻博士研究岗对照，用于辨别应用与研究的差异；尚无直接 AI 应用工程实习样例，不能将其学历或论文要求套用到本路线。",
      "skillIds": [
        "python",
        "api",
        "llm-fundamentals",
        "rag",
        "llm-evaluation",
        "testing",
        "security-basics",
        "agent-tools",
        "vector-search",
        "data-quality",
        "containers",
        "observability"
      ]
    },
    {
      "id": "quant-research",
      "title": "量化研究",
      "group": "data-ai",
      "code": "05 / QUANT RESEARCH",
      "color": "#b47a3b",
      "summary": "提出可证伪假设，用统计与严谨回测判断策略是否有样本外价值。",
      "internWork": [
        "探索市场数据并提出研究假设",
        "构建信号、评估基准、成本和样本外表现",
        "做稳健性分析并记录未成功的实验"
      ],
      "must": [
        "python",
        "statistics",
        "linear-algebra",
        "time-series",
        "finance",
        "research-design",
        "backtesting",
        "model-evaluation",
        "data-quality"
      ],
      "preferred": [
        "market-microstructure",
        "machine-learning",
        "sql",
        "feature-engineering",
        "algorithm-research"
      ],
      "evidence": [
        "可复现实验报告，包含假设、基准、交易成本",
        "按时间切分的样本外评估与稳健性检验",
        "记录负结果、参数敏感性和研究限制"
      ],
      "interview": [
        "解释统计显著性与实际收益的差别",
        "识别未来函数、过拟合和多重检验风险",
        "说明为何实验能或不能支持研究假设"
      ],
      "fit": "作为长期补充，与工程主线并行积累概率、统计和实证研究能力；先用基线和样本外证据验证假设，不以回测收益替代研究过程。",
      "sourceIds": [
        "google-careers",
        "amazon-jobs",
        "nvidia-careers",
        "bytedance-careers",
        "alibaba-careers"
      ],
      "mustOneOf": [],
      "path": {
        "start": [
          "python",
          "numerical-data",
          "statistics",
          "linear-algebra"
        ],
        "core": [
          "time-series",
          "finance",
          "model-evaluation",
          "backtesting",
          "research-design",
          "data-quality"
        ],
        "project": "含基线、样本外、成本与稳健性的量化研究报告",
        "steps": [
          "提出可证伪假设，固定数据版本、时点与样本范围",
          "建立简单基准，按时间切分训练/验证/测试并做滚动评估",
          "计入手续费、滑点、换手与容量，排查未来信息和选择偏差",
          "报告参数敏感性、子样本稳健性、负结果与限制"
        ],
        "advance": [
          "feature-engineering",
          "machine-learning",
          "market-microstructure",
          "algorithm-research"
        ]
      },
      "priority": "长期补充",
      "skillIds": [
        "python",
        "statistics",
        "linear-algebra",
        "time-series",
        "finance",
        "research-design",
        "backtesting",
        "model-evaluation",
        "data-quality",
        "market-microstructure",
        "machine-learning",
        "sql",
        "feature-engineering",
        "algorithm-research"
      ]
    },
    {
      "id": "ai-infra",
      "title": "AI 基础设施 / GPU 系统",
      "group": "infra",
      "code": "06 / AI SYSTEMS & GPU",
      "color": "#5c9dd6",
      "summary": "优化训练或推理系统的吞吐、延迟、内存和资源利用率。",
      "internWork": [
        "分析模型服务、训练作业或算子中的性能瓶颈",
        "实现系统工具、运行时集成、并行通信或 GPU kernel",
        "用 profiler 和受控 benchmark 验证改动，记录精度影响"
      ],
      "must": [
        "cpp",
        "python",
        "linux",
        "os",
        "concurrency",
        "profiling"
      ],
      "mustOneOf": [
        [
          "cuda",
          "triton"
        ]
      ],
      "preferred": [
        "distributed",
        "containers",
        "gpu-profiling",
        "mlops",
        "inference-serving",
        "linear-algebra",
        "cloud"
      ],
      "evidence": [
        "CPU/GPU 或基线/优化对比，包含测量条件",
        "Profiler 证据与计算、访存、通信瓶颈解释",
        "正确性、数值精度和端到端指标均有测试"
      ],
      "interview": [
        "讨论线程、访存、通信和资源利用率",
        "读性能数据，定位瓶颈并设计可验证实验",
        "解释 kernel 正确性、同步和数值精度"
      ],
      "fit": "完成 C++、体系结构与性能分析主线后再探索。先做可测量的小算子或推理服务，区分会调用 GPU 与会定位性能瓶颈。",
      "sourceIds": [
        "google-careers",
        "microsoft-careers",
        "amazon-jobs",
        "nvidia-careers",
        "bytedance-careers",
        "pytorch",
        "cuda-guide"
      ],
      "path": {
        "start": [
          "cpp",
          "python",
          "computer-architecture",
          "linear-algebra",
          "testing"
        ],
        "core": [
          "os",
          "concurrency",
          "profiling",
          "gpu-architecture",
          "pytorch"
        ],
        "project": "CPU / PyTorch / CUDA 或 Triton 算子对照实验",
        "steps": [
          "选择归约、softmax 或矩阵乘法，先建立 CPU/PyTorch 参考和精度测试",
          "用 CUDA 或 Triton 实现简单算子，再用 profiler 判断计算/访存/同步瓶颈",
          "区分传输、kernel、同步和端到端计时，固定形状、dtype、硬件和重复次数",
          "报告优化适用范围；无 GPU 时先完成 CPU 参考、profiler 学习和代码阅读"
        ],
        "advance": [
          "gpu-profiling",
          "inference-serving",
          "mlops",
          "distributed"
        ]
      },
      "priority": "选修探索",
      "skillIds": [
        "cpp",
        "python",
        "linux",
        "os",
        "concurrency",
        "profiling",
        "cuda",
        "triton",
        "distributed",
        "containers",
        "gpu-profiling",
        "mlops",
        "inference-serving",
        "linear-algebra",
        "cloud"
      ]
    }
  ];
  const domains = [
    {
      "id": "workflow",
      "title": "开发工具与工程习惯",
      "shortTitle": "工具链与工程",
      "color": "#70a7ff",
      "stage": "阶段 0 · 全程复用",
      "summary": "让每个项目都能构建、测试、调试，并被他人复现。",
      "modules": [
        {
          "id": "terminal-git",
          "title": "终端与版本管理",
          "summary": "在终端工作，用版本历史组织每次改动。",
          "skillIds": [
            "shell",
            "git"
          ]
        },
        {
          "id": "build-collaboration",
          "title": "构建与协作",
          "summary": "固定依赖、构建入口、文档和代码评审习惯。",
          "skillIds": [
            "build",
            "collaboration"
          ]
        },
        {
          "id": "quality-debug",
          "title": "测试与调试",
          "summary": "先复现失败，用测试、调用栈和 Sanitizer 验证修复。",
          "skillIds": [
            "testing",
            "debugging"
          ]
        }
      ]
    },
    {
      "id": "cpp-foundations",
      "title": "C++ 与计算机基础",
      "shortTitle": "C++ 与基础",
      "color": "#8c9bff",
      "stage": "阶段 1",
      "summary": "从能解算法题，走到能控制资源、解释机制和设计接口。",
      "modules": [
        {
          "id": "program-design",
          "title": "程序设计与抽象",
          "summary": "类型、控制流、模块、接口和状态建模。",
          "skillIds": [
            "programming-basics",
            "oop-design"
          ]
        },
        {
          "id": "cpp-memory",
          "title": "现代 C++ 与内存",
          "summary": "理解生命周期、RAII、移动、STL 和底层表示。",
          "skillIds": [
            "c-language",
            "cpp"
          ]
        },
        {
          "id": "algorithms-structures",
          "title": "数据结构与算法",
          "summary": "用不变量、复杂度和边界选择正确的数据结构。",
          "skillIds": [
            "discrete-math",
            "data-structures",
            "algorithms"
          ]
        },
        {
          "id": "cpu-architecture",
          "title": "计算机组成与体系结构",
          "summary": "建立 CPU、缓存、内存与 I/O 的机制解释。",
          "skillIds": [
            "computer-architecture"
          ]
        }
      ]
    },
    {
      "id": "systems-network",
      "title": "Linux、操作系统与网络",
      "shortTitle": "系统与网络",
      "color": "#48cab7",
      "stage": "阶段 2",
      "summary": "观察进程、内存、线程与 TCP 在真实环境中的行为。",
      "modules": [
        {
          "id": "linux-os",
          "title": "Linux 与操作系统",
          "summary": "用实验观察系统调用、进程、内存和文件。",
          "skillIds": [
            "linux",
            "os"
          ]
        },
        {
          "id": "tcp-io",
          "title": "网络与 I/O",
          "summary": "从 TCP 到多连接服务，主动制造半包和断连。",
          "skillIds": [
            "networking",
            "socket-io"
          ]
        },
        {
          "id": "parallel-cpu",
          "title": "并发与同步",
          "summary": "从共享状态出发理解竞态、锁、线程池和关闭。",
          "skillIds": [
            "concurrency"
          ]
        },
        {
          "id": "cpu-profiling",
          "title": "系统性能分析",
          "summary": "用受控基准、perf 与火焰图判断瓶颈。",
          "skillIds": [
            "profiling"
          ]
        }
      ]
    },
    {
      "id": "data-backend",
      "title": "数据库、后端与数据平台",
      "shortTitle": "数据与后端",
      "color": "#50bfef",
      "stage": "阶段 3 → 阶段 6",
      "summary": "定义数据口径，完成可部署、可恢复的 API 或数据管道。",
      "modules": [
        {
          "id": "sql-storage",
          "title": "SQL、数据库与建模",
          "summary": "查询、索引、事务与数据字典先服务于正确性。",
          "skillIds": [
            "sql",
            "database",
            "data-modeling"
          ]
        },
        {
          "id": "service-api",
          "title": "API 与后端服务",
          "summary": "默认用 Python 实现服务，Java/Go 按 JD 再补。",
          "skillIds": [
            "api",
            "backend",
            "service-frameworks",
            "java",
            "go"
          ]
        },
        {
          "id": "reliable-messaging",
          "title": "缓存、消息与可靠性",
          "summary": "明确重复请求、重试、部分失败和一致性边界。",
          "skillIds": [
            "cache-messaging",
            "distributed"
          ]
        },
        {
          "id": "data-pipelines",
          "title": "数据管道与质量",
          "summary": "从小规模增量管道起步，再按岗位加批流处理。",
          "skillIds": [
            "data-quality",
            "etl",
            "warehouse",
            "streaming"
          ]
        },
        {
          "id": "deploy-deliver",
          "title": "部署与工程设计",
          "summary": "容器、持续集成与架构让项目能被复现和维护。",
          "skillIds": [
            "containers",
            "cicd",
            "architecture",
            "cloud"
          ]
        },
        {
          "id": "operate-secure",
          "title": "监控与安全基础",
          "summary": "观察延迟、错误率与权限边界，作为各岗位共享能力。",
          "skillIds": [
            "observability",
            "security-basics"
          ]
        }
      ]
    },
    {
      "id": "trading-research",
      "title": "交易系统与量化研究",
      "shortTitle": "交易与研究",
      "color": "#efb565",
      "stage": "阶段 4 · 研究为阶段 9 长期补充",
      "summary": "先做订单簿和确定性回放；研究分支再加入统计检验与成本。",
      "modules": [
        {
          "id": "market-basics",
          "title": "金融市场与事件",
          "summary": "认识标的、行情、订单和成交，不把金融知识等同于策略。",
          "skillIds": [
            "finance",
            "market-microstructure"
          ]
        },
        {
          "id": "event-engine",
          "title": "订单簿与回放项目",
          "summary": "按事件、不变量、测试、回放和基准逐步完成核心作品。",
          "skillIds": [
            "orderbook",
            "event-replay"
          ]
        },
        {
          "id": "quant-method",
          "title": "回测与研究设计",
          "summary": "用样本外、费用、滑点、稳健性和负结果检验假设。",
          "skillIds": [
            "backtesting",
            "research-design",
            "time-series"
          ]
        }
      ]
    },
    {
      "id": "python-math",
      "title": "Python、统计与机器学习",
      "shortTitle": "Python 与统计",
      "color": "#bc91ed",
      "stage": "阶段 5",
      "summary": "从数据实验和简单基线开始，明确切分、指标与误差来源。",
      "modules": [
        {
          "id": "python-data",
          "title": "Python 与数据处理",
          "summary": "先补工程习惯，再掌握 NumPy/Pandas 和时间索引。",
          "skillIds": [
            "python",
            "numerical-data"
          ]
        },
        {
          "id": "math-stats",
          "title": "概率与数学基础",
          "summary": "按研究或系统需要补统计、线性代数和优化。",
          "skillIds": [
            "statistics",
            "linear-algebra",
            "calculus"
          ]
        },
        {
          "id": "ml-experiments",
          "title": "机器学习与可信评估",
          "summary": "先基线，再特征与模型，避免时间泄漏。",
          "skillIds": [
            "machine-learning",
            "feature-engineering",
            "model-evaluation",
            "algorithm-research"
          ]
        },
        {
          "id": "dl-pytorch",
          "title": "深度学习与 PyTorch",
          "summary": "理解训练/推理、张量和自动求导，服务于后续 AI 系统。",
          "skillIds": [
            "deep-learning",
            "pytorch"
          ]
        }
      ]
    },
    {
      "id": "ai-application",
      "title": "Agent、RAG 与 AI 应用",
      "shortTitle": "Agent 与 RAG",
      "color": "#f094be",
      "stage": "阶段 7",
      "summary": "做一个带证据、可评测、可控权限的金融文档助手。",
      "modules": [
        {
          "id": "model-api",
          "title": "模型 API 与基础",
          "summary": "消息、token、结构化输出、流式响应与错误边界。",
          "skillIds": [
            "llm-fundamentals"
          ]
        },
        {
          "id": "retrieval-rag",
          "title": "检索与 RAG",
          "summary": "比较关键词/向量/混合检索，建立引用和拒答。",
          "skillIds": [
            "vector-search",
            "rag"
          ]
        },
        {
          "id": "agent-evaluation",
          "title": "工具调用与评测",
          "summary": "参数、权限、状态机、终止与失败回归一起设计。",
          "skillIds": [
            "agent-tools",
            "llm-evaluation"
          ]
        }
      ]
    },
    {
      "id": "gpu-systems",
      "title": "GPU 与 AI 基础设施",
      "shortTitle": "GPU 与 AI 系统",
      "color": "#84c888",
      "stage": "阶段 8 · 完成主线后选修",
      "summary": "用正确性测试和 profile 区分计算、访存、通信与服务瓶颈。",
      "modules": [
        {
          "id": "gpu-hardware",
          "title": "GPU 执行与内存",
          "summary": "理解线程层级、warp、访存、带宽和同步。",
          "skillIds": [
            "gpu-architecture"
          ]
        },
        {
          "id": "gpu-kernels",
          "title": "CUDA / Triton 与分析",
          "summary": "两条算子路线选其一，以基准和 profiler 验证。",
          "skillIds": [
            "cuda",
            "triton",
            "gpu-profiling"
          ]
        },
        {
          "id": "ai-serving",
          "title": "推理服务与模型工程",
          "summary": "度量 batch、吞吐、尾延迟、显存与端到端效果。",
          "skillIds": [
            "inference-serving",
            "mlops"
          ]
        }
      ]
    }
  ];
  const sources = [
    {
      "id": "google-careers",
      "name": "Google Careers 招聘搜索",
      "type": "公司招聘入口",
      "url": "https://www.google.com/about/careers/applications/jobs/results/",
      "note": "搜索 Software Engineering / Data / AI Intern，并逐条确认地区、年级和时间。"
    },
    {
      "id": "microsoft-careers",
      "name": "Microsoft Careers 学生与毕业生",
      "type": "公司招聘入口",
      "url": "https://careers.microsoft.com/v2/global/en/students",
      "note": "核对岗位资格、毕业时间、工作地点与申请窗口。"
    },
    {
      "id": "amazon-jobs",
      "name": "Amazon Jobs：Software Development",
      "type": "公司招聘入口",
      "url": "https://www.amazon.jobs/en/job_categories/software-development",
      "note": "按 Intern 与地区筛选；不同团队和年份要求会变化。"
    },
    {
      "id": "nvidia-careers",
      "name": "NVIDIA Careers 学生岗位",
      "type": "公司招聘入口",
      "url": "https://www.nvidia.com/en-us/about-nvidia/careers/",
      "note": "可检索软件、GPU、系统和研究实习岗位。"
    },
    {
      "id": "bytedance-careers",
      "name": "字节跳动招聘",
      "type": "公司招聘入口",
      "url": "https://jobs.bytedance.com/",
      "note": "按研发、数据、算法、基础架构等岗位检索实习信息。"
    },
    {
      "id": "alibaba-careers",
      "name": "阿里巴巴招聘",
      "type": "公司招聘入口",
      "url": "https://talent.alibaba.com/",
      "note": "按职位方向和实习招聘批次确认要求。"
    },
    {
      "id": "tencent-careers",
      "name": "腾讯招聘",
      "type": "公司招聘入口",
      "url": "https://careers.tencent.com/",
      "note": "按岗位类别、地点和实习项目搜索具体招聘描述。"
    },
    {
      "id": "mit-missing",
      "name": "MIT Missing Semester",
      "type": "工具学习参考",
      "url": "https://missing.csail.mit.edu/",
      "note": "Shell、Git、调试与开发工具。"
    },
    {
      "id": "cmu-db",
      "name": "CMU 15-445 Database Systems",
      "type": "技术学习参考",
      "url": "https://15445.courses.cs.cmu.edu/",
      "note": "数据库系统、索引、事务和并发控制。"
    },
    {
      "id": "pytorch",
      "name": "PyTorch Tutorials",
      "type": "技术学习参考",
      "url": "https://pytorch.org/tutorials/",
      "note": "机器学习工程实现与训练流程。"
    },
    {
      "id": "cuda-guide",
      "name": "NVIDIA CUDA Programming Guide",
      "type": "技术学习参考",
      "url": "https://docs.nvidia.com/cuda/cuda-c-programming-guide/",
      "note": "CUDA 执行模型、内存和编程接口。"
    },
    {
      "id": "owasp",
      "name": "OWASP Top 10",
      "type": "安全学习参考",
      "url": "https://owasp.org/www-project-top-ten/",
      "note": "Web 应用安全风险分类与防护背景。"
    }
  ];
  const jdEvidence = [
    {
      "id": "databricks-6866534002",
      "company": "Databricks",
      "title": "Software Engineering Intern (2027 Start)",
      "location": "Amsterdam, Netherlands",
      "url": "https://databricks.com/company/careers/open-positions/job?gh_jid=6866534002",
      "checked": "2026-10-18",
      "status": "source-readable",
      "roleIds": [
        "backend",
        "cpp-systems"
      ],
      "eligibility": [
        "计算机、工程或相关学位；预计 2027 年秋季至 2028 年夏季毕业",
        "2027 暑期约 12 周；co-op 限在对应 co-op 项目就读的学生"
      ],
      "required": [
        {
          "text": "具备 Python、Java、C++ 等通用语言的实现能力；示例语言按岗位选择",
          "skillIds": [
            "python",
            "java",
            "cpp"
          ]
        },
        {
          "text": "算法、数据结构、面向对象基础与团队解决不明确问题的能力",
          "skillIds": [
            "algorithms",
            "data-structures",
            "oop-design",
            "collaboration"
          ]
        }
      ],
      "preferred": [],
      "quote": "You have good knowledge of algorithms, data structures, and OOP principles",
      "note": "通用软件工程实习样例，不能据此认定所有后端岗位都要求某一语言。",
      "sourceApiUrl": "https://boards-api.greenhouse.io/v1/boards/databricks/jobs/6866534002",
      "scope": "direct-example"
    },
    {
      "id": "stripe-8130883",
      "company": "Stripe",
      "title": "Software Engineer, Intern",
      "location": "Singapore",
      "url": "https://stripe.com/jobs/search?gh_jid=8130883",
      "checked": "2026-10-18",
      "status": "source-readable",
      "roleIds": [
        "backend",
        "fintech-backend"
      ],
      "eligibility": [
        "通过计算机、数学或相关本科/硕士学习建立计算机基础",
        "有课程/个人编程经历，以及实习或其他多人项目的协作经历；此记录未提取到统一毕业窗口"
      ],
      "required": [
        {
          "text": "编程与计算机基础；团队使用 Ruby、Java、JavaScript、Go、Scala，强调语言可学习",
          "skillIds": [
            "programming-basics",
            "java",
            "go"
          ]
        },
        {
          "text": "理解陌生系统，参与代码评审与反馈；使用 AI 工具时能批判审查、修正并验证输出",
          "skillIds": [
            "collaboration",
            "git",
            "testing"
          ]
        }
      ],
      "preferred": [
        {
          "text": "专业方向能力、高质量 PR 与测试覆盖、阅读多语言代码库和清晰书面沟通",
          "skillIds": [
            "testing",
            "collaboration",
            "architecture"
          ]
        }
      ],
      "quote": "We believe new programming languages can be learned if the fundamentals and general knowledge are present.",
      "note": "跨技术栈软件工程样例；前端、后端和基础设施专长在原文列为加分方向。",
      "sourceApiUrl": "https://boards-api.greenhouse.io/v1/boards/stripe/jobs/8130883",
      "scope": "direct-example"
    },
    {
      "id": "cloudflare-8199958",
      "company": "Cloudflare",
      "title": "Software Engineer Intern (2027)",
      "location": "Austin, TX, US · 现场",
      "url": "https://boards.greenhouse.io/cloudflare/jobs/8199958?gh_jid=8199958",
      "checked": "2026-10-18",
      "status": "source-readable",
      "roleIds": [
        "backend"
      ],
      "eligibility": [
        "就读计算机、工程、数学、统计或相关学位/项目",
        "全职 40 小时/周，至少 12 周；项目通常 12—14 周，Austin 每周现场 3—5 天；不接受远程或兼职"
      ],
      "required": [
        {
          "text": "交付项目、跨团队协作并进行最终展示；具备批判思考与快速学习能力",
          "skillIds": [
            "collaboration",
            "architecture"
          ]
        },
        {
          "text": "原文技术背景列出 TypeScript/JavaScript、Go、Rust、C/C++、Python，未要求全部掌握",
          "skillIds": [
            "go",
            "c-language",
            "cpp",
            "python"
          ]
        }
      ],
      "preferred": [
        {
          "text": "个人项目、开源贡献或 Cloudflare 开发平台经历",
          "skillIds": [
            "git",
            "collaboration"
          ]
        }
      ],
      "quote": "Ship and deliver projects over 12-14 weeks with autonomy and support.",
      "note": "互联网规模系统的软件工程样例；平台/SRE 关联来自系统职责，原文不是专门的 SRE 职位。",
      "sourceApiUrl": "https://boards-api.greenhouse.io/v1/boards/cloudflare/jobs/8199958",
      "scope": "direct-example"
    },
    {
      "id": "databricks-7011263002",
      "company": "Databricks",
      "title": "PhD GenAI Research Scientist Intern",
      "location": "San Francisco, CA, US",
      "url": "https://databricks.com/company/careers/open-positions/job?gh_jid=7011263002",
      "checked": "2026-10-18",
      "status": "source-readable",
      "roleIds": [
        "ai-app"
      ],
      "eligibility": [
        "计算机或相关领域博士在读",
        "此条是生成式 AI 研究实习；不是一般 AI 应用工程实习的学历门槛"
      ],
      "required": [
        {
          "text": "有深度学习研究经验，具备软件工程和 PyTorch 实现能力",
          "skillIds": [
            "deep-learning",
            "algorithm-research",
            "pytorch"
          ]
        },
        {
          "text": "研究职责包括领域适配、文献方法改进、LLM/AI 系统评测、检索增强和高效推理",
          "skillIds": [
            "llm-fundamentals",
            "rag",
            "llm-evaluation",
            "model-evaluation"
          ]
        }
      ],
      "preferred": [],
      "quote": "Research experience in and proficiency with the fundamentals of deep learning.",
      "note": "AI 应用的相邻研究样例，用于说明应用工程与模型研究的分界；博士要求仅归属此职位。",
      "sourceApiUrl": "https://boards-api.greenhouse.io/v1/boards/databricks/jobs/7011263002",
      "scope": "adjacent-research"
    },
    {
      "id": "nvidia-JR2022645",
      "company": "NVIDIA",
      "title": "Software Engineering Intern, NCCL - 2026",
      "location": "中国上海 / 北京",
      "url": "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite/job/China-Shanghai/Software-Engineering-Intern--NCCL---2026_JR2022645",
      "checked": "2026-10-18",
      "status": "needs-refresh",
      "roleIds": [
        "cpp-systems",
        "ai-infra"
      ],
      "eligibility": [
        "CE/CS/EE 博士在读；具有体系结构、OS、通信库和/或 AI/ML 背景",
        "2026 批次；原文可读取，当前批次与可投递状态仍需核对"
      ],
      "required": [
        {
          "text": "优秀的 C/C++ 编程与调试、较强 Linux 经验、并行编程接口和通信运行时经验",
          "skillIds": [
            "cpp",
            "debugging",
            "linux",
            "concurrency",
            "distributed"
          ]
        },
        {
          "text": "开发 GPU 集群通信运行时，与跨国家/时区团队有效协作",
          "skillIds": [
            "gpu-architecture",
            "networking",
            "collaboration"
          ]
        }
      ],
      "preferred": [
        {
          "text": "InfiniBand/RoCE、HPC、深度学习框架、分布式训练/推理、CUDA 优化与性能分析",
          "skillIds": [
            "pytorch",
            "cuda",
            "gpu-profiling",
            "distributed"
          ]
        }
      ],
      "quote": "Excellent C/C++ programming and debugging skills.",
      "note": "专项博士实习样例；不能外推为所有 C++ 或 GPU 实习均要求博士。",
      "sourceApiUrl": "https://nvidia.wd5.myworkdayjobs.com/wday/cxs/nvidia/NVIDIAExternalCareerSite/job/China-Shanghai/Software-Engineering-Intern--NCCL---2026_JR2022645",
      "scope": "direct-example"
    },
    {
      "id": "nvidia-JR2023492",
      "company": "NVIDIA",
      "title": "NVIDIA 2027 Internships: Systems Software Engineering",
      "location": "Santa Clara, CA, US · 多方向汇总",
      "url": "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite/job/US-CA-Santa-Clara/NVIDIA-2027-Internships--Systems-Software-Engineering_JR2023492",
      "checked": "2026-10-18",
      "status": "direction-pool",
      "roleIds": [
        "cpp-systems",
        "ai-infra"
      ],
      "eligibility": [
        "实习全程为相关专业本科/硕士/博士在读",
        "简历清楚列出预计毕业年月；这是方向汇总，具体团队要求可能不同"
      ],
      "required": [
        {
          "text": "依具体岗位可能涉及 C/C++、Linux、OS、体系结构、网络、多线程或嵌入式开发",
          "skillIds": [
            "c-language",
            "cpp",
            "linux",
            "os",
            "computer-architecture",
            "networking",
            "concurrency"
          ]
        }
      ],
      "preferred": [],
      "quote": "Depending on the internship role, prior experience or knowledge requirements could include",
      "note": "原文明确按岗位列举可能技术；不是要求一个人掌握整个列表。 本路线仅展开系统与 GPU 相关知识，原文中的嵌入式方向不再作为岗位入口。",
      "sourceApiUrl": "https://nvidia.wd5.myworkdayjobs.com/wday/cxs/nvidia/NVIDIAExternalCareerSite/job/US-CA-Santa-Clara/NVIDIA-2027-Internships--Systems-Software-Engineering_JR2023492",
      "scope": "direction-pool"
    },
    {
      "id": "nvidia-JR2023497",
      "company": "NVIDIA",
      "title": "NVIDIA 2027 Internships: Deep Learning",
      "location": "Santa Clara, CA, US · 多方向汇总",
      "url": "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite/job/US-CA-Santa-Clara/NVIDIA-2027-Internships--Deep-Learning_JR2023497-1",
      "checked": "2026-10-18",
      "status": "direction-pool",
      "roleIds": [
        "ai-infra"
      ],
      "eligibility": [
        "实习全程为相关专业本科/硕士/博士在读",
        "简历标明预计毕业年月；各团队的工作内容与先修知识不同"
      ],
      "required": [
        {
          "text": "方向背景包括深度学习、线性代数、数值方法与 CPU/GPU 软件设计",
          "skillIds": [
            "deep-learning",
            "linear-algebra",
            "computer-architecture"
          ]
        },
        {
          "text": "按团队可能涉及 Python、C/C++、CUDA、Linux、框架、容器、云或数据技术",
          "skillIds": [
            "python",
            "cpp",
            "cuda",
            "linux",
            "pytorch",
            "containers",
            "cloud",
            "streaming"
          ]
        }
      ],
      "preferred": [],
      "quote": "Depending on the internship role, prior experience or knowledge requirements could include",
      "note": "候选方向汇总；框架、语言与基础设施条目是可变技术栈。",
      "sourceApiUrl": "https://nvidia.wd5.myworkdayjobs.com/wday/cxs/nvidia/NVIDIAExternalCareerSite/job/US-CA-Santa-Clara/NVIDIA-2027-Internships--Deep-Learning_JR2023497-1",
      "scope": "direction-pool"
    },
    {
      "id": "nvidia-JR2023499",
      "company": "NVIDIA",
      "title": "NVIDIA Spring 2027 Internships: Developer and Performance Technology",
      "location": "Santa Clara, CA, US · 多方向汇总",
      "url": "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite/job/US-CA-Santa-Clara/NVIDIA-Spring-2027-Internships--Developer-and-Performance-Technology_JR2023499",
      "checked": "2026-10-18",
      "status": "direction-pool",
      "roleIds": [
        "ai-infra"
      ],
      "eligibility": [
        "相关专业本科/硕士在读，实习全程保持在读",
        "全职 8—12 个月；偏好 2027 年 2 月或 5 月开始"
      ],
      "required": [
        {
          "text": "性能、图像质量、功耗或 HPC/DL 基准测试；搭建测试系统并分析结果",
          "skillIds": [
            "testing",
            "profiling",
            "gpu-architecture"
          ]
        },
        {
          "text": "按方向可能涉及 Linux、Python/Shell 自动化、调试、GPU 框架/编程和容器",
          "skillIds": [
            "linux",
            "python",
            "shell",
            "debugging",
            "cuda",
            "pytorch",
            "containers"
          ]
        }
      ],
      "preferred": [],
      "quote": "Developer and Performance Internship Preferred Start Dates: February 2027 or May 2027",
      "note": "性能技术方向的长期实习样例；与通用测试开发存在交集，不能替代软件 QA 的完整要求。",
      "sourceApiUrl": "https://nvidia.wd5.myworkdayjobs.com/wday/cxs/nvidia/NVIDIAExternalCareerSite/job/US-CA-Santa-Clara/NVIDIA-Spring-2027-Internships--Developer-and-Performance-Technology_JR2023499",
      "scope": "direction-pool"
    },
    {
      "id": "verkada-5210813007",
      "company": "Verkada",
      "title": "Backend Software Engineering Intern 2027",
      "location": "San Mateo, CA, US · 现场",
      "url": "https://job-boards.greenhouse.io/verkada/jobs/5210813007",
      "checked": "2026-10-18",
      "status": "source-readable",
      "roleIds": [
        "backend"
      ],
      "eligibility": [
        "计算机或类似技术专业本科/硕士在读；2028 年 6 月前毕业",
        "能在总部参加 2027 冬季或夏季实习；有产品开发与上线的实习经历"
      ],
      "required": [
        {
          "text": "熟悉 Python 或 Go、分布式系统、OS、AWS、Docker 等，适应敏捷团队开发",
          "skillIds": [
            "python",
            "go",
            "distributed",
            "os",
            "cloud",
            "containers",
            "collaboration"
          ]
        }
      ],
      "preferred": [
        {
          "text": "REST API 与 Linux 服务经验",
          "skillIds": [
            "api",
            "linux"
          ]
        }
      ],
      "quote": "Familiar with: Python or Golang, Distributed Systems, Operating Systems, AWS, Docker, etc",
      "note": "具体公司的后端技术栈样例；其既往实习经历要求不是所有公司共有的门槛。",
      "sourceApiUrl": "https://boards-api.greenhouse.io/v1/boards/verkada/jobs/5210813007",
      "scope": "direct-example"
    },
    {
      "id": "janestreet-8625946002",
      "company": "Jane Street",
      "title": "Linux Engineer · Summer Internship",
      "location": "中国香港",
      "url": "https://www.janestreet.com/join-jane-street/apply/8625946002?gh_jid=8625946002",
      "checked": "2026-10-18",
      "status": "source-readable",
      "roleIds": [
        "cpp-systems"
      ],
      "eligibility": [
        "官方职位元数据标记 Summer Internship；地点香港",
        "原文没有统一毕业年月或固定实习周数，本记录不自行补设"
      ],
      "required": [
        {
          "text": "OS 与体系结构、socket/虚拟内存/进程生命周期、基础网络协议与 Linux 命令行",
          "skillIds": [
            "os",
            "computer-architecture",
            "networking",
            "linux",
            "shell"
          ]
        },
        {
          "text": "基础设施、性能排障、监控、自动化与根因分析等项目职责",
          "skillIds": [
            "profiling",
            "observability",
            "debugging",
            "collaboration"
          ]
        }
      ],
      "preferred": [],
      "quote": "Knowledgeable about operating system fundamentals and computer architecture",
      "note": "基础设施系统方向样例；职位元数据是判断其实习性质的依据。",
      "sourceApiUrl": "https://boards-api.greenhouse.io/v1/boards/janestreet/jobs/8625946002",
      "scope": "adjacent-systems"
    },
    {
      "id": "janestreet-8617298002",
      "company": "Jane Street",
      "title": "Software Engineer · Summer Internship",
      "location": "中国香港",
      "url": "https://www.janestreet.com/join-jane-street/apply/8617298002?gh_jid=8617298002",
      "checked": "2026-10-18",
      "status": "source-readable",
      "roleIds": [
        "cpp-systems",
        "backend",
        "fintech-backend"
      ],
      "eligibility": [
        "官方职位元数据标记 Summer Internship；地点香港",
        "原文明示英语流利；没有在技能段要求先具备金融从业背景"
      ],
      "required": [
        {
          "text": "优秀编程能力、好奇心、协作、学习意愿和英语沟通；工作中学习 OCaml，部分团队使用 Python",
          "skillIds": [
            "programming-basics",
            "python",
            "collaboration"
          ]
        },
        {
          "text": "项目覆盖高性能交易系统至语言设计，强调可维护、可生产交付的软件",
          "skillIds": [
            "architecture",
            "testing"
          ]
        }
      ],
      "preferred": [],
      "quote": "A top-notch programmer with a love for technology",
      "note": "金融公司的软件实习样例，用来展示技术栈差异；OCaml 是其主力语言，不能据此声称量化开发全部要求 C++。",
      "sourceApiUrl": "https://boards-api.greenhouse.io/v1/boards/janestreet/jobs/8617298002",
      "scope": "direct-example"
    },
    {
      "id": "janestreet-8623868002",
      "company": "Jane Street",
      "title": "Quantitative Researcher · Summer Internship",
      "location": "中国香港",
      "url": "https://www.janestreet.com/join-jane-street/apply/8623868002?gh_jid=8623868002",
      "checked": "2026-10-18",
      "status": "source-readable",
      "roleIds": [
        "quant-research"
      ],
      "eligibility": [
        "官方职位元数据标记 Summer Internship；英语流利",
        "多数实习生为本科或研究生；原文也欢迎已毕业且考虑转入金融的申请者"
      ],
      "required": [
        {
          "text": "逻辑与数学思考、较强 Python 编程、精确沟通、协作和学习能力",
          "skillIds": [
            "python",
            "statistics",
            "collaboration"
          ]
        },
        {
          "text": "职责涉及实验设计、数据集、时间序列、特征和金融数据建模",
          "skillIds": [
            "research-design",
            "data-quality",
            "feature-engineering",
            "model-evaluation"
          ]
        }
      ],
      "preferred": [
        {
          "text": "研究经验加分；多数候选人有数据科学或 ML 经历，原文强调思考学习方式",
          "skillIds": [
            "machine-learning",
            "algorithm-research"
          ]
        }
      ],
      "quote": "A strong programmer who's comfortable with Python",
      "note": "金融知识可在实习中学习；地图中的金融/回测准备是通用建议，不是这条 JD 的统一申请前提。",
      "sourceApiUrl": "https://boards-api.greenhouse.io/v1/boards/janestreet/jobs/8623868002",
      "scope": "direct-example"
    }
  ];

  const skillById = Object.fromEntries(skills.map(skill=>[skill.id,skill]));
  function ordered(seeds) {
    const visited=new Set(), result=[];
    function visit(id) { if(visited.has(id))return; visited.add(id); skillById[id].prerequisites.forEach(visit); result.push(id); }
    seeds.forEach(visit); return result;
  }
  roles.forEach(role=>{
    role.skillIds=[...new Set([...role.must,...role.mustOneOf.flat(),...role.preferred])];
    role.skills=role.skillIds.map(id=>skillById[id]);
    const used=new Set(ordered(['programming-basics','shell','git','collaboration',...role.skillIds,...role.path.start,...role.path.core,...role.path.advance]));
    role.allSkillIds=[...used];
  });
  skills.forEach(skill=>{
    skill.directRoleIds=roles.filter(role=>role.skillIds.includes(skill.id)).map(role=>role.id);
    skill.roleIds=roles.filter(role=>role.allSkillIds.includes(skill.id)).map(role=>role.id);
  });
  domains.forEach(domain=>{
    domain.modules.forEach(module=>{module.domainId=domain.id;});
    domain.skillIds=domain.modules.flatMap(module=>module.skillIds);
  });
  function getLearningPath(roleId, choices=[]) {
    const role=roles.find(item=>item.id===roleId);
    if(!role)throw new Error('Unknown role: '+roleId);
    const selected=role.mustOneOf.map((group,index)=>group.includes(choices[index])?choices[index]:group[0]);
    const languages=selected.filter(id=>skillById[id].family==='编程语言');
    const foundation=ordered(['programming-basics','shell','git','collaboration',...role.path.start,...languages]);
    const foundationSet=new Set(foundation);
    const required=ordered([...foundation,...role.must,...selected,...role.path.core]);
    return {selected,foundation,core:required.filter(id=>!foundationSet.has(id)),required,
      project:{title:role.path.project,steps:role.path.steps,acceptance:role.evidence},
      advance:role.path.advance.filter(id=>!required.includes(id))};
  }
  window.ATLAS_DATA={updated:'2026-10-19',skills,roles,domains,sources,jdEvidence,getLearningPath,
    roleAliases:{'quant-dev':'cpp-systems','data-engineer':'backend'},
    routeSources:['2026-10-17_学习路线与资源清单.md','2026-10-17_分阶段学习路线.md'],
    layers:{foundation:{label:'工具与基础',color:'#5d8ef5'},engineering:{label:'工程与系统',color:'#28b89b'},data:{label:'数据与 AI',color:'#bb82ee'},specialization:{label:'方向分支',color:'#eea44b'}}};
})();
