import React, { useState, useEffect } from 'react';
import { PlusCircle, Lock, Unlock, Upload, Trash2 } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import config from "../config/config";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import projectservice from '../AppwriteService/ProjectFormService';
import toast, { Toaster } from 'react-hot-toast';

function ProjectForm() {
  const navigate = useNavigate();
  const LogInStatus = useSelector((state) => state.LogInStatus);
  document.title = "Admin - Project Form";
  useEffect(() => {
    if (!LogInStatus) {
      navigate("/login");
    }
  }, [LogInStatus]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [githubLink, setGithubLink] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [pcImages, setPcImages] = useState(["","",""]);
  const [mobileImages, setMobileImages] = useState(["",""]);
  const [technologies, setTechnologies] = useState([""]); // Array for dynamic technologies
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [documentID, setDocumentID] = useState("")
  
  const handleImageChange = async (e, setter, index , konseWali) => {
    const file = e.target.files[0];
    if (file) {
      const toastID = toast.loading("Uploading Image...");
      let response = await projectservice.UploadImage(file);
      if(response.success){
        toast.success("uploaded Successfully....",{id:toastID});
        let farziArray;
        if(konseWali==="pcWali"){
          farziArray = [...pcImages];
        }
        else{
          farziArray = [...mobileImages];
        }
       console.log(response.data)
        farziArray[index] = response.data.href
        console.log(farziArray);
        setter(farziArray)
      }
      else{
        toast.error(response.error ,{id:toastID})
      }
      
    }
  };

  const handleTechnologyChange = (index, value) => {
    const updatedTechnologies = [...technologies];
    updatedTechnologies[index] = value;
    setTechnologies(updatedTechnologies);
  };

  const addTechnologyField = () => {
    setTechnologies([...technologies, ""]);
  };

  const removeTechnologyField = (index) => {
    const updatedTechnologies = technologies.filter((_, i) => i !== index);
    setTechnologies(updatedTechnologies);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (pcImages.length < 3) newErrors.pcImages = 'At least 3 PC images are required';
    if (mobileImages.length < 2) newErrors.mobileImages = 'At least 2 mobile images are required';
    if (!githubLink) newErrors.githubLink = 'GitHub link is required';
    if (!demoLink) newErrors.demoLink = 'Project demo link is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const pcImagesArray = JSON.stringify(pcImages);
    const mobileImagesArray = JSON.stringify(mobileImages);
    const technologyArray = JSON.stringify(technologies)

    const toastId = toast.loading("Saving Data...");
    let response = await projectservice.UploadProjectData(title, description , technologyArray , pcImagesArray , mobileImagesArray ,demoLink , githubLink , isPublic );
    
    if(response.success){
      toast.success("Uploaded SuccessFully", {id:toastId})
      navigate("/manage-projects")
    }
    else{
      toast.error(response.error , {id:toastId})
    }

  };


  //Update Form Logic starts Here 
  let para = useParams();
  
  useEffect(()=>{
    setDocumentID(para.documentID);
    async  function loadData (){

      if(documentID){
        let response = await projectservice.LoadSingleDocumment(documentID);
        if(response.success){
          setIsUpdating(true)
          let data = response.data;
          setTitle(data.title);
          setDescription(data.description)
          setIsPublic(data.ispublic);
          setDemoLink(data.project_link);
          setGithubLink(data.github_link);
          setPcImages(JSON.parse(data.image1_BIG))
          setMobileImages(JSON.parse(data.image1_mob));
          setTechnologies(JSON.parse(data.technologies))
        }else{
          toast.error(response.error)
        }
      }
      
    }

    loadData();
  },[documentID])

  async function UpdateFunctionHandle(){
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const pcImagesArray = JSON.stringify(pcImages);
    const mobileImagesArray = JSON.stringify(mobileImages);
    const technologyArray = JSON.stringify(technologies)
    const toastId = toast.loading("Updating Data...");

    let response = await projectservice.UpdateDocument( documentID,title, description , technologyArray , pcImagesArray , mobileImagesArray ,demoLink , githubLink , isPublic );

    if(response.success){
      toast.dismiss(toastId)
      navigate("/manage-projects")
    }else{
      toast.error(response.error , {id:toastId})
    }

  }
  return (
    <div className="container mx-auto p-6 bg-gray-800 text-white shadow-md">
      <Toaster/>
      <h1 className="text-3xl font-bold mb-6">Add New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-lg font-semibold mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            className={`w-full px-4 py-2 bg-gray-700 border ${errors.title ? 'border-red-600' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-lg font-semibold mb-2">Description</label>
          <Editor
            value={description}
            apiKey={config.TINYMCE_EDITOR_APIKEY} 
            onEditorChange={(content) => setDescription(content)}
            init={{
              height: 300,
              menubar: false,
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            className={`w-full bg-gray-700 rounded-md ${errors.description ? 'border-red-600' : ''}`}
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Public/Private Toggle */}
        <div className="flex items-center mb-4">
          <label className="mr-4 text-lg font-semibold">Status</label>
          <button
            type="button"
            onClick={() => setIsPublic(true)}
            className={`px-4 py-2 rounded-md ${isPublic ? 'bg-green-600' : 'bg-gray-600'} mr-2 flex items-center`}
          >
            <Unlock className="mr-2" />
            Public
          </button>
          <button
            type="button"
            onClick={() => setIsPublic(false)}
            className={`px-4 py-2 rounded-md ${!isPublic ? 'bg-red-600' : 'bg-gray-600'} flex items-center`}
          >
            <Lock className="mr-2" />
            Private
          </button>
        </div>

        {/* Links */}
        <div>
          <label htmlFor="githubLink" className="block text-lg font-semibold mb-2">GitHub Link</label>
          <input
            type="url"
            id="githubLink"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            placeholder="Enter GitHub repository link"
            className={`w-full px-4 py-2 bg-gray-700 border ${errors.githubLink ? 'border-red-600' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4`}
          />
          {errors.githubLink && <p className="text-red-600 text-sm mt-1">{errors.githubLink}</p>}

          <label htmlFor="demoLink" className="block text-lg font-semibold mb-2">Project Demo Link</label>
          <input
            type="url"
            id="demoLink"
            value={demoLink}
            onChange={(e) => setDemoLink(e.target.value)}
            placeholder="Enter project demo link"
            className={`w-full px-4 py-2 bg-gray-700 border ${errors.demoLink ? 'border-red-600' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.demoLink && <p className="text-red-600 text-sm mt-1">{errors.demoLink}</p>}
        </div>

        {/* PC Images */}
        <div>
          <label className="block text-lg font-semibold mb-2">PC Images (3)</label>
          {pcImages.map((_, index) => (
            <div key={index} className="mb-4">
              <label className="flex items-center w-full px-4 py-2 bg-gray-700 border rounded-md cursor-pointer">
                <Upload className="mr-2" />
                <span className="flex-1">Select PC Image {index + 1}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setPcImages, index, "pcWali")}
                  className="hidden"
                />
              </label>
              {/* Display file name if selected */}
              {`${pcImages[index]}`}
            </div>
          ))}
        </div>

        {/* Mobile Images */}
        <div>
          <label className="block text-lg font-semibold mb-2">Mobile Images (2)</label>
          {mobileImages.map((_, index) => (
            <div key={index} className="mb-4">
              <label className="flex items-center w-full px-4 py-2 bg-gray-700 border rounded-md cursor-pointer">
                <Upload className="mr-2" />
                <span className="flex-1">Select Mobile Image {index + 1}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, setMobileImages, index, "mobileWali")}
                  className="hidden"
                />
              </label>
              {/* Display file name if selected */}
              {`${mobileImages[index]}`}
            </div>
          ))}
        </div>

        {/* Technologies Section */}
        <div>
          <label className="block text-lg font-semibold mb-2">Technologies</label>
          {technologies.map((tech, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={tech}
                onChange={(e) => handleTechnologyChange(index, e.target.value)}
                placeholder={`Technology ${index + 1}`}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {technologies.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTechnologyField(index)}
                  className="ml-2 p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTechnologyField}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <PlusCircle className="mr-2" />
            Add Technology
          </button>
        </div>

        {/* Submit Button */}
        {
          isUpdating ? 
          (<>
          <div className='flex gap-4'>
           <button
           type='button'
            className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-blue-700"
            onClick={()=>{
              navigate(`/manage-projects`)
            }}
          >
          Discard
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            onClick={UpdateFunctionHandle}
          >
           Update Project
          </button>
          </div>
          </>) :
          (<button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Add Project
          </button>)
        }
        
      </form>
    </div>
  );
}

export default ProjectForm;
