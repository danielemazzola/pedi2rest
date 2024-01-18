const total = (value) => {
  const totalProduct = value.reduce( (total, value) => value.totalCart  + total, 0 ).toFixed(2)
  return totalProduct
}
export default total