import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,
    onlineUsers:[],


    checkAuth:async()=>{
        try{
            const res = await axiosInstance.get('/auth/check');
            set({authUser:res.data});
        }catch(error){
            console.log("Error in checkAuth: ",error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true});
        try{
            const res = await axiosInstance.post('/auth/signup',data);
            set({authUser:res.data});
            toast.success("Account Created Succesfully!");
    }
    catch(error){
        toast.error("Error:",error.response.data.message);
    }
    finally{
        set({isSigningUp:false});
    }
    },

    logout:async()=>{
        try{
            await axiosInstance.post('/auth/logout');
            set({authUser:null});
            toast.success("Logged Out Successfully!");
        }catch(error){
            toast.error("Error:",error.response.data.message);
        }
    },

    login:async(data)=>{
        set({isLoggingIn:true});
        try{
            const res = await axiosInstance.post('/auth/login',data);
            set({authUser:res.data});
            toast.success("Logged In Successfully!");
        }catch(error){
            toast.error("Error:",error.response.data.message);
        }finally{
            set({isLoggingIn:false});
        }
    },

    updateProfile:async(data)=>{
        set({isUpdatingProfile:true});
        try{
            const res = await axiosInstance.put('/auth/update-profile',data);
            set({authUser:res.data});
            toast.success("Profile Updated Successfully!");
        }catch(error){
            toast.error("Error:",error.response.data.message);
        }finally{
            set({isUpdatingProfile:false});
        }
    }
}));