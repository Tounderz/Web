import { makeAutoObservable } from 'mobx'

export default class CartStore {
    constructor() {
        this._baskets = []
        this._totalAmount = 0

        makeAutoObservable(this)
    }

    setBaskets(baskets) {
        this._baskets = baskets
    }
    get baskets() {
        return this._baskets
    }

    setTotalAmount(totalAmount) {
        this._totalAmount = totalAmount
    }
    get totalAmount() {
        return this._totalAmount
    }   
}