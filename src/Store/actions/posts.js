import { SET_POSTS, CREATING_POST, POST_CREATED } from "./actionsTypes"
import axios from 'axios'
import { setMessage } from './message'

export const addPost = post => {
    return (dispatch, getState) => {

        dispatch(creatingPost())

        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-instaclone-ca298.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: err
                }))
            })
            .then(resposta => {
                post.image = resposta.data.imageUrl

                axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Erro',
                            text: err
                        }))
                    })
                    .then(res => {
                        dispatch(getPosts())
                        dispatch(postCreated())
                        dispatch(setMessage({
                            title: 'Sucesso',
                            text: 'Nova postagem'
                        }))
                    })
            })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}

export const addComment = payload => {
    return (dispatch, getState) => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: err
                }))
            })
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)
                axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Erro',
                            text: err
                        }))
                    })
                    .then(res => {
                        dispatch(getPosts())
                    })
            })

    }
}

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export const getPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => {
                dispatch(setMessage({
                    title: 'Erro',
                    text: err
                }))
            })
            .then(res => {
                const rawPosts = res.data
                const posts = []

                for (const key in rawPosts) {
                    if (rawPosts.hasOwnProperty(key)) {
                        posts.push({
                            ...rawPosts[key],
                            id: key
                        })
                    }
                }
                dispatch(setPosts(posts.reverse()))
            })
    }
}