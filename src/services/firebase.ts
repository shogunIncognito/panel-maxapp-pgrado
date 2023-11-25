import { initializeApp } from 'firebase/app'
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { API_KEY, APP_ID, AUTH_DOMAIN, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from '@/utils/envconfig'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export const uploadCarImage = async (image, carId) => {
  try {
    const imagesRef = ref(storage, `images/proyectoWebMaxautos/${carId}`)
    await uploadBytes(imagesRef, image)

    return await getDownloadURL(imagesRef)
  } catch (error) {
    console.log(error)
    return null
  }
}

export const uploadCarsImages = async (images = [], carPlate) => {
  try {
    if (images.length === 0) return []
    const urls = images.map(async image => {
      const imagesRef = ref(storage, `images/proyectoWebMaxautos/${image.name}_${carPlate}`)
      await uploadBytes(imagesRef, image)
      return getDownloadURL(imagesRef)
    })

    return Promise.all(urls)
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteCarsImages = async (images = []) => {
  try {
    if (images.length === 0) return
    const urls = images.map((image) => {
      const delRef = ref(storage, image)
      return deleteObject(delRef)
    })

    return Promise.all(urls)
  } catch (error) {
    console.log(error)
    return null
  }
}

export const deleteCarImage = async (image) => {
  const delRef = ref(storage, image)
  await deleteObject(delRef)
  return true
}
