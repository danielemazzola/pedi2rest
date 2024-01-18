import React, { createContext, useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import useRestaurant from '../hooks/useRestaurant'
import connectAxios from '../config/connectAxios'
import connectCloudinary from '../config/connectCloudinary'
import { toast } from 'react-toastify'

const CategoryContext = createContext()
const CategoriesProvider = ({children}) => {
  // Globals
  const {
    setLoading, 
    alert, 
    setAlert, 
    setAuth, 
    auth, 
    setGetTable, 
    getTable, 
    getProducts, 
    setGetProducts, 
    process,
    setProcess,
    pending,
    setPending,
    setSales,
    canceled,
    setCanceled, } = useRestaurant()

  const [categoryId, setCategoryId] = useState(null)
  const [categoryName, setCategoryName] = useState('')
  const [categoryRestaurantId, setCategoryRestaurantId] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const [uploadImage, setUploadImage] = useState('')
  const [opening, setOpening] = useState('00:00')
  const [closing, setClosing] = useState('00:00')
  const [newCategory, setNewCategory] = useState({})
  const [editCategory, setEditCategory] = useState({})
  const [loadingImage, setLoadingImage] = useState(false)
  const [edit, setEdit] = useState(false)
  const [getCategories, setGetCategories] = useState([])
  const [msg, setMsg] = useState('')
  const [createCategory, setCreateCategory]=useState(false)
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [loadingNewCategories, setLoadingNewCategories] = useState(false)

  //ProductsProvider
  const [productId, setProductId] = useState(null)
  const [plateName, setPlateName] = useState('')
  const [plateDescription, setPlateDescription] = useState('')
  const [show, setShow]=useState(true)
  const [category, setCategory] = useState({})
  const [allergens, setAllergens] = useState([])
  const [price, setPrice] = useState('')

  const navigate = useNavigate()

  // CLOSE SESSION
  const handleCloseSession = () => {
    setAuth({})
    setAlert('')
    setCategoryId(null)
    setCategoryName('')
    setCategoryRestaurantId('')
    setGetCategories([])
    setGetProducts([])
    setGetTable([])
    setProcess([])
    setPending([])
    setCanceled([])
    setSales([])
    setCategoryDescription('')
    setUploadImage('')
    setOpening('')
    setClosing('')
    setNewCategory({})
    setEditCategory({})
    setEdit(false)
    setCreateCategory(false)
    setProductId
    setPlateName
    setPlateDescription
    setShow
    setCategory
    setAllergens
    setPrice
    localStorage.removeItem("PEDI2_ID_TOKEN")
    navigate("/")
  }

  useEffect(() => {
    setNewCategory({ categoryName, categoryDescription, opening, closing, uploadImage })    
  },[categoryName, categoryDescription, opening, closing, uploadImage])

  useEffect(() => {
    setEditCategory({ categoryId, categoryName, categoryDescription, opening, closing, uploadImage, categoryRestaurantId })    
  },[categoryName, categoryDescription, opening, closing, uploadImage])
  
  useEffect(() => {
    const getAllCategories = async () => {
      setLoadingCategories(true)
      setMsg('')
      const token = localStorage.getItem('PEDI2_ID_TOKEN')
      if (!token) {
        navigate('/')
        setLoadingCategories(false)
        return
      }
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const {data} = (await connectAxios('/category', config))
      if(data.msg) {
        setMsg(data.msg)
        setLoadingCategories(false)
        return
      }
      setGetCategories(data)
      setLoadingCategories(false)

    } 
    getAllCategories()
  },[auth])


  const handleNewCategory = async (e) => {
    e.preventDefault()
    if([categoryName, categoryDescription, opening, closing].includes('')) {
      toast.error('All fields are required', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return;
    }
    const token = localStorage.getItem('PEDI2_ID_TOKEN')
    if (!token) {
      navigate('/')
      return
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    
    try {
      setLoadingNewCategories(true)
      const {data} = await connectAxios.post('/category', newCategory, config)
      if(data.msg) {
        toast.error(data.msg, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
      })
        setLoadingNewCategories(false)
        return
      }
      setMsg('')
      setGetCategories([...getCategories, data])
      setNewCategory({})
      setUploadImage('')
      setCategoryName('')
      setCategoryDescription('')
      setOpening('00:00')
      setClosing('00:00')
      setLoadingNewCategories(false)
      
      
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
      
    }

  }

  const handleImage = async (e) => {
    setLoadingImage(true)
    const files = e.target.files[0]
    const formData = new FormData()
    formData.append('upload_preset', 'restaurants')
    formData.append('file', files)
    if(files.type != 'image/jpeg' && files.type != 'image/png' && files.type != 'image/jpeg') {
      toast.error(data.msg, {
        position: "Invalid image format. Only png, jpg or jpeg",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
      setLoadingImage(false)
      return
    }
    try {
      const data = await connectCloudinary.post('/upload', formData)
      .then(res => setUploadImage(res.data.secure_url))
      .catch(error => ( setAlert({msg:'An unexpected error has occurred, please try again after a few minutes.', error:true})))
      setLoadingImage(false)
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
      
    }
    setLoadingImage(false)
    
  }

  useEffect(() => {
    if(editCategory.name && editCategory._id){
      setEdit(true)
      setCategoryId(editCategory._id)
      setCategoryName(editCategory.name)
      setCategoryRestaurantId(editCategory.restauranteId)
      setCategoryDescription(editCategory.description)
      setOpening(editCategory.open)
      setClosing(editCategory.close)
      setUploadImage(editCategory.image)
    }
  },[editCategory])

  const handleEditCategory = async (id) => {
    getCategories.filter(category => category._id === id && setEditCategory(category))
    setCreateCategory(true)
  }
  const handleEditOneCategory = async (e) => {
    e.preventDefault()
    if([categoryName, categoryDescription, opening, closing].includes('')) {
      toast.error('All fields are required', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
      })
      return;
    }
    setLoading(true)
    const token = localStorage.getItem('PEDI2_ID_TOKEN')
    if (!token) {
      navigate('/')
      setLoading(false)
      return
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    if( editCategory.uploadImage !== newCategory.uploadImage ) {
      handleImage(newCategory.uploadImage)
      setLoading(false)
    }
    const {data} = await connectAxios.put('/category', editCategory, config)
    const updateCategory = getCategories.map(category => category._id === data._id ? data : category )
    setGetCategories(updateCategory)
    setUploadImage('')
    setEditCategory({})
    setEdit(false)
    setCategoryId(null)
    setCategoryName('')
    setCategoryDescription('')
    setLoadingImage(false)
    setOpening('00:00')
    setClosing('00:00')
    setLoading(false)
  }

  const handleCancelEditCategory = () => {
    setUploadImage('')
    setEditCategory({})
    setEdit(false)
    setCategoryId(null)
    setCategoryName('')
    setCategoryDescription('')
    setOpening('00:00')
    setClosing('00:00')
    setCreateCategory(false)
  }

  const handleOpenCategory = () =>{
    setCreateCategory(!createCategory)
  }
 
  return (
    <CategoryContext.Provider
      value={{
        alert,
        createCategory, setCreateCategory,
        handleOpenCategory,
        handleNewCategory, 
        handleCloseSession,
        handleEditOneCategory,
        loadingCategories,
        loadingNewCategories,
        categoryName, setCategoryName,
        categoryDescription, setCategoryDescription,
        uploadImage, setUploadImage,
        opening, setOpening,
        closing, setClosing,
        newCategory, setNewCategory,
        handleImage,
        loadingImage,
        getCategories, setGetCategories,
        msg,
        handleEditCategory,
        edit, setEdit,
        handleCancelEditCategory,
        productId, setProductId,
        plateName, setPlateName,
        plateDescription, setPlateDescription,
        show, setShow,
        category, setCategory,
        allergens, setAllergens,
        price, setPrice
      }}
    >
      { children }
    </CategoryContext.Provider>
  )
}

export { CategoriesProvider }
export default CategoryContext