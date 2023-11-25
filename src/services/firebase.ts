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

export const uploadCarImage = async (image: File, carId: number): Promise<string> => {
  const imagesRef = ref(storage, `images/proyectoWebMaxautos/${carId}`)
  await uploadBytes(imagesRef, image)

  return await getDownloadURL(imagesRef)
}

export const uploadCarsImages = async (images: File[], carPlate: string): Promise<string[]> => {
  if (images?.length === 0) return []
  const urls = images.map(async image => {
    const imagesRef = ref(storage, `images/proyectoWebMaxautos/${image.name}_${carPlate}`)
    await uploadBytes(imagesRef, image)
    return await getDownloadURL(imagesRef)
  })

  return await Promise.all(urls)
}

export const deleteCarsImages = async (images: string[]): Promise<void> => {
  if (images.length === 0) return
  const urls = images.map(async (image) => {
    const delRef = ref(storage, image)
    return await deleteObject(delRef)
  })

  await Promise.all(urls)
}

export const deleteCarImage = async (image: string): Promise<Boolean> => {
  const delRef = ref(storage, image)
  await deleteObject(delRef)
  return true
}
