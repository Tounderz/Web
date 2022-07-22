import { makeAutoObservable } from 'mobx'

export default class ProductStore {
    constructor() {
        this._categories = []
        this._types = []
        this._brands = []
        this._products = []
        this._paymentMethods = []
        this._popularProducts = []
        this._popularBrands = []
        this._popularCategories = []
        this._popularProducts = []
        this._brandsByCategory = []
        this._categoriesByBrand = []
        this._brandsByType = []
        this._countPages = []
        this._ordersList = []
        this._baskets = []
        this._infoProduct = []
        this._totalAmount = 0

        this._selectedProduct = {}
        this._selectedCategory = {}
        this._selectedType = {}
        this._selectedBrand = {}
        this._selectedOrderId = {}
        this._selectedInfoProduct = {}
        this._selectedIsFavourite = {}
        this._selectedAvailable = 0
        this._selectedIsFavourite = 0
        this._selectedSearchParameter = ''
        
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        
        makeAutoObservable(this)
    }

    setProducts(products) {
        this._products = products
    }
    setPopularProducts(popularProducts) {
        this._popularProducts = popularProducts
    }

    setInfoProduct(infoProduct) {
        this._infoProduct = infoProduct
    }

    setCategories(categories) {
        this._categories = categories
    }
    setPopularCategories(popularCategories) {
        this._popularCategories = popularCategories
    }
    setBrandsByCategory(brandsByCategory) {
        this._brandsByCategory = brandsByCategory
    }

    setTypes(types) {
        this._types = types
    }
    setBrandsByType(brandsByType) {
        this._brandsByType = brandsByType
    }

    setBrands(brands) {
        this._brands = brands
    }
    setPopularBrands(popularBrands) {
        this._popularBrands = popularBrands
    }
    setCategoriesByBrand(categoriesByBrand) {
        this._categoriesByBrand = categoriesByBrand
    }

    setPaymentMethods(paymentMethods) {
        this._paymentMethods = paymentMethods
    }

    setCountPages(countPages) {
        this._countPages = countPages
    }

    setOrdersList(ordersList) {
        this._ordersList = ordersList
    }
    setTotalAmount(totalAmount) {
        this._totalAmount = totalAmount
    }

    setBaskets(baskets) {
        this._baskets = baskets
    }

    setSelectedProduct(product) {
        this._selectedProduct = product
    }

    setSelectedCategory(category) {
        // this.setPage(1)
        this._selectedCategory = category
    }

    setSelectedType(type) {
        // this.setPage(1)
        this._selectedType = type
    }

    setSelectedBrand(brand) {
        // this.setPage(1)
        this._selectedBrand = brand
    }

    setSelectedOrderId(orderId) {
        this._selectedOrderId = orderId
    }

    setSelectedInfoProduct(info) {
        this._selectedInfoProduct = info
    }

    setSelectedSearchParameter(parameter) {
        this._selectedSearchParameter = parameter
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    setLimit(limit) {
        this._limit = limit
    }

    setSelectedAvailable(available) {
        this._selectedAvailable = available
    }
    get selectedAvailable() {
        return this._selectedAvailable
    }
    setSelectedIsFavourite(isFavourite) {
        this._selectedIsFavourite = isFavourite
    }
    get selectedIsFavourite() {
        return this._selectedIsFavourite
    }

    get products() {
        return this._products
    }
    get popularProducts() {
        return this._popularProducts
    }

    get infoProduct() {
        return this._infoProduct
    }
    
    get categories() {
        return this._categories
    }
    get popularCategories() {
        return this._popularCategories
    }
    get brandsByCategory() {
        return this._brandsByCategory
    }

    get types() {
        return this._types
    }
    get brandsByType() {
        return this._brandsByType
    }

    get brands() {
        return this._brands
    }
    get popularBrands() {
        return this._popularBrands
    }
    get categoriesByBrand() {
        return this._categoriesByBrand
    }

    get paymentMethods() {
        return this._paymentMethods
    }

    get countPages() {
        return this._countPages
    }

    get baskets() {
        return this._baskets
    }

    get selectedProduct() {
        return this._selectedProduct
    }

    get selectedCategory() {
        return this._selectedCategory
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedBrand() {
        return this._selectedBrand
    }

    get selectedOrderId() {
        return this._selectedOrderId
    }

    get selectedInfoProduct() {
        return this._selectedInfoProduct
    }

    get selectedSearchParameter() {
        return this._selectedSearchParameter
    }

    get totalCount() {
        return this._totalCount
    }

    get ordersList() {
        return this._ordersList
    }

    get totalAmount() {
        return this._totalAmount
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }
}