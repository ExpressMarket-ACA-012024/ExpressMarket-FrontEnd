import React, { useState } from 'react';
import Logo from '../../assets/img/ExpressMarketLogo.png';
import { useAppContext, getToken, getRoleNames } from '../../context/AppContext';

function Login() {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const onChange = (e, save) => {
    save(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();

    if (email === '') {
      setEmailError('Correo electrónico inválido');
      return;
    }

    if (password === '') {
      // Agrega el código para mostrar un error en caso de contraseña vacía
      return;
    }

    const logged = await login(email, password);

    // if (!logged) {
    //   // Agrega el código para mostrar un error en caso de error en el inicio de sesión
    //   return;
    // }

    setEmail('');
    setPassword('');
  }

  if (getToken() && getRoleNames()?.includes("User")) {
    window.location.href = './';
  } else if (getToken() && getRoleNames()?.includes("Admin")) {
    window.location.href = './products-admin';
  }

  return (
    <>
      <div className='bg-emerald-700 h-screen w-screen flex justify-center'>
        <div className='bg-white h-[28rem] w-[20rem] lg:w-[20rem] m-auto p-auto rounded-xl shadow-xl shadow-gray-800'>
          <div className='flex justify-between items-center flex-col h-full w-full'>
            <div className='justify-center text-center'>
              <img className='w-36 my-6' src={Logo} alt='Express Market Logo' />
              <p className='font-montserrat text-lg text-orange-600 text-center font-bold'>Express Market</p>
            </div>
            <form className='mt-4' onSubmit={onSubmit}>
              <div>
                <input
                  autoComplete='off'
                  id='email'
                  name='email'
                  type='email'
                  className={`peer placeholder-emerald-500 text-md text-emerald-800 h-10 w-72 border-2 shadow-sm rounded-lg border-emerald-700 focus:outline-none mb-4 ${emailError ? 'border-rose-600' : 'border-gray-300'
                    }`}
                  placeholder='Correo electrónico'
                  onChange={(e) => onChange(e, setEmail)}
                  value={email}
                  required
                />
                {emailError && (
                  <p className='text-red-500 font-semibold text-xs'>{emailError}</p>
                )}
                <div className='relative'>
                  <input
                    autoComplete='off'
                    id='password'
                    name='password'
                    type='password'
                    className='mt-4 peer placeholder-emerald-500 text-md h-10 w-72 border-2 shadow-sm rounded-lg border-emerald-700 text-emerald-800 focus:outline-none'
                    placeholder='Contraseña'
                    onChange={(e) => onChange(e, setPassword)}
                    value={password}
                  />
                </div>
                <div>
                  {/*<a href={'./sendemailresetpassword'}>
                    <p className='text-pure-indigo py-2 text-base font-light'>
                      Olvidaste la contraseña?
                    </p>
                  </a>*/}
                </div>
              </div>

              <div className='flex flex-col gap-5 my-8 text-white'>
                <button
                  type='submit'
                  className='bg-emerald-950 rounded-lg p-2 text-center h-12 w-72 font-bold shadow-silver shadow-md hover:bg-emerald-500'
                >
                  INICIAR SESIÓN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
