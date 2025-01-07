import { FC } from 'react'
import { useParams } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer/VideoPlayer'




const Watch: FC = () => {
  const { id } = useParams()

  if (!id) {
    return <div>Loading...</div>
  }

  return (
    <div className='relative overflow-hidden'>
      <VideoPlayer videoId={id} isMuted={true}  />
    </div>
  )
}

export default Watch