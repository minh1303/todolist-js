import Todo from "./Todo";
class Project {
  constructor(name, id = Date.now(), todos = []) {
    this.name = name;
    this.id = id;
    this.todos = todos;
  }

  static updateProject(project) {
    let projects = this.getProjects();
    const index = projects.findIndex((item) => item.id === project.id);
    console.log(index);
    projects[index] = project;
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todo) {
    this.todos = this.todos.filter((item) => item !== todo);
  }

  static getProjects() {
    let projects = JSON.parse(localStorage.getItem("projects"));
    if (!projects || projects.length === 0) {
      localStorage.setItem("projects", JSON.stringify([]));
      return [];
    } else return projects;
  }

  static addProject(project) {
    let projects = this.getProjects();
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  static removeProject(project) {
    let projects = this.getProjects();
    const filteredProjects = projects.filter((item) => item.id !== project.id);
    console.log(filteredProjects);
    localStorage.setItem("projects", JSON.stringify(filteredProjects));
  }
}

export default Project;
