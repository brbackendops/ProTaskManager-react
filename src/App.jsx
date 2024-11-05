import { useState , useEffect } from 'react';
import { CheckCircle2, Circle, PlusCircle, Tag, Trash2 } from 'lucide-react';
import './App.css'

const options = [
  'Personal',
  'Work',
  'Shopping'
]

function App() {

  const [ todos , setTodos ] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input,setInput] = useState('');
  const [category,setCategory] = useState('personal');
  const [filter,setFilter] = useState('all');

  const addTodo = (e) => {
    e.preventDefault();
    
    if (input.trim()) {
      setTodos([
        ...todos,
        {
          id: crypto.randomUUID(),
          text: input.trim(),
          completed: false,
          category
        }        
      ])
    };

    setInput('');
  }
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  })

  const toggleTodo = (todoId) => {
    setTodos(
      todos.map((todo) => 
        todo.id == todoId ? {...todo, completed: !todo.completed} : todo
      )
    )
  }

  const dltTodo = (todoId) => {
    setTodos(
      todos.filter((todo) => todo.id != todoId)
    )
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])

  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-6'>
      <div className='max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden'>
        <div className='px-6 py-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-8 text-center'>
            Task Manager Pro
          </h1>

          <form onSubmit={addTodo} className='mb-6'>

            <div className='w-full flex gap-2 mb-4'>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='What needs to be done?'
                className='flex-1 px-4 py-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='px-4 py-2 border border--gray-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-indigo-500'
              >
                {
                  options.map((option,index) => (
                    <option 
                      value={option} 
                      key={index}
                      className='p-2'
                    >{option}</option>
                  ))
                }
              </select>
            </div>

            <button
              type='submit'
              className='w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2'
            >
              <PlusCircle size={20}/>
              Add Task
            </button>
          </form>

          <div className='flex gap-2 mb-4'>
            {
                ['all','active','completed'].map((option,index) => (
                  <button
                    onClick={() => setFilter(option)}
                    key={index}
                    className={
                      `
                      px-4 py-2 rounded-lg capitalize ${
                        filter == option ? 'bg-indigo-800 text-white': 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                      
                      `
                    }
                  >
                    {option}
                  </button>
                ))            
            }
          </div>

          <div className='space-y-4'>
            { filteredTodos.length > 0 ? filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={
                  `
                    flex items-center gap-3 p-4 rounded-lg transition-all
                    ${todo.completed ? 'bg-gray-50': 'bg-white'}
                    border border-gray-200 hover:shadow-md
                  
                  `
                }
              >
              <button
                onClick={() => toggleTodo(todo.id)}
                className='text-indigo-600 hover:text-indigo-700'
              >
              {
                todo.completed ? (
                  <CheckCircle2 size={20}/>
                ) : (
                  <Circle size={20}/>
                ) 
              }
              </button>

              <span
                className={`flex-1 ${ todo.completed ? 'line-through text-gray-500': 'text-gray-700' }`}
              >
                {todo.text}
              </span>
              
              <span className='flex text-gray-500 items-center gap-1 text-sm '>
                <Tag size={16}/>
                {todo.category}
              </span>
              <button
                onClick={() => dltTodo(todo.id)}
                className='text-red-500 hover:text-red-600 hover:animate-bounce'

              >
                <Trash2 size={20}/>
              </button>
              </div>
            )): <p className='text-center text-gray-500 py-4'>No tasks found, Add some!</p>}

            
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
