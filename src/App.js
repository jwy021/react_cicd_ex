import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 달력 기본 CSS
import './App.css';

function App() {
  // 달력 날짜 상태
  const [date, setDate] = useState(new Date());

  // 할 일 상태 (localStorage 연동)
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todo-list');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!inputValue.trim()) return;
    setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue('');
  };

  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container">
      <div className="dashboard-card">
        <h1 className="header">Task & Schedule Dashboard</h1>

        <div className="dashboard-content">
          {/* 왼쪽: 달력 영역 */}
          <div className="calendar-section">
            <Calendar
              onChange={setDate}
              value={date}
              formatDay={(locale, date) => date.toLocaleString("en", { day: "numeric" })} // '일' 글자 제거
            />
            <div className="date-display">
              선택된 날짜: {date.toLocaleDateString()}
            </div>
          </div>

          {/* 오른쪽: 투두리스트 영역 */}
          <div className="todo-section">
            <div className="input-container">
              <input
                type="text"
                className="input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                placeholder="새로운 작업을 입력하세요..."
              />
              <button className="add-button" onClick={handleAdd}>
                추가
              </button>
            </div>

            <ul className="list">
              {todos.length === 0 ? (
                <li className="empty-message">등록된 작업이 없습니다.</li>
              ) : (
                todos.map(todo => (
                  <li key={todo.id} className="list-item">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo.id)}
                      style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                    />
                    <span
                      onClick={() => handleToggle(todo.id)}
                      className={`todo-text ${todo.completed ? 'completed' : ''}`}
                    >
                      {todo.text}
                    </span>
                    <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
                      삭제
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;