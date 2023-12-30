import axios from "axios"

const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instanse.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    follow(userId: number) {
        return instanse.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instanse.delete(`follow/${userId}`)
    },
    getProfile(userId: string) {
        return instanse.get('profile/' + userId)
    }
}

export const authAPI = {
    me() {
        return instanse.get('auth/me')
    }
}

