'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const store = require('./../store.js')
const getFormFields = require('../../../lib/get-form-fields')

const onSetAllPosts = function () {
  ui.setAllPosts(store.posts)
}

const onGetPosts = function () {
  api.index()
    .then((response) => {
      store.posts = response.posts
      onSetAllPosts()
    })
    .catch(ui.onFailure)
}

const onCreatePost = function (event) {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.create(formData)
    .then(() => {
      ui.onCreateSuccess()
      onGetPosts()
    })
    .catch(ui.onFailure)
}

const onUpdateModal = function (event) {
  ui.updateModal(event)
}

const onUpdatePost = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.update(formData, store.postToUpdate.id)
    .then(() => {
      onGetPosts()
      $('#update-post').modal('toggle') // show modal
    })
    .catch(console.error)// need to make the update call to api but first I need to fix the string
}

const onDeletePost = function (event) {
  const id = $(event.target).data('delete')
  api.destroy(id)
    .then(ui.onDeleteSuccess)
    .then(onGetPosts)
    .catch(ui.onFailure)
}

const onAddComment = function (event) {
  event.preventDefault()
  const blogId = $(event.target).data('blogid')
  const form = event.target
  const formData = getFormFields(form)
  formData.post_id = blogId
  store.post_id = blogId
  store.addedComment = formData.comment
  api.createComment(formData)
    .then(() => {
      ui.onAddCommentSuccess()
      onGetPosts()
    })
    .catch(ui.onFailure)
}

const onDeleteComment = function (event) {
  const commentId = $(event.target).data('deletecomment')
  const post = store.posts.find((post) => post.comments.find(comment => comment._id === commentId))
  api.commentDestroy(commentId, post.id)
    .then(() => {
      onGetPosts()
    })
    .catch(console.error)
}

module.exports = {
  onGetPosts,
  onCreatePost,
  onUpdateModal,
  onDeletePost,
  onSetAllPosts,
  onUpdatePost,
  onAddComment,
  onDeleteComment
}
