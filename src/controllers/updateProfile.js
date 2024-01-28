const updateProfile = async (req, res) => {
    try {
        const { userId } = req.decoded;
        const { userName, email } = req.body;

        const newUser = await User.findByIdAndUpdate(
            {
                _id: userId,
            },
            { userName: userName, email: email },
            { isNew: true }
        );
        return successResMsg(res, 200, {
            message: "User Profile Updated Successfully",
            newUser,
        });
    } catch (error) {
        return errorResMsg(error, 500, { message: "User Profile Not Updated" });
    }
};
module.exports = updateProfile