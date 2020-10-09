var todoList = []
var currentTime = function(){
    var tm = new Date().toLocaleDateString()
    return tm
}
var toggleClass = function(element,className){
    if(element.classList.contains(className)){
        element.classList.remove(className)
    }else{
        element.classList.add(className)
    }
}
var indexOfElement = function(element){
    var cell = element.parentElement
    console.log(cell.children)
    for(var i =0;i<cell.children.length;i++){
        if (cell.children[i]===element){
            console.log(i)
            return i
        }
    }
}
var bindEventAdd = function(){
    var addBottom = document.querySelector(".addBtn").addEventListener("click",function(){
        var task = document.querySelector(".input").value
        console.log(task)
        if(task ===""){
            alert("禁止为空")
        }else{
            var todo={
                'task' : task,
                'time' : '——time is'+currentTime()
            }
            todoList.push(todo)
            console.log(todoList)
            insertTodo(todo)

        }
    })
    
}
var bindEventButton =function(){
    var todoContainer = document.querySelector(".todoContainer")
    todoContainer.addEventListener("click",function(event){
        var target = event.target
        console.log(target)
        if(target.classList.contains("todo-done")){
            var cell = target.parentElement
            toggleClass(cell,"done")
        }else if(target.classList.contains("todo-edit")){
            var cell = target.parentElement
            var position = cell.children[0]
            position.setAttribute("contenteditable",'true')
        }else if(target.classList.contains("todo-delete")){
            var cell = target.parentElement
            var index = indexOfElement(target.parentElement)
            cell.remove()
            todoList.splice(index,1)
            
        }
    })
}
var bindEventBlur = function(){
    var todoBlur = document.querySelector('.todoContainer')
    todoBlur.addEventListener('blur',function(event){
        var target = event.target
        console.log(target)
        if(target.classList.contains('todo-label')){
            target.setAttribute("contenteditable",'false')
        }
    },true)
}
var insertTodo = function(todo){
    var todoContainer = document.querySelector(".todoContainer")
    console.log(todoContainer)
    var t = templateTodo(todo)
    todoContainer.insertAdjacentHTML('beforeend',t)
}


var templateTodo = function(todo){
    var t =`
    <div class='todo-cell'>
    <span class='todo-label' contenteditable='false'>${todo.task}</span>
    <span class='todo-date-time'>${todo.time}</span>
    <button class='todo-done'>完成</button>
    <button class='todo-edit'>编辑</button>
    <button class='todo-delete'>删除</button>

</div>
    `
    return t
} 
bindEventAdd()
bindEventButton()
bindEventBlur()