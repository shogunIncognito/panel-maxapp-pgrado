import SampleUserImage from '@/assets/unknown-userimage.png'

export default function UserImage ({ image }: { image: string | undefined }): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!image) {
    return (
      <img src={SampleUserImage.src} alt='user' className='w-10 h-10 dark:invert select-none pointer-events-none dark:bg-neutral-200 ring-2 ring-black dark:ring-slate-800 object-cover rounded-full' />
    )
  }

  return (
    <img src={image} alt='user' className='w-10 h-10 select-none pointer-events-none object-cover rounded-full' />
  )
}
