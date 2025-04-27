import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit3, Layers, User, Mail } from 'lucide-react';
import { useSelector } from 'react-redux';

function Dashboard() {




  let LogInStatus = useSelector((state) => state.LogInStatus)
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">

        {
          !LogInStatus ? (<>
            <div className="border border-gray-700 rounded-lg p-6 bg-gray-800">
              <h2 className="text-3xl font-bold mb-4 text-white">Log in First</h2>
              <Link
                to="/login"
                className="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
              >
                Login
              </Link>
            </div>

          </>)
            : (<>
   

              {/* Quick Actions */}
              <section>
                <h2 className="text-3xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {/* Add New Project */}
                  <Link to={"/project-form"} className="bg-blue-600 hover:bg-blue-700 p-4 rounded-lg flex items-center cursor-pointer">
                    <PlusCircle className="w-8 h-8 mr-4" />
                    <div>
                      <p className="text-xl font-semibold">Add New Project</p>
                    </div>
                  </Link>

                  {/* Edit About Section */}
                  <Link to={"/manage-about"} className="bg-green-600 hover:bg-green-700 p-4 rounded-lg flex items-center cursor-pointer">
                    <Edit3 className="w-8 h-8 mr-4" />
                    <div>
                      <p className="text-xl font-semibold">Edit About Section</p>
                    </div>
                  </Link>

                  {/* Manage Skills */}
                  <Link to={"/manage-skills"} className="bg-purple-600 hover:bg-purple-700 p-4 rounded-lg flex items-center cursor-pointer">
                    <User className="w-8 h-8 mr-4" />
                    <div>
                      <p className="text-xl font-semibold">Manage Skills</p>
                    </div>
                  </Link>
                </div>
              </section>
            </>)
        }




      </div>
    </div>
  );
}

export default Dashboard;
