const AllergensMap = (prop) => {
    const allergen = prop.map((allergen) => allergen &&  `${allergen.label} | `)   
    return allergen
}
export default AllergensMap