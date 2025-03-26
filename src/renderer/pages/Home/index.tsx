import React, { useEffect, useState } from "react";
import "./index.less";
import useElectron from "../../hooks/useElectron";

const Home: React.FC = () => {
  const { getVersion } = useElectron();
  const [version, setVersion] = useState<string>("");

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        console.log("Component: Fetching version...");
        const v = await getVersion();
        console.log("Component: Version received:", v);
        setVersion(v || "未知版本");
      } catch (error) {
        console.error("Component: Error fetching version:", error);
        setVersion("Error");
      }
    };

    fetchVersion();
  }, [getVersion]);

  return (
    <div className="home">
      <header className="home-header">
        <h1>Resume Miner {version}</h1>
        <p className="subtitle">AI-Powered Resume Analysis Tool</p>
      </header>

      <main className="home-main">
        <div className="upload-section">
          <button className="upload-button">Upload Resume</button>
          <p className="upload-hint">
            Drag & drop your resume here or click to browse
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
