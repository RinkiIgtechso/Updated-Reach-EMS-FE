import {Routes,Route, useRoutes} from 'react-router-dom';
import SignIn from '../pages/SignIn/SignIn';
import ForgetPassword from "../pages/SignIn/ForgetPassword"
import ResetPassword from '../pages/SignIn/ResetPassword';
import Event from '../pages/Event/Event';
import Dashboard from '../pages/Dashboard/Dashboard';
import CheckIns from '../pages/CheckIns/CheckIns';
import Invitation from '../pages/Influencers/Invitation';
import Bookings from '../pages/Bookings/Bookings';
import PageNotFound from '../pages/404Page';
import PrivateRoute, {CheckLogin} from './PrivateRoute';
import Company from '../pages/Company/Company';
import ViewInfluencer from '../pages/Influencers/ViewInfluencer';
import ViewEvent from '../pages/Event/ViewEvent';

function AllRoutes(){

    return(
        <Routes>
            <Route path='/admin' element={
                <CheckLogin>
                    <SignIn />
                </CheckLogin>
            } />
            <Route path='/company' element={
                <CheckLogin>
                    <SignIn />
                </CheckLogin>
            } />
            <Route path='/influencer' element={
                <CheckLogin>
                    <SignIn />
                </CheckLogin>
            } />
            <Route path='/forgetPassword' element={<ForgetPassword />} />
            <Route path='/resetPassword' element={<ResetPassword />} />
            <Route path='/event' element={
                <PrivateRoute>
                    <Event />
                </PrivateRoute>
            } />
            <Route path='/dashboard' element={
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            } />
            <Route path='/companies' element={
                <PrivateRoute>
                    <Company />
                </PrivateRoute>
            }/>
            <Route path='/checkIn' element={
                <PrivateRoute>
                    <CheckIns />
                </PrivateRoute>
            } />
            <Route path='/influencers' element={
                <PrivateRoute>
                    <Invitation />
                </PrivateRoute>
            } />
            <Route path={`/influencer/:id`} element={<ViewInfluencer />} />
            <Route path={`/viewEvent/:id`} element={<ViewEvent />} />
            <Route path='/myBookings' element={
                <PrivateRoute>
                    <Bookings/>
                </PrivateRoute>
            } />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default AllRoutes;