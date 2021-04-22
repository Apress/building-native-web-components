const apiUrl= 'https://jsonplaceholder.typicode.com';
export const notesDataApi = {
    createTask(task) {
        return fetch(`${apiUrl}/posts/`, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });
        },
    deleteTask(id) {
        return fetch(`${apiUrl}/posts/${id}`, {method: 'DELETE'});
        },
    getTasks(id) {
        return fetch(`${apiUrl}/users/${id}/posts`);
        }
};