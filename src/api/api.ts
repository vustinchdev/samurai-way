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
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instanse.get(`profile/${userId}`)
    },
    getStatus(userId: string) {
        return instanse.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instanse.put('profile/status', { status })
    }
}

export const authAPI = {
    me() {
        return instanse.get('auth/me')
    }
}

