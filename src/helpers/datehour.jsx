const datehour = (value) => {
    let date = new Date(value)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let init = day + "-" + month + "-" + year
    let initHour = hour +':'+ minute +':'+ second
    
    return ({init, initHour})
}
export default datehour