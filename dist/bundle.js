/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http */ \"./src/http.js\");\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui */ \"./src/ui.js\");\n\n //Get posts on DOM load\n\ndocument.addEventListener('DOMContentLoaded', getPosts); //Listen for add post\n\ndocument.querySelector('.post-submit').addEventListener('click', submitPost); //Listen for delete post\n\ndocument.querySelector('#posts').addEventListener('click', deletePost); //Listen for edit state\n\ndocument.querySelector('#posts').addEventListener('click', enableEdit); //Listen for cancel button\n\ndocument.querySelector('.card-form').addEventListener('click', cancelEdit);\n\nfunction getPosts() {\n  _http__WEBPACK_IMPORTED_MODULE_0__.http.get('http://localhost:3000/posts').then(data => _ui__WEBPACK_IMPORTED_MODULE_1__.ui.showPosts(data)).catch(err => console.log(err));\n} //Submit Post\n\n\nfunction submitPost() {\n  const title = document.querySelector('#title').value;\n  const body = document.querySelector('#body').value;\n  const id = document.querySelector('#id').value;\n  let data = {\n    title,\n    body\n  };\n\n  if (title === '' || body === '') {\n    _ui__WEBPACK_IMPORTED_MODULE_1__.ui.showAlert('Please fill in fields', 'alert alert-danger');\n  } else {\n    if (id === '') {\n      //create post\n      _http__WEBPACK_IMPORTED_MODULE_0__.http.post('http://localhost:3000/posts', data).then(data => {\n        _ui__WEBPACK_IMPORTED_MODULE_1__.ui.showAlert('Post added', 'alert alert-success');\n        _ui__WEBPACK_IMPORTED_MODULE_1__.ui.clearFields();\n        getPosts();\n      }).catch(err => console.log(err));\n    } else {\n      let data = {\n        id,\n        title,\n        body\n      }; //update post\n\n      _http__WEBPACK_IMPORTED_MODULE_0__.http.put(`http://localhost:3000/posts/${id}`, data).then(data => {\n        _ui__WEBPACK_IMPORTED_MODULE_1__.ui.showAlert('Post updated', 'alert alert-success');\n        _ui__WEBPACK_IMPORTED_MODULE_1__.ui.changeFormstate('add');\n        getPosts();\n      }).catch(err => console.log(err));\n    }\n  }\n}\n\nfunction deletePost(e) {\n  if (e.target.parentElement.classList.contains('delete')) {\n    const id = e.target.parentElement.dataset.id;\n\n    if (confirm('Are you sure?')) {\n      _http__WEBPACK_IMPORTED_MODULE_0__.http.delete(`http://localhost:3000/posts/${id}`).then(() => {\n        _ui__WEBPACK_IMPORTED_MODULE_1__.ui.showAlert('Post Removed', 'alert alert-success');\n        getPosts();\n      }).catch(err => console.log(err));\n    }\n\n    console.log(id);\n  }\n\n  e.preventDefault();\n} //Enable edit state\n\n\nfunction enableEdit(e) {\n  if (e.target.parentElement.classList.contains('edit')) {\n    const id = e.target.parentElement.dataset.id;\n    const body = e.target.parentElement.previousElementSibling.textContent;\n    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;\n    const data = {\n      id,\n      title,\n      body\n    }; //Fill the form with current post\n\n    _ui__WEBPACK_IMPORTED_MODULE_1__.ui.fillForm(data);\n  }\n\n  e.preventDefault();\n}\n\nfunction cancelEdit(e) {\n  if (e.target.classList.contains('post-cancel')) {\n    _ui__WEBPACK_IMPORTED_MODULE_1__.ui.changeFormstate('add');\n    e.preventDefault();\n  }\n}\n\n//# sourceURL=webpack://babel/./src/app.js?");

/***/ }),

