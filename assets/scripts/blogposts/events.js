'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const authUI = require('./../auth/authUi.js')
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
    .catch(ui.onFailure)
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
      onGetPosts()
    })
    .then(ui.onAddCommentSuccess)
    .catch(ui.onAddCommentFailure)
}

const onDeleteComment = function (event) {
  const commentId = $(event.target).data('deletecomment')
  const post = store.posts.find((post) => post.comments.find(comment => comment._id === commentId))
  api.commentDestroy(commentId, post.id)
    .then(() => {
      onGetPosts()
    })
    .catch(ui.onFailure)
}

const onUpdateComment = function (event) {
  event.preventDefault()
  const commentId = $(event.target).data('updatecomment')
  const form = event.target
  const formData = getFormFields(form)
  const post = store.posts.find((post) => post.comments.find(comment => comment._id === commentId))
  store.comment_id = commentId
  api.commentUpdate(formData, post.id, commentId)
    .then(() => {
      onGetPosts()
    })
    .then(ui.onUpdateCommentSuccess)
    .catch(ui.onUpdateCommentFailure)
}

const onFollowUser = function (event) {
  const postID = $(event.target).data('follow')
  const post = store.posts.find(post => post.id === postID)
  const userToFollowID = post.owner._id
  api.followUser(userToFollowID)
    .then((response) => {
      store.user = response.user
      authUI.setProfile()
      authUI.setProfile()
      authUI.setUserNameInNavBar(store.user.name)
      authUI.setProfilePicture()
      onSetAllPosts()
    })
    .catch(ui.onFailure)
}

const onLikePost = function (event) {
  const postID = $(event.target).data('like')
  api.likePost(postID)
    .then(onGetPosts)
    .catch(ui.onFailure)
}

module.exports = {
  onGetPosts,
  onCreatePost,
  onUpdateModal,
  onDeletePost,
  onSetAllPosts,
  onUpdatePost,
  onAddComment,
  onDeleteComment,
  onUpdateComment,
  onFollowUser,
  onLikePost
}
