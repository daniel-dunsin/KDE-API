const NotificationModel = require('../models/notifications.model');

const saveNotification = (notification, res)=>{
    let newNotification = new NotificationModel(notification).save()
    newNotification
    .then((notification)=>{
        if(res){
             res.status(200).json({
            message: "Notification Sent"
        })
        }
       
    })
    .catch((error)=>{
        if (res){
             res.status(400).json({
            message: error.message
        })
        }
       
    }
    )
}

const sendNotification = async (req, res)=>{
    const notification = req.body;
    notification.sender = req.user;
    saveNotification(notification, res)
}

const getUsersNotification = async (req, res)=>{
    const user = req.user;
    let {page} = req.query;
    
    const limit = 10
    const noOfNotifications = await NotificationModel.find({receiver: user})
    await NotificationModel.find({receiver: user}).sort({"createdAt": -1})
    .skip(((page || 1) - 1) * limit)
    .limit(limit)
    .then(response => {
        res.json({
            notifications: response,
            noOfNotifications: noOfNotifications.length
        })
    })
    .catch((error)=>{
        res.json({
            error: error.message
        })
    })
}

const readNotification = async (req, res)=>{
    const id = req.params.id
    NotificationModel.findByIdAndUpdate(id, {read: true}, {new: true})
    .then(response => {
        res.json(response)
    })
    .catch((error)=>{
        res.json({
            error: error
        })
    })
}

const getUnreadNotification = async (req, res)=>{
    const user = req.user;
    NotificationModel.find({receiver: user})
    .then(response => {
        let unread = response.filter(notification => notification.read === true).length
        res.json({
            unread: unread
        })
    })
    .catch((error)=>{
        res.json({
            error: error.message
        })
    })
}


module.exports = {
    sendNotification, getUsersNotification, readNotification, getUnreadNotification, saveNotification}