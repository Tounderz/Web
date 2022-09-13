import { makeAutoObservable } from 'mobx'

export default class CategoryStore {
    constructor() {
        this._categories = []
        this._popularCategories = []
        this._categoriesByBrand = []
        this._selectedCategory = {}

        makeAutoObservable(this)
    }

    //categoriesParameter
    setCategories(categories) {
        this._categories = categories
    }
    get categories() {
        return this._categories
    }
    
    setPopularCategories(popularCategories) {
        this._popularCategories = popularCategories
    }
    get popularCategories() {
        return this._popularCategories
    }
    
    setCategoriesByBrand(categoriesByBrand) {
        this._categoriesByBrand = categoriesByBrand
    }
    get categoriesByBrand() {
        return this._categoriesByBrand
    }
    
    setSelectedCategory(category) {
        // this.setPage(1)
        this._selectedCategory = category
    }
    get selectedCategory() {
        return this._selectedCategory
    }
}