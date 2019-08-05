'use strict'

const indexTemplate = require('../templates/index.handlebars')
const newBlogpostTemplate = require('../templates/new-blogpost.handlebars')
const updateTemplate = require('./../templates/update-modal.handlebars')
const showAllPosts = require('./../templates/show-posts-button.handlebars')
const createPostButton = require('./../templates/create-post-button.handlebars')
const store = require('./../store.js')

const setAllPosts = function (responseData) {
  const createPost = createPostButton()
  for (let i = 0; i < responseData.length; i++) {
    if (responseData[i].postBody.length > 700) {
      responseData[i]['longPost'] = true
    } else {
      responseData[i]['longPost'] = false
    }
  }
  const indexHTML = indexTemplate({ posts: responseData })
  $('.container').html(indexHTML)
  $('.navigate-between-post-creation').html(createPost)
}

const showCreateForm = function () {
  const postsButton = showAllPosts()
  const newBlogpostHtml = newBlogpostTemplate
  $('.container').html(newBlogpostHtml())
  $('.navigate-between-post-creation').html(postsButton)
}

const onFailure = function () {
  $('#message').text('Something went wrong, please try again')
  setTimeout(() => $('#message').text(''), 4000)
}

const onCreateSuccess = function () {
  $('#message').text('Successfully added!')
  setTimeout(() => $('#message').text(''), 4000)
  $('form').trigger('reset')
}

const onClickMore = function () {
  const id = $(this).data('num')
  $(`#${id}`).find('.dots').addClass('hidden')
  $(`#${id}`).find('.expand').removeClass('hidden')
  $(this).addClass('hidden')
  $(`#${id}`).find('.less-btn').removeClass('hidden')
}

const onClickLess = function () {
  const id = $(this).data('val')
  $(`#${id}`).find('.dots').removeClass('hidden')
  $(`#${id}`).find('.expand').addClass('hidden')
  $(this).addClass('hidden')
  $(`#${id}`).find('.more-btn').removeClass('hidden')
}

const updateModal = function (event) {
  const updateModal = updateTemplate()
  $('.modals').html(updateModal) // adds modal to it's container
  const postId = $(event.target).data('update') // grab the post ID
  const post = store.posts.find(post => post.id === postId)
  store.postToUpdate = post
  $('#title-update').val(post.title) // set the title in modal
  $('#content-update').val(post.postBody) // set the content in modal
  $('#update-post').modal('toggle') // show modal
}

const onDeleteSuccess = function () {
  $('html,body').scrollTop(0)
  $('#message').text('Post deleted!')
  setTimeout(() => $('#message').text(''), 4000)
}

const onAddCommentSuccess = function () {
  setTimeout(() => $(`#${store.post_id}`).find('.comment-message').text(''), 4000)
  $('form').trigger('reset')
  let num = $(`#${store.post_id}`).find('.number-comments').text()
  num = Number(num) + 1
  $(`#${store.post_id}`).find('.number-comments').html(num)
}

const onAddCommentFailure = function () {
  setTimeout(() => $(`#${store.post_id}`).find('.comment-message').text(''), 4000)
  $(`#${store.post_id}`).find('.comment-feedback').text('Your comment must not be more than 700 characters.')
  // $('form').trigger('reset')
  setTimeout(() => $(`#${store.post_id}`).find('.comment-feedback').text(''), 4000)
}

const onShowUpdate = function () {
  $(this).addClass('hidden')
  $(this).parent().next().removeClass('hidden')
}

const onUpdateCommentSuccess = function () {
  $(this).parent().next().addClass('hidden')
}

const onUpdateCommentFailure = function () {
  // setTimeout(() => $(`#${commentId}`).find('.comment-message').text(''), 4000)
  console.log(`#${store.comment_id}`)
  $(`#${store.comment_id}`).text('Your comment must not be more than 700 characters.')
  // $('form').trigger('reset')
  setTimeout(() => $(`#${store.comment_id}`).text(''), 4000)
}

module.exports = {
  setAllPosts,
  showCreateForm,
  onFailure,
  onCreateSuccess,
  onClickMore,
  onClickLess,
  updateModal,
  onDeleteSuccess,
  onAddCommentSuccess,
  onShowUpdate,
  onUpdateCommentSuccess,
  onAddCommentFailure,
  onUpdateCommentFailure
}
