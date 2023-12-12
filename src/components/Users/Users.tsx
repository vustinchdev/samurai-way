import React from 'react'
import styles from './Users.module.css'
import axios from 'axios'
import userPhoto from '../../assets/images/user.png'
import { UsersType } from './UsersContainer'


export class Users extends React.Component<UsersType> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(res => this.props.setUsers(res.data.items))
    }

    render() {
        return (
            <div>
                {
                    this.props.users.map(u => <div key={u.id}>
                        <span>
                            <div>
                                <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto} />
                            </div>
                            <div>
                                {u.followed
                                    ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button>
                                    : <button onClick={() => this.props.follow(u.id)}>Follow</button>
                                }

                            </div>
                        </span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </div>)
                }
            </div>
        )
    }
}





