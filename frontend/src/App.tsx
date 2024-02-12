import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";

import Home from "components/pages/Home"
import SignUp from "components/pages/SignUp"
import SignIn from "components/pages/SignIn"
import Dashboard from "components/pages/dashboards/Dashboard"
import UserProfile from "components/pages/UserProfile"
import { getCurrentUser } from "api/auth"
import { User } from "interfaces/user"
import PrivacyPolicy from "components/pages/PrivacyPolicy";
import Terms from "components/pages/Terms";
import GetApplyUsers from "components/pages/GetApplyUsers"
import SearchUsers from "components/pages/SearchUsers";
import GetScoutsLikes from "components/pages/GetScoutsLikes";
import ChatRooms from "components/pages/ChatRooms";
import ChatRoom from "components/pages/ChatRoom"
import UserSkills from "components/pages/UserSkills";
import Index from "components/layouts/Index";
import JobRegister from "components/features/jobs/JobRegister";
import Community from "components/pages/Community"
import UserSettings from "components/pages/UserSettings";
import EngineerCommunity from "components/pages/EngineerCommunity";
import JobShow from "components/features/jobs/Index";
import RegisterOrganization from "components/pages/RegisterOrganization";
import ShowOrganization from "components/features/organizations/ShowOrganization";
// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.currentUser)

        console.log(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
          <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route
              path="/home"
              element={
              !loading ? (
                isSignedIn ? (
                  <Home />
                ) : (
                  <Navigate to="/signin" />
                )
              ) : (
              <></>
              )
              }
            />
            <Route path="/user/:id" element={<UserProfile/>}/>
            <Route path="/job/:id/apply" element={<GetApplyUsers/>}/>
            <Route path="/dashboards" element={<Dashboard/>}/>
            <Route path="/terms" element={<Terms/>}/>
            <Route path="/privacy" element={<PrivacyPolicy/>}/>
            <Route path="/search-users" element={<SearchUsers/>}/>
            <Route path="/likes" element={<GetScoutsLikes/>}/>
            <Route path="/chatrooms" element={<ChatRooms/>}/>
            <Route path="/chatroom/:id" element={<ChatRoom/>} />
            <Route path="/user/skills" element={<UserSkills/>}/>
            <Route path="/communities" element={<Community/>}/>
            <Route path="/user/settings" element={<UserSettings/>}/>
            <Route path="/dashboards" element={<Dashboard/>}/>
            <Route path="/community/engineer" element={<EngineerCommunity/>}/>
            <Route path="/company/new-job" element={<JobRegister/>}/>
            <Route path="/job/:id" element={<JobShow/>}/>
            <Route path="/company/register-form" element={<RegisterOrganization/>}/>
            <Route path="/organization/:id" element={<ShowOrganization/>}/>
          </Routes>
      </AuthContext.Provider>
    </Router>
  )
}

export default App
