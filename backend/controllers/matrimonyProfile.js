
import MatrimonyProfileconnection from "../models/ConnectedProfile.js";
import ConversationMembers from "../models/conversation.js";
import Profile from "../models/MatrimonyProfile.js";

export const createProfile = async (req, res) => {
    try {
        const newProfile = new Profile(req.body);
        await newProfile.save()
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const searchProfiles = async (req, res) => {
    try {
        const { minAge, maxAge, state, district, profession, qualification } = req.query;
        let query = {};
        if (minAge && maxAge) {
            query.age = { $gte: minAge, $lte: maxAge };
        } else if (minAge) {
            query.age = { $gte: minAge };
        } else if (maxAge) {
            query.age = { $lte: maxAge };
        }

        if (state && state.trim() !== "") {
            query.state = state;
        }

        if (district && district.trim() !== "") {
            query.district = district;
        }

        if (profession && profession.trim() !== "") {
            query.profession = profession;
        }

        if (qualification && qualification.trim() !== "") {
            query.qualification = qualification;
        }

        console.log(query);
        const profiles = await Profile.find(query);

        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const viewAUser = async (req, res) => {
    const profileId = req.params.id
    try {
        const fetchAUser = await Profile.findById({
            _id: profileId
        })
        res.status(200).json(fetchAUser)
    } catch (error) {
        console.log(error);
    }
}

export const getProfileByUserID = async (req, res) => {
    const userId = req.params.id
    try {
        const fetchUserProfile = await Profile.findOne({
            userId: userId
        })
        res.status(200).json(fetchUserProfile._id)
    } catch (error) {
        console.log(error);
    }
}
export const sendRequest = async (req, res) => {
    // const { fromUID, toUID } = req.body;
    const fromUID = req.params.id
    const { toUID } = req.body
    if (!fromUID || !toUID) {
        return res.status(404).json({ message: "One or both user IDs are not found" });
    }

    if (fromUID === toUID) {
        return res.status(400).json({ message: "You cannot send a request to yourself" });
    }

    const duplicateRequest = await MatrimonyProfileconnection.findOne({
        fromUID: fromUID,
        toUID: fromUID
    })
    if (duplicateRequest) {
        return res.status(400).json({ message: "You have already sent a request to this user" })
    }
    else {
        try {
            const existingRequest = await MatrimonyProfileconnection.findOne({ fromUID, toUID });
            if (existingRequest) {
                return res.status(400).json({ message: "You have already sent a request" });
            }

            const newRequest = new MatrimonyProfileconnection({ fromUID, toUID });
            await newRequest.save();
            res.status(200).json({ message: "Request sent successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error" });
        }
    }

};



export const canelSentRequest = async (req, res) => {

    const { fromUID, toUID } = req.body;
    // const fromUID = req.params.id
    // const {toUID} = req.body
    const findRequest = await MatrimonyProfileconnection.findOne({
        fromUID: fromUID,
        toUID: toUID,
        status:"pending"
    })
    try {
        if (findRequest) {
            const cancelRequest = await MatrimonyProfileconnection.findOneAndDelete(findRequest)
        }
        res.status(200).json({ message: "Request cancelled successfully" });
    } catch (error) {
        console.log(error);
    }
}




export const acceptRequest = async (req, res) => {
    const requestToId = req.params.id;
    const { requestFromId } = req.body;

    // Validate input
    if (!requestFromId || !requestToId) {
        return res.status(400).json({ message: "Invalid request parameters" });
    }

    try {
        // Find the connection request
        const findConnectionRequest = await MatrimonyProfileconnection.findOne({ fromUID: requestFromId, toUID: requestToId });
        console.log("findConnectionRequest", findConnectionRequest);

        if (!findConnectionRequest) {
            return res.status(404).json({ message: "Connection request not found" });
        }

        if (findConnectionRequest.status === "pending") {
            // Update the request status to accepted
            findConnectionRequest.status = "accepted";
            await findConnectionRequest.save();

            // Create a new conversation for the accepted request
            const newConversation = new ConversationMembers({
                members: [findConnectionRequest.fromUID, findConnectionRequest.toUID]
            });
            await newConversation.save();

            return res.status(200).json({ message: "Request accepted successfully" });
        } else {
            return res.status(400).json({ message: "Connection request is already accepted or rejected" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const rejectTheRequest = async (req, res) => {
    // const { requestFromId } = req.body;
    // const { requestToId } = req.body;
    const requestToId = req.params.id
    const {requestFromId} = req.body

    try {
        const findConnectionRequest = await MatrimonyProfileconnection.findOne({ fromUID: requestFromId, toUID: requestToId });

        if (!findConnectionRequest) {
            return res.status(404).json({ message: "Connection request not found" });
        }

        if (findConnectionRequest.status === "pending") {
            findConnectionRequest.status = "rejected";
            await findConnectionRequest.save();
            return res.status(200).json({ message: "Request rejected successfully" });
        } else {
            return res.status(400).json({ message: "Connection request is already accepted or rejected" });
        }
    } catch (error) {
        console.error("Error rejecting request:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const requestListOfUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(`Fetching requests for userId: ${userId}`);

        const profiles = await MatrimonyProfileconnection.find({
            toUID: userId,
            status: 'pending',
        });

        res.status(200).json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const listOfSentRequest = async (req, res) => {
    try {
        const profileId = req.params.id;
        console.log(`Fetching requests for profileId: ${profileId}`);
        const profiles = await MatrimonyProfileconnection.find({
            fromUID: profileId,
            status: 'pending',
        });

        res.status(200).json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const listOfAccepted = async (req, res) => {
    const id = req.params.id;
    try {
        const connections = await MatrimonyProfileconnection.find({
            $or: [
                { fromUID: id, status: 'accepted' },
                { toUID: id, status: 'accepted' }
            ]
        });
        console.log(`Found ${connections.length} connections for user ID: ${id}`);
        res.status(200).json(connections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const listOfRejection = async (req, res) => {
    const id = req.params.id;
    if(id){
        try {
            const rejections = await MatrimonyProfileconnection.find({
                fromUID: id,
                status: 'rejected',
            })
            console.log(rejections);
            res.status(200).json(rejections)
        } catch (error) {
            console.error(error);
        }
    }else{
        res.status(400).json({message: 'Invalid request'})
    }
    
}




