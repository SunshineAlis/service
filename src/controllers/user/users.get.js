// import { User } from "../../model/user.model.js";

// export const getUser = async (req, res) => {
//     try {
//         const { email } = req.user;
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).send({ message: "User not found" });
//         }

//         res.status(200).send({
//             message: "Fetched user information",
//             email: user.email,
//             phone: user.phone,
//             address: user.address,

//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "Server error" });
//     }
// };

