const totalsales = (value) => {
  const x = value.filter(o => o !== false)
  const totalProduct = x.reduce( (total, x) => x  + total, 0 ).toFixed(2)
  return totalProduct
  
}
export default totalsales