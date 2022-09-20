import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const mypage = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faRss} />
      <FontAwesomeIcon icon={faTwitter} />
      <FontAwesomeIcon icon={faInstagram} />
    </div>
  )
}

export default mypage
