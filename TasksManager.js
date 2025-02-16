/*
Author: Yassine Bourich
Class: CPI2 S4
Module: SPD-2
*/

// Récupérer les éléments du documents
const tasksList = document.querySelector(".list-group.todos.mx-auto.text-light");

// Récupérer les éléments des la form 'add'
const addField = document.querySelector("input[name='add']");
const addForm = document.querySelector(".add");
// Définir le code de Entrer
const Enter = 13;

// Récupérer les éléments des la form 'search'
const searchField = document.querySelector("input[name='search']");
const searchForm = document.querySelector(".search");

// Définir un tableau globale des tâches
let Tasks = [];

// Déactiver la propriété submit
// sans faire ça, quand on click sur Entrer en selectant l'input, la page va s'actiualisé
addForm.onsubmit = () => {
    return false;
};

// Quand on click sur un button
addField.onkeydown = (event) => {
    // Si cette botton était Entrer
    if (event.keyCode == Enter) {
        // On ajout le contenue dans Tasks
        Tasks.push(addField.value);
        // actualiser l'affichage
        display_tasks(Tasks);
        // Réinstaller les champs d'entrée
        addField.value = "";
        searchField.value = "";
    }
}

// Affichage des tâches
function display_tasks(tasks) {
    // Réinstaller le contenu html de tasksList
    tasksList.innerHTML = "";
    // Pour chaque tâche on append le string template dans tasksList
    tasks.forEach((task) => {
        tasksList.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span>${task}</span>
                                    <i class="far fa-trash-alt delete"></i>
                                </li>`;
    });
    // Récupérage des icons de 'supprimer'
    const delIcons = document.querySelectorAll(".far.fa-trash-alt.delete");
    for (let i = 0; i < delIcons.length; i++) {
        // Association de onclick à delete_task avec un argument qui est l'indice
        delIcons[i].setAttribute("onclick", "delete_task("+ String(i) +")")
    }
}

/* subTasks est une list des tâches dérivée de la liste Tasks, chaque élément est un tableau 
contenant la tâche et son indice dans la liste original: Tasks
*/
function display_subtasks(tasks) {
    tasksList.innerHTML = "";
    tasks.forEach((task) => {
        tasksList.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span>${task[0]}</span>
                                    <i class="far fa-trash-alt delete"></i>
                                </li>`;
    });
    const delIcons = document.querySelectorAll(".far.fa-trash-alt.delete");
    for (let i = 0; i < delIcons.length; i++) {
        delIcons[i].setAttribute("onclick", "delete_task("+ String(i) +")")
    }
}

// Suppression des tâches
function delete_task(i) {
    // Si on est entrain de filtrer
    if (searchField.value) {
        // Récupération de subTasks R suivant la valeur du filtrage
        let R = filter_tasks(searchField.value);
        // Supprestion de la Tâche de la liste original
        Tasks.splice(R[i][1], 1);
        // Suppression de la Tâche du subList
        R.splice(i, 1);
        // Affichage de cette liste
        display_subtasks(R);
    } else {
        // Sinon on supprime la Tâche de la grande liste puis on l'affiche
        Tasks.splice(i, 1);
        display_tasks(Tasks);
    }
}

// Vérifier si input est inclut dans str
function check_string(input, str) {
    // Pour chaque caractére de input si le caractére n'est pas compatible on retourn false
    for (let i = 0; i < input.length; i++) {
        if (input[i] != str[i]) {
            return false;
        }
    }
    // si tous le caractéres son OK, retourn true
    return true;
}

// filtrage de l'input
function filter_tasks(input) {
    // Initoalisation de la liste des résultats
    let Result = [];

    // pour chaque tâche, si la tâche est compatible avec input on l'ajoute à Result avec son indice original
    // l'indice originale est utile dans la partie de suppression de tâche lors de filtrage
    Tasks.forEach((task, index, arr) => {
        if (check_string(input, task)) {
            Result.push([task, index]);
        }
    });

    // Retourn de cette liste qui represent un subTasks
    return Result;
}

// Déactiver la propriété submit
searchForm.onsubmit = () => {
    return false;
};

// Filtrer les tâches et les affichier au fur et à mesure qu'on tape le nom de la tâche
searchField.onkeyup = () => {
    let R = filter_tasks(searchField.value);
    display_subtasks(R);
}