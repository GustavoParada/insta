import { ADD_POST, ADD_COMMENT } from "./actionsTypes"
import axios from 'axios'
import { ActionSheetIOS } from "react-native"

export const addPost = post => {
    return dispach => {
        //https://us-central1-instaclone-ca298.cloudfunctions.net/uploadImage
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-instaclone-ca298.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => console.log(`erro 1: ${err}`))
            .then(resposta => {
                console.log(`resposta: ${resposta}`)
                post.image = resposta.data

                axios.post('/posts.json', { ...post })
                    .catch(err => console.log(`2: ${err}`))
                    .then(res => console.log(res.data))
            })
    }

    // return {
    //     type: ADD_POST,
    //     payload: post
    // }
}

export const addComment = payload => {
    return {
        type: ADD_COMMENT,
        payload: payload
    }
}