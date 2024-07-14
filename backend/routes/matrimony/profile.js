import express from 'express'
import { acceptRequest, createProfile, getProfileByUserID, listOfAccepted, listOfRejection, listOfSentRequest, rejectTheRequest, requestListOfUser, searchProfiles, sendRequest, viewAUser } from '../../controllers/matrimonyProfile.js'
import MatrimonyProfileconnection from '../../models/ConnectedProfile.js';
import { verifyProfile, verifyUser } from '../../utils/verifyToken.js';
const router = express.Router()

router.post('/createProfile',createProfile)
router.get('/searchProfiles', searchProfiles);
router.get('/getProfile/:id',viewAUser);
router.post('/sendRequest/:id',verifyProfile,sendRequest)
router.post('/acceptRequest/:id',verifyProfile,acceptRequest) 
router.post('/rejectTheRequest/:id',rejectTheRequest)
router.get('/getProfileByUserID/:id',verifyUser,getProfileByUserID)
// router.get('/listOfRequests/:profileId',requestListOfUser)
router.get('/listOfRequests/:id',verifyProfile, requestListOfUser);
router.get('/listOfSentRequest/:id',verifyProfile,listOfSentRequest)
router.get('/listOfAccepted/:id',verifyProfile,listOfAccepted)
router.get('/listOfRejection/:id',verifyProfile,listOfRejection)
export default router