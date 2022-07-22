import { makeAutoObservable } from 'mobx'

export default class UserStore {
    constructor() {
        this._selectedUser = {}
        this._user = {}
        this._usersList = []
        this._countPages = 0

        makeAutoObservable(this)
    }

    setUser(user) {
        this._user = user
    }

    setUsersList(usersList) {
        this._usersList = usersList
    }
    
    setCountPages(countPages) {
        this._countPages = countPages
    }

    get user(){
        return this._user
    }

    get usersList() {
        return this._usersList
    }

    get countPages() {
        return this._countPages
    }

    setSelectedUser(user) {
        this._selectedUser = user
    }

    get selectedUser() {
        return this._selectedUser
    }
}