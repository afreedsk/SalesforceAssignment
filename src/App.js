import React, { useEffect, useState } from "react";
import "./App.css";

const CLIENT_ID = "3MVG9rZjd7MXFdLjT2mmpNSaEdqBwcCptioNbACELYrmeI85QfFOauwlk9Z1xDPrwTA.CT57s79oz9DfyhOs6"; 
const REDIRECT_URI = "https://stunning-pie-ae7c2f.netlify.app";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [instanceUrl, setInstanceUrl] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  // 🔹 Extract token
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", ""));
      setAccessToken(params.get("access_token"));
      setInstanceUrl(params.get("instance_url"));
      window.history.replaceState(null, null, " ");
    }
  }, []);

  // 🔹 Login
  const loginWithSalesforce = () => {
    const url =
      `https://login.salesforce.com/services/oauth2/authorize` +
      `?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = url;
  };

  // 🔹 Logout
  const logout = () => {
    setAccessToken("");
    setAccounts([]);
    setRules([]);
  };

  // 🔹 Fetch Accounts
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${instanceUrl}/services/data/v59.0/query/?q=SELECT Id, Name FROM Account LIMIT 20`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await res.json();
      setAccounts(data.records || []);
    } catch {
      alert("Error fetching accounts");
    }
    setLoading(false);
  };

  // 🔹 Fetch Validation Rules
  const fetchValidationRules = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${instanceUrl}/services/data/v59.0/tooling/query/?q=SELECT Id, ValidationName, Active FROM ValidationRule WHERE EntityDefinition.QualifiedApiName='Account'`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await res.json();
      setRules(data.records || []);
    } catch {
      alert("Error fetching rules");
    }
    setLoading(false);
  };

  // 🔹 Toggle Rule (UI level)
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

    setTimeout(() => {
      setLoading(false);
      setMessage("✅ Changes deployed successfully!");
    }, 2000);
  };

  // 🔍 Filter
  const filteredRules = rules.filter((r) =>
    r.ValidationName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>🚀 Salesforce Dashboard</h1>

      {!accessToken ? (
        <button className="btn primary" onClick={loginWithSalesforce}>
          Login with Salesforce
        </button>
      ) : (
        <>
          <div className="toolbar">
            <button className="btn" onClick={fetchAccounts}>Accounts</button>
            <button className="btn" onClick={fetchValidationRules}>Validation Rules</button>
            <button className="btn success" onClick={deployChanges}>Deploy</button>
            <button className="btn danger" onClick={logout}>Logout</button>
          </div>

          {loading && <div className="loader"></div>}
          {message && <p className="message">{message}</p>}

          {/* 🔹 Accounts */}
          <div className="card">
            <h2>Accounts</h2>
            <div className="grid">
              {accounts.map((acc) => (
                <div key={acc.Id} className="card-item">
                  {acc.Name}
                </div>
              ))}
            </div>
          </div>

          {/* 🔍 Search */}
          <input
            type="text"
            placeholder="Search validation rules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search"
          />

          {/* 🔹 Validation Rules */}
          <div className="card">
            <h2>Validation Rules</h2>
            <div className="grid">
              {filteredRules.map((r) => (
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
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;