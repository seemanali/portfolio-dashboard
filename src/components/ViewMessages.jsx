import React, { useEffect, useState } from 'react';
import MessagesCard from './MessagesCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import usermessages from '../AppwriteService/usermessages';
import toast, { Toaster } from 'react-hot-toast';
function ViewMessages() {

  const LogInStatus = useSelector((state) => state.LogInStatus)
  useEffect(() => {
    if (!LogInStatus) {
      navigate("/login");
    }
  }, [LogInStatus]);


  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    const loadmessages = async () =>{
      const toastId = toast.loading("Loading messages....");
      let response = await usermessages.LoadMessages();
      if(response.success){
        toast.success("All messages Loaded" , {id : toastId}) 
        setMessages(response.data.documents);
      }else{
        toast.error(response.error, {id : toastId})
      }
    }
    document.title = "User Messages";
    loadmessages();
  },[])
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Toaster/>
      <h2 className="text-3xl font-bold mb-6">View Messages</h2>
      <div className="space-y-4">
        {
          messages.length == 0 ? (<p>Inbox is Empty.....</p>) :
            messages.map((msg , index) => (
              <MessagesCard
                key={index}
                name={msg.name}
                email={msg.email}
                subject={msg.subject}
                message={msg.message}
              />
            ))}
      </div>
    </div>
  );
}

export default ViewMessages;