/***/ "./src/http.js":
/*!*********************!*\
  !*** ./src/http.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"http\": () => (/* binding */ http)\n/* harmony export */ });\nclass EasyHTTP {\n  //Make an HTTP GET Request\n  async get(url) {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } // Make an HTTP POST Request\n\n\n  async post(url, data) {\n    const response = await fetch(url, {\n      method: 'POST',\n      headers: {\n        'Content-type': 'application/json'\n      },\n      body: JSON.stringify(data)\n    });\n    const resData = await response.json();\n    return resData;\n  }\n\n  async put(url, data) {\n    const response = await fetch(url, {\n      method: 'PUT',\n      headers: {\n        'Content-type': 'application/json'\n      },\n      body: JSON.stringify(data)\n    });\n    const resData = await response.json();\n    return resData;\n  } //Make an HTTP Delete\n\n\n  async delete(url) {\n    const response = await fetch(url, {\n      method: 'DELETE',\n      headers: {\n        'Content-type': 'aplication/json'\n      }\n    });\n    const resData = await 'resource deleted';\n    return resData;\n  }\n\n}\n\nconst http = new EasyHTTP();\n\n//# sourceURL=webpack://babel/./src/http.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ui\": () => (/* binding */ ui)\n/* harmony export */ });\nclass UI {\n  constructor() {\n    this.post = document.querySelector('#posts');\n    this.titleInput = document.querySelector('#title');\n    this.bodyInput = document.querySelector('#body');\n    this.idInput = document.querySelector('#id');\n    this.postSubmit = document.querySelector('.post-submit');\n    this.forState = 'add';\n  }\n\n  showPosts(posts) {\n    let output = '';\n    posts.forEach(post => {\n      output += `<div class=\"card mb-3\">\n        <div class=\"card-body\">\n          <h4 class=\"card-title\">${post.title}</h4>\n          <p card=\"card-text\">${post.body}</p>\n          <a href=\"#\" class=\"edit card-link\" data-id=\"${post.id}\">\n            <i class=\"fas fa-pencil-alt\"></i>\n          </a>\n          <a href=\"#\" class=\"delete card-link\" data-id=\"${post.id}\">\n            <i class=\"far fa-trash-alt\"></i>\n          </a>\n        </div>\n      </div>`;\n    });\n    this.post.innerHTML = output;\n  }\n\n  showAlert(message, className) {\n    this.clearAlert(); //Create div\n\n    const div = document.createElement('div'); //Add classes\n\n    div.className = className; //Add text \n\n    div.appendChild(document.createTextNode(message)); //Get the parent\n\n    const container = document.querySelector('.postContainer'); //Get posts\n\n    const post = document.querySelector('#posts'); //Insert alert div\n\n    container.insertBefore(div, post); // timeout\n\n    setTimeout(() => {\n      this.clearAlert();\n    }, 3000);\n  }\n\n  clearAlert() {\n    const currentAlert = document.querySelector('.alert');\n\n    if (currentAlert) {\n      currentAlert.remove();\n    }\n  }\n\n  clearFields() {\n    this.titleInput.value = '';\n    this.bodyInput.value = '';\n  }\n\n  fillForm(data) {\n    this.titleInput.value = data.title;\n    this.bodyInput.value = data.body;\n    this.idInput.value = data.id;\n    this.changeFormstate('edit');\n  }\n\n  clearIdInput() {\n    this.idInput.value = '';\n  }\n\n  changeFormstate(type) {\n    if (type === 'edit') {\n      this.postSubmit.textContent = 'Update Post';\n      this.postSubmit.className = 'post-submit btn btn-warning btn-block'; //Create cancel button\n\n      const button = document.createElement('button');\n      button.className = 'post-cancel btn btn-light btn-block';\n      button.appendChild(document.createTextNode('Cancel Edit')); //Get parent\n\n      const cardForm = document.querySelector('.card-form'); //Get element to insert before\n\n      const formEnd = document.querySelector('.form-end'); //Insert cancel button\n\n      cardForm.insertBefore(button, formEnd);\n    } else {\n      this.postSubmit.textContent = 'Post It';\n      this.postSubmit.className = 'post-submit btn btn-primary btn-block'; //Remove cancel button if there\n\n      if (document.querySelector('.post-cancel')) {\n        document.querySelector('.post-cancel').remove();\n        this.clearIdInput();\n        this.clearFields();\n      }\n    }\n  }\n\n}\n\nconst ui = new UI();\n\n//# sourceURL=webpack://babel/./src/ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;