const date = (prop) => {
    const date = new Date(prop)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const init = day + "-" + month + "-" + year
    return init
}
export default date