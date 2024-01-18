import { useTranslation } from 'react-i18next'
import useTable from '../../hooks/useTable'
import HeadTitleDescription from '../../components/restaurant/HeadTitleDescription'
import FormTable from '../../components/restaurant/FormTable'
import TablesList from '../../components/restaurant/TablesList'
const Tables = () => {
  const [t] = useTranslation('global')
  const {handleCreate, edit} = useTable()
  return (
    <section className="my-10 px-4">
      <HeadTitleDescription title={t('table.title')} description={t('table.description')} />
      <button className={`${edit ? 'bg-rose-400 hover:bgrose-500 translate-x-56':'bg-sky-400 hover:bg-sky-500 translate-x-0'} mt-3 cursor-pointer px-2 py-1 text-white rounded-lg font-bold transition-all delay-200 duration-300 ease-in-out`} onClick={handleCreate}>{edit ? t('table.close') : t('table.create')}</button>
      { edit && 
        <div className="flex justify-center">
          <FormTable />
        </div>
      }
      <div className="">
        <TablesList />
      </div>
    </section>
  )
}
export default Tables