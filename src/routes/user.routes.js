import {Router} from "express"
import { loginUser, registerUser , logoutUser, refreshAccessToken , changeCurrentPassword , getCurrentUser , updateAccountDetails , updateUserAvatar , updateUserCoverImage , getUserChannelProfile , getWatchHistory } from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route('/register').post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "coverImage",
            maxCount : 1
        }
    ]),  // middleware
    registerUser
)
router.route('/login').post(loginUser)

//secure routes 
// give acess to logout when user is login
//verify using jwt tokens and cookies
//inject middleware in  logout route

router.route('/logout').post(
    verifyJWT,
    logoutUser
)
// router can confuse what to do after running verifyJWT , that's why
// we write next() in auth middleware so that after running verifyjwt it run logout user



router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT , changeCurrentPassword)
router.route("/current-user").get(verifyJWT , getCurrentUser)
router.route("/update-account").patch(  verifyJWT , updateAccountDetails )
router.route("/avatar").patch(verifyJWT , upload.single("avatar") , updateUserAvatar)
router.route("/coverImage").patch(verifyJWT , upload.single("coverImage") , updateUserCoverImage)
router.route("/c/:username").get(verifyJWT , getUserChannelProfile)
router.route("/history").get(verifyJWT , getWatchHistory)

export default router