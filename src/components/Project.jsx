import React, { useEffect, useState } from 'react';
import { Edit3, Trash2, Globe, Code, List, CheckCircle, ArrowBigLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import projectservice from '../AppwriteService/ProjectFormService';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import parse from "html-react-parser"
function Project() {
  const LogInStatus = useSelector((state) => state.LogInStatus);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!LogInStatus) {
      navigate("/login");
    }
  }, [LogInStatus]);

  const [documentID, setdocumentID] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('My Project Title');
  const [description, setDescription] = useState('This is a brief description of my project.');
  const [isPublic, setIsPublic] = useState(true);
  const [githubLink, setGithubLink] = useState('https://github.com/your-repo-link');
  const [demoLink, setDemoLink] = useState('https://your-demo-link.com');
  const [pcImages, setPcImages] = useState([]);
  const [mobileImages, setMobileImages] = useState([]);
  const [skills, setSkills] = useState(['React', 'Tailwind CSS', 'Appwrite']);

  // Actual logic
  const Para = useParams();
  useEffect(() => {
    async function loadData() {
      let farziID = Para.projectId;
      setdocumentID(farziID);

      let response = await projectservice.LoadSingleDocumment(farziID); // Pass farziID instead of documentID
      
      if (response.success) {
        let data = response.data;
        

        setTitle(data.title);
        setDescription(data.description);
        setDemoLink(data.project_link);
        setGithubLink(data.github_link);

        // Parse only if it's a string
        setPcImages(typeof data.image1_BIG === 'string' ? JSON.parse(data.image1_BIG) : data.image1_BIG);
        setMobileImages(typeof data.image1_mob === 'string' ? JSON.parse(data.image1_mob) : data.image1_mob);
        setSkills(typeof data.technologies === 'string' ? JSON.parse(data.technologies) : data.technologies);

        setIsLoading(false);
      } else {
        toast.error(response.error);
      }
    }

    loadData();
  }, [Para.projectId]);

  const handleEdit = () => {
    navigate(`/project-form/${documentID}`)
  };

  const handleDelete = async () => {
    let response = await projectservice.DeleteDocument(documentID);
    const toastId = toast.loading("Deleting Document...");
    if (response.success) {
      toast.success("Deleted Successfully...", { id: toastId });
      navigate("/manage-projects");
    } else {
      toast.error(response.error, { id: toastId });
    }
  };

  return (
    isLoading ? (
      <div className="flex items-center justify-center h-40">
        <Toaster />
        <div className="animate-spin"><Loader /></div>
      </div>
    ) : (
      <div className="bg-gray-800 text-white p-6 shadow-md mb-6">
        <button
            onClick={()=>{
              navigate("/manage-projects")
            }}
            className="flex items-center bg-blue-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none"
          >
           <ArrowBigLeft/>
            Back
          </button>
        <Toaster />
        {/* Title */}
        <h1 className="text-4xl text-center font-bold mb-6">{title}</h1>

        {/* Description */}
          <h1 className="text-xl font-bold mb-2">Project Description:</h1>
        <div className='flex justify-center'>
        <div className='border w-3/4 p-6 m-4 rounded-lg'>
          <div className="mb-4">{parse(description)}</div>
        </div>
        </div>
        {/* Public or Private */}
        <p className="mb-4">
          Status:
          <span className={`ml-2 px-2 py-1 rounded ${isPublic ? 'bg-green-600' : 'bg-red-600'}`}>
            {isPublic ? 'Public' : 'Private'}
          </span>
        </p>

        {/* Links */}
        <div className="flex space-x-4 mb-6">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:text-blue-400"
          >
            <Code className="mr-2" />
            GitHub Code
          </a>
          <a
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:text-blue-400"
          >
            <Globe className="mr-2" />
            Project Demo
          </a>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 flex items-center">Technology Used</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="flex items-center p-2 bg-gray-700 rounded-full">
                <CheckCircle className="mr-2 text-green-400" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* PC Images */}
        <h3 className="font-semibold mb-2">PC Screenshots</h3>
        <div className="mb-6 flex justify-center">
          <div className="w-4/5 flex flex-col items-center justify-center space-y-4">
            {pcImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`PC Screenshot ${index + 1}`}
                className="w-full h-full object-contain rounded"
              />
            ))}
          </div>
        </div>

        {/* Mobile Images */}
        <div className="mb-6">
  <h3 className="font-semibold mb-2">Mobile Screenshots</h3>
  <div className="flex flex-wrap justify-center gap-4"> {/* Center the images */}
    {mobileImages.map((image, index) => (
      <div key={index} className="flex-shrink-0 w-1/2 sm:w-1/3 lg:w-1/4">
        <img
          src={image}
          alt={`Mobile Screenshot ${index + 1}`}
          className="w-full h-auto object-cover rounded"
        />
      </div>
    ))}
  </div>
</div>



        {/* Edit and Delete Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleEdit}
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
          >
            <Edit3 className="mr-2" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none"
          >
            <Trash2 className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    )
  );
}

export default Project;
