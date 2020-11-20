const functions = require('firebase-functions');
const cors = require('cors')({ origin: true })
const fs = require('fs')
const uuid = require('uuid-v4')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
    projectId: 'instaclone-ca298',
    keyFilename: 'instaclone-ca298.json'
})

exports.uploadImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        try {
            fs.writeFileSync('/tmp/imageToSave.jpg',
                request.body.image, 'base64')

            const bucket = storage.bucket('instaclone-ca298.appspot.com')
            const id = uuid();
            bucket.upload('/tmp/imageToSave.jpg', {
                upload: 'media',
                destination: `/posts/${id}.jpg`,
                metadata: {
                    metadata: {
                        contentType: 'image/jpeg',
                        firebaseStorageDownloadTokens: id
                    }
                }
            }, (err, file) => {
                if (err) {
                    return response.status(500).json({ error: `6: ${err}` })
                } else {
                    const fileName = encodeURIComponent(file.name)
                    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/'
                        + bucket.name + '/o/' + fileName + '?alt=media&token=' + id
                    return response.status(201).json({ imageUrl: imageUrl })
                }
            })
        } catch (err) {
            return response.status(500).json({ error: `5: ${err}` })
        }
    })
});
