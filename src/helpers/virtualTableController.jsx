import useTable from "../hooks/useTable"
const virtualTableController = (id) => {
    const {getTableVirtual} = useTable()
    const filterVirtualTable = getTableVirtual.filter(t => t.tableId === id)
  return filterVirtualTable.length
}
export default virtualTableController