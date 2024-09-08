import React, { useEffect, useState } from 'react';
import { Image, Edit, Save, X, File, Database } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import config from '../config/config';
import imageservice from '../AppwriteService/Imageservice';
import toast, { Toaster } from 'react-hot-toast';
import databaseserviceforabout from '../AppwriteService/databaseServiceForAboutsection';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ManageAbout() {
  const LogInStatus = useSelector((state)=>state.LogInStatus)
  const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/150');
  const [title, setTitle] = useState('About Me');
  const [content, setContent] = useState('<p>Write something about yourself...</p>');
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [imageId, setImageId] = useState('');
  const [error, seterror] = useState("")

  const navigate = useNavigate();


  useEffect(()=>{
    if(!LogInStatus){
      navigate("/login");
    }
  },[LogInStatus]);
  useEffect(() => {
    
    const loadImages = async () => {
      try {
        const response = await imageservice.ListFiles();
        if (response.success && response.data.files.length > 0) {
          setImageId(response.data.files[response.data.files.length-1].$id);
        }
      } catch (error) {
        toast.error('Failed to load images.');
      }
    };
    const loadData = async ()=>{
      try {
        const response = await databaseserviceforabout.LoadDocument()
        if (response.success ) {
         setTitle(response.data.headline)
         setContent(response.data.about_content)
        }
      } catch (error) {
        toast.error('Failed to load images.');
      }
    }
    loadData();
    loadImages();
  }, []);

  // Set profile image when imageId changes
  useEffect(() => {
    if (!imageId) return;

    const setImageToProfile = async () => {
      try {
        const response = await imageservice.GetImage(imageId);
        if (response.success) {
          setImageUrl(response.data.href);
        }
      } catch (error) {
        toast.error('Failed to load profile image.');
      }
    };

    setImageToProfile();
  }, [imageId]);

  // Handle file input and image upload
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const toastId = toast.loading('Uploading Image...');
      try {
        const uploadResponse = await imageservice.UploadImages(selectedFile);
        if (uploadResponse.success) {
          setImageId(uploadResponse.data.$id)
          toast.success('Image uploaded successfully!', { id: toastId });
        } else {
          toast.error('Image upload failed.', { id: toastId });
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`, { id: toastId });
      }
    }
  };

  // Save profile changes
  const handleSave = async () => {
    if(title!="" && content!=""){
      const toastId = toast.loading("Updating.....");
      let response = await databaseserviceforabout.UpdateDocument("66d99e060011cc8fa215" , title , content)
      if(response.success){
        toast.success("Updated SuccessFully" , {id:toastId});
      }
      else{
        toast.error(response.error , {id:toastId})
      }
    }
    else{
    toast.error("All feilds are required")
    }


    
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Toaster />
      <h2 className="text-3xl font-bold mb-6">Manage About</h2>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Profile Photo */}
        <div className="flex items-center mb-4">
          <Image className="text-blue-500 w-6 h-6 mr-2" />
          <span className="text-lg font-semibold">Profile Photo</span>
        </div>
        {isEditing ? (
          <div className="mb-4">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer flex items-center bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg"
            >
              <File className="mr-2" />
              Upload Image
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {file && <p className="text-gray-400 mt-2">Selected file: {file.name}</p>}
          </div>
        ) : (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-600 mb-4"
          />
        )}

        {/* Title */}
        <div className="flex items-center mb-4">
          <Edit className="text-green-500 w-6 h-6 mr-2" />
          <span className="text-lg font-semibold">Title</span>
        </div>
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 p-2 bg-gray-700 border border-gray-600 rounded"
          />
        ) : (
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
        )}

        {/* Content */}
        <div className="flex items-center mb-4">
          <Edit className="text-yellow-500 w-6 h-6 mr-2" />
          <span className="text-lg font-semibold">Content</span>
        </div>
        {isEditing ? (
          <Editor
            apiKey={config.TINYMCE_EDITOR_APIKEY}
            value={content}
            init={{
              height: 500,
              menubar: false,
              plugins: 'advlist autolink lists link image charmap preview anchor textcolor',
              toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            onEditorChange={(newContent) => setContent(newContent)}
            className="mb-4"
          />
        ) : (
          <div className="prose prose-invert">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                <Save className="mr-2 inline" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                <X className="mr-2 inline" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              <Edit className="mr-2 inline" />
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageAbout;
