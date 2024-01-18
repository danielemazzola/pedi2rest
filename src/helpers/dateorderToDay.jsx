const dateorderToDay = (value) => {
    let dateOrder = new Date(value)
    let datetoDay = new Date()
    let dayOrder = dateOrder.getDate()
    let monthOrder = dateOrder.getMonth() + 1
    let yearOrder = dateOrder.getFullYear()
    let day = datetoDay.getDate()
    let month = datetoDay.getMonth() + 1
    let year = datetoDay.getFullYear()
    if(yearOrder === year) {
        if(monthOrder === month) {
            if(dayOrder === day) {
                return true
            }
            return false
        }
        return false
    }    
}
export default dateorderToDay