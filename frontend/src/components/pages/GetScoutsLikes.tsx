import  React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "App"
// api
import { createUserLike, getLikes } from "api/like"
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
  scoutsList: {
    margin: theme.spacing(2),
    padding: "0 1em",
  },
}))

const GetScoutsLikes:React.FC = () => {

  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)
  const [likedUsers, setLikedUsers] = useState<User[]>([]) // いいねをされたユーザー
  const [likes, setLikes] = useState<Like[]>([])

  const handleCreateLike = async (likedUser: User) => {
    const data: Like = {
      fromUserId: currentUser?.id,
      toUserId: likedUser.id
    }

    try {
      const res = await createUserLike(data)
      console.log(res)

      if (res?.status === 200) {
        setLikes([res.data.like, ...likes])
        setLikedUsers([likedUser, ...likedUsers])

        console.log(res?.data.like)
      } else {
        console.log("いいねの作成に失敗しました")
      }
    } catch (err) {
      console.log(err)
    }
  }

  // いいね一覧を取得
  const handleGetLikes = async () => {
    try {
      const res = await getLikes()
      console.log(res.data)
      if (res.status === 200) {
        setLikedUsers(res.data.passiveLikes)
        console.log(res.data.passiveLikes)
      } else {
        console.log("いいねはまだありません")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetLikes()
  }, [])

  // すでにいいねを押したユーザーかどうか判定
  const isLikedUser = (userId: string | undefined): boolean => {
    return likedUsers?.some((likedUser: User) => likedUser.id === userId)
  }

  // いいねをしてくれたユーザーのみ取得
  return (
    <>
      <Typography variant="h6">
        受け取ったいいね一覧
      </Typography>      
      {
        likedUsers?.length > 0 ? (
          <Grid container justify="center">
            {
              likedUsers.map((likedUser: User, index: number) => {
                return (
                  <div key={index}>
                    <Card className={classes.scoutsList}>
                      <Grid item style={{ margin: "0.5rem", cursor: "pointer" }}>
                        <Avatar
                          alt="avatar"
                          src={likedUser?.image.url}
                        />
                        <Typography
                          variant="body2"
                          component="p"
                          gutterBottom
                          style={{ marginTop: "0.5rem", textAlign: "center" }}
                        >
                          {likedUser.name}
                        </Typography>
                      </Grid>

                      <Grid container justify="center">
                        <Button
                          variant="outlined"
                          onClick={() => isLikedUser(likedUser.id) ? void(0) : handleCreateLike(likedUser)}
                          color="secondary"
                          startIcon={isLikedUser(likedUser.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                          disabled={isLikedUser(likedUser.id) ? true : false}
                          style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        >
                          {isLikedUser(likedUser.id) ? "いいね済み" : "いいね"}
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
  );
}

export default GetScoutsLikes