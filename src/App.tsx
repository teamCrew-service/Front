import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import './App.css';
import OnBoarding from './pages/onboarding/Onboarding';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import FindCrew from './pages/findcrew/FindCrew';
import Category from './pages/userinfo/1.category/Category';
import Nickname from './pages/userinfo/2.nickname/Nickname';
import Birthday from './pages/userinfo/3.birthday/Birthday';
import Gender from './pages/userinfo/4.gender/Gender';
import Profile from './pages/userinfo/5.profile/Profile';
import Introduction from './pages/userinfo/6.introduction/Introduction';
import Location from './pages/userinfo/7.location/Location';
import UpcomingSchedule from './pages/upcomingschedule/UpcomingSchedule';
import SearchByCategory from './pages/searchbycategory/SearchByCategory';
import Detail from './pages/detail/Detail';
import CreateCrew from './pages/createcrew/CreateCrew';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <div id="total">
          <div className="container">
            <Routes>
              <Route path="/" element=<OnBoarding /> />
              <Route path="/login" element=<Login /> />
              <Route path="/login/category" element=<Category /> />
              <Route path="/login/nickname" element=<Nickname /> />
              <Route path="/login/birthday" element=<Birthday /> />
              <Route path="/login/gender" element=<Gender /> />
              <Route path="/login/profile" element=<Profile /> />
              <Route path="/login/introduction" element=<Introduction /> />
              <Route path="/login/location" element=<Location /> />
              <Route path="/home" element=<Home /> />
              <Route path="/findcrew" element=<FindCrew /> />
              <Route path="/detail/:id" element=<Detail /> />
              <Route path="/upcomingschedule" element=<UpcomingSchedule /> />
              <Route path="/searchbycategory" element=<SearchByCategory /> />
              <Route path="/makecrew" element=<CreateCrew /> />
            </Routes>
          </div>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
