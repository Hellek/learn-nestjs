import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="grow flex-center flex-col">
      <div>Страница не найдена</div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mt-2"
      >
        Назад
      </button>
    </div>
  )
}

export default NotFound
