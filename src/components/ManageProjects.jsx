import React ,{useEffect, useState}from 'react';
import { PlusCircle } from 'lucide-react';
import ProjectsLinkCard from './ProjectsLinkCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import projectservice from '../AppwriteService/ProjectFormService';
import toast, { Toaster } from 'react-hot-toast';
function ManageProjects() {
  document.title = "Admin - Manage Projects"
  const navigate = useNavigate()

  const LogInStatus = useSelector(state=>state.LogInStatus)
  useEffect(()=>{
    if(!LogInStatus){
      navigate("/login");
    }
  },[LogInStatus]);


  //actual logic

  const [projects, setProjects] = useState([
    {title:"Loading Title...." , technologies:'["React"]' , 
      image1_BIG :[]
    }
  ]);

 useEffect(()=>{
  async function loadData(){
    let response = await projectservice.LoadAllProjects();
    if(response.success){
       
        let originalDocuments = response.data.documents
       for(let item of originalDocuments){
        item.image1_BIG = JSON.parse(item.image1_BIG );
       }
      //  console.log(originalDocuments[0].image1_BIG);
        setProjects(originalDocuments)
    } else{
      toast.error(response.error)
    }
  } 
  loadData();
 },[])



  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <Toaster/>
      {/* Add New Project Link */}
      <div className="flex justify-end mb-4">
      <Link
      to="/project-form"
      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
    >
      <PlusCircle className="mr-2" />
      Add New Project
    </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectsLinkCard
            key={index}
            title={project.title}
            technologies={JSON.parse(project.technologies)}
            imageUrl={project.image1_BIG[0]}
            viewLink={project.$id ? `/project/${project.$id}` : ""}
          />
        ))}
      </div>
    </div>
  );
}

export default ManageProjects;
