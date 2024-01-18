import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import connectAxios from '../config/connectAxios'
import connectCloudinary from '../config/connectCloudinary'
import useRestaurant from '../hooks/useRestaurant'
import useCategories from '../hooks/useCategories'
import { toast } from 'react-toastify'

const ProductsContext = createContext()

const ProductsProvider = ({ children }) => {
    const {
      auth, 
      setGetProducts, 
      getProducts, 
      setSales,
    } = useRestaurant()

    const {
      productId, setProductId,
      plateName, setPlateName,
      plateDescription, setPlateDescription,
      show, setShow,
      category, setCategory,
      allergens, setAllergens,
      price, setPrice,
      uploadImage, setUploadImage,
    } = useCategories()

    const navigate = useNavigate()

    
    const [loadingImage, setLoadingImage]= useState(false)
    const [editProduct, setEditProduct] = useState({})
    const [loading, setLoading]= useState(false)
    const [loadingProducts, setLoadingProducts]= useState(false)
    const [newProduct, setNewProduct] = useState({})
    const [msg, setMsg] = useState('')
    const [edit, setEdit] = useState(false)
    const [createProduct, setCreateProduct]=useState(false)


    useEffect(() => {
        setNewProduct({ plateName, plateDescription, category, allergens, price, show, uploadImage })    
    },[plateName, plateDescription, category, allergens, show, uploadImage])

    useEffect(() => {
        setEditProduct({ productId, plateName, plateDescription, category, allergens, price, show, uploadImage })    
    },[plateName, plateDescription, category, allergens, price, show, uploadImage])

    const handleSelectCategory = (value) => {
        setCategory(value)
    }
    const handleSelectAllergens = (value) => {
        setAllergens(value)
    }

    useEffect(() => {
        const getAllProducts = async () => {
            setLoadingProducts(true)
            setMsg('')
            const token = localStorage.getItem('PEDI2_ID_TOKEN')
            if (!token) {
                navigate('/')
                setLoadingProducts(false)
                return
            }
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
            const {data} = await connectAxios('/products', config)
            if(data.msg) {
                setMsg(data.msg)
                setLoadingProducts(false)
                return
            }
            setGetProducts(data.products)
            setSales(data.sales)
            setLoadingProducts(false)
        }
        getAllProducts()
    }, [auth])

    const handleNewProduct = async (e) => {
        e.preventDefault()
        if([plateName, plateDescription, uploadImage, price].includes('')) {
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
          if(category === '') {
            toast.error('Select a category', {
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
      
          try {
            const {data} = await connectAxios.post('/products', newProduct, config)
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
              setLoading(false)
              return
            }
            setMsg('')
            setGetProducts([...getProducts, data])
            setNewProduct({})
            setUploadImage('')
            setPlateName('')
            setPlateDescription('')
            setAllergens([])
            setPrice(0)
            setCategory({})
            setShow(true)
            setLoading(false)
            
            
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
            setLoading(false)            
          }
    }

    const handleImage = async (e) => {
        setLoadingImage(true)
        const files = e.target.files[0]
        const formData = new FormData()
        formData.append('upload_preset', 'restaurants')
        formData.append('file', files)
        if(files === undefined) {
          setLoadingImage(false)
          return
        }
        if(files.type != 'image/jpeg' && files.type != 'image/png' && files.type != 'image/jpeg') {
          setLoadingImage(false)
          toast.error('Invalid image format. Only png, jpg or jpeg', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          return
        }
        try {
          const data = await connectCloudinary.post('/upload', formData)
          .then(res => setUploadImage(res.data.secure_url))
          .catch(error => ( 
            toast.error('An unexpected error has occurred, please try again after a few minutes.', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          ))
          setLoadingImage(false)
        } catch (error) {
          setLoadingImage(false)
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
        if(editProduct.name && editProduct._id){
          setEdit(true)
          setProductId(editProduct._id)
          setPlateName(editProduct.name)
          setPlateDescription(editProduct.description)
          setShow(editProduct.visible)
          setCategory(editProduct.categories)
          setAllergens(editProduct.allergens)
          setPrice(editProduct.price)
          setUploadImage(editProduct.image)
        }
      },[editProduct])

      const handleEditProduct = async (id) => {
        getProducts.filter(product => product._id === id && setEditProduct(product))
        setCreateProduct(true)
      }

      const handleEditOneProduct = async (e) => {
        e.preventDefault()
        if([plateName, plateDescription, uploadImage].includes('')) {
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
          setLoading(false)
          return;
        }
        if(category.length <= 0) {
          toast.error('Select a category', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          setLoading(false)
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

        try {
          const {data} = await connectAxios.put('/products', editProduct, config)
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
            setLoading(false)
            return
          }
          const updateProduct = getProducts.map(product => product._id === data._id ? data : product )
          setGetProducts(updateProduct)
          setMsg('')
          setProductId('')
          setNewProduct({})
          setUploadImage('')
          setPlateName('')
          setPlateDescription('')
          setAllergens([])
          setPrice(0)
          setCategory({})
          setShow(true)
          setEdit(false)
          setLoading(false)
        } catch (error) {
          setLoadingImage(false)
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

      const handleCancelEditProduct = () => {
        setEditProduct({})
        setUploadImage('')
        setEdit(false)
        setProductId(null)
        setPlateName('')
        setPlateDescription('')
        setShow('')
        setCategory({})
        setAllergens([])
        setPrice(0)
        setCreateProduct(false)
      }

      const handleOpenProduct = () =>{
        setCreateProduct(!createProduct)
      }

  return (
    <ProductsContext.Provider
      value={{
        handleOpenProduct,
        createProduct,
        loading, setLoading,
        loadingProducts, setLoadingProducts,
        getProducts, setGetProducts,
        editProduct, setEditProduct,
        msg, setMsg,
        handleNewProduct,
        handleSelectCategory,
        handleSelectAllergens,
        loadingImage, setLoadingImage,
        handleImage,
        handleEditProduct,
        edit,
        newProduct,
        handleEditOneProduct,
        handleCancelEditProduct
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}


export { ProductsProvider }

export default ProductsContext