import {http} from './http';
import {ui, UI} from './ui';

//Get posts on DOM load

document.addEventListener('DOMContentLoaded', getPosts);

//Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

//Listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost);

//Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

//Listen for cancel button
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err));
}

//Submit Post
function submitPost(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  let data = {
    title,
    body
  }

  if(title === '' || body === ''){
    ui.showAlert('Please fill in fields', 'alert alert-danger');
  } else {

    if(id === '' ){
      //create post
      http.post('http://localhost:3000/posts',data)
      .then(data => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();
      getPosts();
      })
      .catch(err => console.log(err));
    } else {
      
  let data = {
    id,
    title,
    body
  }
      //update post
      http.put(`http://localhost:3000/posts/${id}`,data)
      .then(data => {
      ui.showAlert('Post updated', 'alert alert-success');
      ui.changeFormstate('add');
      getPosts();
      })
      .catch(err => console.log(err));

    }

  }
}

function deletePost(e){
  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')){
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(()=> {
        ui.showAlert('Post Removed', 'alert alert-success');
        getPosts();
      })
      .catch(err => console.log(err));
    }
    console.log(id);

  }
  e.preventDefault();
}

//Enable edit state
function enableEdit(e){
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;

    const body = e.target.parentElement.previousElementSibling.textContent

    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    };

    //Fill the form with current post
    ui.fillForm(data);

  }

  e.preventDefault();
}

function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')){
    ui.changeFormstate('add');
    e.preventDefault();
  }
}


