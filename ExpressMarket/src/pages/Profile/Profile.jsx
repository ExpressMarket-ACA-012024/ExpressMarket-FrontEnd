import { useState, useEffect } from 'react'
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import { getUser, updateUserPassword } from '../../services/UserService'
import snapy from "../../assets/img/SNOPY.png"


function Profile() {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getUser();
                setUser(result.user);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [setUser]);


    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setPasswordError("Las contraseñas no coinciden");
            return;
        } else {
            updateUserPassword(newPassword, confirmPassword)
        }

        // Restablecer los campos del formulario
        setNewPassword("");
        setConfirmPassword("");
        setPasswordError("");
    }
    return (
        <div className="min-h-screen w-screen bg-purple-600 flex items-start pt-16 relative">
          <div className="bg-white rounded-t-lg shadow-lg w-full mx-4 p-8 text-center h-[calc(100vh-4rem)] relative">
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <img
                src={snapy}
                alt="User"
                className="w-32 h-32 rounded-full border-4 border-white"
              />
            </div>
            <h1 className="text-2xl font-bold mb-8 mt-28 ">Nombre del Usuario</h1>
            <div className="grid grid-cols-1 gap-8 mb-8">
              <div className="flex items-center justify-center">
                <div className="w-full md:w-96 text-left">
                  <p className="text-gray-600 font-semibold">Teléfono:</p>
                  <p className="bg-gray-100 text-gray-800 rounded px-4 py-2">123-456-7890</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full md:w-96 text-left">
                  <p className="text-gray-600 font-semibold">Email:</p>
                  <p className="bg-gray-100 text-gray-800 rounded px-4 py-2">usuario@ejemplo.com</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full md:w-96 text-left">
                  <p className="text-gray-600 font-semibold">Dirección:</p>
                  <p className="bg-gray-100 text-gray-800 rounded px-4 py-2">Calle Ejemplo 123</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-16">
              <button className="bg-purple-600 text-white py-2 px-4 rounded shadow-md">Ir Atrás</button>
            </div>
            <div className="absolute bottom-8 right-16">
              <button className="bg-purple-600 text-white py-2 px-4 rounded shadow-md">En Blanco</button>
            </div>
          </div>
        </div>
      );
}   

export default Profile