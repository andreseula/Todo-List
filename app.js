
//SELECTOR
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos );
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//FUNTIONS
function addTodo(event){
	event.preventDefault();
	//TODOLIST
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//LI
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	//ADD LOCALSTORAGE
	saveLocalTodos(todoInput.value);
	//CHECK MARK BUTTON
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add("completed-btn");
	todoDiv.appendChild(completedButton);
	//DELETE BUTTON
	const deletedButton = document.createElement('button');
	deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
	deletedButton.classList.add("deleted-btn");
	todoDiv.appendChild(deletedButton);
	//APPEND TO LIST
	todoList.appendChild(todoDiv);
	//CLEAR INPUT
	todoInput.value="";

}

function deleteCheck(e){
	const item = e.target;
	//DELETE
	if(item.classList[0] === 'deleted-btn'){
		const todo = item.parentElement;
		todo.classList.add("fall");
		removeLocalTodo(todo);
		todo.addEventListener('transitionend', function(){
			todo.remove();
		});
		
	}
	//CHECK MARK
	if(item.classList[0]=== "completed-btn"){
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

function filterTodo(e){
	const todos = todoList.childNodes;
	todos.forEach(function(todo){
		switch(e.target.value){
			case "all":
				todo.style.display ='flex';
			break
			case "completed":
				if(todo.classList.contains('completed')){
					todo.style.display = 'flex';
				}
				else{
					todo.style.display="none";
				}
			break
			case "uncompleted":
				if(!todo.classList.contains('completed')){
					todo.style.display = 'flex';
				}
				else{
					todo.style.display="none";
				}
			break
		}	
	});
}

//SCOOBY DOO  ARE YOY THERE???
function saveLocalTodos(todo){
	let todos;
	if(localStorage.getItem('todos')===null){
		todos = [];
	}
	else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

//SHOW LOCALSTORAGE
function getTodos(){
	let todos;
	if(localStorage.getItem('todos')===null){
		todos = [];
	}
	else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.forEach(function(todo){
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		
		//LI
		const newTodo = document.createElement('li');
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);

		//CHECK MARK BUTTON
		const completedButton = document.createElement('button');
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		completedButton.classList.add("completed-btn");
		todoDiv.appendChild(completedButton);
		
		//DELETE BUTTON
		const deletedButton = document.createElement('button');
		deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
		deletedButton.classList.add("deleted-btn");
		todoDiv.appendChild(deletedButton);
		//APPEND TO LIST
		todoList.appendChild(todoDiv);
	});
}
//DELET FROM LOCALSTORAGE
function removeLocalTodo(todo){
	let todos;
	if(localStorage.getItem('todos')===null){
		todos = [];
	}
	else{
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex),1)
	localStorage.setItem('todos', JSON.stringify(todos));
} 