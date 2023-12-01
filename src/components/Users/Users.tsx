import React from 'react'
import { UsersType } from './UsersContainer'
import styles from './Users.module.css'

export const Users: React.FC<UsersType> = (props) => {

    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                photoUrl: 'https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png',
                followed: false,
                fullName: 'Dima',
                status: 'status',
                location: {
                    city: 'Minsk',
                    country: 'Belarus'
                }
            },
            {
                id: 2,
                photoUrl: 'https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png',
                followed: true,
                fullName: 'Petr',
                status: 'status',
                location: {
                    city: 'Moscow',
                    country: 'Russia'
                }
            },
            {
                id: 3,
                photoUrl: 'https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png',
                followed: false,
                fullName: 'Sveta',
                status: 'status',
                location: {
                    city: 'Minsk',
                    country: 'Belarus'
                }
            }
        ])
    }

    return (
        <div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photoUrl} className={styles.userPhoto} />
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button>
                                : <button onClick={() => props.follow(u.id)}>Follow</button>
                            }

                        </div>
                    </span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </div>)
            }
        </div>
    )
}
