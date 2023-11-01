import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="grow flex-center flex-col">
      <div>Страница не найдена</div>
      <Button
        onClick={() => navigate(-1)}
        className="mt-2"
      >
        Назад
      </Button>
    </div>
  )
}

export default NotFound
