import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 1. 앱이 처음 켜질 때 localStorage에서 기존 데이터를 불러옵니다.
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todo-list');
    // 저장된 데이터가 있으면 불러오고, 없으면 빈 배열([])을 사용합니다.
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState('');

  // 2. todos 배열이 변경될 때마다 localStorage에 문자열로 변환하여 덮어씌웁니다.
  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todos));
  }, [todos]); // 의존성 배열에 todos를 넣어서, todos가 바뀔 때만 실행되게 합니다.

  // 할 일 추가 (Create)
  const handleAdd = () => {
    if (!inputValue.trim()) return;
    setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue('');
  };

  // 완료 여부 체크 (Update)
  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 할 일 삭제 (Delete)
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="header">Task Dashboard</h1>

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
  );
}

export default App;