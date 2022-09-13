import { makeAutoObservable } from 'mobx'

export default class BrandStore {
    constructor() {
        this._brands = []
        this._popularBrands = []
        this._brandsByCategory = []
        this._brandsByType = []
        this._selectedBrand = {}

        makeAutoObservable(this)
    }

    //brandsParameter
    setBrands(brands) {
        this._brands = brands
    }
    get brands() {
        return this._brands
    }
    
    setPopularBrands(popularBrands) {
        this._popularBrands = popularBrands
    }
    get popularBrands() {
        return this._popularBrands
    }
    
    setBrandsByCategory(brandsByCategory) {
        this._brandsByCategory = brandsByCategory
    }
    get brandsByCategory() {
        return this._brandsByCategory
    }
    
    setBrandsByType(brandsByType) {
        this._brandsByType = brandsByType
    }
    get brandsByType() {
        return this._brandsByType
    }
    
    setSelectedBrand(brand) {
        // this.setPage(1)
        this._selectedBrand = brand
    }
    get selectedBrand() {
        return this._selectedBrand
    }
}