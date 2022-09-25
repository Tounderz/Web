import { makeAutoObservable } from 'mobx'

export default class UpdateStore {
    constructor() {
        this._updateParameter = ''

        makeAutoObservable(this)
    }

    setUpdateParameter(updateParameter) {
        this._updateParameter = updateParameter
    }
    
    get updateParameter() {
        return this._updateParameter
    }
}