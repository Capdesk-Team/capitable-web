import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from "App"
// api
import { getUsers } from "api/user"
import { createUserLike } from "api/like"
// interfaces
import { User } from "interfaces/user"
import { Like } from "interfaces/like"
//Material UI
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
// Material Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// Import Style
import { makeStyles, Theme } from "@material-ui/core/styles"

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  usersList: {
    margin: theme.spacing(2),
    padding: "0 1em",
  },
}))

const SearchUsers = () => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)

  const initialUserState: User = {
    id: '',
    uid: '',
    provider: '',
    email: '',
    name: '',
    image: {
      url: '',
    },
    techSkill: '',
    githubUrl: '',
    facebookUrl: '',
    portfolioUrl: '',
    career: '',
    nextCareer: '',
    nickname: '',
    allowPasswordChange: true,
  }

  
  const [users, setUsers] = useState<User[]>([])
  const [user, setUser] = useState<User>(initialUserState)
  const [likes, setLikes] = useState<Like[]>([])
  const [likedUsers, setLikedUsers] = useState<User[]>([])

  const handleCreateLike = async (user: User) => {
    const data: Like = {
      fromUserId: currentUser?.id,
      toUserId: user.id
    }

    try {
      const res = await createUserLike(data)
      console.log(res)

      if (res?.status === 200) {
        setLikes([res.data.like, ...likes])
        setLikedUsers([user, ...likedUsers])

        console.log(res?.data.like)
      } else {
        console.log("いいねの作成に失敗しました")
      }
    } catch (err) {
      console.log(err)
    }
  }

  // ユーザーの一覧取得
  const handleGetUsers = async () => {
    try {
      const res = await getUsers()
      console.log(res)

      if (res?.status === 200) {
        setUsers(res?.data)
      } else {
        console.log("ユーザーが取得できませんでした")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetUsers()
  }, [])

  // すでにいいねを押したユーザーかどうか判定
  const isLikedUser = (userId: string | undefined): boolean => {
    return likedUsers?.some((likedUser: User) => likedUser.id === userId)
  }

  return (
    <>
      {
        users?.length > 0 ? ( //ログイン済みユーザーにする
          <Grid container justify="center">
            {
              users.map((user: User, index) => {
                return (
                  <div key={index} onClick={() => {
                    setUser(user)
                  }}>
                    <Card className={classes.usersList}>
                      <Grid item style={{ margin: "0.5rem", cursor: "pointer" }}>
                        <Avatar
                          alt="avatar"
                          src={user?.image.url}
                        />
                        <Typography
                          variant="body2"
                          component="p"
                          gutterBottom
                          style={{ marginTop: "0.5rem", textAlign: "center" }}
                        >
                          {user.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="p"
                          gutterBottom
                          style={{ marginTop: "0.5rem", textAlign: "center" }}
                        >
                          {user.career}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="p"
                          gutterBottom
                          style={{ marginTop: "0.5rem", textAlign: "center" }}
                        >
                          {user.nextCareer}
                        </Typography>
                      </Grid>

                      <Grid container justify="center">
                        <Button
                          variant="outlined"
                          onClick={() => isLikedUser(user.id) ? void(0) : handleCreateLike(user)}
                          color="secondary"
                          startIcon={isLikedUser(user.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                          disabled={isLikedUser(user.id) ? true : false}
                          style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        >
                          {isLikedUser(user.id) ? "いいね済み" : "いいね"}
                        </Button>
                      </Grid>
                    </Card>
                    
                  </div>
                ) 
              })
            }
          </Grid>
        ) : (
          <Typography
            component="p"
            variant="body2"
            color="textSecondary"
          >
            まだ1人もユーザーがいません。
          </Typography>
        )
      }
      
    </>
  )
}

export default SearchUsers