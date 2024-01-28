const deleteUser = async (req, res) => {
    try {
        const { userId } = req.decoded;
        const deletedUser = await User.findByIdAndDelete({ _id: userId });
        return successResMsg(res, 200, { message: "User deleted successfully", deletedUser })
    } catch (error) {
        console.log(error);
        return errorResMsg(res, 500, { message: "User Not Deleted" });
    }
}
module.exports = deleteUser;