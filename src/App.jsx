import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const [apis, setApis] = useState(() => {
    const savedApis = localStorage.getItem("apiPulseApis");
    return savedApis
      ? JSON.parse(savedApis)
      : [
          {
            id: 1,
            name: "GitHub API",
            url: "https://api.github.com",
            status: "Not checked",
            responseTime: null,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("apiPulseApis", JSON.stringify(apis));
  }, [apis]);

  function addApi(event) {
    event.preventDefault();

    if (!name || !url) {
      return;
    }

    const newApi = {
      id: Date.now(),
      name,
      url,
      status: "Not checked",
      responseTime: null,
    };

    setApis([...apis, newApi]);

    setName("");
    setUrl("");
  }

  async function checkApi(id) {
    const api = apis.find((item) => item.id === id);

    if (!api) {
      return;
    }

    setApis((currentApis) =>
      currentApis.map((item) =>
        item.id === id ? { ...item, status: "Checking..." } : item,
      ),
    );

    const start = performance.now();

    try {
      const response = await fetch(api.url);
      const end = performance.now();

      setApis((currentApis) =>
        currentApis.map((item) =>
          item.id === id
            ? {
                ...item,
                status: response.ok
                  ? `Online — HTTP ${response.status}`
                  : `Error — HTTP ${response.status}`,
                responseTime: Math.round(end - start),
              }
            : item,
        ),
      );
    } catch (error) {
      setApis((currentApis) =>
        currentApis.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "Offline",
                responseTime: null,
              }
            : item,
        ),
      );
    }
  }

  function removeApi(id) {
    setApis(apis.filter((api) => api.id !== id));
  }

  return (
    <main>
      <header>
        <h1>API Pulse</h1>
        <p className="subtitle">Test and monitor API health</p>
      </header>

      <section className="api-card add-api">
        <h2>Add an API</h2>

        <form onSubmit={addApi}>
          <label htmlFor="api-name">API Name</label>

          <input
            id="api-name"
            type="text"
            placeholder="e.g. Vibe API"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="api-url">API Endpoint</label>

          <input
            id="api-url"
            type="url"
            placeholder="https://api.example.com/health"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />

          <button type="submit">Add API</button>
        </form>
      </section>

      <section className="dashboard">
        <h2>Your APIs</h2>

        {apis.map((api) => (
          <div className="api-card" key={api.id}>
            <div className="api-header">
              <div>
                <h3>{api.name}</h3>
                <p className="endpoint">{api.url}</p>
              </div>

              <span
                className={`status ${api.status.startsWith("Online") ? "online" : api.status === "Offline" ? "offline" : "checking"}`}
              >
                {api.status}
              </span>
            </div>

            <div className="api-details">
              <p>
                <strong>Status:</strong> {api.status}
              </p>

              <p>
                <strong>Response time:</strong>{" "}
                {api.responseTime !== null ? `${api.responseTime} ms` : "—"}
              </p>
            </div>

            <div className="actions">
              <button onClick={() => checkApi(api.id)}>Check API</button>

              <button
                className="delete-button"
                onClick={() => removeApi(api.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
s;
