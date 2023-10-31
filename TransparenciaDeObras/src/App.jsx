import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './componentes/Button'
import FormularioBuscarObrasTransparencia from './componentes/FormularioBuscarObrasTransparencia'
import ExibirProjetoDeObras from './componentes/ExibirProjetoDeObras'

function App() {

  return (
    <>
      <FormularioBuscarObrasTransparencia/>
      <ExibirProjetoDeObras/>
    </>
  )
}

export default App;
