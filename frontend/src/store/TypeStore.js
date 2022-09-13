import { makeAutoObservable } from 'mobx'

export default class TypeStore {
    constructor() {
        this._types = []
        this._selectedType = {}

        makeAutoObservable(this)
    }

    //typesParameter
    setTypes(types) {
        this._types = types
    }
    get types() {
        return this._types
    }
    
    setSelectedType(type) {
        // this.setPage(1)
        this._selectedType = type
    }
    get selectedType() {
        return this._selectedType
    }
}