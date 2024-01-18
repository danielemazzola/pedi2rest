import useRestaurant from '../../hooks/useRestaurant'
import { useTranslation } from 'react-i18next'
import HeadTitleDescription from '../../components/restaurant/HeadTitleDescription'
import Profile from '../../components/restaurant/Profile'
import Loading from '../../components/Loading'
const Dashboard = () => {
  const [t] = useTranslation('global')
  const { auth, loading } = useRestaurant()
  return (
    <section className="my-10 px-4">
      <HeadTitleDescription title={t('dashboard.title')} description={t('dashboard.description')} />
      <div className="flex justify-center">
        {loading ? <Loading /> : 
          <Profile info={auth} />
        }
      </div>
    </section>
  )
}
export default Dashboard