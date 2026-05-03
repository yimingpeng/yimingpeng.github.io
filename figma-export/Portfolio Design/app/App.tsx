import { Terminal } from "./components/Terminal";
import { Navigation } from "./components/Navigation";
import { ChatWidget } from "./components/ChatWidget";
import { ThemeProvider } from "next-themes";

export default function App() {
  const projects = [
    {
      impact: "Processed 500k events/sec with 99.99% uptime.",
      title: "Real-time Event Streaming Platform",
      description: "Architected a low-latency ingestion engine to centralize analytics events across 50+ microservices.",
      techStack: "Kafka · Flink · Kubernetes",
      link: "#",
    },
    {
      impact: "Reduced data warehousing costs by 45%.",
      title: "Lakehouse Storage Optimization",
      description: "Implemented automated data tiering and dynamic partition pruning for petabyte-scale analytical workloads.",
      techStack: "Snowflake · dbt · Airflow",
      link: "#",
    },
    {
      impact: "Accelerated model training from days to hours.",
      title: "ML Feature Store Infrastructure",
      description: "Built a declarative feature engineering platform providing point-in-time correctness for the data science team.",
      techStack: "Spark · Redis · Python",
      link: "#",
    },
    {
      impact: "Open-source contribution used by 10k+ teams.",
      title: "Airflow Dynamic Task Mapping",
      description: "Core contributor to Apache Airflow's dynamic task mapping execution model, enabling flexible parallel processing.",
      techStack: "Python · Apache Airflow",
      link: "#",
    },
  ];

  const experience = [
    {
      company: "Stripe",
      role: "Senior Data Engineer",
      period: "2022 — Present",
    },
    {
      company: "Robinhood",
      role: "Data Engineer II",
      period: "2019 — 2022",
    },
    {
      company: "IBM",
      role: "Software Engineer",
      period: "2017 — 2019",
    },
  ];

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div 
        className="min-h-screen bg-white dark:bg-[#1e1e2e] text-gray-900 dark:text-[#cdd6f4] pb-20 selection:bg-blue-600 dark:selection:bg-[#89b4fa] selection:text-white dark:selection:text-[#1e1e2e] transition-colors duration-300"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <Navigation />
        <main className="max-w-[760px] mx-auto px-6 pt-24 md:pt-32 space-y-20">
          
          {/* Hero Section */}
          <section id="about" className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-[2.5rem] leading-tight font-bold text-gray-900 dark:text-[#cdd6f4]">Yiming Peng /i' miŋ/</h1>
              <p className="text-gray-500 dark:text-[#a6adc8] text-lg">Senior Data Engineer · PhD · Apache Airflow Contributor</p>
            </div>
            
            <p className="text-gray-800 dark:text-[#bac2de] text-xl leading-relaxed max-w-[600px]">
              I build data platforms that power decisions at scale.
            </p>
            
            <ul className="space-y-3 text-gray-600 dark:text-[#a6adc8]">
              <li className="flex gap-3"><span className="text-blue-600 dark:text-[#89b4fa]">→</span> Scaling stream processing pipelines handling 10B+ events daily.</li>
              <li className="flex gap-3"><span className="text-blue-600 dark:text-[#89b4fa]">→</span> Optimizing distributed storage systems for sub-second query latency.</li>
              <li className="flex gap-3"><span className="text-blue-600 dark:text-[#89b4fa]">→</span> Architecting self-serve data infrastructure for ML teams.</li>
            </ul>

            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6">
              <a href="#" className="text-blue-600 dark:text-[#89b4fa] hover:underline">GitHub</a>
              <a href="#" className="text-blue-600 dark:text-[#89b4fa] hover:underline">LinkedIn</a>
              <a href="#" className="text-blue-600 dark:text-[#89b4fa] hover:underline">Twitter</a>
              <a href="#" className="text-blue-600 dark:text-[#89b4fa] hover:underline">Substack</a>
              <a href="#" className="text-blue-600 dark:text-[#89b4fa] hover:underline">Scholar</a>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-[#cdd6f4] border-b border-gray-100 dark:border-[#313244] pb-2">Experience</h2>
            <div className="space-y-4">
              {experience.map((job, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-semibold text-gray-800 dark:text-[#cdd6f4]">{job.company}</span>
                    <span className="text-gray-400 dark:text-[#6c7086] hidden sm:inline">—</span>
                    <span className="text-gray-600 dark:text-[#bac2de]">{job.role}</span>
                  </div>
                  <span className="text-gray-400 dark:text-[#a6adc8] text-sm mt-1 sm:mt-0">{job.period}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-[#cdd6f4] border-b border-gray-100 dark:border-[#313244] pb-2">Selected Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <a 
                  key={idx} 
                  href={project.link}
                  className="group flex flex-col p-6 border border-gray-200 dark:border-[#313244] hover:border-blue-600 dark:hover:border-[#89b4fa] rounded-xl bg-white dark:bg-[#181825] transition-colors h-full"
                >
                  <div className="flex-1 space-y-4">
                    <p className="font-bold text-gray-900 dark:text-[#cdd6f4]">{project.impact}</p>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-[#bac2de]">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-[#a6adc8] leading-relaxed mt-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between items-end">
                    <span className="text-xs text-gray-500 dark:text-[#6c7086] font-mono tracking-wide">{project.techStack}</span>
                    <span className="text-blue-600 dark:text-[#89b4fa] font-sans leading-none text-lg">→</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Interactive Terminal Section */}
          <section className="space-y-6 pt-4">
            <Terminal />
          </section>

          {/* Contact Section */}
          <section id="writing" className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-[#cdd6f4] border-b border-gray-100 dark:border-[#313244] pb-2">Contact</h2>
            <p className="text-gray-600 dark:text-[#bac2de]">
              Open for consulting and full-time opportunities. Reach out via email or schedule a call.
            </p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6">
              <a href="mailto:hello@example.com" className="text-blue-600 dark:text-[#89b4fa] hover:underline">
                hello@example.com
              </a>
              <a href="#" className="text-blue-600 dark:text-[#89b4fa] hover:underline">
                View Resume .pdf
              </a>
            </div>
          </section>

        </main>
        <ChatWidget />
      </div>
    </ThemeProvider>
  );
}
