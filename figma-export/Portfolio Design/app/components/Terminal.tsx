import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";

interface CommandRecord {
  cmd: string;
  output: React.ReactNode;
}

export function Terminal() {
  const { resolvedTheme } = useTheme();
  
  const [history, setHistory] = useState<CommandRecord[]>([
    {
      cmd: "",
      output: (
        <span className="text-gray-400">
          Welcome to yiming's environment. Type 'help' to see available commands.
        </span>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = input.trim().toLowerCase();
      let output: React.ReactNode = "";

      switch (trimmed) {
        case "help":
          output = (
            <div className="flex flex-col space-y-1 text-gray-300">
              <span><strong className="text-white font-normal">about</strong>   - View my background</span>
              <span><strong className="text-white font-normal">skills</strong>  - List technical stack</span>
              <span><strong className="text-white font-normal">clear</strong>   - Clear terminal output</span>
              <span><strong className="text-white font-normal">contact</strong> - Display contact info</span>
            </div>
          );
          break;
        case "about":
          output = "Senior Data Engineer and PhD with a focus on large-scale distributed systems. Active contributor to Apache Airflow. Passionate about building robust platforms that process billions of events.";
          break;
        case "skills":
          output = "Python, Scala, SQL, Apache Airflow, Kafka, Spark, Flink, Snowflake, Kubernetes, AWS, Terraform.";
          break;
        case "contact":
          output = (
            <div>
              Email: <a href="mailto:yiming@example.com" className="text-blue-400 hover:underline">yiming@example.com</a><br/>
              GitHub: <a href="https://github.com/example" className="text-blue-400 hover:underline">github.com/example</a>
            </div>
          );
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "":
          output = "";
          break;
        default:
          output = <span className="text-red-400">bash: {trimmed}: command not found</span>;
      }

      setHistory((prev) => [...prev, { cmd: input, output }]);
      setInput("");
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className={`w-full max-w-[760px] mx-auto rounded-xl overflow-hidden ${resolvedTheme === 'dark' ? 'shadow-xl shadow-black/40 border border-[#313244]' : 'shadow-xl shadow-gray-200/50 border border-gray-200'}`}>
      {/* macOS Window Chrome */}
      <div className="bg-[#2a2a3b] px-4 py-3 flex items-center relative border-b border-[#1e1e2e]">
        <div className="flex space-x-2 absolute left-4">
          <div className="w-3 h-3 bg-[#ff5f56] rounded-full border border-[#e0443e]"></div>
          <div className="w-3 h-3 bg-[#ffbd2e] rounded-full border border-[#dea123]"></div>
          <div className="w-3 h-3 bg-[#27c93f] rounded-full border border-[#1aab29]"></div>
        </div>
        <div className="flex-1 text-center text-gray-400 text-xs font-semibold font-sans tracking-wide">
          yiming — bash
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        className="bg-[#1e1e2e] p-4 min-h-[300px] max-h-[400px] overflow-y-auto text-sm text-gray-300 font-mono"
        ref={containerRef}
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className="mb-2">
            {item.cmd !== undefined && item.cmd !== "" && (
              <div className="flex items-start space-x-2 text-gray-300 break-all">
                <span className="text-[#4ade80] font-semibold whitespace-nowrap">yiming@portfolio:~$</span>
                <span className="text-white">{item.cmd}</span>
              </div>
            )}
            {/* For the first empty command (welcome message) */}
            {item.cmd === "" && i === 0 && (
               <div className="text-gray-400 mt-1 mb-4">{item.output}</div>
            )}
            {item.cmd !== "" && item.output && (
              <div className="text-gray-300 mt-1 mb-3">{item.output}</div>
            )}
          </div>
        ))}
        
        <div className="flex items-center space-x-2 text-gray-300 group mt-2">
          <span className="text-[#4ade80] font-semibold whitespace-nowrap">yiming@portfolio:~$</span>
          <div className="relative flex-1 flex items-center">
            {/* Fake block cursor implementation for exact terminal feel */}
            <span className="absolute left-0 pointer-events-none text-white whitespace-pre">
              {input}<span className="inline-block w-[8px] h-[15px] bg-gray-400 animate-pulse align-middle ml-[1px]"></span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none flex-1 text-transparent caret-transparent w-full"
              autoComplete="off"
              spellCheck="false"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
