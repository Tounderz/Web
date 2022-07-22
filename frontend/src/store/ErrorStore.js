import { makeAutoObservable } from 'mobx'

export default class UserStore {
    constructor() {
        this._messageError = ''

        makeAutoObservable(this)
    }

    setMessageError(messageError) {
        this._messageError = messageError
    }
    
    get messageError() {
        return this._messageError
    }
}