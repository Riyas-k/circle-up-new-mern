import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function CheckUser() {
    const user = useSelector((store)=>store.user.payload)
    const status = user.userExist.isBlock
  return  !status?<Outlet />:<Navigate to='/' />
}

export default CheckUser
