
// User lists
const userList = (req, res) => {
    return res.status(200).json({
        status: true,
        message: "User created successfully.",
        data: []
    })
}


export default {
    userList
}
