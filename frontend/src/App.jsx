import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  const [company, setCompany] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');
  const [question, setQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const API = 'https://saylani-hcm-l-ite-hackathon.vercel.app/api';
  useEffect(() => {
    fetchCompany();
    fetchEmployees();
  }, []);
  const fetchCompany = async () => {
    try {
      const res = await axios.get(`${API}/company`);
      if (res.data && res.data.companyName) setCompany(res.data);
    } catch (err) { console.log(err); }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API}/employees`);
      setEmployees(res.data);
    } catch (err) { console.log(err); }
  };

  const handleSetupCompany = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/company/setup`, { companyName, workingHours, adminEmail });
      setCompany(res.data.company);
      alert('Company Setup Successful!');
    } catch (err) { alert(err.response?.data?.error || 'Error'); }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/employees`, { name, email, department, role, salary });
      alert('Employee Registered Successfully!');
      setName(''); setEmail(''); setDepartment(''); setRole(''); setSalary('');
      fetchEmployees();
    } catch (err) { alert(err.response?.data?.error || 'Error'); }
  };
  const askAI = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/ai/query`, { question });
      setAiAnswer(res.data.answer);
    } catch (err) { alert('AI Error'); }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '900px', margin: 'auto' }}>
      <h1>HCM Lite - Saylani Hackathon</h1>
      <div style={{ background: '#f4f4f4', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
        <h2>1. Company Setup (Zero-State)</h2>
        {company ? (
          <p>Registered Company: <b>{company.companyName}</b> | Hours: {company.workingHours} | Admin: {company.adminEmail}</p>
        ) : (
          <form onSubmit={handleSetupCompany}>
            <input placeholder="Company Name" value={companyName} onChange={e => setCompanyName(e.target.value)} required style={{marginRight: '10px'}} />
            <input placeholder="Working Hours (e.g. 9-5)" value={workingHours} onChange={e => setWorkingHours(e.target.value)} required style={{marginRight: '10px'}} />
            <input placeholder="Admin Email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} required style={{marginRight: '10px'}} />
            <button type="submit">Setup Company</button>
          </form>
        )}
      </div>
      <div style={{ background: '#f4f4f4', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>
        <h2>2. Register Employee (HR Portal)</h2>
        <form onSubmit={handleAddEmployee} style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} required />
          <input placeholder="Role" value={role} onChange={e => setRole(e.target.value)} required />
          <input type="number" placeholder="Salary" value={salary} onChange={e => setSalary(e.target.value)} required />
          <button type="submit" style={{ gridColumn: 'span 2' }}>Add Employee</button>
        </form>
        <h3>Total Registered Employees: {employees.length}</h3>
      </div>
      <div style={{ background: '#e2e8f0', padding: '15px', borderRadius: '5px' }}>
        <h2>3. AI Live Data Assistant</h2>
        <form onSubmit={askAI}>
          <input placeholder="Ask e.g. How many employees are registered?" value={question} onChange={e => setQuestion(e.target.value)} style={{ width: '70%', marginRight: '10px', padding: '8px' }} required />
          <button type="submit" style={{ padding: '8px 15px' }}>Ask AI</button>
        </form>
        {aiAnswer && <p style={{ background: '#fff', padding: '10px', marginTop: '10px', borderRadius: '4px' }}><b>AI Answer:</b> {aiAnswer}</p>}
      </div>
    </div>
  );
}

export default App;
