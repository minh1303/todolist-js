import Project from "./Project";
import Todo from "./Todo";
class DOMStuff {
  static currentProject = {};
  static displayProjects() {
    const projects = Project.getProjects();
    const projectContainer = document.getElementById("projectcontainer");
    projectContainer.innerHTML = "";
    projects.forEach((project) => {
      const projectDisplay = document.createElement("div");
      projectDisplay.id = "projectdisplay";
      const div = document.createElement("div");
      const p = document.createElement("p");
      const button = document.createElement("button");
      button.innerText = "x";
      p.innerText = project.name;
      div.classList.add("project");
      div.appendChild(p);
      div.appendChild(button);
      button.addEventListener("click", () => {
        Project.removeProject(project);
        this.displayProjects();
      });
      p.addEventListener("click", () => {
        const todoSection = document.getElementById("todosection");
        todoSection.classList.remove("hidden");
        this.currentProject = new Project(project.name, project.id, project.todos);
        this.displayTodos();
      });
      projectDisplay.appendChild(div);
      projectContainer.appendChild(projectDisplay);
    });
  }

  static displayTodos() {
    const currentProjectname = document.getElementById("currentprojectname");
    currentProjectname.innerText = this.currentProject.name;
    const todosContainer = document.getElementById("todoscontainer");
    todosContainer.innerHTML = ""
    const todos = this.currentProject.todos;
    todos.forEach((todo) => {
      const display = document.createElement("div");
      display.classList.add("tododisplay");
      display.classList.add(`piority-${todo.piority}`)
      const title = document.createElement("p");
      title.classList.add("todotitle")
      title.innerText = todo.title;
      const description = document.createElement("p");
      description.classList.add("tododescription")

      description.innerText = todo.description;
      display.appendChild(title);
      display.appendChild(description);
      todosContainer.appendChild(display);
    });
  }

  static todoFormEventsAdding() {
    const todoForm = document.getElementById("addingTodoForm");

    const todoName = document.getElementById("todoname");

    const todoDescription = document.getElementById("tododescription");

    const todoDueDate = document.getElementById("tododuedate");

    const todoPiority = document.getElementById("todopiority");

    const addTodoButton = document.getElementById("addtodobutton");
    const saveTodoButton = document.getElementById("savetodobutton");
    const cancelTodoButton = document.getElementById("canceltodobutton");

    addTodoButton.addEventListener("click", () => {
      todoForm.classList.remove("hidden");
      addTodoButton.classList.add("hidden");
    });

    saveTodoButton.addEventListener("click", (e) => {
      e.preventDefault();
      todoForm.classList.add("hidden");
      const newTodo = new Todo(todoName.value, todoDescription.value, todoDueDate.value, todoPiority.value);
      this.currentProject.addTodo(newTodo);
      Project.updateProject(this.currentProject)
      this.displayTodos()
      addTodoButton.classList.remove("hidden");

    });

    cancelTodoButton.addEventListener("click", (e) => {
      e.preventDefault();
      addTodoButton.classList.remove("hidden");
      todoForm.classList.add("hidden");
    });
  }

  /////////

  static projectFormEventsAdding() {
    const addProjectButton = document.getElementById("addprojectbutton");
    const saveProjectButton = document.getElementById("saveprojectbutton");
    const cancelProjectButton = document.getElementById("cancelprojectbutton");
    const projectForm = document.getElementById("addingProjectForm");

    const nameInput = document.getElementById("name");

    addProjectButton.addEventListener("click", () => {
      projectForm.classList.remove("hidden");
      addProjectButton.classList.add("hidden");
    });

    saveProjectButton.addEventListener("click", (e) => {
      e.preventDefault();
      projectForm.classList.add("hidden");
      const newProject = new Project(nameInput.value);
      Project.addProject(newProject);
      addProjectButton.classList.remove("hidden");

      this.displayProjects();
    });

    cancelProjectButton.addEventListener("click", (e) => {
      e.preventDefault();
      addProjectButton.classList.remove("hidden");
      projectForm.classList.add("hidden");
    });
  }
}

export default DOMStuff;
