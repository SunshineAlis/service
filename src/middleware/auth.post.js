
import bcrypt from "bcryptjs";


export const checkPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  try {
    // Нууц үг шаардлагатай эсэхийг шалгах
    if (!password && password !== confirmPassword) {
      res.status(400).json({ message: "Error" });
    }



    // Нууц үгийн урьдчилсан шалгалт
    const passVal = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passVal.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long, contain letters, numbers, and a special character",
      });
    }

    // Баталгаажуулахад алдаа байхгүй бол confirmPassword устгаж, хэшлэсэн нууц үгийг хадгалах

    req.body.password = await bcrypt.hash(password, 10);


  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};