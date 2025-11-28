// src/pages/UsersReport.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const api = {
  list: (q, role, page, perPage) => {
    const params = new URLSearchParams();
    if (q) params.append("q", q);
    if (role && role !== "all") params.append("role", role);
    if (page) params.append("page", page);
    if (perPage) params.append("perPage", perPage);
    return `/api/admin/users?${params.toString()}`;
  },
  patch: (id) => `/api/admin/users/${id}`,
  del: (id) => `/api/admin/users/${id}`,
  activity: (id) => `/api/admin/activity/${id}`,
  loginHistory: (id) => `/api/admin/login-history/${id}`,
};

// Modal details same as before
function UserDetailsModal({ user, onClose }) {
  const [loginHistory, setLoginHistory] = useState([]);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const [lhRes, actRes] = await Promise.all([
          fetch(api.loginHistory(user._id)),
          fetch(api.activity(user._id)),
        ]);
        const lh = lhRes.ok ? await lhRes.json() : { history: [] };
        const act = actRes.ok ? await actRes.json() : null;
        if (!cancelled) {
          setLoginHistory(lh.history || []);
          setActivity(act || null);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setLoginHistory([]);
          setActivity(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [user]);

  if (!user) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalBoxStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 style={{ margin: 0 }}>{user.name}</h4>
          <button className="btn btn-sm btn-light" onClick={onClose}>Close</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
          <div>
            <h6>Login History</h6>
            <div style={{ maxHeight: 220, overflow: "auto" }}>
              {loading ? <div>Loading...</div> : (
                loginHistory.length === 0 ? <div>No records</div> :
                <ul style={{ paddingLeft: 16 }}>
                  {loginHistory.map((it, idx) => (
                    <li key={idx}>{new Date(it.ts).toLocaleString()} — {it.ip || "—"}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <h6>Activity</h6>
            {loading ? <div>Loading...</div> : activity ? (
              <div style={{ fontSize: 14 }}>
                <div><strong>Top pages:</strong> {(activity.topPages || []).slice(0,5).join(", ") || "-"}</div>
                <div><strong>Avg session:</strong> {activity.avgSessionSeconds ? Math.round(activity.avgSessionSeconds) + "s" : "-"}</div>
              </div>
            ) : <div>No activity data</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal styles
const modalOverlayStyle = {
  position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
  background: "rgba(0,0,0,0.35)", zIndex: 2000
};
const modalBoxStyle = {
  width: "min(900px, 96%)", background: "#fff", borderRadius: 10, padding: 16
};

export default function UsersReport() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const url = api.list(q, role, page, perPage);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users || []);
      setTotal(data.total || (data.users ? data.users.length : 0));
    } catch (err) {
      console.error(err);
      setUsers([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, role, page]);

  async function toggleDisable(u) {
    try {
      const res = await fetch(api.patch(u._id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disabled: !u.disabled }),
      });
      if (!res.ok) throw new Error("Failed to update");
      await load();
    } catch (err) {
      console.error(err);
      alert("Could not update user");
    }
  }

  async function changeRole(u) {
    const newRole = u.role === "trainer" ? "trainee" : "trainer";
    try {
      const res = await fetch(api.patch(u._id), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error("Failed to change role");
      await load();
    } catch (err) {
      console.error(err);
      alert("Could not change role");
    }
  }

  async function deleteUser(u) {
    if (!confirm(`Delete ${u.name}?`)) return;
    try {
      const res = await fetch(api.del(u._id), { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      await load();
    } catch (err) {
      console.error(err);
      alert("Could not delete user");
    }
  }

  // Data for Pie chart
  const chartData = [
    { name: "Trainers", value: users.filter(u => u.role === "trainer").length },
    { name: "Trainees", value: users.filter(u => u.role === "trainee").length },
    { name: "Disabled", value: users.filter(u => u.disabled).length },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 1100 }}>
        <div className="card rounded-3 shadow-sm">
          <div className="card-body">

            {/* --- إحصائيات المستخدمين --- */}
            <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
              <div className="p-2 border rounded" style={{ minWidth: 120, textAlign: "center" }}>
                <strong>Total Users</strong>
                <div>{total}</div>
              </div>
              <div className="p-2 border rounded" style={{ minWidth: 120, textAlign: "center" }}>
                <strong>Trainers</strong>
                <div>{users.filter(u => u.role === "trainer").length}</div>
              </div>
              <div className="p-2 border rounded" style={{ minWidth: 120, textAlign: "center" }}>
                <strong>Trainees</strong>
                <div>{users.filter(u => u.role === "trainee").length}</div>
              </div>

              {/* --- Pie chart --- */}
              <div style={{ width: 180, height: 180 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* --- بحث وفلتر --- */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <h4 style={{ margin: 0 }}>Users</h4>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  placeholder="Search name or email"
                  value={q}
                  onChange={(e) => { setQ(e.target.value); setPage(1); }}
                  style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ddd" }}
                />
                <select
                  value={role}
                  onChange={(e) => { setRole(e.target.value); setPage(1); }}
                  style={{ padding: 6, borderRadius: 6 }}
                >
                  <option value="all">All roles</option>
                  <option value="trainer">Trainer</option>
                  <option value="trainee">Trainee</option>
                </select>
              </div>
            </div>

            {/* --- الجدول --- */}
            <div style={{ marginTop: 14 }}>
              <div style={{ overflowX: "auto" }}>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th style={{ minWidth: 260 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={5}>Loading...</td></tr>
                    ) : users.length === 0 ? (
                      <tr><td colSpan={5}>No users</td></tr>
                    ) : users.map(u => (
                      <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>{u.disabled ? "Disabled" : "Active"}</td>
                        <td>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => setSelectedUser(u)}>View</button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => toggleDisable(u)}>{u.disabled ? "Enable" : "Disable"}</button>
                            <button className="btn btn-sm btn-outline-success" onClick={() => changeRole(u)}>{u.role === "trainer" ? "Set Trainee" : "Set Trainer"}</button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(u)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* --- Pagination --- */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <div>Showing {users.length} of {total}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-sm btn-light" onClick={() => setPage(p => Math.max(1, p-1))}>Prev</button>
                  <div style={{ padding: "6px 10px", border: "1px solid #eee", borderRadius: 6 }}>{page}</div>
                  <button className="btn btn-sm btn-light" onClick={() => setPage(p => p+1)}>Next</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {selectedUser && (
        <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
