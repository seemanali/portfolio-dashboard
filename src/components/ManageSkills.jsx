import React, { useEffect, useState } from 'react';
import { PlusCircle, Edit, Save, X, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import databaseforskills from '../AppwriteService/databaseforskill';
import toast, { Toaster } from 'react-hot-toast';
function ManageSkills() {
  const navigate = useNavigate();

  const LogInStatus = useSelector((state) => state.LogInStatus)
  useEffect(() => {
    if (!LogInStatus) {
      navigate("/login");
    }
  }, [LogInStatus]);



  const [skills, setSkills] = useState([
    { skillName: '', proficiency: '', category: '' },
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddSkill = () => {
    setSkills([...skills, { skillName: '', proficiency: '', category: '' }]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [name]: value };
    setSkills(updatedSkills);
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleSave = async () => {
    let skillsArray = JSON.stringify(skills)
    const toastId = toast.loading("Updating Skills...")
    let response =await databaseforskills.UpdateDocument(skillsArray);
    if(response.success){
      toast.success("Skills Updated" , {
        id :toastId
      })
    }else{
      toast.error(response.error , {
        id :toastId
      })
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Optionally, reset to original data
  };

  const loadData = async ()=>{
    let response = await databaseforskills.LoadDocument();
    if(response.success){
     let data = response.data
     let Allskills = data.skillName;
     let AllskillsArray = JSON.parse(Allskills)
     setSkills(AllskillsArray)
    }
    else{
      toast.error(response.error)
    }
  }

  useEffect(()=>{
    loadData()
  },[])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Toaster/>
      <h2 className="text-3xl font-bold mb-6">Manage Skills</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        {isEditing ? (
          <>
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center mb-4 gap-4 border-b border-gray-700 pb-4"
              >
                <input
                  type="text"
                  name="skillName"
                  value={skill.skillName}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Skill Name"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
                <select
                  name="proficiency"
                  value={skill.proficiency}
                  onChange={(e) => handleChange(index, e)}
                  className="w-32 p-2 bg-gray-700 border border-gray-600 rounded"
                >
                  <option value="">Select Proficiency</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <input
                  type="text"
                  name="category"
                  value={skill.category}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Category"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
                <button
                  onClick={() => handleDeleteSkill(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
            <button
              onClick={handleAddSkill}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4"
            >
              <PlusCircle className="mr-2" />
              Add New Skill
            </button>
            <div className="flex justify-end space-x-4">
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
            </div>
          </>
        ) : (
          <div className="text-center">
            <button
              onClick={() => {
                loadData();
                setIsEditing(true)}}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              <Edit className="mr-2 inline" />
              Edit Skills
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageSkills;
