import React, { useEffect, useState } from "react";
import "./App.css";

const CLIENT_ID = "3MVG9rZjd7MXFdLjT2mmpNSaEdqBwcCptioNbACELYrmeI85QfFOauwlk9Z1xDPrwTA.CT57s79oz9DfyhOs6"; 
const REDIRECT_URI = "https://stunning-pie-ae7c2f.netlify.app";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [instanceUrl, setInstanceUrl] = useState("");
  const [environment, setEnvironment] = useState("production"); 
  const [accounts, setAccounts] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // 🔹 Extract token from URL hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", ""));
      setAccessToken(params.get("access_token"));
      setInstanceUrl(params.get("instance_url"));
      window.history.replaceState(null, null, " ");
    }
  }, []);

  // 🔹 Get correct login URL based on environment
  const getLoginUrl = () => {
    return environment === "sandbox"
      ? "https://test.salesforce.com"
      : "https://login.salesforce.com";
  };

  // 🔹 Login with Salesforce
  const loginWithSalesforce = () => {
    setError("");
    const baseUrl = getLoginUrl();
    const url =
      `${baseUrl}/services/oauth2/authorize` +
      `?response_type=token` +
      `&client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=api`;

    window.location.href = url;
  };

  // 🔹 Logout
  const logout = () => {
    setAccessToken("");
    setAccounts([]);
    setRules([]);
    setMessage("");
    setError("");
  };

  // 🔹 Fetch Accounts
  const fetchAccounts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${instanceUrl}/services/data/v59.0/query/?q=SELECT Id, Name FROM Account LIMIT 20`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await res.json();
      if (data.records) setAccounts(data.records);
      else throw new Error("No data");
    } catch (err) {
      setError("Failed to fetch accounts. Please try again.");
    }
    setLoading(false);
  };

  // 🔹 Fetch Validation Rules (Tooling API)
  const fetchValidationRules = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${instanceUrl}/services/data/v59.0/tooling/query/?q=SELECT Id, ValidationName, Active FROM ValidationRule WHERE EntityDefinition.QualifiedApiName='Account'`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const data = await res.json();
      if (data.records) setRules(data.records);
      else throw new Error("No data");
    } catch (err) {
      setError("Failed to fetch validation rules. Please try again.");
    }
    setLoading(false);
  };

  // 🔹 Toggle Rule (UI only)
  const toggleRule = (id) => {
    setRules((prev) =>
      prev.map((r) =>
        r.Id === id ? { ...r, Active: !r.Active } : r
      )
    );
  };

  // 🔹 Deploy Simulation
  const deployChanges = () => {
    setLoading(true);
    setMessage("Deploying changes to Salesforce...");
    setError("");

    setTimeout(() => {
      setLoading(false);
      setMessage("✅ Changes deployed successfully!");
    }, 1800);
  };

  // 🔍 Filtered rules
  const filteredRules = rules.filter((r) =>
    r.ValidationName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>🚀 Salesforce Validation Rules Dashboard</h1>

      {/* Environment Toggle - Only show when NOT logged in */}
      {!accessToken && (
        <div className="env-toggle">
          <button
            className={`env-btn ${environment === "production" ? "active" : ""}`}
            onClick={() => setEnvironment("production")}
          >
            🌐 Production
          </button>
          <button
            className={`env-btn ${environment === "sandbox" ? "active" : ""}`}
            onClick={() => setEnvironment("sandbox")}
          >
            🧪 Sandbox
          </button>
        </div>
      )}

      {!accessToken ? (
        <button className="btn primary" onClick={loginWithSalesforce}>
          Login with Salesforce {environment === "sandbox" ? "(Sandbox)" : ""}
        </button>
      ) : (
        <>
          <div className="toolbar">
            <button className="btn" onClick={fetchAccounts}>Accounts</button>
            <button className="btn" onClick={fetchValidationRules}>Validation Rules</button>
            <button className="btn success" onClick={deployChanges}>Deploy Simulation</button>
            <button className="btn danger" onClick={logout}>Logout</button>
          </div>

          {/* Current Environment Badge */}
          <div className="env-badge">
            {environment === "sandbox" ? "🧪 Sandbox Mode" : "🌐 Production Mode"}
          </div>

          {loading && <div className="loader"></div>}
          {message && <p className="message">{message}</p>}
          {error && <p className="error">{error}</p>}

          {/* Accounts */}
          <div className="card">
            <h2>Accounts (Sample)</h2>
            <div className="grid">
              {accounts.length === 0 ? (
                <p style={{ color: "#777" }}>Click "Accounts" to load data</p>
              ) : (
                accounts.map((acc) => (
                  <div key={acc.Id} className="card-item">
                    {acc.Name}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search validation rules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search"
          />

          {/* Validation Rules */}
          <div className="card">
            <h2>Validation Rules on Account Object</h2>
            <div className="grid">
              {filteredRules.length === 0 ? (
                <p style={{ color: "#777" }}>No rules found or click "Validation Rules" to load</p>
              ) : (
                filteredRules.map((r) => (
                  <div key={r.Id} className="card-item">
                    <strong>{r.ValidationName}</strong>
                    <p>{r.Active ? "Active ✅" : "Inactive ❌"}</p>
                    <button
                      className="btn small"
                      onClick={() => toggleRule(r.Id)}
                    >
                      Toggle
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;