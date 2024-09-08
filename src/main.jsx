import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'




import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Dashboard from './components/Dashboards.jsx';
import ManageProjects from './components/ManageProjects.jsx';
import ManageAbout from './components/ManageAbout.jsx';
import ManageSkills from './components/ManageSkills.jsx';
import ViewMessages from './components/ViewMessages.jsx';
import LoginPage from './components/LoginPage.jsx';
import Project from './components/Project.jsx';
import ProjectForm from './components/ProjectForm.jsx';
import { Provider } from 'react-redux';
import store from './Redux_STORE/store.js';
import NotFound from './components/NotFound.jsx';

const router = createBrowserRouter([
  {
    path :"/",
    element :<App/>,
    children:[
      {
        path :"",
        element :<Dashboard/>
      },{
        path :"/login",
        element :<LoginPage/>
      },
      {
        path :"/manage-projects",
        element :<ManageProjects/>
      },
      {
        path:"/manage-about",
        element :<ManageAbout/>
      },
      {
        path:"/manage-about",
        element :<ManageAbout/>
      },
      {
        path:"/manage-skills",
        element :<ManageSkills/>
      },
      {
        path:"/view-messages",
        element :<ViewMessages/>
      },
      {
        path:"/project/:projectId",
        element :<Project/>
      },
      {
        path:"/project/",
        element :<Project/>
      },
      {
        path:"/project-form",
        element :<ProjectForm/>
      },
      {
        path:"/project-form/:documentID",
        element :<ProjectForm/>
      },{
        path:"*",
        element :<NotFound/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store ={store}>
      <RouterProvider router={router} />
      </Provider>
  </StrictMode>,
)
